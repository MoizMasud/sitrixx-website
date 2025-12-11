import { ThemeProvider } from './ThemeProvider';
import Navigation from './Navigation';
import ServicesPage from './ServicesPage';

export default function ServicesPageWrapper() {
  return (
    <ThemeProvider>
      <Navigation />
      <ServicesPage />
    </ThemeProvider>
  );
}
