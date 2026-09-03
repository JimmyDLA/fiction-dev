import Hero from '../components/Sections/Hero';
import Services from '../components/Sections/Services';
import Process from '../components/Sections/Process';
import About from '../components/Sections/About';
import Contact from '../components/Sections/Contact';
import Quote from '../components/Sections/Quote';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const id = state.scrollTo;
      const element = document.getElementById(id);
      if (element) {
        // Little delay to ensure rendering
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Process />
      <Services />
      <Quote />
      <Contact />
    </>
  );
};

export default Home;
