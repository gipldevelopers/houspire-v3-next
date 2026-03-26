"use client";

import { useSearchParams } from "next/navigation";
import { 
  Search, Filter, MapPin, Grid, List as ListIcon, 
  SlidersHorizontal, ShieldCheck, Star, Phone, 
  CheckCircle, ChevronRight, Play, LayoutGrid 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { b2bProducts, categories } from "@/lib/mock-data";
import { cities } from "@/lib/images";
import { useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const SearchProductCard = ({ product }) => {
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-teal-500/30 transition-all group flex flex-col h-full">
      {/* Image Area */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isIndustryLeader && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-wider">
            Industry Leader
          </div>
        )}
        {product.video && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/20">
            <Play className="h-4 w-4 text-white fill-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 flex gap-1">
            <div className="bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                +{Math.floor(Math.random() * 10) + 2} images
            </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col space-y-4">
        <div className="space-y-2">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-extrabold text-slate-800 text-base leading-tight hover:text-teal-600 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <p className="text-2xl font-black text-slate-900">{product.price}</p>
        </div>

        <div className="space-y-3 flex-1">
           <div className="flex items-start gap-2 text-xs">
              <MapPin className="h-3.5 w-3.5 text-slate-400 mt-0.5" />
              <span className="text-slate-500 font-medium">{product.city}</span>
           </div>
           
           <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] border-b border-slate-50 pb-1">
                <span className="text-slate-400">Material</span>
                <span className="font-bold text-slate-700">{product.material}</span>
              </div>
              <div className="flex justify-between text-[11px] border-b border-slate-50 pb-1">
                <span className="text-slate-400">Finish</span>
                <span className="font-bold text-slate-700">{product.finish}</span>
              </div>
           </div>
        </div>

        {/* Vendor Section */}
        <div className="pt-4 border-t border-slate-50 space-y-3">
          <div className="flex items-center justify-between">
            <Link href={`/vendor/${product.vendorId || "v1"}`}>
               <p className="font-black text-slate-800 text-sm hover:text-teal-600 transition-colors uppercase tracking-tight">{product.vendorName}</p>
            </Link>
            <div className="flex items-center gap-1 text-teal-600">
               <ShieldCheck className="h-4 w-4 fill-teal-50" />
               <span className="text-[10px] font-black uppercase tracking-tighter">TrustSEAL</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center bg-teal-50 text-teal-700 px-2 py-0.5 rounded text-[10px] font-black">
                {product.rating} <Star className="h-2.5 w-2.5 ml-1 fill-teal-700" />
             </div>
             <span className="text-[10px] text-slate-400 font-bold">({product.reviews} Reviews)</span>
             <span className="h-1 w-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] text-slate-400 font-bold">{product.years} yrs</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col gap-2">
           <Button className="w-full bg-[#0eb4c1] hover:bg-[#078e9a] text-white font-black text-sm h-11 rounded-xl shadow-lg shadow-teal-500/10 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Contact Supplier
           </Button>
           <Button variant="outline" className="w-full border-teal-500/20 text-teal-700 hover:bg-teal-50 font-black text-sm h-11 rounded-xl flex items-center gap-2">
              <Phone className="h-4 w-4" /> Call Now
           </Button>
        </div>
      </div>
    </div>
  );
};

function SearchContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Products";
  const city = searchParams.get("city") || "Ahmedabad";

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-4">
      {/* Main Content Area */}
      <div className="container mx-auto px-4 pt-6 space-y-6">
        
        {/* Breadcrumbs & Title */}
        <div className="space-y-3">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-teal-600">INDIA</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="#" className="hover:text-teal-600">HOME INTERIOR</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-300">{category?.toUpperCase()}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  {category} <span className="text-slate-400 font-medium">in {city}</span>
                </h1>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">(2,450+ products available)</p>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">View By:</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-9 w-9 border-2 ${viewMode === 'grid' ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-transparent text-slate-400'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-9 w-9 border-2 ${viewMode === 'list' ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-transparent text-slate-400'}`}
                  onClick={() => setViewMode('list')}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
             </div>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
           <Button variant="outline" className="border-teal-500 bg-teal-50/50 text-teal-700 font-black text-xs h-9 rounded-lg flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> Near Me
           </Button>
           <Button variant="outline" className="border-slate-200 bg-white text-slate-600 font-bold text-xs h-9 rounded-lg">Rajkot</Button>
           <Button variant="outline" className="border-slate-200 bg-white text-slate-600 font-bold text-xs h-9 rounded-lg">Coimbatore</Button>
           <Button variant="outline" className="border-slate-200 bg-white text-slate-600 font-bold text-xs h-9 rounded-lg">Morbi</Button>
           <div className="h-6 w-px bg-slate-200 mx-1" />
           <Button variant="outline" className="border-slate-200 bg-white text-slate-400 font-bold text-xs h-9 rounded-lg px-4 italic">Below ₹8,50,000</Button>
           <Button variant="outline" className="border-slate-200 bg-white text-slate-400 font-bold text-xs h-9 rounded-lg px-4 italic">₹8.5L - ₹14.5L</Button>
           <Button variant="outline" className="border-slate-200 bg-white text-slate-400 font-bold text-xs h-9 rounded-lg px-4 italic">Above ₹20L</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6 hidden lg:block">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-8 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-teal-600" /> Filters
                </h3>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Categories</h4>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-3 group cursor-pointer">
                      <Checkbox />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-teal-600 transition-colors">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Business Type</h4>
                <div className="space-y-3">
                  {["Manufacturer", "Wholesaler", "Exporter", "Retailer"].map((type) => (
                    <div key={type} className="flex items-center gap-3 group cursor-pointer">
                      <Checkbox />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-teal-600 transition-colors">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results Main Area */}
          <main className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
               {b2bProducts.concat(b2bProducts).map((product, i) => (
                 <motion.div
                   key={product.id + i}
                   initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: (i % 4) * 0.05 }}
                   viewport={{ once: true }}
                 >
                   <SearchProductCard product={product} />
                 </motion.div>
               ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
