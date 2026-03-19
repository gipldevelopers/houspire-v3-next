"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Info, 
  CheckCircle2, 
  Trash2, 
  Plus,
  Package,
  Layers,
  Image as ImageIcon,
  IndianRupee,
  ShoppingBag,
  ListRestart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, title: "Basic Info", icon: Info },
  { id: 2, title: "Pricing & Stock", icon: IndianRupee },
  { id: 3, title: "Specifications", icon: ListRestart },
  { id: 4, title: "Media Gallery", icon: ImageIcon },
];

const categories = [
  "Furniture",
  "Lighting",
  "Flooring",
  "Kitchen",
  "Bathroom",
  "Decor",
  "Paint",
  "Electrical",
];

const units = ["Piece", "Set", "Sq. Ft.", "Meter", "Box"];

export default function AddProductPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    description: "",
    priceType: "fixed",
    price: "",
    priceMin: "",
    priceMax: "",
    moq: "1",
    unit: "Piece",
    material: "",
    dimensions: "",
    color: "",
  });

  const [images, setImages] = useState([]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Submit logic would go here
      router.push("/dashboard/products");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Step Indicator */}
      <div className="flex items-center justify-between px-2 overflow-x-auto gap-4 pb-2 scrollbar-hide">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center gap-4 flex-shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div 
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                    isActive ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110" : 
                    isDone ? "bg-success/10 border-success/30 text-success" : 
                    "bg-muted/50 border-border text-muted-foreground"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-12 md:w-20 rounded-full ${isDone ? "bg-success/30" : "bg-muted"} mb-6 hidden sm:block`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <Card className="rounded-[2.5rem] border-2 border-border/50 shadow-2xl overflow-hidden bg-card/50 backdrop-blur-xl">
        <CardContent className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="border-l-4 border-accent pl-6 space-y-1">
                     <h3 className="text-xl font-black text-foreground tracking-tight">Basic Information</h3>
                     <p className="text-xs text-muted-foreground font-medium">Define your product and categorization</p>
                  </div>
                  <div className="grid gap-6">
                    <div className="space-y-3">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Product Title</Label>
                      <Input 
                        placeholder="e.g. Modern Minimalist Sofa — 3 Seater" 
                        className="h-14 rounded-2xl bg-muted/30 border-0 font-bold text-lg focus-visible:ring-accent" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Main Category</Label>
                          <Select>
                             <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-0">
                                <SelectValue placeholder="Select Category" />
                             </SelectTrigger>
                             <SelectContent>
                                {categories.map(cat => (
                                   <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                             </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Sub Category</Label>
                          <Input placeholder="e.g. Living Room Furniture" className="h-14 rounded-2xl bg-muted/30 border-0" />
                       </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Short Description</Label>
                      <Textarea 
                         placeholder="Highlight key features of your product..." 
                         className="rounded-2xl bg-muted/30 border-0 font-medium min-h-[120px] focus-visible:ring-accent" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6 space-y-1">
                     <h3 className="text-xl font-black text-foreground tracking-tight">Pricing & Stock</h3>
                     <p className="text-xs text-muted-foreground font-medium">Set your pricing strategy and order limits</p>
                  </div>
                  <div className="grid gap-8">
                    <div className="p-1 bg-muted rounded-2xl flex w-full max-w-sm">
                       {['fixed', 'range'].map(type => (
                          <button
                             key={type}
                             onClick={() => setFormData({...formData, priceType: type})}
                             className={`flex-1 py-3 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                                formData.priceType === type ? "bg-background shadow-md text-primary" : "text-muted-foreground hover:text-foreground"
                             }`}
                          >
                             {type} Price
                          </button>
                       ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {formData.priceType === 'fixed' ? (
                          <div className="space-y-3">
                             <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Selling Price (INR)</Label>
                             <div className="relative">
                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="0.00" className="h-14 rounded-2xl bg-muted/30 border-0 pl-12 font-black text-lg" />
                             </div>
                          </div>
                       ) : (
                          <div className="space-y-3 md:col-span-2">
                             <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Price Range (INR)</Label>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                   <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                   <Input placeholder="Min" className="h-14 rounded-2xl bg-muted/30 border-0 pl-12 font-black text-lg" />
                                </div>
                                <div className="relative">
                                   <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                   <Input placeholder="Max" className="h-14 rounded-2xl bg-muted/30 border-0 pl-12 font-black text-lg" />
                                </div>
                             </div>
                          </div>
                       )}

                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Minimum Order Qty</Label>
                          <Input type="number" defaultValue="1" className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                       </div>
                       
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Base Unit</Label>
                          <Select defaultValue="Piece">
                             <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-0">
                                <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                                {units.map(u => (
                                   <SelectItem key={u} value={u}>{u}</SelectItem>
                                ))}
                             </SelectContent>
                          </Select>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                   <div className="border-l-4 border-warning pl-6 space-y-1">
                        <h3 className="text-xl font-black text-foreground tracking-tight">Technical Specifications</h3>
                        <p className="text-xs text-muted-foreground font-medium">Add details that help buyers decide</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Primary Material</Label>
                          <Input placeholder="e.g. Solid Teak Wood" className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Dimensions (LxWxH)</Label>
                          <Input placeholder="e.g. 180 x 90 x 75 cm" className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Color / Finish</Label>
                          <Input placeholder="e.g. Dark Walnut Finish" className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                       </div>
                       <div className="space-y-3">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Warranty Period</Label>
                          <Input placeholder="e.g. 12 Months Manufacturing" className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                       </div>
                   </div>
                   
                   <div className="p-6 rounded-3xl bg-muted/30 border-2 border-dashed border-border space-y-6">
                      <div className="flex items-center justify-between">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Custom Attributes</h4>
                         <Button variant="ghost" size="sm" className="h-8 rounded-lg text-accent hover:bg-accent/10 font-bold text-[10px] uppercase"><Plus className="h-3.5 w-3.5 mr-1" /> Add Custom Field</Button>
                      </div>
                      <p className="text-[10px] text-center text-muted-foreground/60 italic">No custom attributes added yet.</p>
                   </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="border-l-4 border-success pl-6 space-y-1">
                        <h3 className="text-xl font-black text-foreground tracking-tight">Media Gallery</h3>
                        <p className="text-xs text-muted-foreground font-medium">Upload high-quality images to attract leads</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                     <div className="aspect-square rounded-3xl border-4 border-dashed border-success/20 bg-success/5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-success/10 hover:border-success/40 transition-all group scale-100 active:scale-95">
                        <div className="h-12 w-12 rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Upload className="h-6 w-6 text-success" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-success">Upload Main</p>
                     </div>
                     {[1,2,3].map(i => (
                        <div key={i} className="aspect-square rounded-3xl border-2 border-dashed border-border bg-muted/20 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-muted/50 hover:border-border transition-all group">
                           <Plus className="h-5 w-5 text-muted-foreground/40 group-hover:text-muted-foreground" />
                           <p className="text-[10px] font-bold text-muted-foreground/40 group-hover:text-muted-foreground uppercase tracking-widest">Gallery {i}</p>
                        </div>
                     ))}
                  </div>

                  <div className="bg-card/80 border p-6 rounded-3xl flex items-start gap-4">
                     <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                     <div className="space-y-1">
                        <p className="text-xs font-black text-foreground uppercase tracking-tight">Photo Guidelines</p>
                        <ul className="text-[10px] text-muted-foreground font-medium space-y-1 list-disc pl-3">
                           <li>Minimum resolution: 1200 x 1200 pixels</li>
                           <li>Neutral or white background preferred for main image</li>
                           <li>Max file size: 5MB per image (PNG, JPG)</li>
                        </ul>
                     </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        {/* Footer Actions */}
        <div className="bg-muted/20 p-8 flex border-t items-center justify-between">
           <Button variant="ghost" onClick={handleBack} className={`rounded-xl h-12 px-6 font-bold gap-2 ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}>
              <ArrowLeft className="h-4 w-4" /> Go Back
           </Button>
           
           <div className="flex gap-4">
              <Button variant="ghost" className="rounded-xl h-12 px-8 font-bold text-muted-foreground">Save as Draft</Button>
              <Button onClick={handleNext} className="rounded-xl h-12 px-10 bg-primary font-black shadow-xl shadow-primary/20 gap-2 min-w-[160px]">
                 {currentStep === steps.length ? "Publish Product" : "Next Step"} <ArrowRight className="h-4 w-4" />
              </Button>
           </div>
        </div>
      </Card>
      
      <div className="flex justify-center flex-col items-center gap-4 text-center opacity-50">
         <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[9px] font-black">ISO 27001 SECURE</Badge>
            <Badge variant="outline" className="text-[9px] font-black">ENCRYPTED DATA</Badge>
         </div>
         <p className="text-[10px] font-medium max-w-sm text-balance">By publishing this product, you agree to Houspire's Terms of Service and Product Listing Policies.</p>
      </div>
    </div>
  );
}
