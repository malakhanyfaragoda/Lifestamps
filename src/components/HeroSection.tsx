import React from 'react';
import { Heart, Clock, Sparkles, UserX } from 'lucide-react';

interface HeroSectionProps {
  onAddMemory: () => void;
  memoryCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAddMemory, memoryCount }) => {
  return (
    <section className="bg-gradient-to-br from-cream via-cream to-softPink/10 py-20">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Sparkles className="w-8 h-8 text-softPink animate-pulse" />
          <Heart className="w-10 h-10 text-sage" fill="currentColor" />
          <Clock className="w-7 h-7 text-warmBrown" />
          <Sparkles className="w-8 h-8 text-softPink animate-pulse" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-warmBrown mb-6 leading-tight">
          The Time You Can't Forget
        </h1>
        
        <p className="text-xl sm:text-2xl text-warmBrown/80 font-body font-light mb-8 leading-relaxed max-w-3xl mx-auto">
          Share the exact moments that shaped your life. Every memory deserves to be remembered with its precise time and place.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
          <button
            onClick={onAddMemory}
            className="bg-sage hover:bg-sage/90 text-cream px-8 py-4 rounded-full font-body font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Share Your Memory
          </button>
          
          {memoryCount > 0 && (
            <p className="text-warmBrown/70 font-body">
              Join {memoryCount} {memoryCount === 1 ? 'person' : 'people'} sharing their moments
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
          <div className="text-center">
            <Clock className="w-8 h-8 text-sage mx-auto mb-3" />
            <h3 className="font-display font-semibold text-warmBrown mb-2">Precise Timestamps</h3>
            <p className="text-warmBrown/70 font-body text-sm">Capture the exact moment it happened</p>
          </div>
          <div className="text-center">
            <Heart className="w-8 h-8 text-softPink mx-auto mb-3" fill="currentColor" />
            <h3 className="font-display font-semibold text-warmBrown mb-2">Life Moments</h3>
            <p className="text-warmBrown/70 font-body text-sm">Share what truly mattered to you</p>
          </div>
          <div className="text-center">
            <UserX className="w-8 h-8 text-warmBrown/60 mx-auto mb-3" />
            <h3 className="font-display font-semibold text-warmBrown mb-2">Your Choice</h3>
            <p className="text-warmBrown/70 font-body text-sm">Share publicly or anonymously</p>
          </div>
        </div>
      </div>
    </section>
  );
};