import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Editorial";
import { pageHead } from "@/lib/seo";
export const Route=createFileRoute("/journal")({head:()=>pageHead("Journal — Coming Soon","Future notes from James E. Craver.","/journal"),component:()=> <><PageHero eyebrow="Journal" title="Coming soon"><p>No articles have been published. Future essays and research notes will appear here.</p></PageHero><div className="h-40"/></>});
