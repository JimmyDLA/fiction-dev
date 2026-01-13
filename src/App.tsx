import { ThemeProvider } from './lib/theme';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 overflow-x-hidden font-inter selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 relative">
        <ParticleBackground />
        <Router>
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
    </ThemeProvider>
  );
}

export default App;
