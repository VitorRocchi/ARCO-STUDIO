import { Inbox } from "lucide-react";

export function EmptyState({ title, description, compact = false }: { title: string; description: string; compact?: boolean }) {
  return <div className={`empty${compact ? " compact" : ""}`}><div><div className="empty-icon"><Inbox/></div><strong>{title}</strong><p>{description}</p></div></div>;
}
