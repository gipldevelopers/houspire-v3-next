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
    project
  } = useProject();
  const StepComponent = STEP_COMPONENTS[project.stage];
  return <div className="w-[360px] flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-l border-slate-200/60 dark:border-slate-800/60 overflow-y-auto shadow-[-4px_0_24px_-12px_rgba(0,0,0,0.1)] z-10 transition-colors duration-300">
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
        duration: 0.3
      }} className="p-8 h-full">
          <StepComponent />
        </motion.div>
      </AnimatePresence>
    </div>;
};