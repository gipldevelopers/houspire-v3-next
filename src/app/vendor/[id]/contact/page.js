"use client";

import { useParams } from "next/navigation";
import { 
  Building2, Phone, Mail, MapPin, 
  CheckCircle2, Star, Clock, FileText, 
  Globe, ShieldCheck, MessageCircle, Send,
  Instagram, Linkedin, Twitter, Facebook,
  ArrowUpRight, Share2, Printer, Map,
  Verified, Users, Handshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { featuredVendors } from "@/lib/mock-data";
import { VendorNavbar } from "@/components/VendorNavbar";
import { VendorFooter } from "@/components/VendorFooter";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { InquiryModal } from "@/components/InquiryModal"; // Assuming InquiryModal is in components

export default function VendorContactPage() {
  const { id } = useParams();
  const vendor = featuredVendors.find(v => v.id === id || (v.businessName && v.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === id)) || featuredVendors[0];
  const [isSent, setIsSent] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <VendorNavbar vendorId={id} onInquiry={() => setIsInquiryOpen(true)} />

      {/* MINIMAL HERO SECTION */}
      <section className="bg-slate-900 overflow-hidden relative border-b border-teal-500/20">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600')] opacity-10 bg-cover bg-center" />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
         
         <div className="container mx-auto max-w-7xl px-4 py-24 relative z-10">
            <div className="max-w-3xl space-y-6">
               <div className="inline-flex items-center gap-2 bg-teal-500/20 px-4 py-1.5 rounded-full border border-teal-500/30">
                  <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-teal-400 tracking-[0.2em]">Ready to Collaborate</span>
               </div>
               <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase grayscale hover:grayscale-0 transition-all duration-1000">
                  Direct <span className="text-teal-400">Communication</span> Hub
               </h1>
               <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl lowercase first-letter:uppercase italic">
                 Eliminate middle-men and connect directly with {vendor.businessName}'s trade experts for bulk quotes and architectural project consultations.
               </p>
            </div>
         </div>
      </section>

      {/* MAIN INTERACTIVE CONTACT SECTION */}
      <main className="flex-1 py-12 px-4 container mx-auto max-w-7xl">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: HIGH-SPEC INQUIRY FORM */}
            <div className="lg:col-span-12 xl:col-span-8">
               <div className="bg-white p-8 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-2xl space-y-12 relative overflow-hidden group">
                  {/* Design Accent */}
                  <div className="absolute bottom-0 right-0 h-64 w-64 bg-teal-500/5 rounded-full blur-3xl -mr-32 -mb-32 group-hover:bg-teal-500/10 transition-colors" />

                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-slate-50 pb-10">
                     <div className="space-y-2">
                        <h2 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em]">Official Point</h2>
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Business Requirement Form</h3>
                     </div>
                     <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 text-emerald-600">
                        <ShieldCheck className="h-5 w-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Indiamart Level Trust</span>
                     </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">Your Identity</label>
                           <Input placeholder="Ar. Full Name" className="h-16 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-1 focus:ring-teal-500/20 transition-all font-bold text-slate-900" required />
                        </div>
                        <div className="group space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">Work Point Email</label>
                           <Input type="email" placeholder="contact@studio.com" className="h-16 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-1 focus:ring-teal-500/20 transition-all font-bold text-slate-900" required />
                        </div>
                        <div className="group space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">Connected Number</label>
                           <div className="relative">
                              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-teal-600 border-r border-slate-200 pr-3">+91</span>
                              <Input type="tel" placeholder="00000 00000" className="h-16 pl-20 pr-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-1 focus:ring-teal-500/20 transition-all font-bold text-slate-900" required />
                           </div>
                        </div>
                        <div className="group space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">Dispatch City</label>
                           <Input placeholder="Project Location..." className="h-16 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-1 focus:ring-teal-500/20 transition-all font-bold text-slate-900" required />
                        </div>
                     </div>

                     <div className="group space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-teal-600 transition-colors">Requirement Points</label>
                        <Textarea placeholder="Quantity, specific materials, or trade certification required..." className="min-h-[140px] px-6 py-6 rounded-[2rem] border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-medium text-slate-700 resize-none text-base" required />
                     </div>

                     <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex flex-col gap-2">
                           <p className="text-[10px] text-slate-400 font-bold max-w-sm italic leading-relaxed uppercase tracking-widest">
                              Powered by Houspire DirectConnect Architecture
                           </p>
                        </div>
                        <Button className="h-16 px-12 bg-teal-600 hover:bg-teal-700 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-teal-500/30 active:scale-95 group transition-all w-full md:w-auto overflow-hidden">
                           <AnimatePresence mode="wait">
                              {isSent ? (
                                 <motion.div key="sent" initial={{ y: 20 }} animate={{ y: 0 }} className="flex items-center gap-3">
                                    Inquiry Dispatched <CheckCircle2 className="h-4 w-4" />
                                 </motion.div>
                              ) : (
                                 <motion.div key="send" initial={{ y: 0 }} className="flex items-center gap-3">
                                    Secure Lead Send <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </Button>
                     </div>
                  </form>
               </div>
            </div>

            {/* RIGHT: VENDOR DASHBOARD CARDS */}
            <div className="lg:col-span-12 xl:col-span-4 space-y-6">
               
               {/* PRIMARY CONTACT WIDGET */}
               <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl p-8 space-y-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-teal-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-teal-500/10 transition-colors" />
                  
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em]">Official Credentials</h4>
                     <div className="space-y-6">
                        <div className="flex gap-4">
                           <div className="h-14 w-14 bg-slate-900 rounded-2xl shrink-0 flex items-center justify-center text-teal-400 shadow-lg group-hover:rotate-6 transition-transform">
                              <MapPin className="h-6 w-6" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Primary Office</p>
                              <p className="text-base font-black text-slate-800 leading-tight uppercase tracking-tight">{vendor.city}, Gujarat</p>
                              <p className="text-xs font-bold text-slate-400">104 Trade Avenue, Center Point</p>
                           </div>
                        </div>

                        <div className="flex gap-4">
                           <div className="h-14 w-14 bg-slate-900 rounded-2xl shrink-0 flex items-center justify-center text-teal-400 shadow-lg group-hover:-rotate-3 transition-transform">
                              <Phone className="h-6 w-6" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Direct Line</p>
                              <p className="text-base font-black text-slate-800 leading-tight">+91-9988-7766-55</p>
                              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">Mon-Sat (9AM-8PM)</p>
                           </div>
                        </div>

                        <div className="flex gap-4">
                           <div className="h-14 w-14 bg-slate-900 rounded-2xl shrink-0 flex items-center justify-center text-teal-400 shadow-lg group-hover:scale-110 transition-transform">
                              <MessageCircle className="h-6 w-6" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Instant Reach</p>
                              <p className="text-base font-black text-slate-800 leading-tight uppercase tracking-tight">WhatsApp Sourcing</p>
                              <Button variant="ghost" className="h-8 px-0 text-teal-600 hover:text-teal-700 font-black text-[10px] uppercase tracking-widest gap-2 flex items-center group/btn">
                                 Open Whatsapp <ArrowUpRight className="h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </Button>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                     <div className="flex items-center gap-1 text-orange-400">
                        {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-orange-400" />)}
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">4.8 Vendor Rating</span>
                  </div>
               </div>

               {/* TRUST & SOCIAL INTEGRATION */}
               <div className="bg-slate-900 rounded-[3rem] p-8 space-y-8 shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent" />
                  
                  <div className="relative z-10 space-y-6">
                     <h4 className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em]">Sourcing Hubs</h4>
                     <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: "LinkedIn", icon: Linkedin },
                          { name: "Facebook", icon: Facebook },
                          { name: "Instagram", icon: Instagram },
                          { name: "Houspire", icon: ShieldCheck }
                        ].map((soc, i) => (
                           <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer group/soc shadow-sm">
                              <soc.icon className="h-4 w-4 text-teal-400 group-hover/soc:scale-110 transition-transform" />
                              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{soc.name}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="relative z-10 pt-8 border-t border-white/5 space-y-4">
                     <div className="flex items-center gap-3">
                        <Verified className="h-5 w-5 text-teal-400" />
                        <span className="text-[10px] font-black uppercase text-white tracking-[0.2em]">Verified B2B Entity</span>
                     </div>
                     <p className="text-[10px] text-slate-500 font-bold leading-relaxed lowercase first-letter:uppercase">Trade Member since 2011. Specialized in high-volume trade-contracting and luxury material supply across Pan-India hubs.</p>
                  </div>
               </div>

               {/* QUICK ACTIONS */}
               <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-14 rounded-2xl border-slate-200 text-slate-500 font-black text-[10px] uppercase gap-2 hover:bg-white shadow-sm">
                     <Share2 className="h-4 w-4 text-slate-300" /> Share Store
                  </Button>
                  <Button variant="outline" className="h-14 rounded-2xl border-slate-200 text-slate-500 font-black text-[10px] uppercase gap-2 hover:bg-white shadow-sm">
                     <Printer className="h-4 w-4 text-slate-300" /> Print Spec
                  </Button>
               </div>

            </div>

         </div>
      </main>

      <VendorFooter vendorId={id} />
    </div>
  );
}
