"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { 
  Menu, X, Phone, Mail, MapPin, 
  ChevronDown, Search, ShieldCheck, Star, Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { featuredVendors } from "@/lib/mock-data";

export function VendorNavbar({ vendorId, onInquiry }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const vendor = featuredVendors.find(v => v.id === vendorId) || featuredVendors[0];

  const handleInquiry = () => {
    setMobileOpen(false);
    if (onInquiry) onInquiry();
  };

  const navLinks = [
    { label: "Home", href: `/vendor/${vendorId}` },
    { label: "Products", href: `/vendor/${vendorId}/products` },
    { label: "Profile", href: `/vendor/${vendorId}/about` },
    { label: "Contact Us", href: `/vendor/${vendorId}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Mini Bar */}
        <div className="hidden md:flex items-center justify-between py-2 border-b border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> +91-XXXXXXXXXX</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {vendor.city}, India</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-teal-600 flex items-center gap-1"><ShieldCheck className="h-3 w-3 fill-teal-50" /> GST Verified Member</span>
           </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between h-20 gap-8">
           <Link href={`/vendor/${vendorId}`} className="flex items-center gap-4 group">
              <div className="h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center text-teal-400 font-extrabold text-2xl italic group-hover:rotate-6 transition-transform">
                 {vendor.businessName[0]}
              </div>
              <div className="flex flex-col">
                 <h1 className="text-lg font-black text-slate-900 leading-none uppercase tracking-tight">{vendor.businessName}</h1>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Verified Premium Supplier</p>
              </div>
           </Link>

           <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-teal-600 ${pathname === link.href ? 'text-teal-600 border-b-2 border-teal-500 pb-1' : 'text-slate-500'}`}
                >
                  {link.label}
                </Link>
              ))}
           </nav>

           <div className="hidden md:flex items-center gap-4">
              <Button 
                onClick={onInquiry}
                className="h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-black text-xs uppercase tracking-widest px-6 shadow-lg shadow-teal-500/10"
              >
                 Send Inquiry
              </Button>
           </div>

           <button 
             className="lg:hidden p-2 text-slate-600"
             onClick={() => setMobileOpen(!mobileOpen)}
           >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
           </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-50 bg-white p-6 space-y-4 animate-in fade-in slide-in-from-top-2">
           {navLinks.map((link) => (
             <Link 
               key={link.label} 
               href={link.href}
               onClick={() => setMobileOpen(false)}
               className="block text-sm font-black text-slate-700 uppercase tracking-widest py-2 border-b border-slate-50 last:border-0"
             >
               {link.label}
             </Link>
           ))}
           <Button onClick={handleInquiry} className="w-full h-12 bg-teal-600 text-white font-black rounded-xl text-xs uppercase tracking-widest">Send Inquiry</Button>
        </div>
      )}
    </header>
  );
}
