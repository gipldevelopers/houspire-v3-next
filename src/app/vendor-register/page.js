"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck,
  Package,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const steps = [
  { id: 1, title: "Welcome", icon: Star },
  { id: 2, title: "Business Info", icon: Building2 },
  { id: 3, title: "Contact", icon: Mail },
  { id: 4, title: "Categories", icon: Package },
  { id: 5, title: "Complete", icon: CheckCircle2 }
];

const categories = [
  "Furniture", "Lighting", "Flooring", "Bath & Sanitary", "Kitchen", "Decor", "Materials", "Hardware"
];

export default function VendorRegister() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "Manufacturer",
    email: "",
    phone: "",
    city: "",
    categories: []
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const toggleCategory = (cat) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat) 
        : [...prev.categories, cat]
    }));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-muted/30 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-[300px_1fr] bg-card rounded-2xl shadow-xl border overflow-hidden">
        
        {/* Left Sidebar - Progress */}
        <div className="bg-primary p-8 text-primary-foreground hidden md:block">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold">Vendor Registration</h2>
              <p className="text-sm opacity-60 mt-1">Join the interior revolution</p>
            </div>
            
            <div className="space-y-4">
              {steps.map((s) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isCompleted = step > s.id;
                
                return (
                  <div key={s.id} className="flex items-center gap-4 transition-all duration-300">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive ? 'bg-accent border-accent text-accent-foreground scale-110 shadow-lg' : 
                      isCompleted ? 'bg-success border-success text-success-foreground' : 'border-primary-foreground/20 text-primary-foreground/40'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{s.id}</span>}
                    </div>
                    <div className={`space-y-0.5 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                      <p className="text-xs font-bold uppercase tracking-wider">{s.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-8 border-t border-white/10 mt-auto">
              <div className="flex items-center gap-2 text-xs opacity-70">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>Verified Business Badge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area - Forms */}
        <div className="p-8 md:p-12 relative flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-black text-foreground">Grow your business with Houspire</h1>
                  <p className="text-muted-foreground">Join 3,200+ verified interior vendors reaching architects, designers, and homeowners across India.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
                    <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                      <Star className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-sm">Verified Leads</h3>
                    <p className="text-xs text-muted-foreground">Direct inquiries from genuine buyers</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                      <Package className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-sm">Digital Showroom</h3>
                    <p className="text-xs text-muted-foreground">List unlimited products for free</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={nextStep} className="w-full h-12 text-base font-bold gap-2 group">
                    Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Business Information</h2>
                  <p className="text-sm text-muted-foreground">Tell us about your brand</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-70">Business Showroom Name</label>
                    <Input 
                      placeholder="e.g. Royal Furniture Studio" 
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-70">Registration Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Manufacturer", "Retailer", "Distributor", "Importer"].map(type => (
                        <button
                          key={type}
                          onClick={() => setFormData({...formData, businessType: type})}
                          className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                            formData.businessType === type ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-muted'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="ghost" onClick={prevStep} className="h-12 px-6">Back</Button>
                  <Button onClick={nextStep} className="flex-1 h-12 text-base font-bold">Continue</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Contact Details</h2>
                  <p className="text-sm text-muted-foreground">How should customers reach you?</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-70">Official Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="business@example.com" 
                        className="pl-10 h-12"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-70">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="+91 XXXXX XXXXX" 
                        className="pl-10 h-12"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-70">Primary City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search city..." 
                        className="pl-10 h-12"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="ghost" onClick={prevStep} className="h-12 px-6">Back</Button>
                  <Button onClick={nextStep} className="flex-1 h-12 text-base font-bold">Continue</Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Select Categories</h2>
                  <p className="text-sm text-muted-foreground">Choose the categories that best describe your products</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`p-3 rounded-lg border text-sm transition-all flex items-center justify-between ${
                        formData.categories.includes(cat) ? 'bg-accent/10 border-accent text-accent font-bold' : 'bg-card hover:bg-muted'
                      }`}
                    >
                      {cat}
                      {formData.categories.includes(cat) && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="ghost" onClick={prevStep} className="h-12 px-6">Back</Button>
                  <Button onClick={nextStep} className="flex-1 h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90">Complete Registration</Button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-8"
              >
                <div className="h-20 w-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" strokeWidth={3} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black">Registration Submitted!</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">Thank you for joining Houspire. Our team will review your business details and contact you within 24 hours.</p>
                </div>
                <div className="pt-4 space-y-3">
                  <Link href="/dashboard">
                    <Button className="w-full h-12 font-bold">Go to Dashboard Preview</Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full h-12 font-bold">Back to Homepage</Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
