
import { Layout } from "@/components/layout/Layout";
import { SignDetector } from "@/components/SignDetector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";

const PracticePage = () => {
  const [currentChallenge, setCurrentChallenge] = useState("A");
  const [score, setScore] = useState(0);
  
  const challenges = [
    "A", "B", "C", "Hello", "Thank you", "Yes", "No"
  ];
  
  const startNewChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    setCurrentChallenge(challenges[randomIndex]);
    toast.info(`New challenge: Show the sign for "${challenges[randomIndex]}"`);
  };
  
  const markCorrect = () => {
    setScore(score + 1);
    toast.success("Correct! Great job!");
    startNewChallenge();
  };
  
  const markIncorrect = () => {
    toast.error("Keep practicing, try again!");
    startNewChallenge();
  };

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Practice Sign Language</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div>Practice Mode</div>
                  <div className="text-sm bg-signigyx-primary text-white px-3 py-1 rounded-full">
                    Score: {score}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-4">
                  <div className="text-gray-500 mb-1">Current challenge:</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-signigyx-primary to-signigyx-secondary bg-clip-text text-transparent">
                    {currentChallenge}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500">
                  Make the sign for "{currentChallenge}" and show it to the camera.
                </div>
                
                <SignDetector />
                
                <Separator />
                
                <div className="text-center">
                  <div className="mb-4 text-gray-500">Did the system detect correctly?</div>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={markIncorrect}>
                      No, I'll Try Again
                    </Button>
                    <Button onClick={markCorrect}>
                      Yes, Next Challenge
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Practice Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Good Lighting</h3>
                  <p className="text-sm text-gray-500">
                    Make sure your hands are well-lit and visible to the camera.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Hand Position</h3>
                  <p className="text-sm text-gray-500">
                    Keep your hand in the center of the frame and make clear gestures.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Practice Regularly</h3>
                  <p className="text-sm text-gray-500">
                    Aim for at least 10-15 minutes of practice each day.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Use Feedback</h3>
                  <p className="text-sm text-gray-500">
                    Pay attention to what the system detects and adjust your signs accordingly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
