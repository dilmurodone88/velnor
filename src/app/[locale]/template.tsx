// Sahifalar orasida silliq o'tish (faqat opacity, CSS — JS kutmaydi)
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
