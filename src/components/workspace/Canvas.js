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
    return <div className="flex-1 bg-canvas flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-body text-sm">
            Upload a room photo to begin
          </p>
        </div>
      </div>;
  }
  const showAnalysisOverlay = project.stage === "ANALYSIS";
  return <div className="flex-1 bg-canvas flex items-center justify-center p-6 overflow-hidden">
      <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
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
              <motion.div className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_12px_hsl(var(--primary))]" animate={{
            top: ["0%", "100%", "0%"]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }} />
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