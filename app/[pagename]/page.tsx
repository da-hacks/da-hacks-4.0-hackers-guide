import BookPage from "../../components/BookPage";

export default async function Page({ params }: { params: Promise<{ pagename: string }> }) {
  const { pagename } = await params;

  return (
    <BookPage currentChapter={pagename} />
  );
}
