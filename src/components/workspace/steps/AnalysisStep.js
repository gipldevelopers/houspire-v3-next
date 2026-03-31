import { useEffect, useState } from "react";
import { useProject } from "@/context/ProjectContext";
import { motion } from "framer-motion";
import { Scan, Check } from "lucide-react";
const ANALYSIS_STEPS = ["Scanning room dimensions...", "Detecting furniture layout...", "Identifying objects...", "Mapping lighting conditions...", "Analysis complete!"];
export const AnalysisStep = () => {
  const {
    setDetectedObjects,
    setStage
  } = useProject();
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(s => {
        if (s < ANALYSIS_STEPS.length - 1) return s + 1;
        clearInterval(interval);
        return s;
      });
    }, 700);
    const timeout = setTimeout(() => {
      setDetectedObjects(["bed", "sofa", "lighting", "chair"]);
      setStage("DNA");
    }, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [setDetectedObjects, setStage]);
  return <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="font-display text-2xl font-black text-slate-800 dark:text-white mb-2">AI Analysis</h2>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">
        Our Vision AI is scanning your space to detect context, lighting, and layout opportunities.
      </p>

      <div className="flex-1 flex flex-col justify-center items-center">
        <motion.div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-teal-500/20 to-teal-500/5 dark:from-teal-500/10 dark:to-teal-500/5 flex items-center justify-center mb-12 relative shadow-[0_0_40px_-10px_rgba(20,184,166,0.3)]" animate={{
        rotate: [0, 360]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}>
          <div className="absolute inset-0 border-2 border-teal-500/30 rounded-[2rem] scale-110" />
          <Scan className="w-10 h-10 text-teal-600 dark:text-teal-400" />
        </motion.div>

        <div className="space-y-4 w-full px-2">
          {ANALYSIS_STEPS.map((step, i) => <motion.div key={i} initial={{
          opacity: 0,
          x: 10
        }} animate={i <= currentStep ? {
          opacity: 1,
          x: 0
        } : {}} className="flex items-center gap-4 bg-white/50 dark:bg-slate-800/20 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50 backdrop-blur-sm shadow-sm">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-inner transition-colors duration-500 ${i < currentStep ? "bg-teal-500 text-white" : i === currentStep ? "bg-amber-400 text-amber-950 animate-pulse" : "bg-slate-100 dark:bg-slate-800"}`}>
                {i < currentStep && <Check className="w-4 h-4" />}
              </div>
              <span className={`text-sm font-bold tracking-wide ${i <= currentStep ? "text-slate-800 dark:text-slate-200" : "text-slate-400 dark:text-slate-600"}`}>
                {step}
              </span>
            </motion.div>)}
        </div>
      </div>
    </div>;
};