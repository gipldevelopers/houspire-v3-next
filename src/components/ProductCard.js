"use client";

import { MapPin, Eye } from "lucide-react";
import { VerificationBadge } from "./VerificationBadge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { productImages } from "@/lib/images";

export function ProductCard({
  id,
  title,
  price,
  vendor,
  city,
  views,
  verified,
  category,
}) {
  const img = productImages[id];

  return (
    <Link
      href={`/product/${id}`}
      className="group block rounded-lg bg-card shadow-card hover:shadow-card-hover transition-shadow duration-150"
    >
      <div className="aspect-[4/3] rounded-t-lg bg-muted overflow-hidden">
        {img ? (
          <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">{category}</div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-snug text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-primary font-bold text-sm tabular-nums">{price}</p>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">{vendor}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />
              {city}
            </p>
          </div>
          {verified && <VerificationBadge status="premium" size="sm" />}
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground flex items-center gap-1 tabular-nums">
            <Eye className="h-3 w-3" strokeWidth={1.5} />
            {views?.toLocaleString()} views
          </span>
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={(e) => e.preventDefault()}>
            Contact Vendor
          </Button>
        </div>
      </div>
    </Link>
  );
}
