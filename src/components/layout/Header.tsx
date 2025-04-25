
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-signigyx-primary to-signigyx-secondary p-1 rounded-md">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-signigyx-primary to-signigyx-secondary bg-clip-text text-transparent">
            signigyX
          </span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Button variant="link" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/learn">Learn</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/practice">Practice</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/about">About</Link>
          </Button>
        </nav>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={isSpeaking ? "destructive" : "outline"}
            onClick={toggleSpeech}
          >
            {isSpeaking ? <MicOff size={16} /> : <Mic size={16} />}
            <span className="ml-2 hidden sm:inline">
              {isSpeaking ? "Speech Off" : "Speech On"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
