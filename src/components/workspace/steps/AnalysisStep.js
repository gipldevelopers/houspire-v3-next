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
  return <div className="flex flex-col h-full">
      <h2 className="font-display text-xl font-semibold mb-2">AI Analysis</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Our AI is analyzing your room...
      </p>

      <div className="flex-1 flex flex-col justify-center">
        <motion.div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8" animate={{
        rotate: [0, 360]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}>
          <Scan className="w-8 h-8 text-primary" />
        </motion.div>

        <div className="space-y-3">
          {ANALYSIS_STEPS.map((step, i) => <motion.div key={i} initial={{
          opacity: 0,
          x: 10
        }} animate={i <= currentStep ? {
          opacity: 1,
          x: 0
        } : {}} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${i < currentStep ? "bg-success text-success-foreground" : i === currentStep ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {i < currentStep && <Check className="w-3 h-3" />}
              </div>
              <span className={`text-sm ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                {step}
              </span>
            </motion.div>)}
        </div>
      </div>
    </div>;
};