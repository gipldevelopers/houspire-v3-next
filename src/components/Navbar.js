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
  UserPlus,
  SearchIcon,
  ShoppingBag,
  Store
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { AuthModal } from "@/components/AuthModal";

// Sample list of major Indian cities
const INDIAN_CITIES = [
  "Ahmedabad", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
  "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", 
  "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", 
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi", 
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", 
  "Ranchi", "Howrah", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", 
  "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad", "Bareilly", 
  "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar"
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [citySearch, setCitySearch] = useState("");
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("user");

  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAdmin = pathname?.startsWith("/admin");
  const isSignIn = pathname?.startsWith("/signin");

  const openAuth = (tab) => {
    setAuthTab(tab);
    setIsAuthOpen(true);
    setMobileOpen(false);
  };

  // Filter cities based on search input
  const filteredCities = useMemo(() => {
    return INDIAN_CITIES.filter(city => 
      city.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [citySearch]);

  if (isDashboard || isAdmin || isSignIn) return null;

  return (
    <header className="sticky top-0 z-50 bg-primary/95 text-primary-foreground backdrop-blur-md border-b border-primary/20 shadow-lg">
      <div className="container mx-auto px-4 text-white">
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
          <div className="hidden lg:flex flex-1 max-w-3xl items-stretch bg-white rounded-lg shadow-sm h-12 relative">
            
            {/* City Selector */}
            <div className="relative border-r border-gray-100 min-w-[160px]">
              <div 
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center justify-between h-full px-4 cursor-pointer hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-2">
                   <MapPin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                   <span className="text-sm font-semibold text-gray-700 truncate max-w-[100px]">{selectedCity}</span>
                </div>
                <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* City Dropdown Menu */}
              {cityDropdownOpen && (
                <div className="absolute top-[110%] left-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-2 border-b border-gray-50">
                    <div className="relative">
                       <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                       <Input 
                         autoFocus
                         placeholder="Search city..." 
                         className="h-9 pl-9 text-gray-800 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
                         value={citySearch}
                         onChange={(e) => setCitySearch(e.target.value)}
                       />
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar py-1">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <button
                          key={city}
                          onClick={() => {
                            setSelectedCity(city);
                            setCityDropdownOpen(false);
                            setCitySearch("");
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-between"
                        >
                          {city}
                          {selectedCity === city && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-xs text-gray-400 text-center">No cities found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Main Search Input */}
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
               <button 
                 onClick={() => openAuth("vendor")}
                 className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-white/10 rounded-lg transition-all group shrink-0"
               >
                 <Store className="h-6 w-6 group-hover:scale-110 transition-transform duration-300 stroke-[1.5px]" />
                 <span className="text-[10px] font-bold text-center opacity-90 group-hover:opacity-100 truncate w-full max-w-[80px]">Sell</span>
               </button>
               <Link 
                 href="/help" 
                 className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-white/10 rounded-lg transition-all group shrink-0"
               >
                 <HelpCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300 stroke-[1.5px]" />
                 <span className="text-[10px] font-bold text-center opacity-90 group-hover:opacity-100 truncate w-full max-w-[80px]">Help</span>
               </Link>
               <button 
                 onClick={() => openAuth("user")}
                 className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-white/10 rounded-lg transition-all group shrink-0"
               >
                 <UserCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300 stroke-[1.5px]" />
                 <span className="text-[10px] font-bold text-center opacity-90 group-hover:opacity-100 truncate w-full max-w-[80px]">Sign In</span>
               </button>
            </div>

            <Link href="/vendor-register" className="hidden xl:block">
              <Button variant="outline" className="bg-white hover:bg-white/90 text-primary border-transparent font-bold px-6 shadow-sm whitespace-nowrap rounded-xl">
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
               placeholder={`Search in ${selectedCity}...`}
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
        <div className="lg:hidden border-t border-primary/20 bg-primary/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden">
          <div className="container mx-auto p-6 grid grid-cols-2 gap-4">
            <MobileNavItem onClick={() => openAuth("vendor")} icon={Store} label="Sell" />
            <MobileNavItem href="/help" icon={HelpCircle} label="HelpCenter" />
            <MobileNavItem onClick={() => openAuth("user")} icon={UserCircle} label="Sign In" />
            <MobileNavItem href="/vendor-register" icon={UserPlus} label="Register" />
            <div className="col-span-2 pt-4 border-t border-white/10 flex flex-col gap-3">
               <Link href="/vendor-register" className="w-full" onClick={() => setMobileOpen(false)}>
                 <Button className="w-full h-12 text-base font-black shadow-lg rounded-2xl bg-accent text-accent-foreground">Sell on Houspire</Button>
               </Link>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal Integration */}
      <AuthModal 
         isOpen={isAuthOpen} 
         onOpenChange={setIsAuthOpen} 
         defaultTab={authTab} 
      />
    </header>
  );
}

function MobileNavItem({ icon: Icon, label, href, onClick }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 active:scale-95 transition-all text-white gap-2 w-full">
      <Icon className="h-7 w-7 stroke-[1.5px]" />
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );

  if (onClick) {
    return <button onClick={onClick} className="w-full text-center">{content}</button>;
  }

  return <Link href={href || "#"} className="w-full">{content}</Link>;
}