import React, { useState } from "react";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedCreator: string;
  onCreatorChange: (creator: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  categories: string[];
  creators: string[];
  showPriceFilter?: boolean;
}

const SearchAndFilter = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCreator,
  onCreatorChange,
  priceRange,
  onPriceRangeChange,
  categories,
  creators,
  showPriceFilter = true,
}: SearchAndFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFiltersCount = [
    selectedCategory !== "all" ? 1 : 0,
    selectedCreator !== "all" ? 1 : 0,
    showPriceFilter && (priceRange[0] > 0 || priceRange[1] < 100) ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  const clearAllFilters = () => {
    onCategoryChange("all");
    onCreatorChange("all");
    if (showPriceFilter) {
      onPriceRangeChange([0, 100]);
    }
    onSearchChange("");
  };

  return (
    <div className="bg-background w-full p-4 border-b">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => onSearchChange("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Quick Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 5).map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => onCategoryChange(category)}
            >
              {category === "all" ? "All" : category.replace("-", " ")}
            </Badge>
          ))}
        </div>

        {/* Advanced Filters */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              {/* Category Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={onCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all"
                          ? "All Categories"
                          : category.replace("-", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Creator Filter */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Creator
                </Label>
                <Select value={selectedCreator} onValueChange={onCreatorChange}>
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

              {/* Price Range Filter */}
              {showPriceFilter && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={onPriceRangeChange}
                    max={100}
                    step={1}
                    className="my-4"
                  />
                </div>
              )}

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Category: {selectedCategory.replace("-", " ")}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onCategoryChange("all")}
              />
            </Badge>
          )}
          {selectedCreator !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Creator: {selectedCreator}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onCreatorChange("all")}
              />
            </Badge>
          )}
          {showPriceFilter && (priceRange[0] > 0 || priceRange[1] < 100) && (
            <Badge variant="secondary" className="gap-1">
              Price: ${priceRange[0]} - ${priceRange[1]}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onPriceRangeChange([0, 100])}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
