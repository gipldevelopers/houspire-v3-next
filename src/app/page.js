"use client";

import { 
  Search, 
  ArrowRight, 
  MapPin, 
  Star, 
  Package, 
  ShieldCheck, 
  Building2,
  ShoppingCart,
  MessageSquare,
  Lock,
  Users,
  CheckCircle2,
  Phone,
  X,
  User,
  Navigation,
  ChevronRight,
  TrendingUp,
  Badge,
  Globe,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { VendorCard } from "@/components/VendorCard";
import { VerificationBadge } from "@/components/VerificationBadge";
import { featuredVendors, trendingProducts } from "@/lib/mock-data";
import { categoryShowcase, cities, cityImages, topCompanies, heroImg } from "@/lib/images";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AILandingSection } from "@/components/AILandingSection";
import { useState, useEffect, Fragment } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

const majorCategories = [
  {
    id: "furniture",
    title: "Furniture & Decor",
    mainImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop",
    topSubCategories: ["Living Room", "Office Furniture", "Bedroom Sets", "Dining Tables"],
    gridItems: [
      {
        title: "Sofa & Seating",
        image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=300&auto=format&fit=crop",
        items: ["L-Shaped Sofa", "Fabric Sofa Set", "Recliner Chairs"]
      },
      {
         title: "Office Solutions",
         image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=300&auto=format&fit=crop",
         items: ["Ergonomic Chairs", "Executive Desks", "Workstations"]
      },
      {
         title: "Storage Units",
         image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=300&auto=format&fit=crop",
         items: ["Wardrobes", "Bookshelves", "TV Units"]
      },
      {
         title: "Dining & Kitchen",
         image: "/images/categories/dining_kitchen.png",
         items: ["Dining Table Sets", "Kitchen Cabinets", "Bar Stools"]
      },
      {
         title: "Beds & Sleep",
         image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=400&auto=format&fit=crop",
         items: ["King Size Beds", "Mattresses", "Side Tables"]
      },
      {
         title: "Outdoor Furniture",
         image: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=400&auto=format&fit=crop",
         items: ["Garden Swings", "Patio Sets", "Outdoor Umbrellas"]
      }
    ]
  },
  {
     id: "interiors",
     title: "Interiors & Materials",
     mainImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop",
     topSubCategories: ["Modular Kitchen", "Sanitaryware", "Flooring", "Plywood"],
     gridItems: [
        {
           title: "Modular Kitchen",
           image: "/images/categories/modular_kitchen.png",
           items: ["L-Shaped Kitchen", "U-Shaped Kitchen", "Modular Accessories"]
        },
        {
           title: "Sanitaryware",
           image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=300&auto=format&fit=crop",
           items: ["Commode & Toilets", "Wash Basins", "Shower Heads"]
        },
        {
           title: "Flooring Tiles",
           image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=300&auto=format&fit=crop",
           items: ["Vitrified Tiles", "Wooden Flooring", "Marble & Granite"]
        },
        {
           title: "Electricals",
           image: "/images/categories/electricals.png",
           items: ["Designer Fans", "Modular Switches", "Smart Lighting"]
        },
        {
           title: "Construction",
           image: "/images/categories/construction.png",
           items: ["Plywoods", "TMT Bars", "Cement & Bricks"]
        },
        {
           title: "Paints & Decor",
           image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=300&auto=format&fit=crop",
           items: ["Emulsion Paints", "Wallpapers", "False Ceiling"]
        }
     ]
  }
];

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // 0 for Form, 1 for Ad
  const [formData, setFormData] = useState({
    product: "",
    mobile: ""
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showAd, setShowAd] = useState(true);

  // Auto-slide logic for the right hero card
  useEffect(() => {
    if (isHovered || isFocused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000); // Swaps every 6 seconds
    return () => clearInterval(timer);
  }, [isHovered, isFocused]);

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (formData.product.trim()) {
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen relative">
      
      {/* --- INQUIRY MODAL (POPUP) --- */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-[850px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-14 space-y-10"
            >
               <button 
                  onClick={() => setShowPopup(false)}
                  className="absolute right-8 top-8 p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400 z-10"
                >
                  <X className="h-6 w-6" />
               </button>

               <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter text-center md:text-left uppercase">TELL US WHAT YOU NEED</h2>
                  <p className="text-slate-500 font-medium text-base md:text-xl text-center md:text-left">Get quotes from multiple verified suppliers</p>
               </div>

               {/* Feature Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Convenience", sub: "OF BUYING", icon: ShoppingCart },
                    { title: "Competitive", sub: "QUOTES", icon: MessageSquare },
                    { title: "Payment", sub: "PROTECTION", icon: ShieldCheck },
                    { title: "5,000+", sub: "ACTIVE BUYERS", icon: Users }
                  ].map((feat, i) => (
                    <div key={i} className="bg-slate-50/80 p-5 rounded-[1.5rem] flex items-center gap-4 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                       <div className="h-10 w-10 rounded-xl bg-slate-200/50 flex items-center justify-center text-slate-900 shrink-0">
                          <feat.icon className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="font-extrabold text-slate-900 text-base leading-none">{feat.title}</p>
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">{feat.sub}</p>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Form Section */}
               <div className="space-y-4">
                  <div className="relative group">
                     <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0eb4c1] transition-colors" />
                     <Input 
                        placeholder="Enter Product / Service name" 
                        className="h-16 rounded-[1rem] bg-slate-50 border-0 focus-visible:ring-[#0eb4c1] pl-16 text-lg font-bold text-slate-800"
                        value={formData.product}
                        onChange={(e) => setFormData({...formData, product: e.target.value})}
                     />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <div className="h-16 w-full sm:w-28 rounded-[1rem] bg-slate-50 flex items-center justify-center font-black text-lg text-slate-900 border-r border-slate-200">+91</div>
                     <Input 
                        placeholder="Enter your mobile" 
                        className="h-16 rounded-[1rem] bg-slate-50 border-0 focus-visible:ring-[#0eb4c1] flex-1 px-8 text-lg font-bold text-slate-800"
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                     />
                  </div>
                  
                  <Button 
                    onClick={() => setShowPopup(false)}
                    className="w-full h-16 bg-[#0eb4c1] hover:bg-[#078e9a] text-white rounded-[1rem] font-black text-xl shadow-xl shadow-teal-500/20 transition-all active:scale-[0.98] mt-2"
                  >
                     Submit Requirement
                  </Button>
               </div>

               {/* Footnote Decorative */}
               <div className="flex justify-center pt-2">
                  <div className="h-1.5 w-12 bg-[#0eb4c1] rounded-full opacity-60" />
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden min-h-[750px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(187_92%_38%_/_0.2),_transparent_60%)]" />
        </div>

        <div className="container relative mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              >
                <CheckCircle2 className="h-4 w-4" />
                India's Premium Interior Network
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-black text-primary-foreground leading-[1.1]"
              >
                We connect <span className="text-accent">Buyers</span> & <span className="text-accent">Sellers</span> seamlessly
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-primary-foreground/70 text-lg md:text-xl max-w-xl leading-relaxed"
              >
                Houspire is the foundation of your project. Source from 3,200+ verified vendors for furniture, lighting, and premium materials.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span className="text-sm font-semibold">Trusted Platform</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Lock className="h-5 w-5 text-accent" />
                  <span className="text-sm font-semibold">Safe & Secure</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  <span className="text-sm font-semibold">Quick Assistance</span>
                </div>
              </motion.div>
            </div>

            {/* Right Side: SLIDER CONTAINER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-[580px]" // Fixed height to prevent layout shift
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full opacity-30" />
              
              <div className="relative h-full bg-card/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  {currentSlide === 0 ? (
                    /* SLIDE 1: REQUIREMENT FORM */
                    <motion.div 
                      key="form-slide"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6 md:p-10 h-full flex flex-col justify-center"
                    >
                      <div className="mb-8">
                        <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Tell us what you need</h2>
                        <p className="text-muted-foreground text-sm mt-1">Get quotes from multiple verified suppliers</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                          <div className="bg-primary/10 p-2 rounded-lg text-primary"><ShoppingCart className="h-4 w-4" /></div>
                          <span className="text-xs font-bold text-foreground leading-tight">Convenience<br/><span className="font-normal opacity-60 uppercase text-[9px]">of buying</span></span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                          <div className="bg-primary/10 p-2 rounded-lg text-primary"><MessageSquare className="h-4 w-4" /></div>
                          <span className="text-xs font-bold text-foreground leading-tight">Competitive<br/><span className="font-normal opacity-60 uppercase text-[9px]">Quotes</span></span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                          <div className="bg-primary/10 p-2 rounded-lg text-primary"><Lock className="h-4 w-4" /></div>
                          <span className="text-xs font-bold text-foreground leading-tight">Payment<br/><span className="font-normal opacity-60 uppercase text-[9px]">Protection</span></span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                          <div className="bg-primary/10 p-2 rounded-lg text-primary"><Users className="h-4 w-4" /></div>
                          <span className="text-xs font-bold text-foreground leading-tight">5,000+<br/><span className="font-normal opacity-60 uppercase text-[9px]">Active Buyers</span></span>
                        </div>
                      </div>

                      <form onSubmit={handleInitialSubmit} className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            required
                            value={formData.product}
                            onChange={(e) => setFormData({...formData, product: e.target.value})}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Enter Product / Service name" 
                            className="pl-11 h-14 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-accent rounded-xl text-foreground font-medium"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <div className="flex items-center">
                            <div className="absolute left-10 text-sm font-bold text-muted-foreground border-r pr-2 py-1">+91</div>
                            <Input 
                              required
                              value={formData.mobile}
                              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                              onFocus={() => setIsFocused(true)}
                              onBlur={() => setIsFocused(false)}
                              placeholder="Enter your mobile" 
                              className="pl-20 h-14 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-accent rounded-xl text-foreground font-medium"
                            />
                          </div>
                        </div>
                        <Button type="submit" size="lg" className="w-full h-14 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-black text-lg shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95">
                          Submit Requirement
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    /* SLIDE 2: VALUE PROPOSITION & CALL TO ACTIONS */
                    <motion.div 
                      key="ad-slide"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6 md:p-10 h-full flex flex-col justify-between bg-primary relative group overflow-hidden"
                    >
                      {/* Abstract Background Decoration */}
                      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
                      <div className="absolute bottom-[10%] left-[-5%] w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

                      <div className="relative z-10 space-y-6">
                        <div className="space-y-2">
                          <Badge className="bg-accent/20 text-accent border-none font-black text-[10px] uppercase tracking-widest px-3 py-1 mb-2">
                             Grow Your Business
                          </Badge>
                          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                            Build Your Brand <br/>On India's <span className="text-accent underline decoration-4 underline-offset-4 decoration-accent/30">Largest Hub</span>
                          </h2>
                          <p className="text-primary-foreground/60 text-sm font-medium leading-relaxed max-w-sm">
                            Join 3,200+ premium interior manufacturers and reach over 50k+ active buyers every month.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center gap-4 group/item">
                             <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-accent group-hover/item:scale-110 group-hover/item:bg-accent group-hover/item:text-accent-foreground transition-all">
                               <ShieldCheck className="h-5 w-5" />
                             </div>
                             <div>
                               <p className="text-sm font-bold text-white">Verified Trust Seal</p>
                               <p className="text-[10px] text-primary-foreground/40 font-medium capitalize">Get certified and stand out from the crowd.</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4 group/item">
                             <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-accent group-hover/item:scale-110 group-hover/item:bg-accent group-hover/item:text-accent-foreground transition-all">
                               <TrendingUp className="h-5 w-5" />
                             </div>
                             <div>
                               <p className="text-sm font-bold text-white">Boost Lead Generation</p>
                               <p className="text-[10px] text-primary-foreground/40 font-medium capitalize">Access high-quality direct inquiries from architects.</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4 group/item">
                             <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-accent group-hover/item:scale-110 group-hover/item:bg-accent group-hover/item:text-accent-foreground transition-all">
                               <Globe className="h-5 w-5" />
                             </div>
                             <div>
                               <p className="text-sm font-bold text-white">National Visibility</p>
                               <p className="text-[10px] text-primary-foreground/40 font-medium capitalize">Showcase your catalog in 48+ major Indian cities.</p>
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-8">
                        <Link href="/signin" className="flex-1">
                          <Button className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold gap-2 text-xs uppercase tracking-widest shadow-xl shadow-accent/10">
                            Register As Vendor
                          </Button>
                        </Link>
                        <Button variant="outline" className="flex-1 h-12 border-white/20 text-white hover:bg-white/10 rounded-xl font-bold text-xs uppercase tracking-widest bg-transparent">
                          View Success Stories
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SLIDE INDICATORS */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                   <button 
                    onClick={() => setCurrentSlide(0)}
                    className={`h-1.5 rounded-full transition-all ${currentSlide === 0 ? "w-8 bg-accent" : "w-2 bg-white/30"}`} 
                   />
                   <button 
                    onClick={() => setCurrentSlide(1)}
                    className={`h-1.5 rounded-full transition-all ${currentSlide === 1 ? "w-8 bg-accent" : "w-2 bg-white/30"}`} 
                   />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- AI LANDING SECTION --- */}
      <AILandingSection />

      {/* --- BROWSE BY CITY --- */}
      <section className="container py-16 space-y-8 mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Browse by City</h2>
            <p className="text-sm text-muted-foreground mt-1">Find trusted vendors in your city</p>
          </div>
          <Link href="/search" className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
            All cities <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city, i) => (
            <motion.div key={city.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Link href={`/search?city=${city.name}`} className="group relative block rounded-lg overflow-hidden aspect-[3/4]">
                <img src={cityImages[city.name]} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-0.5">
                  <h3 className="text-sm font-bold text-primary-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" strokeWidth={1.5} /> {city.name}
                  </h3>
                  <p className="text-[10px] text-primary-foreground/60 tabular-nums">{city.vendors} vendors · {city.products.toLocaleString()} products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- AD BANNER SECTION --- */}
      <AnimatePresence>
        {showAd && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, height: 0, margin: 0, padding: 0 }}
            transition={{ duration: 0.4 }}
            className="container mx-auto px-4 py-8 overflow-hidden"
          >
            <div className="relative w-full h-[120px] md:h-[130px] rounded-[1.5rem] overflow-hidden flex items-center shadow-xl border-b-4 border-primary group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                alt="Furniture Showcase"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600/90 to-transparent" />
              
              <div className="relative z-10 w-full flex items-center justify-between px-6 md:px-16">
                <div className="space-y-1">
                  <h4 className="text-white font-black text-sm md:text-2xl uppercase tracking-tighter leading-tight drop-shadow-sm">
                    List Your Interior Catalog <br className="hidden md:block"/> & Reach Premium Buyers
                  </h4>
                  <div className="flex items-center gap-3">
                    <p className="text-white/80 font-bold text-[10px] md:text-sm tracking-wide">
                      FOR HOME & OFFICE: <span className="bg-accent/20 px-2 py-0.5 rounded text-accent">SELL TO 50K+ ACTIVE USERS</span>
                    </p>
                    <div className="h-1 w-1 bg-white/30 rounded-full" />
                    <p className="text-white/60 text-[8px] md:text-[10px] font-medium">*Onboard in 2 mins</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-14">
                  <Button size="sm" className="bg-white text-blue-700 hover:bg-white/90 rounded-full font-black text-[10px] md:text-xs px-8 h-10 shadow-lg shadow-black/20 transition-transform active:scale-95">
                    START SELLING
                  </Button>
                  
                  <div className="hidden lg:flex items-center gap-4 border-l border-white/20 pl-6">
                    <div className="text-white text-right">
                        <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Marketplace Tier</p>
                        <div className="flex items-center gap-2">
                           <span className="font-black text-xl italic tracking-tighter uppercase">Houspire Seller Hub</span>
                           <div className="bg-white/10 px-1.5 py-0.5 rounded text-[8px] font-bold">PRO ACCOUNT</div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ad Controls (For Realism) */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity z-20">
                 <div className="h-5 w-5 bg-white/90 rounded flex items-center justify-center cursor-pointer shadow-sm hover:bg-white">
                    <Info className="h-2.5 w-2.5 text-black" />
                 </div>
                 <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAd(false);
                    }}
                    className="h-5 w-5 bg-white/90 rounded flex items-center justify-center cursor-pointer shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <X className="h-2.5 w-2.5" />
                 </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* --- INDIAMART STYLE CATEGORY SHOWCASE --- */}
      <section className="bg-slate-50 py-16 md:py-24 border-y">
        <div className="container mx-auto px-4 mb-16 text-center space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 font-black text-xs px-4 py-1.5 rounded-full">MARKETPLACE CATEGORIES</Badge>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Source by <span className="text-primary">Featured Categories</span></h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium">Connect with verified manufacturers for every aspect of your home or office architecture.</p>
        </div>

        {majorCategories.map((mainCat, blockIdx) => (
          <div key={mainCat.id} className="container mx-auto px-4 mb-12 last:mb-0">
            <div className="bg-white border-2 border-slate-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col xl:flex-row min-h-[500px] transition-all hover:shadow-xl hover:border-primary/20 group/block">
                
              {/* Left Primary Card */}
              <div className="xl:w-[360px] relative h-[300px] xl:h-auto overflow-hidden group">
                <img 
                  src={mainCat.mainImage} 
                  alt={mainCat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                <div className="absolute inset-x-0 bottom-0 p-10 space-y-8">
                  <h2 className="text-4xl font-black text-white leading-tight">{mainCat.title}</h2>
                  <ul className="space-y-3">
                    {mainCat.topSubCategories.map(sub => (
                      <li key={sub} className="group/sub">
                        <Link 
                          href={`/search?category=${encodeURIComponent(sub)}`}
                          className="text-white/70 text-sm font-bold hover:text-white cursor-pointer transition-colors flex items-center gap-3"
                        >
                          <div className="h-2 w-2 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)] group-hover/sub:scale-125 transition-transform" /> {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/search?category=${mainCat.title}`}>
                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-black text-sm h-14 shadow-lg">
                      View Verified All
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Side Grid of Sub-Cards */}
              <div className="flex-1 p-8 md:p-14 bg-white flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                  {mainCat.gridItems.map((item, i) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex gap-6 p-1 transition-all group/card"
                    >
                      <Link href={`/search?category=${item.title}`} className="flex gap-6 w-full">
                        <div className="h-28 w-28 md:h-32 md:w-32 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 shrink-0 group-hover/card:border-primary group-hover/card:bg-white group-hover/card:shadow-xl group-hover/card:scale-105 transition-all duration-300">
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply group-hover/card:scale-110 transition-transform" />
                        </div>
                        <div className="space-y-3 py-2">
                          <h3 className="font-extrabold text-slate-900 text-lg group-hover/card:text-primary cursor-pointer transition-colors leading-tight">{item.title}</h3>
                          <ul className="space-y-2">
                            {item.items.map(subItem => (
                              <li key={subItem} className="group/sub">
                                <Link 
                                  href={`/search?category=${encodeURIComponent(subItem)}`}
                                  className="text-[13px] text-slate-500 hover:text-primary cursor-pointer transition-colors font-medium flex items-center gap-2"
                                >
                                  <ChevronRight className="h-3 w-3 text-slate-300 group-hover/sub:text-primary transition-colors" /> {subItem}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* --- REQUIREMENT HUB SECTION --- */}
      <section className="bg-slate-900 py-16 md:py-24 relative overflow-hidden my-16">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-accent/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Content & Steps */}
          <div className="flex-1 space-y-12">
            <div className="space-y-6 text-center lg:text-left">
              <Badge className="bg-accent/10 text-accent border-accent/20 font-black px-4 py-1.5 rounded-full text-xs">QUICK QUOTE ENGINE</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Receive <span className="text-accent underline decoration-4 underline-offset-8">Direct Quotes</span> from <br className="hidden md:block"/> Premium Manufacturers
              </h2>
              <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed mx-auto lg:mx-0">
                Compare thousands of verified B2B partners and save significant costs on your bulk procurement needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Requirement", sub: "Describe your project, material needs & quantity.", icon: MessageSquare, color: "text-primary", bg: "group-hover:bg-primary/20", border: "group-hover:border-primary/40" },
                { title: "Multiple Bids", sub: "Receive custom quotes from certified vendors.", icon: Users, color: "text-accent", bg: "group-hover:bg-accent/20", border: "group-hover:border-accent/40" },
                { title: "Close Deal", sub: "Select best price and partner for your project.", icon: CheckCircle2, color: "text-emerald-400", bg: "group-hover:bg-emerald-400/20", border: "group-hover:border-emerald-400/40" }
              ].map((step, i) => (
                <div key={i} className="space-y-4 group text-center lg:text-left">
                  <div className={`h-16 w-16 mx-auto lg:mx-0 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${step.bg} ${step.border}`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-black text-sm uppercase tracking-widest">{i+1}. {step.title}</p>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed">{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM CARD */}
          <div className="w-full lg:w-[480px]">
            <Card className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 h-40 w-40 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 -z-1" />
              <div className="space-y-10 relative z-10">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Submit Your RFP</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Sellers Online
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">PRODUCT / SERVICE NAME</Label>
                        <Input 
                          placeholder="e.g. Italian Marble, Modern Sofa" 
                          className="h-16 rounded-2xl bg-slate-100 border-0 focus-visible:ring-primary font-bold px-6 text-slate-800"
                          value={formData.product}
                          onChange={(e) => setFormData({...formData, product: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">CONTACT NUMBER</Label>
                        <div className="flex gap-2">
                          <div className="h-16 px-4 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 border-r border-slate-200">+91</div>
                          <Input 
                            type="tel"
                            placeholder="Enter mobile number" 
                            className="h-16 rounded-2xl bg-slate-100 border-0 focus-visible:ring-primary flex-1 font-bold px-6 text-slate-800"
                            value={formData.mobile}
                            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                          />
                        </div>
                    </div>
                    <Button 
                      onClick={() => setShowPopup(true)}
                      className="w-full h-16 bg-primary text-white rounded-[1.25rem] font-black text-lg shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                        Get Free Quotes <ArrowRight className="h-5 w-5" />
                    </Button>
                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest opacity-60">Verified B2B Response Guaranteed</p>
                  </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* --- TRENDING PRODUCTS --- */}
      <section className="bg-muted/50">
        <div className="container py-16 space-y-8 mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Trending Products</h2>
            <Link href="/search" className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trendingProducts.map((product, i) => (
              <motion.div key={product.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <footer className="border-t bg-card">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mx-auto px-4">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">H</span>
              </div>
              <span className="font-bold text-foreground">Houspire</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              India's trusted marketplace for verified home interior professionals.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary">Marketplace</h4>
            <div className="space-y-2 text-muted-foreground">
              <Link href="/search" className="block hover:text-foreground transition-colors">Browse Products</Link>
              <Link href="/vendors" className="block hover:text-foreground transition-colors">Find Vendors</Link>
              <Link href="/search" className="block hover:text-foreground transition-colors">Categories</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary">For Vendors</h4>
            <div className="space-y-2 text-muted-foreground">
              <Link href="/dashboard" className="block hover:text-foreground transition-colors">Vendor Dashboard</Link>
              <Link href="/" className="block hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/" className="block hover:text-foreground transition-colors">Verification</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider text-primary">Company</h4>
            <div className="space-y-2 text-muted-foreground">
              <Link href="/" className="block hover:text-foreground transition-colors">About</Link>
              <Link href="/" className="block hover:text-foreground transition-colors">Contact</Link>
              <Link href="/" className="block hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container py-4 text-xs text-muted-foreground text-center mx-auto px-4">
            © 2026 Houspire. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}