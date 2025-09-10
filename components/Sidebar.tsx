'use client';

import Link from "next/link";

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
    <div className="w-80 bg-slate-50 border-r border-slate-200 h-screen overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold text-slate-800 mb-6">DAHacks 4.0 Guide</h1>
        <nav>
          <ul className="space-y-2">
            {chapters.map((chapter, index) => (
              <li key={chapter.id}>
                <Link
                  href={`/${chapter.id}`}
                  className={`block w-full px-4 py-3 rounded-lg transition-colors ${
                    currentChapter === chapter.id
                      ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-slate-400 mr-3">
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
