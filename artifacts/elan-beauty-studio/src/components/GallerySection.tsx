import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Instagram, X } from 'lucide-react';
import { gallery, galleryCategories, salonConfig } from '../data/studio';

export function GallerySection() {
  const [category, setCategory] = useState('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const priorFocus = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const visibleItems = useMemo(
    () => category === 'All' ? gallery : gallery.filter((item) => item.category === category),
    [category],
  );
  const selected = selectedId ? visibleItems.find((item) => item.id === selectedId) ?? null : null;
  const selectedIndex = selected ? visibleItems.findIndex((item) => item.id === selected.id) : -1;

  function move(direction: number) {
    if (visibleItems.length < 1) return;
    const next = (selectedIndex + direction + visibleItems.length) % visibleItems.length;
    setSelectedId(visibleItems[next].id);
  }

  useEffect(() => {
    if (!selected) return;
    priorFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButton.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null);
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'Tab') {
        const dialog = document.querySelector<HTMLElement>('[data-gallery-dialog]');
        const controls = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled])')) : [];
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      priorFocus.current?.focus();
    };
    // The selected item is the only state needed to bind keys and restore focus.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <section id="gallery" className="bg-[#f0e9e0] py-20 md:py-28">
      <div className="section-wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-[#986458]">A few moments we love</p>
            <h2 className="serif text-4xl md:text-[54px]">Beauty, in every detail.</h2>
          </div>
          <p className="max-w-[330px] text-[13px] leading-6 text-[#76665d]">
            A collection of looks, little rituals and the lovely people who make ÉLAN what it is.
          </p>
        </div>
        <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
          {galleryCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => { setCategory(item); setSelectedId(null); }}
              aria-pressed={category === item}
              className={`filter-pill ${category === item ? 'filter-pill-active' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {visibleItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`gallery-item group relative overflow-hidden text-left ${index === 1 ? 'md:mt-12' : ''} ${index === 3 ? 'md:-mt-10' : ''}`}
              onClick={() => setSelectedId(item.id)}
              aria-label={`View larger image: ${item.title}`}
              data-testid={`gallery-item-${item.id}`}
            >
              <div className="image-grain aspect-[.78/1] overflow-hidden bg-[#d8c8ba]">
                <img src={item.image} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                <span className="gallery-overlay">
                  <span className="gallery-overlay-copy"><Instagram size={20} /> View Image</span>
                </span>
                <span className="absolute right-3 top-3 z-[2] grid h-9 w-9 place-items-center rounded-full bg-[#f5f0e8]/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ArrowUpRight size={15} />
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 py-3">
                <span className="serif text-[16px] md:text-[19px]">{item.title}</span>
                <span className="eyebrow text-[8px] text-[#9c8171]">{item.category}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <a href={salonConfig.instagramUrl} target="_blank" rel="noreferrer" className="button-outline">
            More on Instagram <Instagram size={14} />
          </a>
        </div>
      </div>

      {selected && (
        <div
          data-gallery-dialog
          className="gallery-lightbox fixed inset-0 z-[60] flex items-center justify-center bg-[#211a17]/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${selected.title}`}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedId(null); }}
          onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            const touchEndX = event.changedTouches[0]?.clientX;
            if (touchStartX.current === null || touchEndX === undefined) return;
            const delta = touchEndX - touchStartX.current;
            if (delta && Math.abs(delta) > 55) move(delta < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <button ref={closeButton} type="button" className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center border border-white/40 text-white hover:bg-white/10" onClick={() => setSelectedId(null)} aria-label="Close image viewer">
            <X size={20} />
          </button>
          <button type="button" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center text-white hover:bg-white/10 md:left-8" onClick={() => move(-1)} aria-label="Previous image">
            <ArrowLeft size={20} />
          </button>
          <figure className="max-h-full max-w-[900px] text-center">
            <img src={selected.image} alt={selected.alt} className="mx-auto max-h-[75vh] max-w-full object-contain" />
            <figcaption className="mt-4 text-[11px] tracking-[.12em] text-[#eee4da]">
              {selected.title} <span className="mx-2 text-[#a89182]">·</span> {selected.category}
            </figcaption>
          </figure>
          <button type="button" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center text-white hover:bg-white/10 md:right-8" onClick={() => move(1)} aria-label="Next image">
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}