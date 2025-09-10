import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import Sidebar from "../components/Sidebar";
import PageNavigation from "../components/PageNavigation";
import { notFound, redirect } from "next/navigation";

import fs from "fs";
import path from "path";

function titleCase(s: string) {
  return s.toLowerCase()
          .split(' ')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
}

// I love server actions 😍
async function generateChapters() {
  "use server";
  const chapters = [];
  const files = fs.readdirSync(path.join(process.cwd(), "content"));
  for (const file of files) {
    const id = file.replace(/^\d+-(.*)\.md$/, "$1");
    const title = titleCase(id.replace(/_/g, " "));
    chapters.push({ id, title, filename: file });
  }
  return chapters;
}

async function getContent(filename: string) {
  "use server";
  const content = fs.readFileSync(path.join(process.cwd(), "content", filename), "utf-8");
  return content;
}

export default async function BookPage({ currentChapter }: { currentChapter: string }) {
  const chapters = await generateChapters();
  const currentIndex = chapters.findIndex(chapter => chapter.id === currentChapter);
  if (currentIndex === -1) {
    notFound();
  }

  async function goToPrevious() {
    "use server";
    if (currentIndex > 0) {
      redirect(`/${chapters[currentIndex - 1].id}`);
    }
  }
  
  async function goToNext() {
    "use server";
    if (currentIndex < chapters.length - 1) {
      redirect(`/${chapters[currentIndex + 1].id}`);
    }
  }

  const content = await getContent(chapters[currentIndex].filename);

  return (
    <div className="flex h-screen">
      <Sidebar
        chapters={chapters}
        currentChapter={currentChapter}
      />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkBreaks]}
                rehypePlugins={[rehypeRaw, [rehypeExternalLinks, { target: "_blank" }]]}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </main>
        
        <PageNavigation
          currentIndex={currentIndex}
          totalPages={chapters.length}
          onPrevious={goToPrevious}
          onNext={goToNext}
          canGoPrevious={currentIndex > 0}
          canGoNext={currentIndex < chapters.length - 1}
        />
      </div>
    </div>
  );
}
