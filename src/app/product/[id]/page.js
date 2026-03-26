"use client";

import { useParams } from "next/navigation";
import { 
  ChevronRight, MapPin, Star, Eye, ShieldCheck, Check, 
  Share2, Heart, ArrowLeft, MessageCircle, Phone, 
  ArrowRight, ShieldCheck as TrustSealIcon, CheckCircle2, 
  Award, Clock, Building2, ExternalLink, Play, 
  FileText, IndianRupee, Mail, Search, Shield,
  Verified, Zap, Trophy, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trendingProducts, b2bProducts, featuredVendors, categories } from "@/lib/mock-data";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { InquiryModal } from "@/components/InquiryModal";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = b2bProducts.find(p => p.id === id) || trendingProducts.find(p => p.id === id);
  const vendor = featuredVendors.find(v => v.businessName === product?.vendorName || v.businessName === product?.vendor);
  
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeInquiryProduct, setActiveInquiryProduct] = useState(null);

  const openInquiry = (prod) => {
    setActiveInquiryProduct(prod);
    setIsInquiryOpen(true);
  };

  if (!product) return (
    <div className="container py-20 text-center mx-auto px-4">
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Product Not Found</h2>
      <Link href="/search"><Button className="mt-8 bg-teal-600 hover:bg-teal-700 h-14 px-8 rounded-xl font-black text-white">Explore Marketplace</Button></Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20 pt-4">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-6">
          <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
            <Link href="/" className="hover:text-teal-600 transition-colors">INDIA</Link>
            <ChevronRight className="h-3 w-3" strokeWidth={3} />
            <Link href="/search" className="hover:text-teal-600 transition-colors">HOME INTERIOR</Link>
            <ChevronRight className="h-3 w-3" strokeWidth={3} />
            <span className="text-slate-500 font-medium line-clamp-1">{product.title}</span>
          </nav>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Image Gallery */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-4">
           <div className="grid grid-cols-2 gap-4 relative">
              <div className="aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-100 group relative">
                 <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.title} />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-md border border-slate-200 shadow-sm flex items-center gap-2 cursor-pointer hover:bg-white transition-colors z-10">
                    <FileText className="h-3.5 w-3.5 text-red-600" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">Product Brochure</span>
                 </div>
              </div>
              <div className="aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center relative group cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1540324155974-7523202daa3f" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 md:h-20 md:w-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110">
                       <Play className="h-8 w-8 text-white fill-white ml-1" />
                    </div>
                 </div>
              </div>
              <div className="aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-100 group">
                 <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-100 relative group">
                 <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <Button variant="outline" className="h-9 rounded-full bg-white/95 backdrop-blur shadow-lg border-teal-100 text-teal-700 font-extrabold text-[10px] uppercase px-4 ring-4 ring-teal-50">
                       View More Photos
                    </Button>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
           <div className="space-y-6">
              <div className="space-y-3">
                 <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tight">
                    {product.title}
                 </h1>
                 <div className="flex items-center gap-2 text-slate-500 font-extrabold text-sm">
                    <MapPin className="h-4 w-4 text-slate-400" /> {product.city}
                 </div>
                 <div className="flex items-baseline gap-3 pt-2">
                    <span className="text-3xl font-black text-slate-900">{product.price}</span>
                    <button 
                      onClick={() => openInquiry(product)}
                      className="text-xs font-black text-teal-600 hover:text-teal-700 underline decoration-teal-600/30 underline-offset-4 tracking-tight"
                    >
                      Get Latest Price
                    </button>
                 </div>
              </div>

              {/* Specifications List */}
              <div className="space-y-0.5 rounded-lg overflow-hidden border border-slate-100 bg-slate-50/20">
                 {[
                    { label: "Material", value: product.material || "Premium Interior Grade" },
                    { label: "Finish / Color", value: product.finish || "Customizable" },
                    { label: "Style", value: "Modern / Contemporary" },
                    { label: "Lead Time", value: "10-15 Business Days" },
                    { label: "Availability", value: "Available in Stock" },
                    { label: "Warranty", value: "24 Months" }
                 ].map((spec, i) => (
                    <div key={i} className="grid grid-cols-2 text-[12px] bg-white border-b border-slate-50 last:border-0 hover:bg-slate-100/30 transition-colors">
                       <div className="p-3 bg-slate-50/50 text-slate-500 font-bold uppercase tracking-widest text-[9px]">{spec.label}</div>
                       <div className="p-3 font-extrabold text-slate-800">{spec.value}</div>
                    </div>
                 ))}
              </div>

              <div className="space-y-4">
                 <p className="text-sm text-slate-500 font-medium leading-relaxed italic border-l-4 border-slate-100 pl-4 py-1">
                    We offer superior quality <span className="text-slate-900 font-bold uppercase text-[11px] tracking-tight">{product.title}</span>. Crafted with precision for high-end luxury interiors.
                 </p>
                 <Button 
                    onClick={() => openInquiry(product)}
                    className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-black text-base shadow-xl shadow-teal-500/10 active:scale-[0.98] transition-all"
                 >
                    Get Latest Price
                 </Button>
              </div>

              {/* MINIMIZED VENDOR CARD */}
              <div className="relative group overflow-hidden bg-white border-2 border-slate-50 rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:border-teal-50 transition-all duration-700">
                  <div className="relative space-y-6">
                      {/* Vendor Identity */}
                      <Link href={`/vendor/${vendor?.id || "v1"}`} className="flex items-center gap-4 group/vendor">
                        <div className="relative">
                          <div className="h-14 w-14 bg-slate-900 rounded-2xl flex items-center justify-center text-teal-400 font-black text-xl italic shadow-xl group-hover/vendor:rotate-6 transition-transform">
                            {product.vendorName?.[0] || product.vendor?.[0]}
                          </div>
                          <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                             <Verified className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div className="space-y-1">
                           <h3 className="text-lg font-black text-slate-900 leading-none tracking-tight uppercase group-hover/vendor:text-teal-600 transition-colors">{product.vendorName || product.vendor}</h3>
                           <div className="flex flex-wrap items-center gap-1.5">
                              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border border-emerald-100 flex items-center gap-1">
                                <CheckCircle2 className="h-2.5 w-2.5" /> GST Verified
                              </span>
                              <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border border-orange-100 flex items-center gap-1">
                                <Trophy className="h-2.5 w-2.5" /> Top Rated
                              </span>
                              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border border-blue-100 flex items-center gap-1">
                                <Clock className="h-2.5 w-2.5" /> {product.years || "13"} Yrs
                              </span>
                           </div>
                        </div>
                      </Link>

                      {/* Trust Stats Mini Dashboard */}
                      <div className="grid grid-cols-2 gap-3">
                         <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-50 flex items-center justify-between group/stat hover:bg-white transition-all">
                            <div className="space-y-0.5">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Trust Score</p>
                               <p className="text-sm font-black text-slate-900">4.8</p>
                            </div>
                            <div className="h-7 w-7 bg-teal-500 rounded-lg flex items-center justify-center text-white shadow shadow-teal-500/10">
                               <Shield className="h-3.5 w-3.5 fill-white" />
                            </div>
                         </div>
                         <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-50 flex items-center justify-between group/stat hover:bg-white transition-all">
                            <div className="space-y-0.5">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Response</p>
                               <p className="text-sm font-black text-teal-600">{product.responseRate || "96%"}</p>
                            </div>
                            <div className="h-7 w-7 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow shadow-orange-500/10">
                               <Zap className="h-3.5 w-3.5 fill-white" />
                            </div>
                         </div>
                      </div>

                      {/* Contact Actions */}
                      <div className="grid grid-cols-2 gap-3">
                         <Button variant="outline" className="h-11 bg-white border-slate-200 text-slate-600 rounded-xl font-black text-xs gap-1.5 hover:bg-slate-50 transition-all active:scale-95">
                            <Phone className="h-3.5 w-3.5" /> Call Now
                         </Button>
                         <Button 
                            onClick={() => openInquiry(product)}
                            className="h-11 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-black text-xs gap-1.5 shadow-lg shadow-teal-500/10 active:scale-95 transition-all"
                         >
                            <Mail className="h-3.5 w-3.5" /> Contact Seller
                         </Button>
                      </div>
                  </div>
              </div>
           </div>
        </div>

        {/* Similar Products Section */}
        <div className="lg:col-span-12 mt-20 space-y-12">
           <div className="space-y-1">
              <h2 className="text-lg md:text-xl font-bold text-slate-700">
                Find products similar to <span className="font-extrabold text-slate-900">{product.title}</span>
              </h2>
              <div className="h-1 w-24 bg-teal-500 rounded-full" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-0 border-t border-l border-slate-100">
              {b2bProducts.concat(b2bProducts).slice(0, 6).map((related, i) => (
                 <motion.div 
                   key={related.id + i}
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ delay: i * 0.05 }}
                   className="flex flex-col border-r border-b border-slate-100 bg-white group hover:shadow-2xl hover:z-10 transition-all p-4"
                 >
                    <Link href={`/product/${related.id}`}>
                       <div className="aspect-[4/3] relative overflow-hidden mb-4 rounded-lg overflow-hidden border border-slate-50">
                          <img src={related.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={related.title} />
                       </div>
                    </Link>
                    <Button 
                       onClick={() => openInquiry(related)}
                       className="w-full h-8 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-black text-[11px] mb-4 shadow-none"
                    >
                       Get Best Price
                    </Button>
                    <div className="space-y-3 flex-1">
                       <Link href={`/product/${related.id}`}>
                          <h3 className="text-xs font-bold text-slate-800 line-clamp-3 hover:text-teal-600 leading-normal min-h-[3rem]">
                             {related.title}
                          </h3>
                       </Link>
                       <div className="text-[10px] text-slate-400 font-bold leading-tight uppercase tracking-tighter">
                          {related.city} <span className="opacity-40 ml-1">• Verified Deals</span>
                       </div>
                       <p className="text-sm font-black text-slate-900 tracking-tight">{related.price}</p>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Categories Near City */}
        <div className="lg:col-span-12 mt-12 space-y-8">
           <h2 className="text-lg font-bold text-slate-700">
              Find related categories near <span className="font-extrabold text-slate-900">{product.city}</span>
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.slice(0, 4).map((cat) => (
                 <Link 
                   key={cat.name} 
                   href={`/search?category=${cat.name}&city=${product.city}`}
                   className="flex border-2 border-l-4 border-l-teal-600 border-slate-100 rounded-3xl p-4 items-center gap-4 bg-white hover:border-teal-100 transition-all cursor-pointer group shadow-sm overflow-hidden relative"
                 >
                    <div className="h-16 w-16 bg-slate-50 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform z-10 shrink-0 border border-slate-100">
                       <img src={cat.image || "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=100&h=100&fit=crop"} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1 z-10">
                       <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">{cat.name} Hub</h4>
                       <p className="text-[10px] text-slate-400 font-bold">Local verified sellers</p>
                       <span className="text-[10px] font-black text-teal-600 hover:underline">Get Request</span>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 h-16 w-16 bg-slate-50/50 rounded-full -mr-8 -mt-8 group-hover:bg-teal-50 transition-colors" />
                 </Link>
              ))}
           </div>
           
           <div className="flex justify-center pt-8">
              <Button variant="ghost" className="bg-slate-50 text-slate-400 hover:text-slate-900 font-black rounded-full px-8 gap-2 border border-slate-100">
                 Back to Top <ChevronRight className="h-4 w-4 -rotate-90" />
              </Button>
           </div>
        </div>

      </div>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onOpenChange={setIsInquiryOpen} 
        product={activeInquiryProduct} 
      />
    </div>
  );
}
