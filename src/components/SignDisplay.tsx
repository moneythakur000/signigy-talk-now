
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume } from "lucide-react";

interface SignDisplayProps {
  letter: string;
  description: string;
  imageSrc?: string;
}

export function SignDisplay({ letter, description, imageSrc }: SignDisplayProps) {
  const speakSign = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(letter);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-gradient-to-r from-signigyx-primary to-signigyx-secondary text-white pb-2">
        <CardTitle className="flex justify-between items-center">
          {letter}
          <Button variant="ghost" size="icon" className="text-white h-6 w-6" onClick={speakSign}>
            <Volume size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow p-0">
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={`Sign for ${letter}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-6xl font-bold text-gray-300">{letter}</div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-3">
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardFooter>
    </Card>
  );
}
