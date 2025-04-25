
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Text, Volume } from "lucide-react";

export function SignDetector() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [detectedSign, setDetectedSign] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [handDetected, setHandDetected] = useState(false);
  
  // Mock hand keypoints for demonstration
  const drawHandKeypoints = (ctx: CanvasRenderingContext2D) => {
    if (!handDetected) return;
    
    // Draw keypoints (this is a simplified example)
    const keypoints = [
      { x: 100, y: 100 }, // thumb base
      { x: 120, y: 90 },  // thumb joint
      { x: 140, y: 80 },  // thumb tip
      // ... more keypoints would be added here in real implementation
    ];
    
    ctx.fillStyle = '#00ff00';
    keypoints.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  };
  
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
      setHandDetected(false);
    }
  };

  // Mock sign detection with hand presence detection
  useEffect(() => {
    if (!isDetecting) return;
    
    const signs = ["A", "B", "C", "Hello", "Yes", "No", "Thank you", "I love you"];
    
    const detectionInterval = setInterval(() => {
      // Simulate hand detection
      const isHandPresent = Math.random() > 0.3;
      setHandDetected(isHandPresent);
      
      if (isHandPresent) {
        const randomSignIndex = Math.floor(Math.random() * signs.length);
        setDetectedSign(signs[randomSignIndex]);
      } else {
        setDetectedSign(null);
      }
      
      // Update canvas with keypoints
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          if (isHandPresent) {
            drawHandKeypoints(ctx);
          }
        }
      }
    }, 1000);
    
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
        <div className="webcam-container bg-gray-900 relative">
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
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            width={640}
            height={480}
          />
        </div>
        
        {detectedSign && handDetected && (
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
        
        {detectedSign && handDetected && (
          <Button onClick={speakDetectedSign} variant="outline">
            <Volume size={16} className="mr-2" />
            Speak
          </Button>
        )}
      </div>
    </div>
  );
}
