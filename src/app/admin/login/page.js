"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowRight, 
  Fingerprint, 
  AlertCircle,
  ShieldAlert,
  Terminal,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCapsLocked, setIsCapsLocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.getModifierState("CapsLock")) {
        setIsCapsLocked(true);
      } else {
        setIsCapsLocked(false);
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth logic
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Authenticating Secure Cluster...',
        success: () => {
          router.push("/admin");
          return 'Access Granted. Welcome, Admin.';
        },
        error: 'Authorization Failed.',
      }
    );
    
    // After 2 seconds, we'll be redirected by the toast promise logic
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Premium Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/admin-login-bg-v3.png" 
          alt="Admin Background" 
          fill 
          priority
          className="object-cover opacity-40 mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-primary/20" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse delay-700" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1200px] grid lg:grid-cols-2 gap-8 px-6 items-center">
        
        {/* Left Side: Branding & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col gap-8 pr-12"
        >
          <div className="flex items-center gap-4">
             <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(0,184,212,0.3)] border border-accent/20">
                <span className="text-accent-foreground font-black text-2xl">H</span>
             </div>
             <div className="flex flex-col">
                <h1 className="text-4xl font-black text-white tracking-tighter leading-none">Houspire</h1>
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-accent mt-1">Management Hub</span>
             </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
              Secure Access to the <span className="text-accent">Registry Engine.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
              Authorized personnel only. All access attempts are logged and encrypted via the Houspire security cluster.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <SystemStat icon={ShieldCheck} label="Security" value="Active (AES-256)" />
            <SystemStat icon={Terminal} label="Instance" value="Cluster_RX v4.2" />
          </div>
        </motion.div>

        {/* Right Side: Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-primary/50 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
              <div className="flex flex-col items-center mb-8 lg:hidden">
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <span className="text-accent-foreground font-black text-xl">H</span>
                </div>
                <h2 className="text-2xl font-black text-white">Houspire Admin</h2>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Welcome Back</h3>
                <p className="text-slate-400 text-sm font-medium">Enter your credentials to access the command center.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Terminal</Label>
                  <div className="relative group/input">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-accent transition-colors" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="admin@houspire.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-950/50 border-white/5 h-12 pl-11 text-white placeholder:text-slate-600 focus-visible:ring-accent/30 focus-visible:border-accent/40 rounded-xl font-bold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between ml-1">
                    <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-400">Pass-Key</Label>
                    <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-accent hover:text-white transition-colors">Forgot?</Link>
                  </div>
                  <div className="relative group/input">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within/input:text-accent transition-colors" />
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-950/50 border-white/5 h-12 pl-11 pr-11 text-white placeholder:text-slate-600 focus-visible:ring-accent/30 focus-visible:border-accent/40 rounded-xl font-bold transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {isCapsLocked && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-amber-500 uppercase tracking-tighter pl-1"
                    >
                      <AlertCircle className="h-3 w-3" /> Caps Lock is ON
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-1">
                  <Checkbox id="remember" className="border-white/10 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground rounded-[4px]" />
                  <label htmlFor="remember" className="text-xs font-bold text-slate-400 cursor-pointer select-none">
                    Remember terminal session
                  </label>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-black text-base transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(0,184,212,0.2)] disabled:opacity-70 group overflow-hidden relative"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                         <div className="h-5 w-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                         <span>Accessing Node...</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShieldAlert className="h-5 w-5" />
                        <span>Initialize Session</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                </div>
                <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    <Fingerprint className="h-5 w-5 text-accent" />
                    <KeyIcon className="h-5 w-5 text-accent" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 text-center">
                  Houspire Security v2.0 - AES Encrypted
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-8 left-8 hidden lg:flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Environment: Production Cluster</span>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-6">
        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2">
           <Cpu className="h-3 w-3" /> Core: 01-A
        </div>
        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2 border-l border-white/5 pl-6">
           Time: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

function SystemStat({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex items-center gap-3 group hover:border-accent/30 transition-all">
      <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-accent transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</div>
        <div className="text-xs font-bold text-white tracking-widest uppercase">{value}</div>
      </div>
    </div>
  );
}

function KeyIcon(props) {
  return (
    <svg 
      {...props}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5" />
    </svg>
  );
}
