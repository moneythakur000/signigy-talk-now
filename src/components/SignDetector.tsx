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

  const generateHandKeypoints = () => {
    const centerX = 320;
    const centerY = 240;
    
    const wrist = { x: centerX, y: centerY + 80 };
    
    const thumb = [
      { x: wrist.x - 20, y: wrist.y - 10 },
      { x: wrist.x - 30, y: wrist.y - 30 },
      { x: wrist.x - 35, y: wrist.y - 50 },
      { x: wrist.x - 30, y: wrist.y - 70 },
    ];
    
    const fingers = [
      {
        name: 'index',
        points: [
          { x: wrist.x - 10, y: wrist.y - 10 },
          { x: wrist.x - 10, y: wrist.y - 40 },
          { x: wrist.x - 10, y: wrist.y - 70 },
          { x: wrist.x - 10, y: wrist.y - 90 },
        ]
      },
      {
        name: 'middle',
        points: [
          { x: wrist.x, y: wrist.y - 10 },
          { x: wrist.x, y: wrist.y - 45 },
          { x: wrist.x, y: wrist.y - 80 },
          { x: wrist.x, y: wrist.y - 105 },
        ]
      },
      {
        name: 'ring',
        points: [
          { x: wrist.x + 10, y: wrist.y - 10 },
          { x: wrist.x + 10, y: wrist.y - 40 },
          { x: wrist.x + 10, y: wrist.y - 70 },
          { x: wrist.x + 10, y: wrist.y - 90 },
        ]
      },
      {
        name: 'pinky',
        points: [
          { x: wrist.x + 20, y: wrist.y - 10 },
          { x: wrist.x + 20, y: wrist.y - 35 },
          { x: wrist.x + 20, y: wrist.y - 60 },
          { x: wrist.x + 20, y: wrist.y - 75 },
        ]
      }
    ];
    
    return {
      wrist,
      thumb,
      fingers
    };
  };

  const drawHandKeypoints = (ctx: CanvasRenderingContext2D) => {
    if (!handDetected) return;
    
    const { wrist, thumb, fingers } = generateHandKeypoints();
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00FF00';
    ctx.fillStyle = '#FF0000';
    
    ctx.beginPath();
    ctx.arc(wrist.x, wrist.y, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    thumb.forEach((point, index) => {
      if (index > 0) {
        ctx.beginPath();
        ctx.moveTo(thumb[index - 1].x, thumb[index - 1].y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    fingers.forEach(finger => {
      finger.points.forEach((point, index) => {
        if (index > 0) {
          ctx.beginPath();
          ctx.moveTo(finger.points[index - 1].x, finger.points[index - 1].y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
      
      ctx.beginPath();
      ctx.moveTo(wrist.x, wrist.y);
      ctx.lineTo(finger.points[0].x, finger.points[0].y);
      ctx.stroke();
    });
  };

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
          
          if (canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }
        };
      }
    } catch (error) {
      console.error("Error accessing the webcam:", error);
      setHasPermission(false);
      toast.error("Could not access camera. Please enable camera permissions.");
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsDetecting(false);
      setDetectedSign(null);
      setHandDetected(false);
      
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    }
  };

  useEffect(() => {
    if (!isDetecting) return;
    
    const signs = ["A", "B", "C", "Hello", "Yes", "No", "Thank you", "I love you"];
    
    const detectionInterval = setInterval(() => {
      const isHandPresent = Math.random() > 0.3;
      setHandDetected(isHandPresent);
      
      if (isHandPresent) {
        const randomSignIndex = Math.floor(Math.random() * signs.length);
        setDetectedSign(signs[randomSignIndex]);
      } else {
        setDetectedSign(null);
      }
      
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
