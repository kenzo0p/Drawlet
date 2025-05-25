import React from 'react';
import { Pen, Share2, Layers, MousePointer, Square, Circle } from 'lucide-react';
import { Card, CardContent } from './card';

const Features = () => {
  const features = [
    {
      icon: <Pen className="h-8 w-8 text-purple-600" />,
      title: "Natural Drawing",
      description: "Intuitive drawing tools that feel natural and responsive. Create beautiful sketches, diagrams, and illustrations with ease."
    },
    {
      icon: <Share2 className="h-8 w-8 text-blue-600" />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team. See changes instantly and collaborate in real-time from anywhere in the world."
    },
    {
      icon: <Layers className="h-8 w-8 text-green-600" />,
      title: "Infinite Canvas",
      description: "Never run out of space. Our infinite canvas grows with your ideas, perfect for mind maps, wireframes, and complex diagrams."
    },
    {
      icon: <MousePointer className="h-8 w-8 text-orange-600" />,
      title: "Precise Selection",
      description: "Advanced selection tools for precise editing. Move, resize, and modify elements with pixel-perfect accuracy."
    },
    {
      icon: <Square className="h-8 w-8 text-red-600" />,
      title: "Shape Library",
      description: "Extensive collection of shapes, arrows, and connectors. Build professional diagrams and flowcharts effortlessly."
    },
    {
      icon: <Circle className="h-8 w-8 text-indigo-600" />,
      title: "Smart Snapping",
      description: "Intelligent guides and snapping make alignment and positioning effortless. Create clean, organized layouts automatically."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> create</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed for creators, teams, and organizations who demand the best drawing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;