'use client';

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface Chapter {
  id: string;
  title: string;
  filename: string;
}

interface SidebarProps {
  chapters: Chapter[];
  currentChapter: string;
}

export default function Sidebar({ chapters, currentChapter }: SidebarProps) {
  return (
    <div className="w-80 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 h-screen overflow-y-auto hidden md:block">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-base font-bold text-slate-800 dark:text-slate-100">DAHacks 4.0 Hacker&apos;s Guide</h1>
          <ThemeToggle />
        </div>
        <nav>
          <ul className="space-y-2">
            {chapters.map((chapter, index) => (
              <li key={chapter.id}>
                <Link
                  href={`/${chapter.id}`}
                  className={`block w-full px-4 py-3 rounded-lg transition-colors ${
                    currentChapter === chapter.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-l-4 border-blue-500 dark:border-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-slate-400 dark:text-slate-500 mr-3">
                      {String(index + 1)}
                    </span>
                    <span className="font-medium">{chapter.title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
