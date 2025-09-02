import { useState, useEffect } from 'react';
import { Memory, memorySchema } from '../types/memory';

const STORAGE_KEY = 'memory-wall-memories';

export const useMemories = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMemories();
  }, []);

  const loadMemories = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMemories(parsed);
      }
    } catch (error) {
      console.error('Error loading memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMemories = (updatedMemories: Memory[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMemories));
      setMemories(updatedMemories);
    } catch (error) {
      console.error('Error saving memories:', error);
    }
  };

  const addMemory = (memoryData: Omit<Memory, 'id' | 'createdAt' | 'updatedAt' | 'approved'>) => {
    const newMemory: Memory = {
      ...memoryData,
      id: crypto.randomUUID(),
      approved: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      memorySchema.parse(newMemory);
      const updatedMemories = [newMemory, ...memories];
      saveMemories(updatedMemories);
      return true;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  const searchMemories = (query: string): Memory[] => {
    if (!query.trim()) return memories;
    
    const searchTerm = query.toLowerCase();
    return memories.filter(memory => 
      memory.title.toLowerCase().includes(searchTerm) ||
      memory.memoryText.toLowerCase().includes(searchTerm) ||
      memory.location?.toLowerCase().includes(searchTerm) ||
      memory.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  };

  return {
    memories,
    loading,
    addMemory,
    searchMemories
  };
};