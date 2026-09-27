import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 animate-pulse">
      <div className="relative">
        <div className="absolute inset-0 bg-orange-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin relative z-10" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Cooking up a recipe...</h3>
        <p className="text-sm text-gray-500">Our AI chef is reviewing your ingredients.</p>
      </div>
    </div>
  );
}
