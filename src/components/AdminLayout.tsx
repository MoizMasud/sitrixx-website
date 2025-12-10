import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Star, 
  Settings, 
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { baseUrl } from '../lib/base-url';

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage: 'overview' | 'clients' | 'leads' | 'reviews' | 'settings';
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/admin' },
  { id: 'clients', label: 'Clients', icon: Users, href: '/admin/clients' },
  { id: 'leads', label: 'Leads', icon: UserPlus, href: '/admin/leads' },
  { id: 'reviews', label: 'Reviews', icon: Star, href: '/admin/reviews' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({ children, activePage }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b-2 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight">Sitrixx</h1>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
                ADMIN
              </span>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                MM
              </div>
              <span className="hidden md:inline text-sm font-medium">Admin</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border-2 rounded-xl shadow-xl py-2">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors"
                >
                  <User size={16} />
                  <span className="text-sm">Profile</span>
                </a>
                <hr className="my-2 border-border" />
                <a
                  href={`${baseUrl}/admin/login`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors text-red-500"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Log Out</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-card border-r-2 transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activePage;
            
            return (
              <a
                key={item.id}
                href={`${baseUrl}${item.href}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="pt-16 lg:pl-64">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
