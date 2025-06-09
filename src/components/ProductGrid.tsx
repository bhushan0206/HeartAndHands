import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  creator: string;
  description: string;
  orderType?: "standard" | "pickup" | "appointment" | "dropoff";
  paymentOptions?: ("online" | "cash")[];
  availableDates?: string[];
  customInstructions?: string;
}

interface ProductGridProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
}

const ProductGrid = ({
  products = defaultProducts,
  onAddToCart = () => {},
}: ProductGridProps) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCreator, setSelectedCreator] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get unique categories and creators for filters - prioritized order
  const categoryOrder = ["nail-art", "stitching", "food", "painting", "crafts"];
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category)),
  );
  const sortedCategories = categoryOrder
    .filter((cat) => uniqueCategories.includes(cat))
    .concat(uniqueCategories.filter((cat) => !categoryOrder.includes(cat)));
  const categories = ["all", ...sortedCategories];
  const creators = [
    "all",
    ...Array.from(new Set(products.map((product) => product.creator))),
  ];

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesCreator =
      selectedCreator === "all" || product.creator === selectedCreator;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesCreator && matchesPrice && matchesSearch;
  });

  return (
    <div className="bg-background w-full p-4 md:p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Shop Our Creations</h2>
        <p className="text-muted-foreground mb-6">
          Browse and purchase unique handmade items created with love and
          passion.
        </p>

        {/* Search and Filters */}
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="filters" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="filters">Filters</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            <TabsContent value="filters" className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Creator
                </label>
                <Select
                  value={selectedCreator}
                  onValueChange={setSelectedCreator}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select creator" />
                  </SelectTrigger>
                  <SelectContent>
                    {creators.map((creator) => (
                      <SelectItem key={creator} value={creator}>
                        {creator === "all" ? "All Creators" : creator}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="pt-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden h-full flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium line-clamp-2">{product.title}</h3>
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-auto pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{product.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      By {product.creator}
                    </span>
                  </div>
                  {product.orderType && product.orderType !== "standard" && (
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {product.orderType === "pickup"
                          ? "🏠 Pickup"
                          : product.orderType === "appointment"
                            ? "📅 Appointment"
                            : product.orderType === "dropoff"
                              ? "🚚 Drop-off"
                              : product.orderType}
                      </Badge>
                      {product.paymentOptions?.includes("cash") && (
                        <Badge variant="outline" className="text-xs">
                          💵 Cash OK
                        </Badge>
                      )}
                    </div>
                  )}
                  <Button
                    className="w-full"
                    onClick={() => onAddToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.orderType === "appointment"
                      ? "Book Appointment"
                      : product.orderType === "pickup"
                        ? "Schedule Pickup"
                        : product.orderType === "dropoff"
                          ? "Request Drop-off"
                          : "Add to Cart"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Default products for demonstration - prioritized categories
const defaultProducts: Product[] = [
  {
    id: "1",
    title: "Gel Nail Art - French Manicure with Floral Design",
    price: 35.0,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    category: "nail-art",
    creator: "Emma",
    description:
      "Professional gel nail art featuring elegant French manicure with delicate floral accents. Includes base coat, color, design, and top coat.",
    orderType: "appointment",
    paymentOptions: ["online", "cash"],
    availableDates: ["2024-01-15", "2024-01-16", "2024-01-18", "2024-01-19"],
    customInstructions:
      "Appointment duration: 1.5-2 hours. Please arrive with clean, natural nails. Design can be customized during consultation.",
  },
  {
    id: "2",
    title: "Acrylic Nail Extensions - Ombre Design",
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80",
    category: "nail-art",
    creator: "Emma",
    description:
      "Beautiful acrylic nail extensions with stunning ombre gradient effect. Choice of colors and length available.",
    orderType: "appointment",
    paymentOptions: ["online", "cash"],
    availableDates: ["2024-01-16", "2024-01-17", "2024-01-19", "2024-01-20"],
    customInstructions:
      "Appointment duration: 2-2.5 hours. Includes nail prep, extensions, shaping, ombre design, and finishing. Color consultation available.",
  },
  {
    id: "3",
    title: "Hand-Stitched Embroidery Art - Floral Design",
    price: 35.0,
    image:
      "https://images.unsplash.com/photo-1590075865003-e48b56a1a702?w=800&q=80",
    category: "stitching",
    creator: "Sarah",
    description:
      "Beautiful hand-stitched embroidery featuring a colorful floral design.",
    orderType: "standard",
    paymentOptions: ["online"],
  },
  {
    id: "4",
    title: "Cross-Stitch Wall Art - Custom Pattern",
    price: 28.0,
    image:
      "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&q=80",
    category: "stitching",
    creator: "Emma",
    description:
      "Intricate cross-stitch artwork with custom patterns and vibrant colors.",
    orderType: "standard",
    paymentOptions: ["online"],
  },
  {
    id: "5",
    title: "Homemade Chocolate Chip Cookies (Dozen)",
    price: 12.5,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    category: "food",
    creator: "Sarah",
    description:
      "Delicious homemade chocolate chip cookies, baked fresh to order.",
    orderType: "pickup",
    paymentOptions: ["online", "cash"],
    availableDates: ["2024-01-15", "2024-01-16", "2024-01-17"],
    customInstructions:
      "Please specify pickup time when ordering. Fresh baked on order day.",
  },
  {
    id: "6",
    title: "Artisan Sourdough Bread",
    price: 8.0,
    image:
      "https://images.unsplash.com/photo-1589367920969-ab7e491d125a?w=800&q=80",
    category: "food",
    creator: "Emma",
    description:
      "Fresh artisan sourdough bread with perfect crust and soft interior.",
    orderType: "pickup",
    paymentOptions: ["online", "cash"],
    availableDates: ["2024-01-15", "2024-01-16", "2024-01-17"],
    customInstructions:
      "Available for pickup on baking days. Please order 24 hours in advance.",
  },
  {
    id: "7",
    title: "Handmade Watercolor Painting - Sunset Landscape",
    price: 45.99,
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    category: "painting",
    creator: "Sarah",
    description:
      "Beautiful watercolor painting of a sunset landscape, perfect for living room decor.",
    orderType: "standard",
    paymentOptions: ["online"],
  },
  {
    id: "8",
    title: "Acrylic Painting - Abstract Art",
    price: 65.0,
    image:
      "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80",
    category: "painting",
    creator: "Emma",
    description:
      "Vibrant abstract acrylic painting on canvas, signed by the artist.",
    orderType: "dropoff",
    paymentOptions: ["online", "cash"],
    customInstructions:
      "Free local delivery within 10 miles. Contact for delivery scheduling.",
  },
  {
    id: "9",
    title: "Handcrafted Ceramic Mug",
    price: 18.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    category: "crafts",
    creator: "Emma",
    description:
      "Unique handcrafted ceramic mug, perfect for your morning coffee or tea.",
    orderType: "standard",
    paymentOptions: ["online"],
  },
];

export default ProductGrid;
