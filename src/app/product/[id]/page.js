"use client";

import { useParams } from "next/navigation";
import { 
  ChevronRight, 
  MapPin, 
  Star, 
  Eye, 
  ShieldCheck, 
  Check, 
  Share2, 
  Heart, 
  ArrowLeft,
  MessageCircle,
  Phone,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/VerificationBadge";
import { trendingProducts, featuredVendors } from "@/lib/mock-data";
import { productImages } from "@/lib/images";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = trendingProducts.find(p => p.id === id);
  const vendor = featuredVendors.find(v => v.businessName === product?.vendor);
  const image = productImages[id];

  if (!product) return (
    <div className="container py-20 text-center mx-auto px-4">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <Link href="/search"><Button className="mt-4">Back to Search</Button></Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Breadcrumb */}
      <div className="container py-6 flex items-center gap-2 text-sm text-muted-foreground mx-auto px-4">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        <Link href="/search" className="hover:text-foreground">Products</Link>
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span className="text-foreground font-medium truncate">{product.title}</span>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 mx-auto px-4">
        {/* Left Column: Image */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl overflow-hidden bg-white border shadow-sm aspect-square md:aspect-[4/3] relative flex items-center justify-center"
          >
            {image ? (
              <img src={image} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-muted-foreground">{product.category} Image</div>
            )}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="icon" variant="ghost" className="bg-white/80 backdrop-blur shadow-sm h-10 w-10 text-destructive"><Heart className="h-5 w-5" /></Button>
              <Button size="icon" variant="ghost" className="bg-white/80 backdrop-blur shadow-sm h-10 w-10"><Share2 className="h-5 w-5" /></Button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 font-bold tracking-tight">
                {product.category}
              </Badge>
              {product.verified && <VerificationBadge status="premium" size="sm" />}
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-foreground leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 tabular-nums">
                <Eye className="h-4 w-4" strokeWidth={1.5} />
                {product.views.toLocaleString()} views
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
                {product.city}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-primary tabular-nums">
              {product.price}
            </p>
          </div>

          <div className="bg-card rounded-2xl border p-6 space-y-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl ring-2 ring-primary/5">
                  {product.vendor[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors cursor-pointer">
                    {product.vendor}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <Star className="h-3.5 w-3.5 fill-warning text-warning" strokeWidth={1.5} />
                    <span className="font-bold text-foreground tabular-nums">{vendor?.rating || "4.8"}</span>
                    <span>({vendor?.reviewCount || "124"} reviews)</span>
                  </div>
                </div>
              </div>
              <Link href={`/vendor/${vendor?.id || "1"}`}>
                <Button variant="ghost" size="sm" className="text-accent gap-1 text-xs">View Profile <ArrowRight className="h-3 w-3" /></Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full rounded-xl gap-2 h-12">
                <MessageCircle className="h-4 w-4" /> Send Inquiry
              </Button>
              <Button size="lg" variant="outline" className="w-full rounded-xl gap-2 h-12 border-border border-2">
                <Phone className="h-4 w-4" /> Get Number
              </Button>
            </div>
            <p className="text-[11px] text-center text-muted-foreground font-medium flex items-center justify-center gap-1.5 opacity-70">
              <ShieldCheck className="h-3.5 w-3.5 text-success" /> Verified Communication via Houspire
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground">Specifications</h3>
            <div className="grid grid-cols-1 gap-1">
              {[
                { label: "Material", value: "Premium Walnut Solid Wood" },
                { label: "Dimensions", value: "72L x 36W x 30H inches" },
                { label: "Wait Time", value: "10-15 Working Days" },
                { label: "Delivery", value: "Free Installation (Select Cities)" }
              ].map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card/50 text-sm">
                  <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{spec.label}</span>
                  <span className="text-foreground font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
