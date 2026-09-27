import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-red-50/80 backdrop-blur-md rounded-2xl shadow-sm border border-red-100">
      <div className="bg-red-100 p-3 rounded-full">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-1">Something went wrong</h3>
        <p className="text-sm text-red-600 max-w-md mx-auto">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="mt-4 flex items-center gap-2 bg-white text-red-600 px-5 py-2.5 rounded-lg border border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm font-medium"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
