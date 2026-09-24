import coverAsset from "@/assets/beyond-the-echoes-cover.png.asset.json";
import { cn } from "@/lib/utils";

export function BookCover({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={cn("book-object relative", className)}>
      <div className="absolute -inset-4 translate-y-7 bg-shadow/40 blur-2xl" aria-hidden="true" />
      <img
        src={coverAsset.url}
        alt="Cover of Beyond the Echoes of Black History: Great Black Inventions by James E. Craver"
        className="relative h-full w-full object-cover shadow-book"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
