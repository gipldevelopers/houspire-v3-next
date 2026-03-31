import { useProject } from "@/context/ProjectContext";
import { AnimatePresence, motion } from "framer-motion";
import { UploadStep } from "./steps/UploadStep";
import { AnalysisStep } from "./steps/AnalysisStep";
import { DNAStep } from "./steps/DNAStep";
import { ZoneStep } from "./steps/ZoneStep";
import { ModeStep } from "./steps/ModeStep";
import { BrowseStep } from "./steps/BrowseStep";
import { AuctionStep } from "./steps/AuctionStep";
import { FinalStep } from "./steps/FinalStep";
import { ArrowLeft } from "lucide-react";
const STEP_COMPONENTS = {
  UPLOAD: UploadStep,
  ANALYSIS: AnalysisStep,
  DNA: DNAStep,
  ZONES: ZoneStep,
  MODE: ModeStep,
  BROWSE: BrowseStep,
  AUCTION: AuctionStep,
  FINAL: FinalStep
};
export const RightPanel = () => {
  const {
    project,
    goBack
  } = useProject();
  const StepComponent = STEP_COMPONENTS[project.stage];
  
  return <div className="w-[400px] flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-l border-slate-200/60 dark:border-slate-800/60 flex flex-col shadow-[-4px_0_40px_-12px_rgba(0,0,0,0.15)] z-10 transition-colors duration-300">
      {/* Step Header with Back Button */}
      <div className="px-8 pt-8 flex items-center justify-between min-h-[60px]">
        {project.stage !== "UPLOAD" && (
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-teal-500 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={project.stage} initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} transition={{
          duration: 0.4,
          ease: "easeOut"
        }} className="p-8 pt-4 h-full">
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>;
};