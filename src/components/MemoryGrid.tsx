import React from 'react';
import { Memory } from '../types/memory';
import { MemoryCard } from './MemoryCard';
import { Clock, Heart } from 'lucide-react';

interface MemoryGridProps {
  memories: Memory[];
  loading: boolean;
  searchQuery: string;
}

export const MemoryGrid: React.FC<MemoryGridProps> = ({ memories, loading, searchQuery }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-sage border-t-transparent mx-auto mb-4"></div>
          <p className="text-warmBrown/70 font-body">Loading memories...</p>
        </div>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="w-12 h-12 text-softPink/60" />
            <Clock className="w-8 h-8 text-warmBrown/60" />
          </div>
          <h3 className="text-2xl font-display font-semibold text-warmBrown mb-3">
            {searchQuery ? 'No memories found' : 'No memories yet'}
          </h3>
          <p className="text-warmBrown/70 font-body leading-relaxed">
            {searchQuery 
              ? 'Try adjusting your search terms or browse all memories.'
              : 'Start building your memory wall by sharing a special moment that shaped your life.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-0">
        {memories.map((memory, index) => (
          <div key={memory.id} className="break-inside-avoid">
            <MemoryCard memory={memory} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};