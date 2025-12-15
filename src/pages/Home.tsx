import Hero from '../components/Sections/Hero';
import Services from '../components/Sections/Services';
import Process from '../components/Sections/Process';
import About from '../components/Sections/About';
import Contact from '../components/Sections/Contact';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
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
      <Contact />
    </>
  );
};

export default Home;
