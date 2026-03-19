"use client";

import { useSearchParams } from "next/navigation";
import { Search, Filter, MapPin, Grid, List as ListIcon, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/ProductCard";
import { trendingProducts, categories } from "@/lib/mock-data";
import { cities } from "@/lib/images";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialCity = searchParams.get("city") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
  const [selectedCities, setSelectedCities] = useState(initialCity ? [initialCity] : []);

  const filteredProducts = useMemo(() => {
    return trendingProducts.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesCity = selectedCities.length === 0 || selectedCities.includes(product.city);
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [searchQuery, selectedCategories, selectedCities]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleCity = (city) => {
    setSelectedCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8 mx-auto px-4">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto space-y-4 mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
            <Input 
              placeholder="Search products, materials, or vendors..." 
              className="pl-12 h-14 bg-card border-border shadow-sm text-lg rounded-xl focus-visible:ring-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
            <span>Popular:</span>
            {["Marble", "Dining Table", "Chandelier", "Modular Kitchen"].map(tag => (
              <button 
                key={tag} 
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 rounded-full bg-card border border-border hover:border-accent hover:text-accent transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6 hidden lg:block">
            <div className="bg-card rounded-xl border p-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-accent" strokeWidth={2} />
                  Filters
                </h3>
                <button 
                  onClick={() => { setSelectedCategories([]); setSelectedCities([]); setSearchQuery(""); }}
                  className="text-xs text-muted-foreground hover:text-accent font-medium"
                >
                  Reset all
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Categories</h4>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-3 group cursor-pointer" onClick={() => toggleCategory(cat.name)}>
                      <Checkbox checked={selectedCategories.includes(cat.name)} />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat.name}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground/50 tabular-nums">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Top Cities</h4>
                <div className="space-y-2.5">
                  {cities.map((city) => (
                    <div key={city.name} className="flex items-center gap-3 group cursor-pointer" onClick={() => toggleCity(city.name)}>
                      <Checkbox checked={selectedCities.includes(city.name)} />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{city.name}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground/50 tabular-nums">{city.vendors}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Verified Only</h4>
                <div className="flex items-center gap-3 cursor-pointer">
                  <Checkbox id="verified-only" />
                  <label htmlFor="verified-only" className="text-sm text-muted-foreground cursor-pointer flex items-center gap-1.5">
                    Verified Vendors <ShieldCheck className="h-3 w-3 text-success" />
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <main className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between bg-card p-3 rounded-lg border">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md bg-muted text-primary"><Grid className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md"><ListIcon className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center space-y-4">
                  <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Search className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold">No results found</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                    We couldn't find any products matching your search criteria. Try adjusting your filters.
                  </p>
                  <Button onClick={() => { setSelectedCategories([]); setSelectedCities([]); setSearchQuery(""); }}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
