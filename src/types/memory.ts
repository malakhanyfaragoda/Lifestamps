import { z } from 'zod';

export const memorySchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be under 100 characters'),
  memoryText: z.string().min(10, 'Memory must be at least 10 characters').max(1000, 'Memory must be under 1000 characters'),
  location: z.string().optional(),
  timestamp: z.string().min(1, 'Date and time are required'),
  isAnonymous: z.boolean(),
  approved: z.boolean().default(true),
  tags: z.array(z.string()).max(5, 'Maximum 5 tags allowed').default([]),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Memory = z.infer<typeof memorySchema>;

export const suggestedTags = [
  'life changing realization',
  'career milestone',
  'relationship',
  'travel',
  'family moment',
  'achievement',
  'loss',
  'friendship',
  'education',
  'health',
  'creativity',
  'adventure',
  'love',
  'growth',
  'discovery'
];

export const cardColors = [
  'card-lavender',
  'card-mint',
  'card-peach',
  'card-sky',
  'card-rose',
  'card-butter',
  'card-lilac',
  'card-seafoam',
  'card-coral',
  'card-lemon',
  'card-blush',
  'card-sage'
];

export const cardRotations = [
  'rotate-1',
  'rotate-2',
  'rotate-3',
  '-rotate-1',
  '-rotate-2',
  '-rotate-3'
];