"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">H</span>
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">Houspire</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Browse
          </Link>
          <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Categories
          </Link>
          <Link href="/vendors" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Vendors
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">Vendor Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">List Your Business</Button>
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-card p-4 space-y-3">
          <Link href="/search" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Browse</Link>
          <Link href="/categories" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Categories</Link>
          <Link href="/vendors" className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Vendors</Link>
          <div className="pt-2 space-y-2">
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full" size="sm">Vendor Login</Button>
            </Link>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
              <Button className="w-full" size="sm">List Your Business</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
