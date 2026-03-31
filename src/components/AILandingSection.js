"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Wand2, Search, Zap, Crosshair } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function AILandingSection() {
  return (
    <div className="space-y-24 py-16">
      {/* AI Hero Section */}
      <section className="container mx-auto px-4 max-w-7xl animate-in fade-in slide-in-from-bottom-8 duration-700">
         <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden group">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                     <Sparkles className="h-4 w-4 text-teal-400" />
                     <span className="text-[10px] font-black tracking-widest text-teal-400 uppercase">Houspire AI Vision</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter uppercase">
                     Design Your Room with <span className="text-teal-400">AI</span> + Real Products
                  </h2>
                  
                  <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-lg lowercase first-letter:uppercase italic">
                     Upload your room and get real furniture recommendations or let 3,200+ verified vendors compete to place their products in your space.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                     <Button asChild className="h-16 px-8 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black uppercase text-sm tracking-widest shadow-2xl shadow-teal-600/30 w-full sm:w-auto gap-3">
                        <Link href="/customer/design">
                           Upload Room Photo <ArrowRight className="h-4 w-4" />
                        </Link>
                     </Button>
                     <Button asChild variant="outline" className="h-16 px-8 rounded-2xl border-white/20 text-white bg-transparent hover:bg-white/10 font-black uppercase text-sm tracking-widest w-full sm:w-auto">
                        <Link href="/search">
                           Explore Designs
                        </Link>
                     </Button>
                  </div>
               </div>

               <div className="relative">
                  {/* Decorative images showing before/after */}
                  <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-slate-800 relative z-20 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                     <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop" className="w-full h-full object-cover" />
                     <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur px-4 py-2 text-white font-black text-[10px] uppercase tracking-widest rounded-xl border border-white/10">Analysis Complete</div>
                  </div>
                  
                  {/* Floating Elements representing AI detection */}
                  <div className="absolute -left-6 top-1/4 bg-white p-4 rounded-2xl shadow-2xl z-30 animate-bounce delay-100 hidden md:flex items-center gap-3 border border-slate-100">
                     <div className="h-10 w-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center"><Search className="h-5 w-5" /></div>
                     <div>
                        <p className="font-extrabold text-slate-800 text-xs">Modern Sofa</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">94% Match</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* How it Works Section */}
      <section className="container mx-auto px-4 max-w-7xl">
         <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">How the Magic Works</h2>
            <p className="text-slate-500 font-medium text-lg">Three simple steps to re-imagine your empty or outdated space.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-0 w-full h-1 bg-slate-100 hidden md:block -z-10" />
            
            {[
               { icon: Wand2, title: "1. Upload Photo", desc: "Snap a picture of your room. Our AI instantly maps the 3D space and detects existing structural elements, lighting, and style.", color: "bg-blue-50 text-blue-600" },
               { icon: Crosshair, title: "2. Visual Extraction", desc: "We identify all items in the room. You can replace specific objects out or redesign the entire space from scratch with real products.", color: "bg-orange-50 text-orange-600" },
               { icon: Zap, title: "3. Direct Placement", desc: "Choose Browse mode to buy instantly, or start a Live Auction where 3,200+ vendors bid to render their products perfectly in your room.", color: "bg-teal-50 text-teal-600" }
            ].map((step, i) => (
               <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative">
                  <div className={`h-24 w-24 rounded-full ${step.color} flex items-center justify-center mb-8 mx-auto shadow-inner`}>
                     <step.icon className="h-10 w-10" />
                  </div>
                  <div className="text-center space-y-4">
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{step.title}</h3>
                     <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20 border-y">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
               <div className="space-y-4 max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Loved by Homeowners</h2>
                  <p className="text-slate-500 font-medium text-lg">See how people are using AI and Live Auctions to save money and design faster.</p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                  { text: "I uploaded my empty living room. Within 2 hours, I had 4 different vendors render their sofas into my space with price quotes. Mind-blowing.", author: "Priya M.", role: "Homeowner, Mumbai" },
                  { text: "The AI extracted my old ugly coffee table from the photo and showed me 10 modern alternatives that perfectly fit the exact same spot.", author: "Rahul S.", role: "Apartment Renter, Bangalore" },
                  { text: "We ran an auction for our entire master bedroom setup. Getting visual proposals from top brands directly saved us weeks of showroom visits.", author: "Sneha & Vikram", role: "Villa Owners, Pune" },
               ].map((test, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 space-y-6 hover:border-teal-500/30 transition-all">
                     <div className="flex gap-1 text-orange-400">
                        {[1,2,3,4,5].map(s => <Sparkles key={s} className="h-4 w-4 fill-orange-400" />)}
                     </div>
                     <p className="text-slate-600 font-bold italic text-lg leading-relaxed">"{test.text}"</p>
                     <div className="pt-6 border-t border-slate-50 flex items-center gap-4">
                        <div className="h-12 w-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-black italic">{test.author[0]}</div>
                        <div>
                           <p className="font-black text-slate-900 uppercase tracking-tight">{test.author}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{test.role}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
