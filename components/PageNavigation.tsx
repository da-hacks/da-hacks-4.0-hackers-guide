'use client';

interface PageNavigationProps {
  currentIndex: number;
  totalPages: number;
  onPrevious: () => Promise<void>;
  onNext: () => Promise<void>;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export default function PageNavigation({
  currentIndex,
  totalPages,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: PageNavigationProps) {
  return (
    <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-white">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          canGoPrevious
            ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
            : 'text-slate-400 cursor-not-allowed'
        }`}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex ? 'bg-blue-500' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          canGoNext
            ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
            : 'text-slate-400 cursor-not-allowed'
        }`}
      >
        Next
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
