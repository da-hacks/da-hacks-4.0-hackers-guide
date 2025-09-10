'use client';

import { useTheme } from 'next-themes';

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
    <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          canGoPrevious
            ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300'
            : 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
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
                i === currentIndex ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'
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
            ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300'
            : 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
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
