
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export function SettingsMenu() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("signifyX-theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("light", savedTheme === "light");
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("signifyX-theme", newTheme);
    document.documentElement.classList.toggle("light");
    toast.success(`Theme switched to ${newTheme} mode`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full shadow-lg"
        onClick={toggleTheme}
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </div>
  );
}
