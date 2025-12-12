import { useEffect, useState } from 'react';
import { Home, Users, MessageSquare, Star, LogOut, Menu, X, KeyRound } from 'lucide-react';
import { Button } from './ui/button';
import { baseUrl } from '../lib/base-url';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from './ThemeProvider';

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage?: string;
}

function AdminLayoutContent({ children, activePage = 'dashboard' }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(activePage);
  const [mounted, setMounted] = useState(false);

  // Just mount the component - auth is handled by the Astro page script
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update active page when URL changes
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/admin/clients')) {
      setCurrentPage('clients');
    } else if (path.includes('/admin/leads')) {
      setCurrentPage('leads');
    } else if (path.includes('/admin/reviews')) {
      setCurrentPage('reviews');
    } else if (path.includes('/admin/users')) {
      setCurrentPage('users');
    } else if (path.includes('/admin')) {
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sitrixx_token');
    localStorage.removeItem('sitrixx_user');
    window.location.href = `${baseUrl}/admin/login`;
  };

  const navItems = [
    { name: 'Dashboard', href: `${baseUrl}/admin`, icon: Home, key: 'dashboard' },
    { name: 'Clients', href: `${baseUrl}/admin/clients`, icon: Users, key: 'clients' },
    { name: 'Leads', href: `${baseUrl}/admin/leads`, icon: MessageSquare, key: 'leads' },
    { name: 'Reviews', href: `${baseUrl}/admin/reviews`, icon: Star, key: 'reviews' },
    { name: 'User Credentials', href: `${baseUrl}/admin/users`, icon: KeyRound, key: 'users' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Sitrixx Admin
        </h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-card border-r z-40 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b hidden lg:flex items-center justify-between">
          <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Sitrixx
          </h1>
          <ThemeToggle />
        </div>

        <nav className="p-4 space-y-2 mt-16 lg:mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={() => {
                  setIsSidebarOpen(false);
                  setCurrentPage(item.key);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/20 to-purple-600/20 text-primary font-semibold'
                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-card">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full rounded-xl justify-start text-foreground dark:!text-white hover:text-foreground dark:hover:!text-white [&_svg]:text-foreground dark:[&_svg]:!text-white"
          >
            <LogOut size={20} className="mr-3" />
            <span className="text-foreground dark:!text-white">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-20 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout(props: AdminLayoutProps) {
  return (
    <ThemeProvider>
      <AdminLayoutContent {...props} />
    </ThemeProvider>
  );
}
