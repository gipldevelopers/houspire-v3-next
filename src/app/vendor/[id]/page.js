"use client";

import { useParams } from "next/navigation";
import { 
  MapPin, 
  Star, 
  Package, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  Share2, 
  ShieldCheck, 
  Eye,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/VerificationBadge";
import { ProductCard } from "@/components/ProductCard";
import { featuredVendors, trendingProducts } from "@/lib/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VendorStorefrontPage() {
  const { id } = useParams();
  const vendor = featuredVendors.find(v => v.id === id);
  const vendorProducts = trendingProducts.filter(p => p.vendor === vendor?.businessName);

  if (!vendor) return (
    <div className="container py-20 text-center mx-auto px-4">
      <h2 className="text-2xl font-bold text-foreground">Vendor profile not found</h2>
      <Link href="/vendors"><Button className="mt-4">Browse Vendors</Button></Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Background Banner */}
      <div className="h-48 md:h-64 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(187_92%_38%_/_0.2),_transparent_60%)] opacity-50" />
        <div className="absolute bottom-4 left-4 flex gap-2">
           <Button variant="ghost" size="sm" className="bg-white/10 backdrop-blur text-white hover:bg-white/20 border-white/10 gap-2 rounded-lg">
             <Share2 className="h-4 w-4" /> Share Profile
           </Button>
        </div>
      </div>

      <div className="container -mt-16 relative space-y-8 mx-auto px-4 leading-normal">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border shadow-lg p-6 md:p-8 space-y-6"
        >
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
              <div className="h-24 w-24 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-3xl shadow-xl ring-4 ring-card leading-none">
                {vendor.businessName?.[0]}
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{vendor.businessName}</h1>
                    <VerificationBadge status={vendor.verificationStatus} />
                  </div>
                  <p className="text-sm font-semibold text-accent uppercase tracking-widest">{vendor.category}</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5 tabular-nums">
                    <Star className="h-4 w-4 fill-warning text-warning" strokeWidth={1.5} />
                    <span className="font-bold text-foreground">{vendor.rating}</span>
                    <span>({vendor.reviewCount} reviews)</span>
                  </span>
                  <span className="h-3 w-px bg-border hidden sm:block" />
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" strokeWidth={1.5} />
                    {vendor.city}
                  </span>
                  <span className="h-3 w-px bg-border hidden sm:block" />
                  <span className="flex items-center gap-1.5 tabular-nums">
                    <Package className="h-4 w-4" strokeWidth={1.5} />
                    {vendor.productCount} Products
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl gap-2 h-12">
                <MessageCircle className="h-4 w-4" /> Message Vendor
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl gap-2 h-12 border-border border-2">
                <Phone className="h-4 w-4" /> View Contact
              </Button>
            </div>
          </div>
          <div className="pt-6 border-t font-medium text-sm leading-relaxed text-muted-foreground max-w-3xl">
            <h3 className="font-bold text-foreground mb-2">About the Business</h3>
            {vendor.description}. Artisan Woodworks has been a cornerstone of quality furniture since 2012. Specializing in bespoke walnut and oak designs, we serve architects and homeowners with premium handcrafted solutions.
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
             {["Bespoke Designs", "Solid wood Specialist", "GST Registered", "5-year Warranty"].map(tag => (
               <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground border-border text-[10px] uppercase font-bold tracking-wider">{tag}</Badge>
             ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Products from {vendor.businessName}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">Sort by:</span>
              <Button variant="ghost" size="sm" className="text-xs font-bold gap-1 underline-offset-4 hover:underline">Newest <ChevronRight className="h-3 w-3 rotate-90" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
          {vendorProducts.length === 0 && (
            <div className="py-20 text-center bg-card rounded-2xl border border-dashed border-border text-muted-foreground">
               No products listed by this vendor yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
