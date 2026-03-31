import { useCallback } from "react";
import { useProject } from "@/context/ProjectContext";
import { Upload, ImageIcon } from "lucide-react";
import roomPlaceholder from "@/assets/room-placeholder.jpg";
export const UploadStep = () => {
  const {
    setRoomImage,
    setStage
  } = useProject();
  const handleUpload = useCallback(e => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setRoomImage(ev.target?.result);
        setStage("ANALYSIS");
      };
      reader.readAsDataURL(file);
    }
  }, [setRoomImage, setStage]);
  const handleDemo = useCallback(() => {
    setRoomImage(roomPlaceholder.src);
    setStage("ANALYSIS");
  }, [setRoomImage, setStage]);
    return <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="font-display text-2xl font-black text-slate-800 dark:text-white mb-2">Upload Room</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium">
        Start by uploading a photo of the room you want to redesign. Make sure it's well-lit for best results.
      </p>

      <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl cursor-pointer hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all group min-h-[240px]">
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-7 h-7 text-teal-600 dark:text-teal-400" />
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Drop image or click to browse</span>
        <span className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-widest">JPG, PNG up to 10MB</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </label>

      <div className="mt-6 text-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest relative z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-3 py-1 rounded-full">Or try an example</span>
      </div>

      <button onClick={handleDemo} className="mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-teal-600 dark:hover:bg-teal-500 text-white text-sm font-bold tracking-wide transition-all shadow-xl shadow-slate-900/10 hover:shadow-teal-500/20 active:scale-95 group">
        <ImageIcon className="w-5 h-5 group-hover:animate-bounce" />
        Use Demo Room
      </button>
    </div>;
};