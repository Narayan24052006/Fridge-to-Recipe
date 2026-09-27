import { useState } from 'react';
import type { Recipe } from '../types/result';
import { CheckCircle2, Circle, Users, Flame, Utensils, ArrowRightLeft } from 'lucide-react';

interface RecipeViewProps {
  recipe: Recipe;
}

export default function RecipeView({ recipe }: RecipeViewProps) {
  const [servings, setServings] = useState(recipe.baseServings);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const scalingFactor = servings / recipe.baseServings;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-white">
        <h2 className="text-3xl font-extrabold mb-2 tracking-tight">{recipe.title}</h2>
        <p className="text-orange-50 text-lg">{recipe.description}</p>
        
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <Users className="w-5 h-5 text-orange-100" />
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors font-bold"
              >-</button>
              <span className="font-semibold w-4 text-center">{servings}</span>
              <button 
                onClick={() => setServings(servings + 1)}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors font-bold"
              >+</button>
            </div>
            <span className="text-sm font-medium">Servings</span>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ingredients & Swaps */}
        <div className="md:col-span-1 space-y-8">
          <section>
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800 mb-4 border-b pb-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              Ingredients
            </h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, idx) => {
                const amount = typeof ing.amount === 'number' 
                  ? (ing.amount * scalingFactor).toFixed(1).replace(/\.0$/, '') 
                  : ing.amount; // Keep string amounts as is if they are not numbers (though schema allows number|string, usually numbers make sense for scaling)
                
                return (
                  <li key={idx} className="flex justify-between items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="font-medium capitalize">{ing.item}</span>
                    <span className="text-gray-500 text-sm">{amount} {ing.unit}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {recipe.swaps && recipe.swaps.length > 0 && (
            <section>
              <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 mb-4 border-b pb-2">
                <ArrowRightLeft className="w-5 h-5 text-amber-500" />
                Substitutions
              </h3>
              <ul className="space-y-3">
                {recipe.swaps.map((swap, idx) => (
                  <li key={idx} className="bg-amber-50/50 p-3 rounded-lg text-sm border border-amber-100">
                    <span className="font-semibold text-amber-900">{swap.original}</span>
                    <ArrowRightLeft className="w-3 h-3 inline mx-2 text-amber-500" />
                    <span className="text-amber-800">{swap.alternative}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Instructions */}
        <div className="md:col-span-2">
          <section>
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800 mb-4 border-b pb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Instructions
            </h3>
            <div className="space-y-4">
              {recipe.steps.map((step, idx) => {
                const isCompleted = completedSteps[idx];
                return (
                  <div 
                    key={idx} 
                    onClick={() => toggleStep(idx)}
                    className={`flex gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                      isCompleted 
                        ? 'bg-green-50/50 border-green-200 text-gray-400' 
                        : 'bg-white border-gray-100 hover:border-orange-200 hover:shadow-md text-gray-700'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Step {idx + 1}</span>
                      <p className={`leading-relaxed ${isCompleted ? 'line-through' : ''}`}>{step}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
