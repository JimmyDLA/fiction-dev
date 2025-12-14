import { ThemeProvider } from './lib/theme';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import Services from './components/Sections/Services';
import Process from './components/Sections/Process';
import About from './components/Sections/About';
import Contact from './components/Sections/Contact';
import ParticleBackground from './components/Layout/ParticleBackground';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="fiction-dev-theme">
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 overflow-x-hidden font-inter selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 relative">
        <ParticleBackground />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Process />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
