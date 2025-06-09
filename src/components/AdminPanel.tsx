import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Eye,
  EyeOff,
  Users,
  Package,
  Image,
  ShoppingBag,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Switch } from "./ui/switch";

interface AdminPanelProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

const AdminPanel = ({
  isVisible = false,
  onToggle = () => {},
}: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Mock data for demonstration
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: "1",
      title: "Gel Nail Art - Floral Design",
      category: "nail-art",
      creator: "Emma",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
      description:
        "Professional gel nail art featuring elegant floral designs.",
      featured: true,
      order: 1,
    },
    {
      id: "2",
      title: "Hand-Stitched Embroidery",
      category: "stitching",
      creator: "Sarah",
      image:
        "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=400&q=80",
      description: "Beautiful hand-stitched embroidery with floral patterns.",
      featured: false,
      order: 2,
    },
  ]);

  const [products, setProducts] = useState([
    {
      id: "1",
      title: "Gel Nail Art Service",
      price: 35.0,
      category: "nail-art",
      creator: "Emma",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
      description: "Professional gel nail art service with custom designs.",
      orderType: "appointment",
      paymentOptions: ["online", "cash"],
      inStock: true,
    },
  ]);

  const categories = [
    { id: "nail-art", name: "Nail Art", order: 1, active: true },
    { id: "stitching", name: "Stitching", order: 2, active: true },
    { id: "food", name: "Food", order: 3, active: true },
    { id: "painting", name: "Painting", order: 4, active: true },
  ];

  const creators = [
    {
      id: "emma",
      name: "Emma",
      role: "Nail Artist & Craft Designer",
      active: true,
    },
    { id: "sarah", name: "Sarah", role: "Artist & Baker", active: true },
  ];

  const handleSaveItem = (item: any) => {
    if (editingItem) {
      setPortfolioItems((prev) =>
        prev.map((p) => (p.id === item.id ? item : p)),
      );
    } else {
      setPortfolioItems((prev) => [
        ...prev,
        { ...item, id: Date.now().toString() },
      ]);
    }
    setIsAddingItem(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setPortfolioItems((prev) => prev.filter((p) => p.id !== id));
  };

  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 rounded-full p-3"
        size="icon"
      >
        <Settings className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
    >
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={onToggle} variant="outline" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Portfolio Management</h2>
              <Button onClick={() => setIsAddingItem(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Portfolio Item
              </Button>
            </div>

            <div className="grid gap-4">
              {portfolioItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.category} • By {item.creator}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={item.featured ? "default" : "outline"}
                          >
                            {item.featured ? "Featured" : "Regular"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Order: {item.order}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => setEditingItem(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Product Management</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${product.price} • {product.category} • By{" "}
                          {product.creator}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              product.inStock ? "default" : "destructive"
                            }
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          <Badge variant="outline">{product.orderType}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Category Management</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>

            <div className="grid gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Order: {category.order}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`active-${category.id}`}>
                            Active
                          </Label>
                          <Switch
                            id={`active-${category.id}`}
                            checked={category.active}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">User Management</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>

            <div className="grid gap-4">
              {creators.map((creator) => (
                <Card key={creator.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{creator.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {creator.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`user-active-${creator.id}`}>
                            Active
                          </Label>
                          <Switch
                            id={`user-active-${creator.id}`}
                            checked={creator.active}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Item Dialog */}
      <Dialog
        open={isAddingItem || !!editingItem}
        onOpenChange={() => {
          setIsAddingItem(false);
          setEditingItem(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Portfolio Item" : "Add Portfolio Item"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter title" />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nail-art">Nail Art</SelectItem>
                  <SelectItem value="stitching">Stitching</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="creator">Creator</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select creator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emma">Emma</SelectItem>
                  <SelectItem value="sarah">Sarah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description" />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="featured" />
              <Label htmlFor="featured">Featured Item</Label>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingItem(false);
                  setEditingItem(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminPanel;
