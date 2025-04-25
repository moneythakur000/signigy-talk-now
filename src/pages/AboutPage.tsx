
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-4">About signigyX</h1>
        <p className="text-gray-500 mb-8 max-w-3xl">
          signigyX is dedicated to making sign language more accessible through advanced detection technology and interactive learning tools.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-500">
                Our mission is to break down communication barriers by leveraging technology to help people learn and understand sign language. We believe that everyone should have access to tools that make communication more inclusive.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-500">
                signigyX uses computer vision technology to detect and interpret sign language gestures in real-time. Our system recognizes hand shapes, movements, and positions to translate signs into text and speech.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-6 max-w-3xl">
          <div>
            <h3 className="text-lg font-semibold">Is signigyX free to use?</h3>
            <p className="text-gray-500 mt-1">
              Yes, the basic features of signigyX are free for everyone to use. We believe in making sign language detection accessible to all.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold">What sign languages are supported?</h3>
            <p className="text-gray-500 mt-1">
              Currently, signigyX supports American Sign Language (ASL). We are working on adding support for more sign languages in the future.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold">How accurate is the detection?</h3>
            <p className="text-gray-500 mt-1">
              Our sign language detection system is continuously improving. While it works well for basic signs and the alphabet, complex or rapid signing may be more challenging to detect accurately.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold">Can I use signigyX offline?</h3>
            <p className="text-gray-500 mt-1">
              At the moment, signigyX requires an internet connection to function properly. We are exploring options for offline functionality in future updates.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold">How can I provide feedback?</h3>
            <p className="text-gray-500 mt-1">
              We welcome feedback to improve signigyX! You can contact us at feedback@signigyx.com with your suggestions, bug reports, or feature requests.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
