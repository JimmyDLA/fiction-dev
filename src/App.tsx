import { ThemeProvider } from './lib/theme';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ParticleBackground from './components/Layout/ParticleBackground';
import Home from './pages/Home';
import StartProject from './pages/StartProject';
import { useEffect } from 'react';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="fiction-dev-theme">
      <LazyMotion features={domAnimation}>
        <div className="min-h-screen bg-[#eaf0f6] dark:bg-[#131722] text-[#0f172a] dark:text-[#f8fafc] transition-colors duration-300 overflow-x-hidden font-sans selection:bg-blue-100 dark:selection:bg-blue-900/60 selection:text-blue-900 dark:selection:text-blue-100 relative">
          <ParticleBackground />
          <Router basename={import.meta.env.BASE_URL}>
              <ScrollToTop />
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/start-project" element={<StartProject />} />
                </Routes>
              </main>
              <Footer />
          </Router>
        </div>
      </LazyMotion>
    </ThemeProvider>
  );
}

export default App;
