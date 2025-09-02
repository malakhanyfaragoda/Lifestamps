import React from 'react';
import { Heart, Clock } from 'lucide-react';

interface HeaderProps {
  onAddMemory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddMemory }) => {
  return (
    <header className="bg-cream/90 backdrop-blur-sm sticky top-0 z-50 border-b border-warmBrown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="w-8 h-8 text-softPink" fill="currentColor" />
              <Clock className="w-4 h-4 text-warmBrown absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-warmBrown">
                Memory Wall
              </h1>
              <p className="text-sage font-body text-sm">The Time You Can't Forget</p>
            </div>
          </div>
          
          <button
            onClick={onAddMemory}
            className="bg-sage hover:bg-sage/90 text-cream px-6 py-3 rounded-full font-body font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Share Memory
          </button>
        </div>
      </div>
    </header>
  );
};