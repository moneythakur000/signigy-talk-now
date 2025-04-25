
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Volume } from "lucide-react";

export function TextToSpeech() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to speak");
      return;
    }

    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
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
