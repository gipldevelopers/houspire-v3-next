"use client";

import { MapPin, Star, Package } from "lucide-react";
import { VerificationBadge } from "./VerificationBadge";
import Link from "next/link";

export function VendorCard({
  id,
  businessName,
  category,
  city,
  rating,
  reviewCount,
  verificationStatus,
  description,
  productCount,
}) {
  return (
    <Link
      href={`/vendor/${id}`}
      className="group block rounded-lg bg-card shadow-card hover:shadow-card-hover transition-shadow duration-150 p-5 space-y-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            {businessName?.[0]}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {businessName}
            </h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
        </div>
        <VerificationBadge status={verificationStatus} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" strokeWidth={1.5} />
          <span className="font-semibold text-card-foreground tabular-nums">{rating}</span>
          <span>({reviewCount})</span>
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
          {city}
        </span>
        <span className="flex items-center gap-1">
          <Package className="h-3.5 w-3.5" strokeWidth={1.5} />
          {productCount} products
        </span>
      </div>
    </Link>
  );
}
