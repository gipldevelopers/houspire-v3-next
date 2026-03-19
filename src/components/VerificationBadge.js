"use client";

import { Check, Shield, ShieldCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const badgeConfig = {
  basic: {
    label: "Basic Vendor",
    tooltip: "This vendor has not completed verification yet.",
    icon: Shield,
    className: "bg-muted text-muted-foreground border-border",
  },
  verified: {
    label: "Verified",
    tooltip: "Identity verified via Aadhaar by Houspire.",
    icon: Check,
    className: "bg-accent/10 text-accent border-accent/20",
  },
  premium: {
    label: "GST Verified",
    tooltip: "Verified via GSTN Registry. Premium trusted vendor.",
    icon: ShieldCheck,
    className: "bg-success/10 text-success border-success/20",
  },
};

export function VerificationBadge({ status, size = "sm" }) {
  const config = badgeConfig[status];
  const Icon = config.icon;
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={`inline-flex items-center gap-1 rounded-full border font-semibold ${sizeClass} ${config.className} cursor-default transition-colors duration-150`}
        >
          <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} strokeWidth={1.5} />
          {config.label}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{config.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
