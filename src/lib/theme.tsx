/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'fiction-dev-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    const resolvedTheme =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;

    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);

    const isDark = resolvedTheme === 'dark';
    const color = isDark ? '#131722' : '#eaf0f6';

    // Explicitly set CSS colorScheme & backgroundColor directly on root and body
    root.style.colorScheme = isDark ? 'dark' : 'light';
    document.body.style.colorScheme = isDark ? 'dark' : 'light';
    root.style.backgroundColor = color;
    document.body.style.backgroundColor = color;

    // Force WebKit/Blink status bar refresh by removing and re-appending all meta tags
    const existingMetas = document.querySelectorAll('meta[name="theme-color"]');
    existingMetas.forEach((meta) => meta.remove());

    const lightMeta = document.createElement('meta');
    lightMeta.name = 'theme-color';
    lightMeta.media = '(prefers-color-scheme: light)';
    lightMeta.content = color;
    document.head.appendChild(lightMeta);

    const darkMeta = document.createElement('meta');
    darkMeta.name = 'theme-color';
    darkMeta.media = '(prefers-color-scheme: dark)';
    darkMeta.content = color;
    document.head.appendChild(darkMeta);

    const defaultMeta = document.createElement('meta');
    defaultMeta.name = 'theme-color';
    defaultMeta.content = color;
    document.head.appendChild(defaultMeta);

    // Update iOS web app status bar style
    const appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleMeta) {
      appleMeta.setAttribute('content', isDark ? 'black-translucent' : 'default');
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    toggleTheme: () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return <ThemeProviderContext.Provider {...{ value }}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
