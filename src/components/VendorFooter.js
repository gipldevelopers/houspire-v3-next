"use client";

import { 
  Phone, Mail, MapPin, Globe, Clock, ShieldCheck, 
  ExternalLink, Facebook, Twitter, Linkedin, Instagram 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { featuredVendors } from "@/lib/mock-data";

export function VendorFooter({ vendorId }) {
  const vendor = featuredVendors.find(v => v.id === vendorId) || featuredVendors[0];

  return (
    <footer className="bg-slate-900 text-white py-16 px-4">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {/* Company Info */}
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-extrabold text-xl italic">
                    {vendor.businessName[0]}
                 </div>
                 <h3 className="text-xl font-black text-white uppercase tracking-tight">{vendor.businessName}</h3>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs lowercase first-letter:uppercase">
                 Premium manufacturer and supplier of {vendor.category.toLowerCase()} based in {vendor.city}, Gujarat. We specialize in high-end trade solutions for architects and designers.
              </p>
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-teal-500 active:scale-95 transition-all text-white/50 hover:text-white cursor-pointer"><Facebook className="h-4 w-4" /></div>
                 <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-teal-500 active:scale-95 transition-all text-white/50 hover:text-white cursor-pointer"><Linkedin className="h-4 w-4" /></div>
              </div>
           </div>

           {/* Quick Hubs */}
           <div className="space-y-6 lg:pl-10">
              <h4 className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">Quick Hubs</h4>
              <nav className="flex flex-col gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
                 <Link href={`/vendor/${vendorId}`} className="hover:text-white transition-colors">Our Storefront</Link>
                 <Link href={`/vendor/${vendorId}/products`} className="hover:text-white transition-colors">Complete Catalog</Link>
                 <Link href={`/vendor/${vendorId}/about`} className="hover:text-white transition-colors">Get to know us</Link>
                 <Link href={`/vendor/${vendorId}/contact`} className="hover:text-white transition-colors">Office Location</Link>
              </nav>
           </div>

           {/* Contact Point */}
           <div className="space-y-6">
              <h4 className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">Office Point</h4>
              <div className="space-y-4 text-sm font-bold text-slate-400">
                 <div className="flex gap-3">
                    <MapPin className="h-4 w-4 text-teal-500 shrink-0" />
                    <span className="leading-relaxed">104, Trade Avenue, {vendor.city}, Gujarat - 380001, India</span>
                 </div>
                 <div className="flex gap-3 items-center">
                    <Phone className="h-4 w-4 text-teal-500 shrink-0" />
                    <span>+91 999 888 7777</span>
                 </div>
                 <div className="flex gap-3 items-center">
                    <Mail className="h-4 w-4 text-teal-500 shrink-0" />
                    <span className="lowercase">sales@{vendor.businessName.split(' ')[0].toLowerCase()}.com</span>
                 </div>
              </div>
           </div>

           {/* Trust Credentials */}
           <div className="space-y-6">
              <h4 className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">Credentials</h4>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-teal-400" />
                    <div className="space-y-0.5">
                       <p className="text-[10px] font-black uppercase text-teal-400 tracking-widest">GST Verified</p>
                       <p className="text-xs font-bold text-white uppercase tracking-tighter">24AXXXXXXXXXX1Z5</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    <Clock className="h-6 w-6 text-orange-400 font-bold" />
                    <div className="space-y-0.5">
                       <p className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Experience</p>
                       <p className="text-xs font-black text-white uppercase tracking-tighter">ESTD since 2011</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
           <p>© 2026 {vendor.businessName} • Powered by Houspire Suppliers Hub</p>
           <div className="flex items-center gap-8">
              <Link href="#" className="hover:text-white transition-colors">Member Agreement</Link>
              <Link href="#" className="hover:text-white transition-colors">Sourcing Policy</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
