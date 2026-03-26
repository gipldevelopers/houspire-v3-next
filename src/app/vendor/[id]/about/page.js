"use client";

import { useParams } from "next/navigation";
import { 
  Building2, Phone, Mail, MapPin, 
  CheckCircle2, Star, Clock, FileText, 
  Globe, ShieldCheck, Award, Trophy,
  Users, Briefcase, Factory, GraduationCap
} from "lucide-react";
import { featuredVendors } from "@/lib/mock-data";
import { VendorNavbar } from "@/components/VendorNavbar";
import { VendorFooter } from "@/components/VendorFooter";
import { InquiryModal } from "@/components/InquiryModal";
import { motion } from "framer-motion";
import { useState } from "react";

const FactItem = ({ label, value, sub }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-2 group hover:border-teal-500/30 transition-all">
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-teal-600 transition-colors">{label}</p>
    <p className="text-3xl font-black text-slate-900 tracking-tight uppercase">{value}</p>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
  </div>
);

export default function VendorAboutPage() {
  const { id } = useParams();
  const vendor = featuredVendors.find(v => v.id === id) || featuredVendors[0];
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <VendorNavbar vendorId={id} onInquiry={() => setIsInquiryOpen(true)} />

      {/* Profile Header */}
      <section className="bg-slate-900 py-24 px-4 relative overflow-hidden text-center md:text-left">
         <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none" />
         <div className="container mx-auto max-w-7xl relative z-10 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-teal-500/30">
                 Company Profile
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
                Who is <span className="text-teal-400">{vendor.businessName}</span>?
              </h1>
              <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed italic first-letter:uppercase">
                "Defining Excellence in {vendor.category.toLowerCase()} and High-End Architecture Solutions Since 2011."
              </p>
            </div>
         </div>
      </section>

      {/* Grid of Facts */}
      <section className="py-12 px-4 container mx-auto max-w-7xl -mt-16 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FactItem label="Experience" value="13+ YRS" sub="Established 2011" />
            <FactItem label="Business Type" value="MFG / EXP" sub="Global Presence" />
            <FactItem label="Workforce" value="50-100" sub="Dedicated Experts" />
            <FactItem label="Primary Market" value={vendor.city} sub="Domestic & Export" />
         </div>
      </section>

      {/* Company Biography Section */}
      <main className="py-20 px-4 container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16">
         <div className="lg:col-span-12 space-y-12 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div className="space-y-8">
                  <div className="space-y-2">
                     <h2 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em]">Establishment</h2>
                     <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Company Overview</h3>
                  </div>
                  <div className="space-y-6 text-slate-500 font-medium leading-[2] text-sm md:text-base">
                     <p>
                        <span className="text-slate-900 font-black uppercase">{vendor.businessName}</span> is a premier provider in the B2B interior landscape, focusing on high-performance trade solutions. With over a decade of hands-on experience in manufacturing {vendor.category.toLowerCase()}, we serve as a critical bridge between architectural intent and material reality.
                     </p>
                     <p>
                        Our state-of-the-art facility in {vendor.city} spans several thousand square feet, equipped with advanced CNC machinery and a dedicated R&D wing. We don't just supply products; we engineer solutions that fit the unique needs of institutional, hospitality, and residential luxury projects.
                     </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-50">
                     <div className="space-y-2">
                        <div className="flex items-center gap-2 text-teal-600">
                           <ShieldCheck className="h-5 w-5" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">GST Number</span>
                        </div>
                        <p className="text-sm font-bold text-slate-400">24AXXXXXXXXXX1Z5</p>
                     </div>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2 text-orange-600">
                           <Building2 className="h-5 w-5" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Entity Type</span>
                        </div>
                        <p className="text-sm font-bold text-slate-400">Sole Proprietorship</p>
                     </div>
                  </div>
               </div>

               <div className="relative group overflow-hidden rounded-[3rem] aspect-[4/5]">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt="Production Line" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-bottom p-10 flex-col justify-end gap-2">
                     <h4 className="text-xl font-black text-white italic uppercase">Our Manufacturing Vision</h4>
                     <p className="text-slate-300 text-xs font-bold leading-relaxed max-w-xs">{vendor.city} Unit: 2,400 Sq. Ft Production Hub</p>
                  </div>
               </div>
            </div>

            {/* Credential Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 border-t border-slate-50 text-center">
               {[
                 { title: "Statutory Info", items: ["GST Verified Member", "MSME Registered", "Trade License Approved"], icon: FileText },
                 { title: "Quality Control", items: ["QC Team (5 Experts)", "Batch Testing", "Material Certification"], icon: CheckCircle2 },
                 { title: "Awards & Recognition", items: ["Top Rated Supplier 2025", "Houspire Verified Badge", "12+ Major Projects"], icon: Award }
               ].map((card, i) => (
                 <div key={i} className="space-y-6">
                    <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-teal-600">
                       <card.icon className="h-7 w-7" />
                    </div>
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{card.title}</h4>
                    <ul className="space-y-3">
                       {card.items.map(item => (
                         <li key={item} className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item}</li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>
         </div>
      </main>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-1/4 h-full w-[2px] bg-white/5" />
         <div className="absolute top-0 left-1/4 h-full w-[2px] bg-white/5" />
         
         <div className="container mx-auto max-w-7xl space-y-20 relative z-10">
            <div className="text-center space-y-4">
               <h2 className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em]">Vendor Strengths</h2>
               <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Our Core Values</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: "Technical Precision", detail: "Advanced CNC and laser cutting for flawless finishes in industry production." },
                 { title: "Rapid Turnaround", detail: "Efficient supply chain management ensuring delivery in under 10-15 business days." },
                 { title: "Custom Engineering", detail: "Modular solutions tailored to specific architectural drawings and site requirements." }
               ].map((val, i) => (
                 <div key={i} className="space-y-6 text-center group">
                    <div className="h-20 w-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                       <span className="text-2xl font-black italic">0{i+1}</span>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-xl font-black text-white uppercase italic tracking-tight">{val.title}</h4>
                       <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs mx-auto text-center first-letter:uppercase lowercase">{val.detail}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <VendorFooter vendorId={id} />
      <InquiryModal isOpen={isInquiryOpen} onOpenChange={setIsInquiryOpen} />
    </div>
  );
}
