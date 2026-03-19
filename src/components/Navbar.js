"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Menu, 
  X, 
  MapPin, 
  ChevronDown, 
  Camera, 
  HelpCircle, 
  UserCircle,
  LogIn,
  UserPlus
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-50 bg-primary/95 text-primary-foreground backdrop-blur-md border-b border-primary/20 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Main Desktop Header */}
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 min-w-fit">
            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center shadow-inner">
              <span className="text-accent-foreground font-black text-xl">H</span>
            </div>
            <div className="flex flex-col -gap-1">
              <span className="font-black text-2xl tracking-tighter leading-none">Houspire</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-80">Suppliers Hub</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-3xl items-stretch bg-white rounded-lg shadow-sm overflow-hidden h-12">
            <div className="flex items-center gap-2 px-4 border-r border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors shrink-0 group">
              <MapPin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-gray-700">Ahmedabad</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
            
            <div className="flex-1 flex items-center relative group">
              <Input 
                type="text" 
                placeholder="Enter product / service to search"
                className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 placeholder:text-gray-400 h-full text-base"
              />
              <div className="absolute right-3 flex items-center gap-2">
                <button title="Identify product via photo" className="p-1 hover:bg-gray-100 rounded-full transition-colors group/cam">
                  <Camera className="h-5 w-5 text-gray-400 group-hover/cam:text-accent" />
                </button>
              </div>
            </div>

            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 flex items-center gap-2 font-bold transition-all active:scale-95 group">
              <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Search</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1 xl:gap-2">
              <NavIconItem icon={LogIn} label="Vendor Login" href="/dashboard" />
              <NavIconItem icon={HelpCircle} label="Help" href="/help" />
              <NavIconItem icon={UserCircle} label="Sign In" href="/signin" isLast />
            </div>

            <Link href="/vendor-register" className="hidden xl:block">
              <Button variant="outline" className="bg-white hover:bg-white/90 text-primary border-transparent font-bold px-6 shadow-sm whitespace-nowrap">
                Vendor Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg bg-white/10 border border-white/10 text-white active:scale-95 transition-all" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4 px-1">
          <div className="flex items-stretch bg-white rounded-lg shadow-sm overflow-hidden h-11 w-full">
            <div className="flex items-center px-3 border-r border-gray-100 shrink-0">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <Input 
              type="text" 
              placeholder="Search products..."
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 h-full text-sm"
            />
            <button className="bg-accent text-accent-foreground px-4 flex items-center transition-all">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-primary/20 bg-primary/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="container mx-auto p-6 grid grid-cols-2 gap-4">
            <MobileNavItem icon={LogIn} label="Vendor Login" href="/dashboard" />
            <MobileNavItem icon={UserPlus} label="Vendor Register" href="/vendor-register" />
            <MobileNavItem icon={HelpCircle} label="Help" href="/help" />
            <MobileNavItem icon={UserCircle} label="Sign In" href="/signin" />
            <div className="col-span-2 pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link href="/vendor-register" onClick={() => setMobileOpen(false)}>
                <Button className="w-full h-12 text-base font-bold shadow-lg">Register as Vendor</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavIconItem({ icon: Icon, label, href, isLast = false }) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center gap-1 px-3 py-2 hover:bg-white/10 rounded-lg transition-all group shrink-0 ${isLast ? 'pr-0' : ''}`}
    >
      <div className="relative">
        <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300 stroke-[1.5px]" />
      </div>
      <span className="text-[10px] font-bold text-center opacity-90 group-hover:opacity-100 truncate w-full max-w-[80px]">
        {label}
        {isLast && <ChevronDown className="inline-block h-2 w-2 ml-1 opacity-50 font-normal mt-[-2px]" />}
      </span>
    </Link>
  );
}

function MobileNavItem({ icon: Icon, label, href }) {
  return (
    <Link 
      href={href} 
      className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 active:scale-95 transition-all text-white gap-2"
    >
      <Icon className="h-7 w-7" />
      <span className="text-xs font-bold">{label}</span>
    </Link>
  );
}
