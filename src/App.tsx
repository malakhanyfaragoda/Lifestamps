import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SearchBar } from './components/SearchBar';
import { MemoryGrid } from './components/MemoryGrid';
import { MemoryForm } from './components/MemoryForm';
import { useMemories } from './hooks/useMemories';

function App() {
  const { memories, loading, addMemory, searchMemories } = useMemories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMemories = useMemo(() => {
    return searchMemories(searchQuery);
  }, [memories, searchQuery, searchMemories]);

  const handleAddMemory = (memoryData: any) => {
    const success = addMemory(memoryData);
    if (success) {
      // Memory added successfully
    }
  };

  const showHero = memories.length === 0 && !searchQuery;

  return (
    <div className="min-h-screen bg-cream">
      <Header onAddMemory={() => setIsFormOpen(true)} />
      
      {showHero && (
        <HeroSection 
          onAddMemory={() => setIsFormOpen(true)} 
          memoryCount={memories.length}
        />
      )}
      
      {(memories.length > 0 || searchQuery) && (
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredMemories.length}
        />
      )}
      
      <MemoryGrid 
        memories={filteredMemories}
        loading={loading}
        searchQuery={searchQuery}
      />
      
      <MemoryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddMemory}
      />
    </div>
  );
}

export default App;