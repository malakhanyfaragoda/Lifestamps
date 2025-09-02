import React from 'react';
import { MapPin, Clock, User, UserX } from 'lucide-react';
import { Memory, cardColors, cardRotations } from '../types/memory';
import { format } from 'date-fns';

interface MemoryCardProps {
  memory: Memory;
  index: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index }) => {
  const colorClass = cardColors[index % cardColors.length];
  const rotationClass = cardRotations[index % cardRotations.length];
  
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return format(date, 'MMM dd, yyyy \'at\' h:mm a');
    } catch {
      return timestamp;
    }
  };

  return (
    <div className={`bg-${colorClass} p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${rotationClass} hover:rotate-0 cursor-pointer group mb-4`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-handwritten text-xl font-semibold text-warmBrown leading-relaxed">
            {memory.title}
          </h3>
          <div className="flex items-center space-x-1 text-warmBrown/60">
            {memory.isAnonymous ? (
              <UserX className="w-4 h-4" />
            ) : (
              <User className="w-4 h-4" />
            )}
          </div>
        </div>
        
        <p className="font-body text-warmBrown/80 leading-relaxed text-sm">
          {memory.memoryText}
        </p>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-warmBrown/70">
            <Clock className="w-3 h-3" />
            <span className="font-body font-medium">
              {formatTimestamp(memory.timestamp)}
            </span>
          </div>
          
          {memory.location && (
            <div className="flex items-center space-x-2 text-warmBrown/70">
              <MapPin className="w-3 h-3" />
              <span className="font-body">{memory.location}</span>
            </div>
          )}
        </div>
        
        {memory.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {memory.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-warmBrown/10 text-warmBrown text-xs rounded-full font-body font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};