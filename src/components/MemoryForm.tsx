import React, { useState } from 'react';
import { X, Calendar, MapPin, Tag, User, UserX } from 'lucide-react';
import { suggestedTags } from '../types/memory';

interface MemoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memory: any) => void;
}

export const MemoryForm: React.FC<MemoryFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    memoryText: '',
    location: '',
    timestamp: '',
    isAnonymous: false,
    tags: [] as string[]
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customTag, setCustomTag] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.length > 100) newErrors.title = 'Title must be under 100 characters';
    
    if (!formData.memoryText.trim()) newErrors.memoryText = 'Memory is required';
    if (formData.memoryText.length < 10) newErrors.memoryText = 'Memory must be at least 10 characters';
    if (formData.memoryText.length > 1000) newErrors.memoryText = 'Memory must be under 1000 characters';
    
    if (!formData.timestamp) newErrors.timestamp = 'Date and time are required';
    
    if (formData.tags.length > 5) newErrors.tags = 'Maximum 5 tags allowed';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: '',
        memoryText: '',
        location: '',
        timestamp: '',
        isAnonymous: false,
        tags: []
      });
      setErrors({});
      onClose();
    }
  };

  const addTag = (tag: string) => {
    if (formData.tags.length < 5 && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCustomTagAdd = () => {
    if (customTag.trim() && formData.tags.length < 5 && !formData.tags.includes(customTag.trim())) {
      addTag(customTag.trim());
      setCustomTag('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-cream rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-cream border-b border-warmBrown/10 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-display font-semibold text-warmBrown">
            Share Your Memory
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-warmBrown/5 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-warmBrown" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-warmBrown font-body font-medium mb-2">
              Memory Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-lg font-body bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                errors.title ? 'border-red-300 focus:ring-red-200' : 'border-warmBrown/20 focus:ring-sage/20'
              } focus:ring-2 focus:border-sage`}
              placeholder="A moment that changed everything..."
            />
            {errors.title && <p className="text-red-500 text-sm mt-1 font-body">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-warmBrown font-body font-medium mb-2">
              Your Memory
            </label>
            <textarea
              value={formData.memoryText}
              onChange={(e) => setFormData(prev => ({ ...prev, memoryText: e.target.value }))}
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg font-body bg-white/80 backdrop-blur-sm transition-all duration-300 resize-none ${
                errors.memoryText ? 'border-red-300 focus:ring-red-200' : 'border-warmBrown/20 focus:ring-sage/20'
              } focus:ring-2 focus:border-sage`}
              placeholder="Describe the moment, what happened, how it felt, why it matters to you..."
            />
            <div className="flex justify-between mt-1">
              {errors.memoryText && <p className="text-red-500 text-sm font-body">{errors.memoryText}</p>}
              <p className="text-warmBrown/60 text-sm font-body ml-auto">
                {formData.memoryText.length}/1000
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-warmBrown font-body font-medium mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                When did this happen?
              </label>
              <input
                type="datetime-local"
                value={formData.timestamp}
                onChange={(e) => setFormData(prev => ({ ...prev, timestamp: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg font-body bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                  errors.timestamp ? 'border-red-300 focus:ring-red-200' : 'border-warmBrown/20 focus:ring-sage/20'
                } focus:ring-2 focus:border-sage`}
              />
              {errors.timestamp && <p className="text-red-500 text-sm mt-1 font-body">{errors.timestamp}</p>}
            </div>

            <div>
              <label className="block text-warmBrown font-body font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location (optional)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-warmBrown/20 rounded-lg font-body bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-300"
                placeholder="Where were you?"
              />
            </div>
          </div>

          <div>
            <label className="block text-warmBrown font-body font-medium mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Tags ({formData.tags.length}/5)
            </label>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-sage/20 text-warmBrown rounded-full text-sm font-body flex items-center space-x-1 group"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-600 transition-colors duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  disabled={formData.tags.includes(tag) || formData.tags.length >= 5}
                  className="px-3 py-1 border border-sage/30 text-sage rounded-full text-sm font-body hover:bg-sage/10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleCustomTagAdd())}
                placeholder="Add custom tag..."
                className="flex-1 px-3 py-2 border border-warmBrown/20 rounded-lg font-body bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-300 text-sm"
                disabled={formData.tags.length >= 5}
              />
              <button
                type="button"
                onClick={handleCustomTagAdd}
                disabled={!customTag.trim() || formData.tags.length >= 5}
                className="px-4 py-2 bg-sage text-cream rounded-lg font-body font-medium hover:bg-sage/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Add
              </button>
            </div>
            {errors.tags && <p className="text-red-500 text-sm mt-1 font-body">{errors.tags}</p>}
          </div>

          <div className="flex items-center justify-between p-4 bg-warmBrown/5 rounded-lg">
            <div className="flex items-center space-x-3">
              {formData.isAnonymous ? (
                <UserX className="w-5 h-5 text-warmBrown/60" />
              ) : (
                <User className="w-5 h-5 text-warmBrown/60" />
              )}
              <span className="font-body text-warmBrown">
                {formData.isAnonymous ? 'Anonymous' : 'Public'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                formData.isAnonymous ? 'bg-sage' : 'bg-warmBrown/30'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 ${
                  formData.isAnonymous ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-warmBrown/30 text-warmBrown rounded-full font-body font-medium hover:bg-warmBrown/5 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-sage text-cream rounded-full font-body font-medium hover:bg-sage/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Share Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};