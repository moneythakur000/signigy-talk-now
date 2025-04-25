
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone } from "lucide-react";

const developers = [
  {
    name: "Pranav Jasyal",
    image: "/placeholder.svg", // Will be replaced with actual image
  },
  {
    name: "Rohit Thakur",
    image: "/placeholder.svg", // Will be replaced with actual image
  },
  {
    name: "Raghav Thakur",
    image: "/placeholder.svg", // Will be replaced with actual image
  },
  {
    name: "Rizul Thakur",
    image: "/placeholder.svg", // Will be replaced with actual image
  }
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-4">About signifyX</h1>
        <p className="text-gray-500 mb-8 max-w-3xl">
          signifyX is developed to bridge communication gaps between the deaf community and others by providing real-time sign language detection and interpretation. Our mission is to make communication more accessible and inclusive for everyone.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Why signifyX?</h2>
              <p className="text-gray-500">
                According to WHO, over 5% of the world's population has disabling hearing loss. signifyX aims to empower these individuals by providing a tool that can help bridge communication barriers through technology.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Our Technology</h2>
              <p className="text-gray-500">
                Using advanced computer vision and machine learning, signifyX can detect hand keypoints in real-time, accurately interpreting sign language gestures and converting them into text and speech.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {developers.map((dev) => (
            <Card key={dev.name}>
              <CardContent className="p-4">
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-center">{dev.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <Mail className="w-6 h-6" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a href="mailto:albertmoney000@gmail.com" className="text-blue-600 hover:underline">
                  albertmoney000@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <Phone className="w-6 h-6" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a href="tel:7876121696" className="text-blue-600 hover:underline">
                  +91 7876121696
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
