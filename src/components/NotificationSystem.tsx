import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  Info,
  X,
  ShoppingCart,
  Calendar,
  Package,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  autoClose?: boolean;
  duration?: number;
}

interface NotificationSystemProps {
  notifications?: Notification[];
  onRemove?: (id: string) => void;
}

const NotificationSystem = ({
  notifications = [],
  onRemove = () => {},
}: NotificationSystemProps) => {
  const [visibleNotifications, setVisibleNotifications] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    visibleNotifications.forEach((notification) => {
      if (notification.autoClose !== false) {
        const timer = setTimeout(() => {
          handleRemove(notification.id);
        }, notification.duration || 5000);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [visibleNotifications]);

  const handleRemove = (id: string) => {
    setVisibleNotifications((prev) => prev.filter((n) => n.id !== id));
    onRemove(id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`${getBackgroundColor(notification.type)} shadow-lg`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    {notification.action && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={notification.action.onClick}
                      >
                        {notification.action.label}
                      </Button>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => handleRemove(notification.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Predefined notification types
  const showSuccess = (
    title: string,
    message: string,
    action?: Notification["action"],
  ) => {
    return addNotification({ type: "success", title, message, action });
  };

  const showError = (
    title: string,
    message: string,
    action?: Notification["action"],
  ) => {
    return addNotification({
      type: "error",
      title,
      message,
      action,
      autoClose: false,
    });
  };

  const showInfo = (
    title: string,
    message: string,
    action?: Notification["action"],
  ) => {
    return addNotification({ type: "info", title, message, action });
  };

  const showWarning = (
    title: string,
    message: string,
    action?: Notification["action"],
  ) => {
    return addNotification({ type: "warning", title, message, action });
  };

  // E-commerce specific notifications
  const showCartSuccess = (itemName: string) => {
    return showSuccess(
      "Added to Cart",
      `${itemName} has been added to your cart.`,
      {
        label: "View Cart",
        onClick: () => {
          // This would trigger cart opening
          console.log("Open cart");
        },
      },
    );
  };

  const showAppointmentBooked = (service: string, date: string) => {
    return showSuccess(
      "Appointment Booked",
      `Your ${service} appointment for ${date} has been confirmed.`,
      {
        label: "View Details",
        onClick: () => {
          console.log("View appointment details");
        },
      },
    );
  };

  const showOrderConfirmed = (orderNumber: string) => {
    return showSuccess(
      "Order Confirmed",
      `Your order #${orderNumber} has been confirmed and is being processed.`,
      {
        label: "Track Order",
        onClick: () => {
          console.log("Track order");
        },
      },
    );
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showCartSuccess,
    showAppointmentBooked,
    showOrderConfirmed,
  };
};

export default NotificationSystem;
