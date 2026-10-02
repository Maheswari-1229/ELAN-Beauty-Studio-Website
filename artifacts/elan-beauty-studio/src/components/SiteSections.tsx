import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Clock3,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import {
  gallery,
  salonConfig,
  serviceCategories,
  services,
  stats,
  studioFeatures,
  testimonials,
} from '../data/studio';

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="hero-section relative overflow-hidden">
      <div className="section-wrap grid min-h-[690px] items-center gap-10 pb-14 pt-28 md:min-h-[770px] md:grid-cols-[.91fr_1.09fr] md:gap-14 md:pb-16 md:pt-32">
        <div className="relative z-10 order-2 max-w-[560px] md:order-1">
          <p className="rise eyebrow mb-6 flex items-center gap-3 text-[#f4d0bd]">
            <span className="h-px w-8 bg-[#e2b89f]" />
            Premium Beauty & Makeup Studio
          </p>
          <h1 className="rise serif text-[clamp(3.3rem,7.4vw,6.6rem)] leading-[.94] tracking-[-.055em] text-white [animation-delay:100ms]">
            Reveal Your
            <br />
            <em className="font-normal text-[#e8b9a4]">Most Beautiful</em>
            <br />
            Self.
          </h1>
          <p className="rise mt-7 max-w-[440px] text-[15px] leading-7 text-white/80 [animation-delay:180ms]">
            Luxury beauty, bridal makeup, hair styling and personalized experiences designed to make
            every moment unforgettable.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3 [animation-delay:240ms]">
            <button type="button" className="button-elan !border-[#b27868] !bg-[#b27868]" onClick={onBook}>
              Book Your Appointment <ArrowUpRight size={15} />
            </button>
            <a className="button-outline !border-white/60 !text-white hover:!border-white hover:!bg-white hover:!text-[#352b27]" href="#services">
              Explore Services <ArrowDown size={14} />
            </a>
          </div>
          <p className="mt-10 text-[11px] uppercase tracking-[.2em] text-white/60">
            {salonConfig.tagline}
          </p>
        </div>
        <div className="image-grain relative order-1 h-[360px] md:order-2 md:h-[590px]">
          <img
            src={salonConfig.images.hero}
            alt="Bride in an ivory veil with luminous, softly romantic makeup"
            className="h-full w-full object-cover object-[center_38%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#211713]/20 via-transparent to-[#211713]/10" />
          <div className="absolute bottom-5 left-5 z-[2] border border-white/50 bg-[#f4eee7]/90 px-4 py-3 backdrop-blur-sm md:bottom-8 md:left-[-35px] md:px-5">
            <p className="eyebrow text-[9px] text-[#986458]">The ÉLAN feeling</p>
            <p className="serif mt-1 text-lg">Beauty that feels like you.</p>
          </div>
          <span className="absolute right-4 top-4 z-[2] border border-white/60 px-3 py-2 text-[9px] tracking-[.14em] text-white md:right-7 md:top-7">
            {salonConfig.location.toUpperCase()} · EST. {salonConfig.established}
          </span>
        </div>
      </div>
      <a href="#stats" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] uppercase tracking-[.2em] text-white/60 md:flex">
        Scroll to explore <ArrowDown size={12} className="animate-bounce" />
      </a>
    </section>
  );
}

export function Stats() {
  function AnimatedStat({ value }: { value: string }) {
    const elementRef = useRef<HTMLParagraphElement>(null);
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
      const parts = /^([\d.]+)(.*)$/.exec(value);
      const target = Number(parts?.[1]);
      const suffix = parts?.[2] ?? '';
      if (!Number.isFinite(target)) {
        setDisplayValue(value);
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        setDisplayValue(value);
        return;
      }
      let frame = 0;
      let startTime = 0;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const tick = (time: number) => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / 900, 1);
          const eased = 1 - (1 - progress) ** 3;
          const number = target * eased;
          const formatted = Number.isInteger(target) ? Math.round(number).toString() : number.toFixed(1);
          setDisplayValue(`${formatted}${suffix}`);
          if (progress < 1) frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      }, { threshold: 0.7 });
      if (elementRef.current) observer.observe(elementRef.current);
      return () => {
        observer.disconnect();
        window.cancelAnimationFrame(frame);
      };
    }, [value]);

    return <p ref={elementRef} className="serif text-3xl text-[#8e574b] md:text-[38px]" aria-label={value}>{displayValue}</p>;
  }

  return (
    <section id="stats" aria-label="Studio at a glance" className="bg-[#fbf8f3]">
      <div className="section-wrap grid grid-cols-2 border-b border-[#ded3c8] py-8 md:grid-cols-4 md:py-10">
        {stats.map((item) => (
          <article key={item.label} data-reveal className="stats-item px-4 py-3 text-center md:border-r md:border-[#ded3c8] md:last:border-r-0">
            <AnimatedStat value={item.value} />
            <p className="mt-1 text-[10px] uppercase tracking-[.14em] text-[#76665d]">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const points = [
    'Personalized Beauty Experience',
    'Professional Makeup Artists',
    'Premium Products & Techniques',
  ];
  return (
    <section id="about" className="section-wrap grid gap-10 py-20 md:grid-cols-[.87fr_1.13fr] md:items-center md:gap-20 md:py-28">
      <div data-reveal className="image-grain relative h-[350px] md:h-[510px]">
        <img
          src={salonConfig.images.studio}
          alt="Warm, sunlit ÉLAN studio with a vintage brass mirror and sculptural plaster arch"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute bottom-5 left-5 z-[2] bg-[#f5f0e8] px-4 py-3 text-[10px] tracking-[.1em]">
          {salonConfig.location.toUpperCase()}
        </span>
        <span className="about-watermark" aria-hidden="true">E</span>
      </div>
      <div data-reveal className="relative max-w-[520px] py-2">
        <p className="eyebrow mb-5 text-[#986458]">About ÉLAN</p>
        <h2 className="serif text-4xl leading-[1.08] tracking-[-.025em] md:text-[52px]">
          Beauty Is More Than Appearance. <em className="font-normal text-[#986458]">It’s Confidence.</em>
        </h2>
        <p className="mt-6 text-[14px] leading-7 text-[#76665d]">
          We believe beauty is personal. Our artists take the time to understand what makes you feel
          like yourself, then bring that feeling to life with care, artistry and thoughtful detail.
        </p>
        <ul className="mt-6 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-[13px] text-[#51443d]">
              <Check size={16} className="shrink-0 text-[#986458]" /> {point}
            </li>
          ))}
        </ul>
        <a href="#why-us" className="mt-8 inline-flex items-center gap-3 border-b border-[#9d796a] pb-2 text-[10px] font-semibold uppercase tracking-[.15em]">
          Discover Our Story <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}

export function ServicesSection({ onChoose }: { onChoose: (service: string) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const visibleServices = useMemo(
    () => activeCategory === 'All' ? services : services.filter((service) => service.category === activeCategory),
    [activeCategory],
  );
  return (
    <section id="services" className="bg-[#eae2d8] py-20 md:py-28">
      <div className="section-wrap">
        <div className="mb-9 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-[#986458]">Beauty, thoughtfully considered</p>
            <h2 className="serif text-4xl md:text-[54px]">Our Signature Services</h2>
          </div>
          <p className="max-w-[340px] text-[13px] leading-6 text-[#76665d]">
            Everything you need to look and feel your absolute best. Every appointment begins with
            listening.
          </p>
        </div>
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter services by category">
          {serviceCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`filter-pill ${activeCategory === category ? 'filter-pill-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visibleServices.map((service) => (
            <article key={service.id} data-reveal className="service-image-card group overflow-hidden border border-[#d8cabe] bg-[#f8f4ee]">
              <div className="image-grain relative aspect-[1.03/1] overflow-hidden bg-[#d8c8ba]">
                <img src={service.image} alt={service.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <span className="service-image-shade" />
                <span className="absolute left-3 top-3 z-[2] bg-[#f5f0e8]/90 px-3 py-1.5 text-[9px] uppercase tracking-[.15em]">{service.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="serif text-[21px] leading-tight">{service.title}</h3>
                  <span className="shrink-0 pt-1 text-[11px] text-[#8e574b]">{service.price}</span>
                </div>
                <p className="mt-3 min-h-[54px] text-[12px] leading-5 text-[#76665d]">{service.detail}</p>
                <button type="button" onClick={() => onChoose(service.title)} className="service-link mt-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.13em]">
                  Explore Service <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BridalFeature({ onBook }: { onBook: () => void }) {
  return (
    <section className="bridal-feature relative isolate overflow-hidden text-white">
      <img src={salonConfig.images.hero} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#241915]/90 via-[#241915]/55 to-[#241915]/15" />
      <div className="section-wrap grid min-h-[490px] items-center gap-8 py-16 md:grid-cols-[1fr_auto] md:py-24">
        <div data-reveal className="max-w-[650px]">
          <p className="eyebrow mb-5 text-[#e8b9a4]">Your big day deserves perfection</p>
          <h2 className="serif text-4xl leading-[1.08] md:text-[58px]">Bridal Beauty, Designed Around You</h2>
          <p className="mt-6 max-w-[510px] text-[14px] leading-7 text-white/80">
            From your first conversation to the final finishing touch, our bridal packages are
            thoughtfully shaped around your style, your traditions and your day.
          </p>
          <button type="button" onClick={onBook} className="button-elan mt-8 !border-[#c8957e] !bg-[#c8957e]">
            View Bridal Packages <ArrowUpRight size={15} />
          </button>
        </div>
        <div data-reveal className="bridal-glass-card md:mr-3">
          <span className="eyebrow text-[9px] text-[#f2cbb7]">Bridal Packages</span>
          <p className="serif mt-2 text-2xl">A day to remember</p>
          <p className="mt-3 text-[11px] text-white/75">Starting from</p>
          <p className="serif mt-1 text-[32px]">₹4,999</p>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  return (
    <section className="section-wrap grid gap-10 py-20 md:grid-cols-[.8fr_1.2fr] md:items-center md:gap-16 md:py-28">
      <div data-reveal className="max-w-[430px]">
        <p className="eyebrow mb-5 text-[#986458]">Your beauty, your way</p>
        <h2 className="serif text-4xl leading-[1.1] md:text-[52px]">Transformations That Speak For Themselves</h2>
        <p className="mt-6 text-[14px] leading-7 text-[#76665d]">
          Discover the difference a thoughtful touch can make. Drag the slider to compare a soft,
          natural finish with a little extra ÉLAN.
        </p>
        <div className="mt-7 flex items-center gap-3 text-[11px] text-[#806f64]">
          <Sparkles size={15} className="text-[#986458]" /> Skin first. Always.
        </div>
      </div>
      <div data-reveal className="before-after relative aspect-[1.18/1] overflow-hidden bg-[#c8b5a5]">
        <img src={salonConfig.images.beauty} alt="Before: natural beauty look with softly defined features" className="absolute inset-0 h-full w-full object-cover object-[center_38%] saturate-[.63] brightness-[.82]" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={salonConfig.images.beauty} alt="After: finished makeup look with a luminous complexion" className="h-full w-full object-cover object-[center_38%]" />
        </div>
        <span className="absolute left-4 top-4 z-10 bg-[#f5f0e8]/90 px-3 py-2 text-[9px] uppercase tracking-[.15em]">Before</span>
        <span className="absolute right-4 top-4 z-10 bg-[#f5f0e8]/90 px-3 py-2 text-[9px] uppercase tracking-[.15em]">After</span>
        <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white bg-[#8e574b] text-white shadow-md">
            <ArrowLeft size={13} className="absolute left-[7px]" /><ArrowRight size={13} className="absolute right-[7px]" />
          </span>
        </div>
        <input
          aria-label="Compare the beauty look before and after"
          aria-valuetext={`${position}% toward the after look`}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const icons = [Award, Sparkles, Heart, ShieldCheck];
  return (
    <section id="why-us" className="bg-[#fbf8f3] py-20 md:py-24">
      <div className="section-wrap">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-4 text-[#986458]">The ÉLAN difference</p>
          <h2 className="serif text-4xl md:text-[52px]">Thoughtful in Every Detail</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {studioFeatures.map((feature, index) => {
            const Icon = icons[index];
            return (
              <article key={feature.number} data-reveal className="why-card border border-[#ded3c8] bg-[#f5f0e8] p-6 md:p-7">
                <p className="serif text-2xl text-[#b68e7b]">{feature.number}</p>
                <Icon size={22} strokeWidth={1.5} className="my-6 text-[#986458]" />
                <h3 className="serif text-[21px] leading-tight">{feature.title}</h3>
                <p className="mt-3 text-[12px] leading-5 text-[#76665d]">{feature.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % testimonials.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused]);
  const move = (delta: number) => setIndex((current) => (current + delta + testimonials.length) % testimonials.length);
  const review = testimonials[index];

  return (
    <section id="testimonials" className="section-wrap py-20 md:py-28">
      <div
        data-reveal
        className="mx-auto max-w-[870px] text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}
      >
        <p className="eyebrow mb-5 text-[#986458]">Kind words, from the heart</p>
        <div className="mb-4 flex justify-center gap-1 text-[#b68e50]" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={15} fill="currentColor" strokeWidth={1} />)}
        </div>
        <div key={index} className="testimonial-copy" aria-live="polite" aria-atomic="true">
          <span className="serif text-5xl text-[#c4a795]" aria-hidden="true">“</span>
          <blockquote className="serif mx-auto max-w-[790px] text-[26px] leading-[1.34] tracking-[-.018em] md:text-[40px]">
            “{review.quote}”
          </blockquote>
          <p className="mt-7 text-[11px] font-semibold uppercase tracking-[.14em]">{review.name}</p>
          <p className="mt-1 text-[11px] text-[#8a796f]">{review.occasion}</p>
        </div>
        <div className="mt-8 flex items-center justify-center gap-5">
          <button type="button" className="carousel-arrow" aria-label="Previous testimonial" onClick={() => move(-1)}><ArrowLeft size={15} /></button>
          <div className="flex items-center gap-2" role="group" aria-label="Choose testimonial">
            {testimonials.map((item, dotIndex) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial from ${item.name}`}
                aria-pressed={index === dotIndex}
                onClick={() => setIndex(dotIndex)}
                className={`carousel-dot ${index === dotIndex ? 'carousel-dot-active' : ''}`}
              />
            ))}
          </div>
          <button type="button" className="carousel-arrow" aria-label="Next testimonial" onClick={() => move(1)}><ArrowRight size={15} /></button>
        </div>
      </div>
    </section>
  );
}

export function SocialProof() {
  return (
    <section className="bg-[#f0e9e0] py-16 md:py-20">
      <div className="section-wrap">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-3 text-[#986458]">A little daily inspiration</p>
            <h2 className="serif text-4xl">Follow Our Beauty Journey</h2>
          </div>
          <a href={salonConfig.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] text-[#7d5a4e] hover:underline">
            <Instagram size={16} /> {salonConfig.instagramHandle}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {gallery.map((item, index) => (
            <a key={`${item.id}-social`} href={salonConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label={`View ${item.title} on Instagram`} className={`social-tile group relative overflow-hidden ${index === 1 || index === 4 ? 'md:translate-y-4' : ''}`}>
              <img src={item.image} alt={item.alt} loading="lazy" className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-[#352b27]/0 text-white transition-colors group-hover:bg-[#352b27]/45">
                <span className="flex items-center gap-2 text-[9px] uppercase tracking-[.13em] opacity-0 transition-opacity group-hover:opacity-100">
                  <Instagram size={16} /> View on Instagram
                </span>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-9 text-center">
          <a href={salonConfig.instagramUrl} target="_blank" rel="noreferrer" className="button-outline">
            Follow Us on Instagram <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function BookingCTA({ onBook }: { onBook: () => void }) {
  return (
    <section className="booking-cta relative overflow-hidden bg-[#59453d] py-16 text-[#f5f0e8] md:py-20">
      <span aria-hidden="true" className="cta-orb cta-orb-one" />
      <span aria-hidden="true" className="cta-orb cta-orb-two" />
      <div className="section-wrap relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="eyebrow mb-4 text-[#dfbbaa]">Your moment starts here</p>
          <h2 className="serif max-w-[650px] text-4xl leading-[1.08] md:text-[52px]">Ready to Feel Beautiful?</h2>
          <p className="mt-4 max-w-[500px] text-[13px] leading-6 text-white/75">
            Reserve your appointment and let our beauty experts create a look that’s uniquely yours.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button type="button" onClick={onBook} className="button-elan !border-[#c8957e] !bg-[#c8957e]">
            Book Appointment <ArrowUpRight size={15} />
          </button>
          <a href={salonConfig.whatsapp} target="_blank" rel="noreferrer" className="button-outline !border-[#ddc2b0] !text-[#fff7ef] hover:!bg-[#f5f0e8] hover:!text-[#59453d]">
            WhatsApp Us <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function AppointmentContact({ selectedService }: { selectedService: string }) {
  const [service, setService] = useState(selectedService);
  const [sent, setSent] = useState(false);
  const minDate = useMemo(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  }, []);
  useEffect(() => setService(selectedService), [selectedService]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSent(true);
    form.reset();
    setService('');
  }

  return (
    <section id="contact" className="bg-[#fbf8f3]">
      <div className="section-wrap grid gap-12 py-20 md:grid-cols-[.82fr_1.18fr] md:gap-20 md:py-28">
        <div>
          <p className="eyebrow mb-5 text-[#986458]">Let’s create your perfect look</p>
          <h2 className="serif text-4xl leading-[1.1] md:text-[52px]">Let’s Create Your <em className="font-normal text-[#986458]">Perfect Look</em></h2>
          <p className="mt-6 max-w-[380px] text-[14px] leading-7 text-[#76665d]">
            Share a little about your plans and our beauty experts will help you find the right experience.
          </p>
          <div className="mt-8 space-y-5 text-[12px] leading-6 text-[#62534a]">
            <a className="flex items-start gap-3 hover:underline" href={`https://maps.google.com/?q=${encodeURIComponent(salonConfig.address)}`} target="_blank" rel="noreferrer">
              <MapPin size={16} className="mt-1 shrink-0 text-[#986458]" /><span>{salonConfig.address}</span>
            </a>
            <a href={salonConfig.phoneLink} className="flex items-center gap-3 hover:underline"><Phone size={15} className="text-[#986458]" />{salonConfig.phone}</a>
            <a href={`mailto:${salonConfig.email}`} className="flex items-center gap-3 hover:underline"><Mail size={15} className="text-[#986458]" />{salonConfig.email}</a>
          </div>
          <div className="mt-8 border-t border-[#ded3c8] pt-5">
            <p className="eyebrow mb-4 flex items-center gap-2 text-[#986458]"><Clock3 size={14} /> Opening hours</p>
            <div className="space-y-2">
              {salonConfig.openingHours.map(([day, hours]) => (
                <div key={day} className="flex max-w-[340px] justify-between gap-4 text-[11px] text-[#62534a]"><span>{day}</span><span>{hours}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {sent ? (
            <div role="status" className="border border-[#d2c4b8] bg-[#f0e9e0] p-7 md:p-10">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#8e574b] text-white"><Check size={20} /></span>
              <p className="eyebrow mt-6 text-[#986458]">Request prepared</p>
              <h3 className="serif mt-2 text-3xl">Thank you for reaching out.</h3>
              <p className="mt-3 max-w-[430px] text-[13px] leading-6 text-[#76665d]">
                This template has not sent or stored your details. Connect the form to your preferred booking system before using it with clients.
              </p>
              <button type="button" className="mt-6 text-[10px] font-semibold uppercase tracking-[.14em] underline underline-offset-4" onClick={() => setSent(false)}>Request another appointment</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-label">Name
                  <input name="name" required minLength={2} autoComplete="name" placeholder="Your name" className="form-input" data-testid="input-name" />
                </label>
                <label className="form-label">Phone
                  <input name="phone" required type="tel" autoComplete="tel" pattern="[0-9+()\\-\\s]{7,20}" title="Enter a valid phone number." placeholder="+91 XXXXX XXXXX" className="form-input" data-testid="input-phone" />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-label">Email
                  <input name="email" required type="email" autoComplete="email" placeholder="you@example.com" className="form-input" data-testid="input-email" />
                </label>
                <label className="form-label">Service
                  <select name="service" required value={service} onChange={(event) => setService(event.target.value)} className="form-input" data-testid="select-service">
                    <option value="" disabled>Choose a service</option>
                    {services.map((item) => <option key={item.id} value={item.title}>{item.title}</option>)}
                  </select>
                </label>
              </div>
              <label className="form-label">Preferred Date
                <input name="date" type="date" min={minDate} className="form-input" data-testid="input-date" />
              </label>
              <label className="form-label">Message
                <textarea name="message" rows={4} maxLength={500} placeholder="Tell us a little about your plans…" className="form-input resize-y" data-testid="input-message" />
              </label>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="button-elan" data-testid="button-request-appointment">
                  Request Appointment <ArrowUpRight size={15} />
                </button>
                <span className="text-[10px] leading-5 text-[#8a796f]">Demo only: details stay in this page and are not transmitted.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

type LegalTopic = 'privacy' | 'terms' | null;

export function SiteFooter() {
  const [legalTopic, setLegalTopic] = useState<LegalTopic>(null);
  useEffect(() => {
    if (!legalTopic) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setLegalTopic(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [legalTopic]);

  const quickLinks = [
    ['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Gallery', '#gallery'], ['Contact', '#contact'],
  ];
  return (
    <>
      <footer className="bg-[#59453d] text-[#f5f0e8]">
        <div className="section-wrap grid gap-10 py-12 md:grid-cols-[1.25fr_.8fr_1fr_1fr] md:gap-12 md:py-16">
          <div>
            <a href="#home" className="serif text-[27px] tracking-[.16em]">{salonConfig.shortName}</a>
            <p className="mt-2 text-[9px] uppercase tracking-[.2em]">Beauty Studio</p>
            <p className="mt-4 max-w-[260px] text-[12px] leading-6 text-white/70">{salonConfig.tagline}. Premium beauty and bridal artistry in {salonConfig.location}.</p>
            <a href={salonConfig.instagramUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[11px] hover:text-[#e8b9a4]">
              <Instagram size={15} /> {salonConfig.instagramHandle}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-4 text-[#dfbbaa]">Quick links</p>
            <ul className="space-y-3">{quickLinks.map(([label, href]) => <li key={href}><a href={href} className="text-[11px] text-white/75 transition-colors hover:text-white">{label}</a></li>)}</ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-[#dfbbaa]">Our services</p>
            <ul className="space-y-3">
              {['Bridal Makeup', 'Party Makeup', 'Hair Styling', 'Skincare'].map((service) => (
                <li key={service}><a href="#services" className="text-[11px] text-white/75 transition-colors hover:text-white">{service}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-[#dfbbaa]">Find us</p>
            <a href={salonConfig.facebookUrl} target="_blank" rel="noreferrer" className="block py-1 text-[11px] text-white/75 hover:text-white">Facebook</a>
            <a href={salonConfig.youtubeUrl} target="_blank" rel="noreferrer" className="block py-1 text-[11px] text-white/75 hover:text-white">YouTube</a>
            <a href={salonConfig.whatsapp} target="_blank" rel="noreferrer" className="block py-1 text-[11px] text-white/75 hover:text-white">WhatsApp</a>
            <a href={salonConfig.instagramUrl} target="_blank" rel="noreferrer" className="block py-1 text-[11px] text-white/75 hover:text-white">Instagram</a>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="section-wrap flex flex-col justify-between gap-3 py-5 text-[9px] tracking-[.08em] sm:flex-row sm:items-center">
            <span>© 2026 ÉLAN BEAUTY STUDIO. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-5">
              <button type="button" className="hover:underline" onClick={() => setLegalTopic('privacy')}>Privacy Policy</button>
              <button type="button" className="hover:underline" onClick={() => setLegalTopic('terms')}>Terms & Conditions</button>
            </div>
            <a href="#home" className="underline underline-offset-4">Back to top</a>
          </div>
        </div>
      </footer>
      {legalTopic && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-[#211a17]/75 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setLegalTopic(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="legal-title" className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto bg-[#fbf8f3] p-7 text-[#352b27] md:p-10">
            <button type="button" className="absolute right-4 top-4 grid h-10 w-10 place-items-center" aria-label="Close legal information" onClick={() => setLegalTopic(null)}><X size={20} /></button>
            <p className="eyebrow mb-3 text-[#986458]">ÉLAN Beauty Studio</p>
            <h2 id="legal-title" className="serif pr-10 text-3xl">{legalTopic === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}</h2>
            <p className="mt-5 text-[13px] leading-6 text-[#76665d]">
              This reusable website template includes sample legal information only. Before publishing for a salon client, replace this copy with terms and privacy details reviewed for that business and its local requirements.
            </p>
            <button type="button" className="button-elan mt-7" onClick={() => setLegalTopic(null)}>Close</button>
          </section>
        </div>
      )}
    </>
  );
}