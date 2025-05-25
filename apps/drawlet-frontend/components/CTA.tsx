import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import Button from './button';

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-1 bg-white/20 rounded-full px-4 py-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 font-medium">Loved by 10,000+ creators</span>
            </div>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Ready to start creating?
          </h2>
          
          <p className="text-xl lg:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who have made drawlwt their go-to collaborative whiteboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold transition-all duration-300">
              Schedule a Demo
            </Button>
          </div>

          <p className="text-purple-200 mt-6">
            No credit card required • Free forever • Start in seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;