import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart as CartIcon,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  creator: string;
  orderType?: "standard" | "pickup" | "appointment" | "dropoff";
  paymentOptions?: ("online" | "cash")[];
  selectedDate?: string;
  selectedTime?: string;
  paymentMethod?: "online" | "cash";
  specialInstructions?: string;
}

interface ShoppingCartProps {
  items?: CartItem[];
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onCheckout?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ShoppingCart = ({
  items = [
    {
      id: "1",
      name: "Watercolor Landscape",
      price: 45.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80",
      creator: "Jane Doe",
      orderType: "standard",
      paymentOptions: ["online"],
    },
    {
      id: "2",
      name: "Gel Nail Art - French Manicure",
      price: 35.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
      creator: "Emma Doe",
      orderType: "appointment",
      paymentOptions: ["online", "cash"],
      selectedDate: "2024-01-16",
      selectedTime: "2:00 PM",
      paymentMethod: "cash",
    },
  ],
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
  onCheckout = () => {},
  isOpen = false,
  onOpenChange = () => {},
}: ShoppingCartProps) => {
  const [open, setOpen] = useState(isOpen);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange(newOpen);
  };

  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <CartIcon className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {items.reduce((count, item) => count + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <CartIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => handleOpenChange(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-4 py-4"
                  >
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        By {item.creator}
                      </p>

                      {/* Order Type and Payment Info */}
                      {item.orderType && item.orderType !== "standard" && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {item.orderType === "pickup"
                              ? "🏠 Pickup"
                              : item.orderType === "appointment"
                                ? "📅 Appointment"
                                : item.orderType === "dropoff"
                                  ? "🚚 Drop-off"
                                  : item.orderType}
                          </Badge>
                          {item.paymentMethod === "cash" && (
                            <Badge variant="outline" className="text-xs">
                              💵 Cash Payment
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Date and Time for appointments */}
                      {item.orderType === "appointment" &&
                        item.selectedDate && (
                          <div className="text-xs text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {item.selectedDate}
                            </div>
                            {item.selectedTime && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.selectedTime}
                              </div>
                            )}
                          </div>
                        )}

                      {/* Quantity controls - only for non-appointment items */}
                      {item.orderType !== "appointment" && (
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      {item.orderType === "appointment" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Appointment service (Qty: 1)
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <Separator />
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {/* Special Instructions for custom orders */}
                  {items.some(
                    (item) => item.orderType && item.orderType !== "standard",
                  ) && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="special-instructions"
                        className="text-sm font-medium"
                      >
                        Special Instructions
                      </Label>
                      <Textarea
                        id="special-instructions"
                        placeholder="Any special requests or instructions for pickup/appointment/delivery..."
                        className="text-sm"
                        rows={2}
                      />
                    </div>
                  )}

                  <Button className="w-full" onClick={onCheckout}>
                    {items.some((item) => item.paymentMethod === "cash")
                      ? "Confirm Order (Cash Payment)"
                      : "Proceed to Checkout"}
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOpenChange(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
