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
  return <div className="flex flex-col h-full">
      <h2 className="font-display text-xl font-semibold mb-2">Upload Room</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Start by uploading a photo of the room you want to redesign.
      </p>

      <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/60 hover:bg-accent/50 transition-all group min-h-[200px]">
        <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground">Drop image or click to upload</span>
        <span className="text-xs text-muted-foreground mt-1">JPG, PNG up to 10MB</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </label>

      <div className="mt-4 text-center">
        <span className="text-xs text-muted-foreground">or</span>
      </div>

      <button onClick={handleDemo} className="mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent hover:bg-accent/80 text-accent-foreground text-sm font-medium transition-colors">
        <ImageIcon className="w-4 h-4" />
        Use demo room
      </button>
    </div>;
};