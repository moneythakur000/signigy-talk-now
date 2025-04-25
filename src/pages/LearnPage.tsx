
import { Layout } from "@/components/layout/Layout";
import { SignDisplay } from "@/components/SignDisplay";
import { SignDetector } from "@/components/SignDetector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LearnPage = () => {
  const [currentLetter, setCurrentLetter] = useState("A");
  const [progress, setProgress] = useState(0);
  
  const alphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const descriptions: Record<string, string> = {
    "A": "Make a fist with your hand, with your thumb resting on the side.",
    "B": "Hold your hand up with all fingers extended and together, thumb tucked.",
    "C": "Curve your hand into a C shape.",
    "D": "Make a circle with thumb and index finger, other fingers up.",
    // Basic descriptions for learning
    "E": "Curl your fingers towards your palm.",
    "F": "Connect your thumb and index finger, other fingers extended.",
  };
  
  const goToNextLetter = () => {
    const currentIndex = alphabetLetters.indexOf(currentLetter);
    if (currentIndex < alphabetLetters.length - 1) {
      setCurrentLetter(alphabetLetters[currentIndex + 1]);
      setProgress(((currentIndex + 1) / (alphabetLetters.length - 1)) * 100);
    }
  };
  
  const goToPrevLetter = () => {
    const currentIndex = alphabetLetters.indexOf(currentLetter);
    if (currentIndex > 0) {
      setCurrentLetter(alphabetLetters[currentIndex - 1]);
      setProgress(((currentIndex - 1) / (alphabetLetters.length - 1)) * 100);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Learn Sign Language</h1>
        
        <Tabs defaultValue="alphabet" className="mb-8">
          <TabsList>
            <TabsTrigger value="alphabet">Alphabet</TabsTrigger>
            <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alphabet" className="space-y-6 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Learning the Alphabet</h2>
              <div className="text-sm text-gray-500">Letter {alphabetLetters.indexOf(currentLetter) + 1} of {alphabetLetters.length}</div>
            </div>
            
            <Progress value={progress} className="w-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-4">
                  <SignDisplay
                    letter={currentLetter}
                    description={descriptions[currentLetter] || "Position your hand as shown."}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button onClick={goToPrevLetter} disabled={currentLetter === "A"} variant="outline">
                    Previous
                  </Button>
                  <Button onClick={goToNextLetter} disabled={currentLetter === "Z"}>
                    Next
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Try it yourself</h3>
                <SignDetector />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="phrases" className="space-y-6 p-4">
            <h2 className="text-xl font-semibold">Common Phrases</h2>
            <p className="text-gray-500">Coming soon! We're working on adding phrases to our learning platform.</p>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Tips for Learning Sign Language</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li>Practice regularly, even if just for a few minutes each day.</li>
            <li>Use a mirror to see your own hand movements clearly.</li>
            <li>Focus on accuracy rather than speed initially.</li>
            <li>Try to sign along when watching videos with sign language.</li>
            <li>Connect with others learning sign language to practice together.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default LearnPage;
