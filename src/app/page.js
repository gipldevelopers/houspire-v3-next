"use client";

import { Search, ArrowRight, MapPin, Star, Package, ShieldCheck, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { VendorCard } from "@/components/VendorCard";
import { VerificationBadge } from "@/components/VerificationBadge";
import { featuredVendors, trendingProducts } from "@/lib/mock-data";
import { categoryShowcase, cities, cityImages, topCompanies, heroImg } from "@/lib/images";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(187_92%_38%_/_0.15),_transparent_60%)]" />
        </div>
        <div className="container relative py-20 md:py-32 text-center space-y-8 mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground max-w-3xl mx-auto leading-tight"
          >
            Source the foundation of your next project
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-primary-foreground/70 text-base md:text-lg max-w-xl mx-auto"
          >
            India's trusted marketplace for verified home interior vendors — furniture, lighting, materials, and more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <Input placeholder="Search furniture, lighting, vendors…" className="pl-10 bg-card/95 border-0 h-12 text-sm" />
            </div>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto h-12">
              Search
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex items-center justify-center gap-6 text-primary-foreground/50 text-xs"
          >
            <span>12,400+ Products</span>
            <span className="h-3 w-px bg-primary-foreground/20" />
            <span>3,200+ Vendors</span>
            <span className="h-3 w-px bg-primary-foreground/20" />
            <span>48 Cities</span>
          </motion.div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="container py-16 space-y-8 mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-sm text-muted-foreground mt-1">Explore India's widest range of interior products</p>
          </div>
          <Link href="/search" className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryShowcase.map((cat, i) => (
            <motion.div
              key={cat.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Link
                href={`/search?category=${cat.name}`}
                className="group relative block rounded-lg overflow-hidden aspect-[4/3]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                  <h3 className="text-lg font-bold text-primary-foreground">{cat.name}</h3>
                  <p className="text-xs text-primary-foreground/70">{cat.description}</p>
                  <p className="text-xs text-primary-foreground/50 tabular-nums">{cat.products.toLocaleString()} products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
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
              <motion.div
                key={product.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by City */}
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
            <motion.div
              key={city.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Link
                href={`/search?city=${city.name}`}
                className="group relative block rounded-lg overflow-hidden aspect-[3/4]"
              >
                <img
                  src={cityImages[city.name]}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-0.5">
                  <h3 className="text-sm font-bold text-primary-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" strokeWidth={1.5} />
                    {city.name}
                  </h3>
                  <p className="text-[10px] text-primary-foreground/60 tabular-nums">{city.vendors} vendors · {city.products.toLocaleString()} products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Companies */}
      <section className="bg-primary">
        <div className="container py-16 space-y-8 mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary-foreground">Top Companies</h2>
              <p className="text-sm text-primary-foreground/50 mt-1">Verified vendors trusted by thousands</p>
            </div>
            <Link href="/vendors" className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCompanies.map((company, i) => (
              <motion.div
                key={company.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link
                  href={`/search`}
                  className="group block rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors p-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                      {company.name[0]}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-primary-foreground truncate">{company.name}</h3>
                      <p className="text-xs text-primary-foreground/50">{company.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-primary-foreground/50">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" strokeWidth={1.5} />
                      <span className="text-primary-foreground tabular-nums">{company.rating}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" strokeWidth={1.5} />
                      {company.city}
                    </span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <Package className="h-3 w-3" strokeWidth={1.5} />
                      {company.products}
                    </span>
                  </div>
                  {company.verified && (
                    <div className="pt-2 border-t border-primary-foreground/10">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success">
                        <ShieldCheck className="h-3 w-3" strokeWidth={1.5} />
                        Verified by Houspire
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="container py-16 space-y-8 mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Featured Vendors</h2>
          <Link href="/vendors" className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredVendors.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <VendorCard {...vendor} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Stats Banner */}
      <section className="bg-muted/50 border-y">
        <div className="container py-12 mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "3,200+", label: "Verified Vendors", icon: Building2 },
              { value: "12,400+", label: "Products Listed", icon: Package },
              { value: "48", label: "Cities Covered", icon: MapPin },
              { value: "98%", label: "Satisfaction Rate", icon: Star },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="space-y-2">
                  <Icon className="h-6 w-6 mx-auto text-accent" strokeWidth={1.5} />
                  <p className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 text-center space-y-6 mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Are you a home interior vendor?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Join 3,200+ verified businesses on Houspire. Get discovered by architects and homeowners across India.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            List Your Business — Free
          </Button>
        </Link>
      </section>

      {/* Footer */}
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
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">Marketplace</h4>
            <div className="space-y-2 text-muted-foreground">
              <Link href="/search" className="block hover:text-foreground transition-colors">Browse Products</Link>
              <Link href="/vendors" className="block hover:text-foreground transition-colors">Find Vendors</Link>
              <Link href="/search" className="block hover:text-foreground transition-colors">Categories</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">For Vendors</h4>
            <div className="space-y-2 text-muted-foreground">
              <Link href="/dashboard" className="block hover:text-foreground transition-colors">Vendor Dashboard</Link>
              <Link href="/" className="block hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/" className="block hover:text-foreground transition-colors">Verification</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">Company</h4>
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
