import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PortfolioItem {
  id: string;
  title: string;
  creator: string;
  category: string;
  image: string;
  description: string;
  date: string;
}

interface PortfolioGalleryProps {
  items?: PortfolioItem[];
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items = defaultItems,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const categories = [
    "all",
    "nail-art",
    "stitching",
    "food",
    "painting",
    "crafts",
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">Portfolio Gallery</h2>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search portfolio items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="w-full"
      >
        <TabsList className="mb-6 flex flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                onClick={() => handleItemClick(item)}
              >
                <Card className="overflow-hidden cursor-pointer h-full">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg line-clamp-1">
                        {item.title}
                      </h3>
                      <Badge variant="secondary" className="capitalize">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      By {item.creator}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No portfolio items found matching your criteria.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedItem && (
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedItem.title}
              </DialogTitle>
              <DialogDescription>
                By {selectedItem.creator} • {selectedItem.date}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="aspect-square relative overflow-hidden rounded-md">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <Badge variant="outline" className="mb-4 capitalize">
                  {selectedItem.category}
                </Badge>
                <p className="text-muted-foreground">
                  {selectedItem.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <Button>View More</Button>
                  <Button variant="outline">Share</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

// Default items for demonstration - updated categories
const defaultItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Gel Nail Art - Floral Design",
    creator: "Emma",
    category: "nail-art",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    description:
      "Professional gel nail art featuring elegant floral designs with intricate details and vibrant colors.",
    date: "January 15, 2024",
  },
  {
    id: "2",
    title: "Acrylic Extensions - Ombre Style",
    creator: "Emma",
    category: "nail-art",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80",
    description:
      "Beautiful acrylic nail extensions with stunning ombre gradient effects in various color combinations.",
    date: "January 10, 2024",
  },
  {
    id: "3",
    title: "Embroidered Wall Art",
    creator: "Sarah",
    category: "stitching",
    image:
      "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&q=80",
    description:
      "Intricate embroidery work featuring floral patterns and vibrant threads on natural linen.",
    date: "December 5, 2023",
  },
  {
    id: "4",
    title: "Cross-Stitch Sampler",
    creator: "Emma",
    category: "stitching",
    image:
      "https://images.unsplash.com/photo-1590075865003-e48b56a1a702?w=800&q=80",
    description:
      "Traditional cross-stitch sampler with modern patterns and color combinations.",
    date: "November 20, 2023",
  },
  {
    id: "5",
    title: "Homemade Artisan Bread",
    creator: "Sarah",
    category: "food",
    image:
      "https://images.unsplash.com/photo-1589367920969-ab7e491d125a?w=800&q=80",
    description:
      "Freshly baked artisan bread with a perfect crust and soft interior, made with organic ingredients.",
    date: "January 8, 2024",
  },
  {
    id: "6",
    title: "Gourmet Pasta & Sauce",
    creator: "Emma",
    category: "food",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&q=80",
    description:
      "Handmade pasta with homemade sauce using fresh herbs and premium ingredients.",
    date: "January 5, 2024",
  },
  {
    id: "7",
    title: "Abstract Watercolor Painting",
    creator: "Sarah",
    category: "painting",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    description:
      "A vibrant abstract watercolor painting featuring bold colors and fluid shapes that evoke emotions of joy and wonder.",
    date: "December 15, 2023",
  },
  {
    id: "8",
    title: "Oil Painting - Mountain Landscape",
    creator: "Emma",
    category: "painting",
    image:
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&q=80",
    description:
      "A serene mountain landscape captured in oil paints, showcasing the beauty of nature in different light.",
    date: "December 12, 2023",
  },
  {
    id: "9",
    title: "Handcrafted Ceramic Vase",
    creator: "Sarah",
    category: "crafts",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
    description:
      "A beautifully handcrafted ceramic vase with intricate patterns and a unique glaze finish.",
    date: "November 3, 2023",
  },
  {
    id: "10",
    title: "Handmade Jewelry Collection",
    creator: "Emma",
    category: "crafts",
    image:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&q=80",
    description:
      "A collection of handcrafted jewelry pieces made with semi-precious stones and sterling silver.",
    date: "November 8, 2023",
  },
];

export default PortfolioGallery;
