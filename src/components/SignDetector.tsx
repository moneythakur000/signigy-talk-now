
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Text, Volume } from "lucide-react";

export function SignDetector() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [detectedSign, setDetectedSign] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  // Start the webcam stream
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsDetecting(true);
          setHasPermission(true);
          toast.success("Camera access granted!");
        };
      }
    } catch (error) {
      console.error("Error accessing the webcam:", error);
      setHasPermission(false);
      toast.error("Could not access camera. Please enable camera permissions.");
    }
  };

  // Stop the webcam stream
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsDetecting(false);
      setDetectedSign(null);
    }
  };

  // Mock sign detection (this would be replaced with actual ML detection)
  useEffect(() => {
    if (!isDetecting) return;
    
    const signs = ["A", "B", "C", "Hello", "Yes", "No", "Thank you", "I love you"];
    
    const detectionInterval = setInterval(() => {
      // In a real app, this would be replaced with actual sign detection logic
      const randomSignIndex = Math.floor(Math.random() * signs.length);
      setDetectedSign(signs[randomSignIndex]);
    }, 3000);
    
    return () => clearInterval(detectionInterval);
  }, [isDetecting]);

  // Text to speech for detected sign
  const speakDetectedSign = () => {
    if (detectedSign && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(detectedSign);
      window.speechSynthesis.speak(utterance);
      toast.info(`Speaking: "${detectedSign}"`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="detection-box">
        <div className="webcam-container bg-gray-900">
          {!isDetecting && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 text-white flex-col gap-4">
              <p className="text-xl font-medium">Camera access required</p>
              <Button onClick={startWebcam} variant="secondary">Start Camera</Button>
            </div>
          )}
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
          {isDetecting && (
            <div className="detection-overlay">
              {/* This could contain guide overlays, hand position guides, etc */}
            </div>
          )}
        </div>
        
        {detectedSign && (
          <div className="detection-result">
            <span className="flex-1 text-center">{detectedSign}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20" 
              onClick={speakDetectedSign}
            >
              <Volume size={16} />
            </Button>
          </div>
        )}
      </Card>

      <div className="flex gap-2 justify-center">
        {isDetecting ? (
          <Button onClick={stopWebcam} variant="destructive">
            Stop Camera
          </Button>
        ) : (
          <Button onClick={startWebcam} variant="default">
            Start Camera
          </Button>
        )}
        
        {detectedSign && (
          <Button onClick={speakDetectedSign} variant="outline">
            <Volume size={16} className="mr-2" />
            Speak
          </Button>
        )}
      </div>
    </div>
  );
}
