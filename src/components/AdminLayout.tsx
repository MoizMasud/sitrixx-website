import { useEffect, useState } from 'react';
import { Home, Users, MessageSquare, Star, Settings, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { baseUrl } from '../lib/base-url';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from './ThemeProvider';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

function AdminLayoutContent({ children, currentPage = 'dashboard' }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [activePage, setActivePage] = useState(currentPage);

  // Update active page when URL changes
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/admin/clients')) {
      setActivePage('clients');
    } else if (path.includes('/admin/leads')) {
      setActivePage('leads');
    } else if (path.includes('/admin/reviews')) {
      setActivePage('reviews');
    } else if (path.includes('/admin/settings')) {
      setActivePage('settings');
    } else if (path.includes('/admin')) {
      setActivePage('dashboard');
    }
  }, []);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const token = localStorage.getItem('sitrixx_token');
      
      if (!token) {
        // No token, redirect to login
        window.location.href = `${baseUrl}/admin/login`;
        return;
      }

      // Verify token with Supabase
      try {
        const { createClient } = (window as any).supabase;
        const SUPABASE_URL = 'https://lmvymcncmmxtgfhkosmc.supabase.co';
        const SUPABASE_ANON_KEY = 'sb_publishable_yeiYWuyhjZBBoSPcFRRKow__58efMlK';
        
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          // Invalid or expired token
          localStorage.removeItem('sitrixx_token');
          localStorage.removeItem('sitrixx_user');
          window.location.href = `${baseUrl}/admin/login`;
          return;
        }

        setIsAuthenticated(true);
        setIsChecking(false);
      } catch (error) {
        console.error('Auth check error:', error);
        window.location.href = `${baseUrl}/admin/login`;
      }
    };

    // Load Supabase if not already loaded
    if (!(window as any).supabase) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = () => checkAuth();
      document.head.appendChild(script);
    } else {
      checkAuth();
    }
  }, []);

  const handleLogout = async () => {
    try {
      const { createClient } = (window as any).supabase;
      const SUPABASE_URL = 'https://lmvymcncmmxtgfhkosmc.supabase.co';
      const SUPABASE_ANON_KEY = 'sb_publishable_yeiYWuyhjZBBoSPcFRRKow__58efMlK';
      
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Clear local storage
    localStorage.removeItem('sitrixx_token');
    localStorage.removeItem('sitrixx_user');
    
    // Redirect to login
    window.location.href = `${baseUrl}/admin/login`;
  };

  const navItems = [
    { name: 'Dashboard', href: `${baseUrl}/admin`, icon: Home, key: 'dashboard' },
    { name: 'Clients', href: `${baseUrl}/admin/clients`, icon: Users, key: 'clients' },
    { name: 'Leads', href: `${baseUrl}/admin/leads`, icon: MessageSquare, key: 'leads' },
    { name: 'Reviews', href: `${baseUrl}/admin/reviews`, icon: Star, key: 'reviews' },
    { name: 'Settings', href: `${baseUrl}/admin/settings`, icon: Settings, key: 'settings' },
  ];

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render admin content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
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
          <h1 className="text-2xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Sitrixx
          </h1>
          <ThemeToggle />
        </div>

        <nav className="p-4 space-y-2 mt-16 lg:mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.key;
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={() => {
                  setIsSidebarOpen(false);
                  setActivePage(item.key);
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
            className="w-full rounded-xl justify-start"
          >
            <LogOut size={20} className="mr-3" />
            Logout
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
