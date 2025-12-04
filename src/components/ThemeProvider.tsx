import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Function to determine theme based on time of day
    const getThemeByTime = (): Theme => {
      const hour = new Date().getHours();
      // Dark mode from 6 PM (18:00) to 6 AM (06:00)
      return (hour >= 18 || hour < 6) ? 'dark' : 'light';
    };

    // Check for saved theme preference, otherwise use time-based theme
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = savedTheme || getThemeByTime();
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    // Update theme every minute to check if time has changed
    const interval = setInterval(() => {
      const timeBasedTheme = getThemeByTime();
      setTheme(timeBasedTheme);
      document.documentElement.classList.toggle('dark', timeBasedTheme === 'dark');
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

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