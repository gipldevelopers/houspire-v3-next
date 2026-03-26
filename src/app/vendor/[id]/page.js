"use client";

import { useParams } from "next/navigation";
import { 
  Building2, Phone, Mail, MapPin, 
  CheckCircle2, Star, Clock, FileText, 
  Globe, ShieldCheck, ArrowRight, Play,
  LayoutGrid, List, MessageCircle, Heart,
  FileDown, Medal, TrendingUp, Search,
  Award, Trophy,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { featuredVendors, b2bProducts } from "@/lib/mock-data";
import { VendorNavbar } from "@/components/VendorNavbar";
import { VendorFooter } from "@/components/VendorFooter";
import { InquiryModal } from "@/components/InquiryModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function VendorHomePage() {
  const { id } = useParams();
  const vendor = featuredVendors.find(v => v.id === id) || featuredVendors[0];
  const vendorProducts = b2bProducts.filter(p => p.vendorName === vendor.businessName || p.vendor === vendor.businessName);

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeInquiryProduct, setActiveInquiryProduct] = useState(null);

  const openInquiry = (prod) => {
    setActiveInquiryProduct(prod);
    setIsInquiryOpen(true);
  };

  const handleGeneralInquiry = () => {
    setActiveInquiryProduct(null);
    setIsInquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <VendorNavbar vendorId={id} onInquiry={handleGeneralInquiry} />

      {/* VENDOR HERO */}
      <section className="bg-white border-b border-slate-100 py-12 px-4 relative overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 h-64 w-64 bg-teal-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 bg-orange-500/5 rounded-full -ml-24 -mb-24 blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center gap-12 relative z-10">
           <div className="h-32 w-32 md:h-48 md:w-48 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-teal-400 font-extrabold text-5xl italic shadow-2xl relative transform -rotate-3 hover:rotate-0 transition-transform duration-700 p-2 border-4 border-white">
              {vendor.businessName[0]}
              <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-teal-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                 <ShieldCheck className="h-5 w-5 text-white" />
              </div>
           </div>
           
           <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-2">
                 <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">{vendor.businessName}</h1>
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                       <CheckCircle2 className="h-4 w-4" /> GST Verified Member
                    </span>
                    <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-100 flex items-center gap-2">
                       <Trophy className="h-4 w-4" /> Top Rated Seller
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-2">
                       <Clock className="h-4 w-4" /> 13 Years Plus
                    </span>
                 </div>
              </div>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl lowercase first-letter:uppercase">
                 Leading manufacturer and global exporter of premium quality {vendor.category.toLowerCase()} and high-end trade components for architects & interior design professionals.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                 <Button 
                   onClick={handleGeneralInquiry}
                   className="h-14 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-teal-500/20 active:scale-95 transition-all"
                 >
                    Send Inquiry Now
                 </Button>
                 <Button 
                    variant="outline" 
                    onClick={() => window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank')}
                    className="h-14 px-8 border-slate-200 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center gap-3"
                 >
                    <FileDown className="h-5 w-5" /> Download Brochure
                 </Button>
              </div>
           </div>
        </div>
      </section>

      {/* NEW: PRODUCT RANGE RIBBON (Market Standard) */}
      <section className="sticky top-20 z-40 bg-white border-b border-slate-100 shadow-sm hidden md:block">
         <div className="container mx-auto px-4 max-w-7xl h-14 flex items-center justify-between">
            <div className="flex items-center gap-8 h-full">
               <div className="bg-slate-900 h-full flex items-center px-6 text-teal-400 font-black text-[10px] uppercase tracking-[0.3em]">
                  Our Ranges
               </div>
               <nav className="flex items-center gap-6">
                  {["Acoustics", "Glasswork", "Hardware", "Materials", "Lighting"].map((cat) => (
                    <Link key={cat} href={`/vendor/${id}/products?category=${cat}`}>
                      <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-600 transition-colors">
                        {cat}
                      </button>
                    </Link>
                  ))}
               </nav>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 min-w-[300px]">
               <Search className="h-4 w-4 text-slate-300" />
               <input 
                 placeholder="Search in this store..." 
                 onKeyDown={(e) => { if (e.key === 'Enter') window.location.href = `/vendor/${id}/products?q=${e.currentTarget.value}`}}
                 className="bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-800 placeholder:text-slate-400 w-full"
               />
            </div>
         </div>
      </section>

      {/* DASHBOARD STATS (B2B Highlights) */}
      <section className="py-12 px-4 container mx-auto max-w-7xl">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Trust Score", value: "4.8", icon: ShieldCheck, color: "teal", detail: "Based on 240+ Reviews" },
              { label: "Response Rate", value: "96%", icon: TrendingUp, color: "orange", detail: "Fastest in Industry" },
              { label: "Market Export", value: "12+", icon: Globe, color: "blue", detail: "Across Global Hubs" },
              { label: "Design Awards", value: "05", icon: Award, color: "purple", detail: "Annual Interior Expo" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-teal-500/30 transition-all group cursor-pointer shadow-sm hover:translate-y-[-5px]">
                 <div className="flex items-center gap-4 mb-4">
                    <div className={`h-12 w-12 rounded-2xl bg-${stat.color}-500 flex items-center justify-center text-white shadow-lg shadow-${stat.color}-500/10`}>
                       <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-0.5">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</h4>
                       <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    </div>
                 </div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{stat.detail}</p>
              </div>
            ))}
         </div>
      </section>

      {/* MAIN STORE CONTENT */}
      <main className="flex-1 py-12 px-4 container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* SIDEBAR: Categories & Search */}
         <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-8 sticky top-32 shadow-sm">
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600">Site Search</h3>
                  <div className="relative">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                     <Input 
                       placeholder="Search products..." 
                       className="h-12 pl-12 rounded-xl border-slate-100 focus:border-teal-500/50 bg-slate-50/50"
                     />
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600">Our Categories</h3>
                  <nav className="flex flex-col gap-1">
                     {["Acoustics", "Glasswork", "Hardware", "Materials", "Lighting", "Furniture"].map((cat) => (
                       <Link key={cat} href={`/vendor/${id}/products?category=${cat}`}>
                          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-teal-50 text-sm font-bold text-slate-500 hover:text-teal-700 transition-all group">
                             {cat}
                             <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-teal-500" />
                          </button>
                       </Link>
                     ))}
                  </nav>
               </div>

               <div className="space-y-4 pt-6 border-t border-slate-50">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600">Company Point</h3>
                  <div className="space-y-4 text-xs font-bold text-slate-500">
                     <div className="flex gap-3"><MapPin className="h-4 w-4 text-slate-300 shrink-0" /> {vendor.city}, Gujarat</div>
                     <div className="flex gap-3"><Clock className="h-4 w-4 text-slate-300 shrink-0" /> MON - SAT (9AM - 8PM)</div>
                  </div>
               </div>
            </div>
         </aside>

         {/* PRODUCT CATALOG GRID */}
         <div className="lg:col-span-9 space-y-12">
            <div className="flex items-end justify-between border-b-4 border-white pb-6">
               <div className="space-y-1">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Catalog Showcase</h2>
                  <h3 className="text-3xl font-black text-slate-900 uppercase">Featured Products</h3>
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10 bg-white border-2 border-slate-100 rounded-xl text-teal-600 shadow-sm"><LayoutGrid className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 bg-white border-2 border-slate-100 rounded-xl text-slate-400 shadow-sm"><List className="h-4 w-4" /></Button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
               {(vendorProducts.length > 0 ? vendorProducts : b2bProducts).slice(0, 9).map((product, i) => (
                 <motion.div 
                   key={product.id + i}
                   whileHover={{ y: -8 }}
                   className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-teal-500/20 transition-all group flex flex-col h-full"
                 >
                    <div className="aspect-[4/3] overflow-hidden relative">
                       <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.title} />
                       <div className="absolute top-4 right-4 h-9 w-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 cursor-pointer transition-colors shadow-lg">
                          <Heart className="h-4 w-4" />
                       </div>
                       <Button 
                        onClick={() => openInquiry(product)}
                        className="absolute bottom-4 left-4 right-4 h-10 bg-teal-600/90 backdrop-blur text-white font-black text-[10px] uppercase tracking-widest rounded-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-xl"
                       >
                          Get Latest Price
                       </Button>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                       <Link href={`/product/${product.id}`}>
                          <h4 className="font-extrabold text-slate-900 leading-tight group-hover:text-teal-600 transition-colors uppercase tracking-tight line-clamp-2 min-h-[3rem]">
                             {product.title}
                          </h4>
                       </Link>
                       <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                          <span className="text-xl font-black text-slate-900">{product.price}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{vendor.city} Deals</span>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>

            {/* VIDEO SHOWCASE SECTION */}
            <div className="space-y-8 pt-12">
               <div className="space-y-1">
                  <h2 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em]">Product in Action</h2>
                  <h3 className="text-2xl font-black text-slate-900 uppercase">Video Demonstrations</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Manufacturing Process", thumb: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" },
                    { title: "Product Installation Guide", thumb: "https://images.unsplash.com/photo-1541888941-2c0272922cc0" }
                  ].map((vid, i) => (
                    <div key={i} className="aspect-video bg-slate-900 rounded-[2rem] overflow-hidden relative group cursor-pointer border border-slate-100">
                       <img src={vid.thumb} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                          <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                             <Play className="h-6 w-6 text-white fill-white ml-1" />
                          </div>
                          <p className="text-[10px] font-black text-white uppercase tracking-widest bg-black/40 px-4 py-1.5 rounded-full border border-white/10">{vid.title}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* RATINGS & REVIEWS SECTION */}
            <div className="space-y-8 pt-12">
               <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col items-center gap-2 px-8 border-r-0 md:border-r border-slate-100 min-w-[200px]">
                     <div className="text-5xl font-black text-slate-900 tracking-tighter">4.1</div>
                     <div className="flex items-center gap-1 text-orange-400">
                        {[1,2,3,4].map(s => <Star key={s} className="h-4 w-4 fill-orange-400" />)}
                        <Star className="h-4 w-4 fill-slate-100 text-slate-100" />
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-2">240+ Verified Reviews</p>
                  </div>

                  <div className="flex-1 space-y-3 w-full max-w-md">
                     {[
                       { stars: 5, perc: 75, color: "teal" },
                       { stars: 4, perc: 15, color: "teal" },
                       { stars: 3, perc: 5, color: "slate" },
                       { stars: 2, perc: 3, color: "slate" },
                       { stars: 1, perc: 2, color: "slate" }
                     ].map((row) => (
                       <div key={row.stars} className="flex items-center gap-4 group/bar">
                          <span className="text-[10px] font-black text-slate-400 w-4">{row.stars}</span>
                          <Star className="h-3 w-3 text-orange-400 fill-orange-400" />
                          <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                             <div 
                               className={`h-full bg-teal-500 rounded-full transition-all duration-1000 group-hover/bar:bg-orange-500`}
                               style={{ width: `${row.perc}%` }}
                             />
                          </div>
                          <span className="text-[10px] font-black text-slate-400 w-8">{row.perc}%</span>
                       </div>
                     ))}
                  </div>

                  <div className="flex flex-col items-center gap-4 px-8 border-l-0 md:border-l border-slate-100 min-w-[240px]">
                     <div className="space-y-1 text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none pb-2">User Satisfaction</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tight uppercase">94% <span className="text-emerald-500">Positive</span></p>
                     </div>
                     <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-500 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest w-full hover:bg-slate-50">Rate This Vendor</Button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { user: "Ar. Sameer Shah", date: "Feb, 24", text: "Exceptional quality of materials. We used their fixtures for our recent corporate project in Mumbai.", rating: 5 },
                    { user: "Manoj Kumar", date: "Jan, 24", text: "Fast delivery and great customer support. The pricing is very competitive for the bulk orders.", rating: 4 }
                  ].map((rev, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 space-y-4 hover:shadow-xl transition-all">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xs uppercase italic">{rev.user[0]}</div>
                             <div className="space-y-0.5">
                                <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{rev.user}</p>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{rev.date}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-0.5 text-orange-400">
                             {[...Array(rev.rating)].map((_, i) => <Star key={i} className="h-2 w-2 fill-orange-400" />)}
                          </div>
                       </div>
                       <p className="text-sm text-slate-500 font-medium italic leading-relaxed">"{rev.text}"</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex justify-center pt-8">
               <Link href={`/vendor/${id}/products`}>
                  <Button variant="outline" className="h-14 px-12 border-2 border-slate-100 text-slate-500 hover:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white shadow-sm transition-all flex items-center gap-4">
                     Explore Full Catalog <ArrowRight className="h-4 w-4" />
                  </Button>
               </Link>
            </div>
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
