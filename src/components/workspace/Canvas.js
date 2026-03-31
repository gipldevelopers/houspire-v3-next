import { useProject } from "@/context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import roomPlaceholder from "@/assets/room-placeholder.jpg";
import productBed from "@/assets/product-bed.png";
import productSofa from "@/assets/product-sofa.png";
import productLamp from "@/assets/product-lamp.png";
import productChair from "@/assets/product-chair.png";
import { ImageIcon } from "lucide-react";
const PRODUCT_IMAGES = {
  "product-bed.png": productBed.src,
  "product-sofa.png": productSofa.src,
  "product-lamp.png": productLamp.src,
  "product-chair.png": productChair.src
};
const PRODUCT_POSITIONS = {
  bed: {
    top: "35%",
    left: "25%",
    width: "50%"
  },
  sofa: {
    top: "55%",
    left: "15%",
    width: "40%"
  },
  lamp: {
    top: "15%",
    left: "70%",
    width: "15%"
  },
  lighting: {
    top: "15%",
    left: "70%",
    width: "15%"
  },
  chair: {
    top: "50%",
    left: "65%",
    width: "25%"
  }
};
export const Canvas = () => {
  const {
    project
  } = useProject();
  if (!project.roomImage && project.stage === "UPLOAD") {
    return <div className="flex-1 bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] flex items-center justify-center relative transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center relative z-10 p-12 rounded-[2rem] bg-white/80 backdrop-blur-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 mx-4 max-w-lg w-full">
          <div className="w-24 h-24 rounded-3xl bg-teal-50 flex items-center justify-center mx-auto mb-6 shadow-inner border border-teal-100">
            <ImageIcon className="w-12 h-12 text-teal-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2 font-display">Ready for your room</h2>
          <p className="text-slate-500 font-medium">
            Upload a photo of your empty or furnished space to start the redesign process
          </p>
        </motion.div>
      </div>;
  }
  const showAnalysisOverlay = project.stage === "ANALYSIS";
  return <div className="flex-1 bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] flex items-center justify-center p-8 overflow-hidden relative transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-transparent pointer-events-none" />
      <div className="relative w-full max-w-4xl aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200 z-10 bg-black">
        <img src={project.roomImage || roomPlaceholder.src} alt="Room" className="w-full h-full object-cover" />

        {/* Analysis scan overlay */}
        <AnimatePresence>
          {showAnalysisOverlay && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute inset-0 bg-foreground/20">
              <motion.div className="absolute left-0 right-0 h-1 bg-teal-500 shadow-[0_0_20px_rgba(20,184,166,1)] z-50" animate={{
            top: ["0%", "100%", "0%"]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}>
                  <div className="w-full h-32 bg-gradient-to-b from-teal-500/0 via-teal-500/10 to-teal-500/40 -translate-y-full blur-sm" />
              </motion.div>
            </motion.div>}
        </AnimatePresence>

        {/* Product overlays */}
        <AnimatePresence>
          {project.selectedProducts.map(product => {
          const pos = PRODUCT_POSITIONS[product.zone] || {
            top: "40%",
            left: "30%",
            width: "30%"
          };
          const imgFile = product.image.split("/").pop() || "";
          const imgSrc = PRODUCT_IMAGES[imgFile];
          if (!imgSrc) return null;
          return <motion.img key={product.id} src={imgSrc} alt={product.name} initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 0.9,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.8
          }} className="absolute pointer-events-none drop-shadow-xl" style={{
            top: pos.top,
            left: pos.left,
            width: pos.width
          }} />;
        })}
        </AnimatePresence>
      </div>
    </div>;
};