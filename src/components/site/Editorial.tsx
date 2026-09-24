import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Inventor } from "@/lib/inventors";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children, dark = false }: { eyebrow: string; title: string; children?: ReactNode; dark?: boolean }) {
  return <section className={cn("paper-grid px-5 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-48", dark && "bg-charcoal text-cream")}><div className="mx-auto max-w-[1400px]"><p className="eyebrow text-gold">{eyebrow}</p><h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">{title}</h1>{children && <div className={cn("mt-7 max-w-2xl text-lg leading-8", dark ? "text-cream/70" : "text-muted-foreground")}>{children}</div>}</div></section>;
}

export function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return <div className="max-w-3xl"><p className="eyebrow text-gold">{eyebrow}</p><h2 className={cn("mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl", light && "text-cream")}>{title}</h2>{description && <p className={cn("mt-5 max-w-2xl text-base leading-7", light ? "text-cream/65" : "text-muted-foreground")}>{description}</p>}</div>;
}

export function InventorCard({ inventor }: { inventor: Inventor }) {
  return <article className="archive-card group flex min-h-72 flex-col border-t border-border bg-card px-5 py-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
    <div className="flex items-start justify-between gap-4"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Profile {String(inventor.profile).padStart(2,'0')}</span><span className="font-display text-xl text-muted-foreground">{inventor.year}</span></div>
    <h3 className="mt-8 font-display text-3xl leading-tight">{inventor.name}</h3>
    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{inventor.descriptor ?? "Profile documented in the manuscript chronology."}</p>
    <div className="mt-auto pt-8"><Button asChild variant="link" className="h-auto p-0 text-xs uppercase tracking-[0.14em]"><Link to="/inventors/$slug" params={{ slug: inventor.slug }}>Explore Profile <ArrowRight /></Link></Button></div>
  </article>;
}
