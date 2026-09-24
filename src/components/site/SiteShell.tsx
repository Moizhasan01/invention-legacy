import { Link } from "@tanstack/react-router";
import { Menu, ArrowUpRight, Instagram, Facebook } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 36);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground">Skip to content</a>
      <header className={cn("fixed inset-x-0 top-0 z-40 border-b border-transparent transition-all duration-300", scrolled && "border-border/50 bg-background/95 shadow-sm backdrop-blur-md")}>
        <div className={cn("mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-all duration-300 lg:px-10", scrolled ? "h-16" : "h-20 lg:h-24")}>
          <Link to="/" className="group leading-none" aria-label="James E. Craver, home">
            <span className="block font-display text-xl font-semibold lg:text-2xl">James E. Craver</span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Author & Historical Record</span>
          </Link>
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
            {primaryNav.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className="nav-link">{item.label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden rounded-none px-5 uppercase tracking-[0.12em] sm:inline-flex"><Link to="/shop">Buy the Book</Link></Button>
            <Sheet>
              <SheetTrigger asChild><Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open navigation"><Menu /></Button></SheetTrigger>
              <SheetContent className="w-full border-border bg-charcoal p-8 text-cream sm:max-w-lg">
                <SheetHeader><SheetTitle className="font-display text-2xl text-cream">James E. Craver</SheetTitle></SheetHeader>
                <nav className="mt-14 flex flex-col" aria-label="Mobile navigation">
                  {primaryNav.map((item, index) => <SheetClose asChild key={item.to}><Link to={item.to} className="flex items-center justify-between border-b border-cream/15 py-4 font-display text-2xl"><span><small className="mr-4 font-sans text-[10px] text-gold">0{index + 1}</small>{item.label}</span><ArrowUpRight className="size-4" /></Link></SheetClose>)}
                </nav>
                <Button asChild className="mt-10 h-12 w-full rounded-none"><SheetClose asChild><Link to="/shop">Buy the Book</Link></SheetClose></Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <Footer />
      <Button asChild className="fixed bottom-4 left-4 right-4 z-30 h-12 rounded-none uppercase tracking-[0.12em] shadow-xl sm:hidden"><Link to="/shop">Buy the Book</Link></Button>
    </div>
  );
}

function Footer() {
  return <footer className="bg-charcoal px-5 pb-24 pt-16 text-cream sm:pb-10 lg:px-10 lg:pt-24">
    <div className="mx-auto grid max-w-[1400px] gap-12 border-b border-cream/15 pb-14 md:grid-cols-2 lg:grid-cols-4">
      <div><p className="font-display text-3xl">James E. Craver</p><p className="mt-3 max-w-xs text-sm leading-6 text-cream/60">Beyond the Echoes of Black History<br />Great Black Inventions</p></div>
      <FooterLinks title="Explore" links={[['The Book','/book'],['The Author','/author'],['Inventors','/inventors'],['Timeline','/timeline'],['Shop','/shop']]} />
      <FooterLinks title="Support" links={[['Contact','/contact'],['Shipping','/shipping'],['Privacy','/privacy'],['Terms','/terms'],['Refund Policy','/refund-policy']]} />
      <div><p className="eyebrow text-gold">The historical record</p><Button asChild className="mt-5 h-12 rounded-none bg-gold text-charcoal hover:bg-gold/90"><Link to="/shop">Buy the Book <ArrowUpRight /></Link></Button><p className="mt-5 text-xs text-cream/45">sales@[author-domain].com</p><div className="mt-5 flex gap-3"><span className="icon-placeholder" aria-label="Instagram link pending"><Instagram /></span><span className="icon-placeholder" aria-label="Facebook link pending"><Facebook /></span></div></div>
    </div>
    <div className="mx-auto flex max-w-[1400px] flex-col gap-2 pt-6 text-xs text-cream/45 sm:flex-row sm:justify-between"><p>© 2026 James E. Craver. All rights reserved.</p><p>Historical record. Documented with care.</p></div>
  </footer>;
}

function FooterLinks({ title, links }: { title: string; links: [string, string][] }) {
  return <div><p className="eyebrow text-gold">{title}</p><div className="mt-4 flex flex-col gap-2">{links.map(([label,to]) => <Link key={to} to={to} className="w-fit text-sm text-cream/65 transition-colors hover:text-cream">{label}</Link>)}</div></div>;
}
