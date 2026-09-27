import React, { useState } from 'react';
import { ChefHat, ArrowRight } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (input: string) => void;
  disabled: boolean;
}

export default function PromptInput({ onSubmit, disabled }: PromptInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="ingredients" className="text-gray-700 font-medium flex items-center gap-2">
          <ChefHat className="text-orange-500 w-5 h-5" />
          What ingredients do you have?
        </label>
        <div className="relative">
          <textarea
            id="ingredients"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={disabled}
            placeholder="e.g. chicken breast, half an onion, some old carrots, rice, soy sauce..."
            className="w-full min-h-[120px] p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-y transition-all disabled:opacity-50 text-gray-800 placeholder-gray-400"
            rows={3}
          />
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg p-3 transition-colors shadow-md flex items-center justify-center group"
          >
            <span className="sr-only">Generate Recipe</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <p className="text-xs text-gray-400 pl-1">List any ingredients or leftovers. We'll handle the rest.</p>
      </form>
    </div>
  );
}
