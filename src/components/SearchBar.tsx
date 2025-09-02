import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, resultCount }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-warmBrown/60" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search memories, locations, tags..."
          className="block w-full pl-10 pr-10 py-3 border border-warmBrown/20 rounded-full bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-sage focus:border-sage font-body placeholder-warmBrown/60 transition-all duration-300"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-warmBrown/5 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5 text-warmBrown/60" />
          </button>
        )}
      </div>
      {value && (
        <p className="text-center mt-2 text-warmBrown/70 font-body text-sm">
          {resultCount} {resultCount === 1 ? 'memory' : 'memories'} found
        </p>
      )}
    </div>
  );
};