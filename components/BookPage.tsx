import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm-configurable";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import fs from "fs";
import path from "path";

import Sidebar from "../components/Sidebar";
import PageNavigation from "../components/PageNavigation";
import { Chapter } from "../lib/types";

function titleCase(s: string) {
  return s.toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// I love server actions 😍
async function generateChapters() {
  "use server";
  const chapters: Chapter[] = [];
  const files = fs.readdirSync(path.join(process.cwd(), "content"));

  for (const file of files) {
    // trim out extension from filename
    const fileWithoutExt = file.replace(/\.md$/, "");

    // Check to make sure it's in the format "number-filename"
    // basically everything that matches the format will be shown in the TOC
    // everything else is a "side page"
    
    const regex = /^\d+-(.*)$/;
    const showInTOC = regex.test(fileWithoutExt);
    
    const id = fileWithoutExt.replace(regex, "$1");
    const title = titleCase(id.replace(/-/g, " "));

    const chapter = { id, title, filename: file, showInTOC };
    chapters.push(chapter);
  }
  return chapters;
}

async function getContent(filename: string) {
  "use server";
  const content = fs.readFileSync(path.join(process.cwd(), "content", filename), "utf-8");
  return content;
}

export default async function BookPage({ currentChapter }: { currentChapter: string }) {
  const chapters: Chapter[] = await generateChapters();
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
          <div className="max-w-6xl mx-auto px-8 pb-12">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkBreaks, remarkGfm]}
                rehypePlugins={[rehypeRaw, [rehypeExternalLinks, { target: "_blank" }]]}
                components={{
                  a: ({ href, children, ...props }) => {
                    // Check if it's an internal link (starts with / and not a protocol-relative URL)
                    if (href && href.startsWith("/") && !href.startsWith("//")) {
                      return (
                        <Link href={href} {...props}>
                          {children}
                        </Link>
                      );
                    }
                    // External links use regular anchor tags
                    // rehypeExternalLinks plugin adds target="_blank" which will be in props
                    return <a href={href} {...props}>{children}</a>;
                  },
                }}
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
