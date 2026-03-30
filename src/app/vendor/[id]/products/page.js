"use client";

import { useParams, useSearchParams } from "next/navigation";
import { 
  Building2, Phone, Mail, MapPin, 
  CheckCircle2, Star, Clock, FileText, 
  Globe, ShieldCheck, ArrowRight, Play,
  LayoutGrid, List, MessageCircle, Heart,
  FileDown, Medal, TrendingUp, Search,
  Award, Trophy, Filter, SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { featuredVendors, b2bProducts } from "@/lib/mock-data";
import { VendorNavbar } from "@/components/VendorNavbar";
import { VendorFooter } from "@/components/VendorFooter";
import { InquiryModal } from "@/components/InquiryModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useMemo, Suspense } from "react";

function VendorCatalogContent() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const initialSearch = searchParams.get("q") || "";

  const vendor = featuredVendors.find(v => v.id === id || (v.businessName && v.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === id)) || featuredVendors[0];
  const vendorProducts = b2bProducts.filter(p => p.vendorName === vendor.businessName || p.vendor === vendor.businessName);

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeInquiryProduct, setActiveInquiryProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const filteredProducts = useMemo(() => {
    let prods = vendorProducts.length > 0 ? vendorProducts : b2bProducts;
    if (categoryFilter) {
      prods = prods.filter(p => p.category?.toLowerCase() === categoryFilter.toLowerCase() || p.material?.toLowerCase() === categoryFilter.toLowerCase());
    }
    if (searchQuery) {
      prods = prods.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return prods;
  }, [vendorProducts, categoryFilter, searchQuery]);

  const openInquiry = (prod) => {
    setActiveInquiryProduct(prod);
    setIsInquiryOpen(true);
  };

  const handleGeneralInquiry = () => {
    setActiveInquiryProduct(null);
    setIsInquiryOpen(true);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
       console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <VendorNavbar vendorId={id} onInquiry={handleGeneralInquiry} />

      {/* Catalog Header */}
      <section className="bg-white border-b border-slate-100 py-12 px-4 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 h-64 w-64 bg-teal-500/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
         <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
            <div className="space-y-4 text-center md:text-left">
               <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  <FileText className="h-3.5 w-3.5" /> Full Product Catalog
               </div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">
                 Our <span className="text-teal-600">Inventory Pool</span>
               </h1>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {categoryFilter ? `Filtered by ${categoryFilter}` : `(Total ${vendorProducts.length} Premium Products Available)`}
               </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 pb-1">
               <div className="relative w-full md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search within catalog..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="h-12 pl-12 rounded-xl border-slate-100 focus:border-teal-500/50 bg-slate-50 shadow-inner" 
                  />
               </div>
               <Link href={`/vendor/${id}/products`}>
                  <Button variant="outline" className="h-12 border-slate-200 text-slate-500 font-black text-xs px-6 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
                     <SlidersHorizontal className="h-4 w-4" /> Clear
                  </Button>
               </Link>
            </div>
         </div>
      </section>

      {/* Main Catalog View */}
      <main className="py-12 px-4 container mx-auto max-w-7xl flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredProducts.length > 0 ? filteredProducts.map((product, i) => (
               <motion.div 
                 key={product.id + i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-teal-500/20 transition-all group flex flex-col h-full"
               >
                  <div className="aspect-video overflow-hidden relative">
                     <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.title} />
                     <div className="absolute top-4 right-4 h-9 w-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 cursor-pointer transition-colors shadow-lg">
                        <Heart className="h-4 w-4" />
                     </div>
                     <div className="absolute bottom-4 left-4 flex gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                        <Badge className="bg-black/40 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest border border-white/10">{product.material}</Badge>
                     </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col space-y-4">
                     <div className="space-y-1">
                        <Link href={`/product/${product.id}`}>
                           <h4 className="font-extrabold text-slate-800 leading-tight group-hover:text-teal-600 transition-colors uppercase tracking-tight line-clamp-2 min-h-[3rem] text-sm md:text-base">
                              {product.title}
                           </h4>
                        </Link>
                        <p className="text-xl font-black text-slate-900">{product.price}</p>
                     </div>
                     
                     <div className="pt-4 border-t border-slate-50 flex flex-col gap-2">
                        <Button 
                          onClick={() => openInquiry(product)}
                          className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal-500/10 active:scale-95 transition-all"
                        >
                           Get Latest Price
                        </Button>
                        <Link href={`/product/${product.id}`} className="w-full">
                           <Button variant="ghost" className="w-full h-11 bg-slate-50 hover:bg-white text-slate-400 hover:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-slate-100 transition-all">
                              View Details
                           </Button>
                        </Link>
                     </div>
                  </div>
               </motion.div>
             )) : (
               <div className="col-span-full py-20 text-center gap-4 flex flex-col items-center">
                  <Search className="h-10 w-10 text-slate-100" />
                  <p className="text-sm font-black text-slate-300 uppercase tracking-widest">No products found for this filter</p>
                  <Button variant="outline" onClick={() => {setSearchQuery(""); window.location.href = `/vendor/${id}/products`}} className="rounded-xl font-black text-[10px] uppercase">Clear All Filters</Button>
               </div>
             )}
          </div>

          <div className="pt-20 text-center space-y-4">
             <div className="h-px bg-slate-100 w-full max-w-sm mx-auto" />
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">You've reached the end of {vendor.businessName.toUpperCase()}'s catalogHub.</p>
          </div>
      </main>

      <VendorFooter vendorId={id} />

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onOpenChange={setIsInquiryOpen} 
        product={activeInquiryProduct} 
      />
    </div>
  );
}

export default function VendorCatalogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VendorCatalogContent />
    </Suspense>
  );
}
