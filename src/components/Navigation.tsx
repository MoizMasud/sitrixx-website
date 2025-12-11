import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogIn, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { baseUrl } from '../lib/base-url';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: `${baseUrl}/` },
    { name: 'About', href: `${baseUrl}/about` },
    { name: 'Services', href: `${baseUrl}/services` },
    { name: 'Portfolio', href: `${baseUrl}/portfolio` },
    { name: 'Automations', href: `${baseUrl}/automations` },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href={`${baseUrl}/`} className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Sitrixx
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            
            {/* Contact Icons */}
            <div className="flex items-center gap-3 ml-2">
              <a 
                href="tel:+15192122962"
                className="p-2 hover:bg-accent rounded-lg transition-colors group"
                aria-label="Call us"
              >
                <Phone size={18} className="text-foreground group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="mailto:sitrixx1@gmail.com"
                className="p-2 hover:bg-accent rounded-lg transition-colors group"
                aria-label="Email us"
              >
                <Mail size={18} className="text-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>

            <ThemeToggle />
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <a href={`${baseUrl}/admin/login`}>
                <LogIn size={16} className="mr-2" />
                Login
              </a>
            </Button>
            <Button asChild size="sm" className="rounded-xl bg-gradient-to-r from-primary to-purple-600">
              <a href={`${baseUrl}/contact`}>Get in Touch</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a 
              href="tel:+15192122962"
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Call us"
            >
              <Phone size={20} className="text-foreground" />
            </a>
            <a 
              href="mailto:sitrixx1@gmail.com"
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Email us"
            >
              <Mail size={20} className="text-foreground" />
            </a>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Contact Links in Mobile Menu */}
              <div className="flex gap-3 px-2 py-2 border-t border-border pt-4">
                <a 
                  href="tel:+15192122962"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone size={18} />
                  <span className="text-sm">(519) 212-2962</span>
                </a>
                <a 
                  href="mailto:sitrixx1@gmail.com"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Mail size={18} />
                </a>
              </div>

              <Button asChild variant="outline" className="w-full rounded-xl">
                <a href={`${baseUrl}/admin/login`} onClick={() => setIsOpen(false)}>
                  <LogIn size={16} className="mr-2" />
                  Login
                </a>
              </Button>
              <Button asChild className="w-full rounded-xl bg-gradient-to-r from-primary to-purple-600">
                <a href={`${baseUrl}/contact`} onClick={() => setIsOpen(false)}>
                  Get in Touch
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
