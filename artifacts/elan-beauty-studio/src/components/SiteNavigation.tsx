import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { salonConfig } from '../data/studio';

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Gallery', '#gallery'],
  ['Testimonials', '#testimonials'],
  ['Contact', '#contact'],
];

export function SiteNavigation({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const handleBook = () => {
    closeMenu();
    onBook();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-[#d9cec3] bg-[#f5f0e8]/95 shadow-[0_8px_30px_rgba(53,43,39,.06)] backdrop-blur-lg'
          : 'border-b border-white/20 bg-[#352b27]/20 text-white backdrop-blur-[2px]'
      }`}
    >
      <div className="section-wrap flex h-[76px] items-center justify-between md:h-[86px]">
        <a
          href="#home"
          onClick={closeMenu}
          className="flex items-baseline gap-2"
          aria-label={`${salonConfig.name} home`}
        >
          <span className="serif text-[29px] tracking-[.17em]">{salonConfig.shortName}</span>
          <span className="hidden text-[9px] tracking-[.19em] sm:inline">BEAUTY STUDIO</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="nav-link eyebrow text-[10px]">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            className="button-elan !px-5 !py-3"
            onClick={handleBook}
            data-testid="button-book-appointment"
          >
            Book Appointment <ArrowUpRight size={14} />
          </button>
        </div>
        <button
          ref={menuToggleRef}
          type="button"
          className="grid h-11 w-11 place-items-center lg:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          data-testid="button-toggle-navigation"
        >
          {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-menu absolute left-0 right-0 top-full border-b border-[#d9cec3] bg-[#f5f0e8] px-5 pb-6 pt-2 text-[#352b27] shadow-lg lg:hidden"
        >
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="block border-b border-[#ded3c8] py-4 text-xs uppercase tracking-[.15em]"
            >
              {label}
            </a>
          ))}
          <button type="button" className="button-elan mt-5 w-full" onClick={handleBook}>
            Book Appointment <ArrowUpRight size={14} />
          </button>
        </nav>
      )}
    </header>
  );
}