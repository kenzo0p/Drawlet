import React from 'react';
import { ArrowRight, Palette, Zap, Users } from 'lucide-react';
import Button from './button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
      </div>

      <div className="relative container mx-auto px-6 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-fade-in">
              drawlwt
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto animate-fade-in delay-75">
              The ultimate collaborative whiteboard for teams, creators, and dreamers. 
              Draw, design, and brainstorm together in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in delay-150">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
              Start Drawing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg font-semibold transition-all duration-300">
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in delay-300">
            <div className="flex items-center justify-center space-x-2 text-purple-200">
              <Palette className="h-6 w-6" />
              <span className="font-medium">Infinite Canvas</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-200">
              <Zap className="h-6 w-6" />
              <span className="font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-200">
              <Users className="h-6 w-6" />
              <span className="font-medium">Real-time Collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;