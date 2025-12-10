import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark to prevent flash

  useEffect(() => {
    // Run once on mount
    const getThemeByTime = (): Theme => {
      const hour = new Date().getHours();
      return (hour >= 18 || hour < 6) ? 'dark' : 'light';
    };

    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = savedTheme || getThemeByTime();
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    // Only auto-update if no saved preference
    if (!savedTheme) {
      const interval = setInterval(() => {
        const timeBasedTheme = getThemeByTime();
        setTheme(prev => {
          if (prev !== timeBasedTheme) {
            document.documentElement.classList.toggle('dark', timeBasedTheme === 'dark');
            return timeBasedTheme;
          }
          return prev;
        });
      }, 60000);

      return () => clearInterval(interval);
    }
  }, []); // Empty deps - run only once

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
