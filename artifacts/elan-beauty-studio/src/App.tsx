import { useEffect, useState, type CSSProperties } from 'react';
import { GallerySection } from './components/GallerySection';
import { SiteNavigation } from './components/SiteNavigation';
import {
  About,
  AppointmentContact,
  BeforeAfter,
  BookingCTA,
  BridalFeature,
  Hero,
  ServicesSection,
  SiteFooter,
  SocialProof,
  Stats,
  Testimonials,
  WhyChooseUs,
} from './components/SiteSections';
import { salonConfig } from './data/studio';

const themeStyle = {
  '--salon-cream': salonConfig.colors.cream,
  '--salon-ivory': salonConfig.colors.ivory,
  '--salon-beige': salonConfig.colors.beige,
  '--salon-champagne': salonConfig.colors.champagne,
  '--salon-rose': salonConfig.colors.rose,
  '--salon-brown': salonConfig.colors.brown,
  '--salon-ink': salonConfig.colors.ink,
  '--salon-muted': salonConfig.colors.muted,
} as CSSProperties;

function App() {
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    document.title = 'ÉLAN Beauty Studio | Premium Beauty & Bridal Makeup';
    const descriptionText =
      'Premium beauty salon and bridal makeup studio offering professional makeup, hair styling, skincare and beauty services.';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    if (description) description.content = descriptionText;
    if (ogDescription) ogDescription.content = descriptionText;
    if (twitterDescription) twitterDescription.content = descriptionText;
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function scrollToAppointment() {
    document.getElementById('contact')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  function chooseService(service: string) {
    setSelectedService(service);
    scrollToAppointment();
  }

  return (
    <div className="site-shell min-h-screen bg-[#f5f0e8] text-[#352b27]" style={themeStyle}>
      <SiteNavigation onBook={scrollToAppointment} />
      <main>
        <Hero onBook={scrollToAppointment} />
        <Stats />
        <About />
        <ServicesSection onChoose={chooseService} />
        <BridalFeature onBook={() => chooseService('Bridal Makeup')} />
        <BeforeAfter />
        <GallerySection />
        <WhyChooseUs />
        <Testimonials />
        <SocialProof />
        <BookingCTA onBook={scrollToAppointment} />
        <AppointmentContact selectedService={selectedService} />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;