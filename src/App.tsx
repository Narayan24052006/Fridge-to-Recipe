import { useState, useRef } from 'react';
import { fetchRecipeFromBackend } from './lib/api';
import { parseResult } from './lib/validateResult';
import type { Recipe } from './types/result';
import PromptInput from './components/PromptInput';
import RecipeView from './components/RecipeView';
import ErrorState from './components/ErrorState';
import LoadingState from './components/LoadingState';

type AppStatus = 'idle' | 'loading' | 'error' | 'success';

export default function App() {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Guard against stale responses overwriting newer ones
  const latestRequestId = useRef(0);

  const handleGenerate = async (userInput: string) => {
    const currentId = ++latestRequestId.current;
    setStatus('loading');
    setErrorMessage('');

    try {
      const rawPayload = await fetchRecipeFromBackend(userInput);

      // Stale check: discard if user triggered a newer request while this was in flight
      if (currentId !== latestRequestId.current) return;

      const validatedRecipe = parseResult(rawPayload);
      if (!validatedRecipe) {
        setStatus('error');
        setErrorMessage('The model returned a response that did not match the expected recipe structure.');
        return;
      }

      setRecipe(validatedRecipe);
      setStatus('success');
    } catch (err: unknown) {
      if (currentId !== latestRequestId.current) return;
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Fridge to Recipe
          </h1>
          <p className="text-sm text-gray-500">
            Turn your leftover ingredients into a structured, scalable meal plan.
          </p>
        </header>

        <PromptInput onSubmit={handleGenerate} disabled={status === 'loading'} />

        {status === 'loading' && <LoadingState />}
        {status === 'error' && (
          <ErrorState message={errorMessage} onRetry={() => setStatus('idle')} />
        )}
        {status === 'success' && recipe && <RecipeView recipe={recipe} />}
      </div>
    </div>
  );
}