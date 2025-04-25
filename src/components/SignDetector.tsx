
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
  
  // Mock hand keypoint data with more realistic points for visualization
  const generateHandKeypoints = () => {
    const centerX = 320; // Assuming camera width of 640
    const centerY = 240; // Assuming camera height of 480
    
    // Create more realistic hand structure with 21 points (simplified)
    const wrist = { x: centerX, y: centerY + 80 };
    
    // Generate thumb points (4 points)
    const thumb = [
      { x: wrist.x - 20, y: wrist.y - 10 },  // thumb base
      { x: wrist.x - 30, y: wrist.y - 30 },  // thumb joint 1
      { x: wrist.x - 35, y: wrist.y - 50 },  // thumb joint 2
      { x: wrist.x - 30, y: wrist.y - 70 },  // thumb tip
    ];
    
    // Generate index finger (4 points)
    const indexFinger = [
      { x: wrist.x - 10, y: wrist.y - 10 },  // index base
      { x: wrist.x - 10, y: wrist.y - 40 },  // index joint 1
      { x: wrist.x - 10, y: wrist.y - 70 },  // index joint 2
      { x: wrist.x - 10, y: wrist.y - 90 },  // index tip
    ];
    
    // Generate middle finger (4 points)
    const middleFinger = [
      { x: wrist.x, y: wrist.y - 10 },       // middle base
      { x: wrist.x, y: wrist.y - 45 },       // middle joint 1
      { x: wrist.x, y: wrist.y - 80 },       // middle joint 2
      { x: wrist.x, y: wrist.y - 105 },      // middle tip
    ];
    
    // Generate ring finger (4 points)
    const ringFinger = [
      { x: wrist.x + 10, y: wrist.y - 10 },  // ring base
      { x: wrist.x + 10, y: wrist.y - 40 },  // ring joint 1
      { x: wrist.x + 10, y: wrist.y - 70 },  // ring joint 2
      { x: wrist.x + 10, y: wrist.y - 90 },  // ring tip
    ];
    
    // Generate pinky finger (4 points)
    const pinkyFinger = [
      { x: wrist.x + 20, y: wrist.y - 10 },  // pinky base
      { x: wrist.x + 20, y: wrist.y - 35 },  // pinky joint 1
      { x: wrist.x + 20, y: wrist.y - 60 },  // pinky joint 2
      { x: wrist.x + 20, y: wrist.y - 75 },  // pinky tip
    ];
    
    // Combine all points - 1 wrist + 4 points per finger * 5 fingers = 21 points
    return [wrist, ...thumb, ...indexFinger, ...middleFinger, ...ringFinger, ...pinkyFinger];
  };
  
  // Improved hand keypoints drawing function
  const drawHandKeypoints = (ctx: CanvasRenderingContext2D) => {
    if (!handDetected) return;
    
    const keypoints = generateHandKeypoints();
    
    // Draw connections between keypoints (for more realistic hand visualization)
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.6)';
    ctx.lineWidth = 2;
    
    // Connect thumb joints
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        ctx.moveTo(keypoints[1].x, keypoints[1].y);
      } else {
        ctx.lineTo(keypoints[i + 1].x, keypoints[i + 1].y);
      }
    }
    ctx.stroke();
    
    // Connect index finger joints
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        ctx.moveTo(keypoints[5].x, keypoints[5].y);
      } else {
        ctx.lineTo(keypoints[i + 5].x, keypoints[i + 5].y);
      }
    }
    ctx.stroke();
    
    // Connect middle finger joints
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        ctx.moveTo(keypoints[9].x, keypoints[9].y);
      } else {
        ctx.lineTo(keypoints[i + 9].x, keypoints[i + 9].y);
      }
    }
    ctx.stroke();
    
    // Connect ring finger joints
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        ctx.moveTo(keypoints[13].x, keypoints[13].y);
      } else {
        ctx.lineTo(keypoints[i + 13].x, keypoints[i + 13].y);
      }
    }
    ctx.stroke();
    
    // Connect pinky finger joints
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        ctx.moveTo(keypoints[17].x, keypoints[17].y);
      } else {
        ctx.lineTo(keypoints[i + 17].x, keypoints[i + 17].y);
      }
    }
    ctx.stroke();
    
    // Connect bases to wrist
    ctx.beginPath();
    ctx.moveTo(keypoints[0].x, keypoints[0].y); // Wrist
    ctx.lineTo(keypoints[1].x, keypoints[1].y); // Thumb base
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(keypoints[0].x, keypoints[0].y); // Wrist
    ctx.lineTo(keypoints[5].x, keypoints[5].y); // Index base
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(keypoints[0].x, keypoints[0].y); // Wrist
    ctx.lineTo(keypoints[9].x, keypoints[9].y); // Middle base
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(keypoints[0].x, keypoints[0].y); // Wrist
    ctx.lineTo(keypoints[13].x, keypoints[13].y); // Ring base
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(keypoints[0].x, keypoints[0].y); // Wrist
    ctx.lineTo(keypoints[17].x, keypoints[17].y); // Pinky base
    ctx.stroke();
    
    // Draw keypoints
    keypoints.forEach((point, index) => {
      ctx.fillStyle = index === 0 ? '#FF0000' : '#00FF00'; // Wrist is red, rest are green
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
          
          // Set canvas size to match video dimensions
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

  // Stop the webcam stream
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsDetecting(false);
      setDetectedSign(null);
      setHandDetected(false);
      
      // Clear canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
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
