import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Menu,
  Search,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import PortfolioGallery from "./PortfolioGallery";
import ProductGrid from "./ProductGrid";
import ProfileCard from "./ProfileCard";
import { default as CartComponent } from "./ShoppingCart";
import AdminPanel from "./AdminPanel";
import NotificationSystem, { useNotifications } from "./NotificationSystem";

const HomePage = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("all");
  const [cartItems, setCartItems] = React.useState([]);
  const [isAdminPanelVisible, setIsAdminPanelVisible] = React.useState(false);
  const {
    notifications,
    removeNotification,
    showCartSuccess,
    showAppointmentBooked,
    showOrderConfirmed,
  } = useNotifications();

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        const newItem = {
          id: product.id,
          name: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
          creator: product.creator,
          orderType: product.orderType,
          paymentOptions: product.paymentOptions,
        };

        // Show notification based on order type
        if (product.orderType === "appointment") {
          showAppointmentBooked(product.title, "Available dates");
        } else {
          showCartSuccess(product.title);
        }

        return [...prevItems, newItem];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems);
    // Generate mock order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    showOrderConfirmed(orderNumber);
    // Clear cart after successful checkout
    setTimeout(() => {
      setCartItems([]);
      setIsCartOpen(false);
    }, 2000);
  };

  // Mock data for featured items
  const featuredPortfolioItems = [
    {
      id: 1,
      title: "Abstract Watercolor Painting",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
      creator: "Sarah",
      category: "painting",
    },
    {
      id: 2,
      title: "Handcrafted Ceramic Bowl",
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      creator: "Emma",
      category: "crafts",
    },
    {
      id: 3,
      title: "Piano Composition",
      image:
        "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
      creator: "Sarah",
      category: "music",
    },
  ];

  const popularProducts = [
    {
      id: 1,
      title: "Hand-painted Canvas",
      image:
        "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80",
      price: 89.99,
      creator: "Sarah",
    },
    {
      id: 2,
      title: "Crochet Plush Toy",
      image:
        "https://images.unsplash.com/photo-1563901935883-cb61f5d49be4?w=800&q=80",
      price: 24.99,
      creator: "Emma",
    },
    {
      id: 3,
      title: "Digital Art Print",
      image:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80",
      price: 19.99,
      creator: "Sarah",
    },
    {
      id: 4,
      title: "Handmade Jewelry Set",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      price: 45.99,
      creator: "Emma",
    },
  ];

  const profiles = [
    {
      id: 1,
      name: "Sarah",
      role: "Artist & Painter",
      bio: "Passionate artist specializing in watercolor and acrylic paintings with over 10 years of experience.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      banner:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
      skills: ["Painting", "Drawing", "Digital Art"],
      social: {
        instagram: "sarah_artist",
        pinterest: "sarah_creates",
        etsy: "SarahsArtGallery",
      },
    },
    {
      id: 2,
      name: "Emma",
      role: "Craft Designer & Musician",
      bio: "Creative craft designer who loves working with various materials. Also plays piano and composes original music.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      banner:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      skills: ["Crafts", "Crochet", "Music", "Ceramics", "Nail Art"],
      social: {
        instagram: "emma_crafts",
        youtube: "EmmaMusic",
        etsy: "EmmasCraftCorner",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="text-xl font-bold">
              Creative Showcase
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#home"
                className="text-sm font-medium hover:text-primary"
              >
                Home
              </a>
              <a
                href="#portfolio"
                className="text-sm font-medium hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("portfolio")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Portfolio
              </a>
              <a
                href="#shop"
                className="text-sm font-medium hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop
              </a>
              <a
                href="#about"
                className="text-sm font-medium hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm font-medium hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex"
              onClick={() => setIsAdminPanelVisible(true)}
            >
              Admin
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative overflow-hidden bg-background py-20"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Unique Creations & Artistic Talents
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Explore a curated collection of handcrafted art, music, and
                  crafts. Find one-of-a-kind pieces created with passion and
                  skill.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="gap-1"
                  onClick={() => {
                    document
                      .getElementById("portfolio")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore Portfolio
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    document
                      .getElementById("shop")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Shop Creations
                </Button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            >
              <img
                alt="Hero Image"
                className="aspect-video object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section id="portfolio" className="bg-muted/40 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Portfolio
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our latest creative works across various mediums and
                styles.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="nail-art"
                    onClick={() => setActiveTab("nail-art")}
                  >
                    Nail Art
                  </TabsTrigger>
                  <TabsTrigger
                    value="stitching"
                    onClick={() => setActiveTab("stitching")}
                  >
                    Stitching
                  </TabsTrigger>
                  <TabsTrigger
                    value="food"
                    onClick={() => setActiveTab("food")}
                  >
                    Food
                  </TabsTrigger>
                  <TabsTrigger
                    value="painting"
                    onClick={() => setActiveTab("painting")}
                  >
                    Painting
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="mt-6">
                <PortfolioGallery items={featuredPortfolioItems} />
              </TabsContent>
              <TabsContent value="nail-art" className="mt-6">
                <PortfolioGallery
                  items={[
                    {
                      id: 4,
                      title: "Gel Nail Art - Floral Design",
                      image:
                        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
                      creator: "Emma",
                      category: "nail-art",
                    },
                    {
                      id: 5,
                      title: "Acrylic Extensions - Ombre",
                      image:
                        "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80",
                      creator: "Emma",
                      category: "nail-art",
                    },
                    {
                      id: 6,
                      title: "Custom Nail Art Design",
                      image:
                        "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80",
                      creator: "Emma",
                      category: "nail-art",
                    },
                  ]}
                />
              </TabsContent>
              <TabsContent value="painting" className="mt-6">
                <PortfolioGallery
                  items={featuredPortfolioItems.filter(
                    (item) => item.category === "painting",
                  )}
                />
              </TabsContent>
              <TabsContent value="stitching" className="mt-6">
                <PortfolioGallery
                  items={[
                    {
                      id: 7,
                      title: "Embroidered Wall Art - Floral",
                      image:
                        "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&q=80",
                      creator: "Sarah",
                      category: "stitching",
                    },
                    {
                      id: 8,
                      title: "Cross-Stitch Sampler",
                      image:
                        "https://images.unsplash.com/photo-1590075865003-e48b56a1a702?w=800&q=80",
                      creator: "Emma",
                      category: "stitching",
                    },
                  ]}
                />
              </TabsContent>
              <TabsContent value="food" className="mt-6">
                <PortfolioGallery
                  items={[
                    {
                      id: 9,
                      title: "Artisan Sourdough Bread",
                      image:
                        "https://images.unsplash.com/photo-1589367920969-ab7e491d125a?w=800&q=80",
                      creator: "Sarah",
                      category: "food",
                    },
                    {
                      id: 10,
                      title: "Homemade Pasta & Sauce",
                      image:
                        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&q=80",
                      creator: "Emma",
                      category: "food",
                    },
                  ]}
                />
              </TabsContent>
            </Tabs>
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="gap-1"
              onClick={() => {
                setActiveTab("all");
                // Scroll to top of portfolio section
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View All Works
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Shop Our Creations
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Unique handcrafted items available for purchase. Each piece is
                made with care and creativity.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <ProductGrid
              products={popularProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="gap-1"
              onClick={() => {
                // Scroll to top of shop section
                document
                  .getElementById("shop")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Browse All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-muted/40 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Meet The Creators
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get to know the talented individuals behind our creative
                showcase.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:gap-12">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get In Touch
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions about our work or interested in commissioning a
                  custom piece? We'd love to hear from you!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="gap-1"
                  onClick={() => {
                    // Simple contact form submission simulation
                    alert(
                      "Contact form functionality will be implemented with backend integration",
                    );
                  }}
                >
                  Send Message
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    alert("FAQ section will be added in future updates");
                  }}
                >
                  View FAQ
                </Button>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        placeholder="Your name"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Your message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Creative Showcase</h3>
            <p className="text-sm text-muted-foreground">
              Showcasing unique art, crafts, and musical talents.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4">
            <a href="#" className="text-sm hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:underline">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
            <p className="text-center text-sm text-muted-foreground">
              © 2023 Creative Showcase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      <CartComponent
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
      />

      {/* Admin Panel */}
      <AdminPanel
        isVisible={isAdminPanelVisible}
        onToggle={() => setIsAdminPanelVisible(!isAdminPanelVisible)}
      />

      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
};

export default HomePage;
