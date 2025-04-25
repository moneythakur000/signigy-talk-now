import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Volume } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TextToSpeechProps {
  detectedSigns?: string[];
}

export function TextToSpeech({ detectedSigns = [] }: TextToSpeechProps) {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [detectedHistory, setDetectedHistory] = useState<string[]>([]);

  useEffect(() => {
    if (detectedSigns.length > 0) {
      setDetectedHistory(prev => {
        const newHistory = [...prev, ...detectedSigns];
        return newHistory.slice(Math.max(0, newHistory.length - 10));
      });
    }
  }, [detectedSigns]);

  const appendDetection = (sign: string) => {
    setText(prev => {
      if (prev) {
        return `${prev} ${sign}`;
      }
      return sign;
    });
    toast.info(`Added "${sign}" to text`);
  };

  const speakText = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to speak");
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast.error("Speech synthesis failed");
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Your browser does not support text-to-speech");
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-lg">Recent Detected Signs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {detectedHistory.length > 0 ? (
              detectedHistory.map((sign, index) => (
                <Button 
                  key={index} 
                  size="sm" 
                  variant="outline" 
                  onClick={() => appendDetection(sign)}
                >
                  {sign}
                </Button>
              ))
            ) : (
              <p className="text-sm text-gray-500">No signs detected yet. Use the camera to detect signs.</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Textarea
        placeholder="Enter text to be spoken..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[100px]"
      />
      <div className="flex gap-2">
        {isSpeaking ? (
          <Button onClick={stopSpeaking} variant="destructive">
            Stop Speaking
          </Button>
        ) : (
          <Button onClick={speakText} disabled={!text.trim()}>
            <Volume size={16} className="mr-2" />
            Speak Text
          </Button>
        )}
      </div>
    </div>
  );
}
