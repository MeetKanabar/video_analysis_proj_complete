import { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { useToast } from "../lib/use-toast";
import { useAnalysisStore } from "../lib/useAnalysisStore";
import { useNavigate } from "react-router-dom";

export default function VideoUploader() {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { setAnalysisResults } = useAnalysisStore();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a video file to upload.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      const result = await response.json();
      setAnalysisResults(result);
      toast({
        title: "Success",
        description: "Video uploaded and analyzed successfully!",
      });
      navigate("/analysis");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Failed to upload video. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      <Button onClick={handleUpload} disabled={!file}>
        <Upload className="mr-2 h-4 w-4" />
        Upload Video
      </Button>
    </div>
  );
}