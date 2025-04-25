
import { Layout } from "@/components/layout/Layout";
import { SignDetector } from "@/components/SignDetector";
import { SignGallery } from "@/components/SignGallery";
import { TextToSpeech } from "@/components/TextToSpeech";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <section className="py-12 bg-gradient-to-r from-signigyx-primary to-signigyx-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sign Language Detection Made Easy
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            signigyX helps you detect sign language gestures in real-time, making communication more accessible for everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/learn">Start Learning</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Link to="/practice">Practice Signs</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Try It Now</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Allow camera access and start making sign language gestures. Our system will detect and interpret your signs in real-time.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <SignDetector />
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Text to Speech</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Convert text to speech to help with pronunciation and communication.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <TextToSpeech />
          </div>
        </div>
      </section>
      
      <section className="py-16 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sign Language Reference</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse our gallery of sign language gestures to learn and practice.
          </p>
        </div>
        
        <SignGallery />
      </section>
      
      <section className="py-16 bg-signigyx-light">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn Sign Language?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your journey to learn sign language with our interactive tools and resources.
          </p>
          <Button asChild size="lg">
            <Link to="/learn">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
