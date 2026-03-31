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
  return <div className="w-80 flex-shrink-0 bg-card border-l border-border overflow-y-auto">
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
      }} className="p-6 h-full">
          <StepComponent />
        </motion.div>
      </AnimatePresence>
    </div>;
};