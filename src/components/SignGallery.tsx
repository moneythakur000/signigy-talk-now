
import { SignDisplay } from "./SignDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const alphabetSigns = [
  { letter: "A", description: "Make a fist with your hand, with your thumb resting on the side." },
  { letter: "B", description: "Hold your hand up with all fingers extended and together, thumb tucked." },
  { letter: "C", description: "Curve your hand into a C shape." },
  { letter: "D", description: "Make a circle with thumb and index finger, other fingers up." },
  { letter: "E", description: "Curl your fingers towards your palm." },
  { letter: "F", description: "Connect your thumb and index finger, other fingers extended." },
  { letter: "G", description: "Point your index finger forward, thumb extended outward." },
  { letter: "H", description: "Extend index and middle fingers together, parallel to the ground." },
  { letter: "I", description: "Make a fist with pinky extended upward." },
  { letter: "J", description: "Make the sign for I, then trace a J in the air." },
  { letter: "K", description: "Index finger pointing up, middle finger angled from thumb." },
  { letter: "L", description: "Extend thumb and index finger at a right angle." },
  { letter: "M", description: "Place three fingers over your thumb." },
  { letter: "N", description: "Place two fingers over your thumb." },
  { letter: "O", description: "Form a circle with all fingers touching the thumb." },
  { letter: "P", description: "Point your index finger down, thumb extended outward." },
  { letter: "Q", description: "Make a circle with thumb and index, other fingers extended." },
  { letter: "R", description: "Cross your index and middle fingers." },
  { letter: "S", description: "Make a fist with thumb over fingers." },
  { letter: "T", description: "Make a fist with thumb between index and middle fingers." },
  { letter: "U", description: "Extend index and middle fingers together, upward." },
  { letter: "V", description: "Extend index and middle fingers in a V shape." },
  { letter: "W", description: "Extend index, middle, and ring fingers in a W shape." },
  { letter: "X", description: "Make a fist with index finger bent in a hook." },
  { letter: "Y", description: "Extend thumb and pinky finger, other fingers closed." },
  { letter: "Z", description: "Draw a Z shape with your index finger." },
];

const phraseSigns = [
  { letter: "Hello", description: "Open hand near forehead, then move outward." },
  { letter: "Thank you", description: "Touch lips with fingertips, then move hand forward." },
  { letter: "Please", description: "Rub circle on chest with flat hand." },
  { letter: "Yes", description: "Make a fist and nod it up and down, like a head nodding." },
  { letter: "No", description: "Index and middle finger extended, touch thumb to fingers twice." },
  { letter: "I love you", description: "Extend pinky, index finger and thumb, other fingers closed." },
  { letter: "Sorry", description: "Make a fist and rub it in a circle over your chest." },
  { letter: "Good", description: "Flat hand starting at chin, moving forward and down." },
];

export function SignGallery() {
  return (
    <Tabs defaultValue="alphabet" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="alphabet">Alphabet</TabsTrigger>
        <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
      </TabsList>
      
      <TabsContent value="alphabet" className="mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {alphabetSigns.map((sign) => (
            <SignDisplay
              key={sign.letter}
              letter={sign.letter}
              description={sign.description}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="phrases" className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {phraseSigns.map((sign) => (
            <SignDisplay
              key={sign.letter}
              letter={sign.letter}
              description={sign.description}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
