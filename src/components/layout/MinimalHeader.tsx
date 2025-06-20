import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle'; // Added import

const MinimalHeader: React.FC = () => {
  console.log('MinimalHeader loaded');

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-background shadow-sm">
      <div className="container mx-auto max-w-7xl flex items-center justify-between"> {/* Changed to justify-between */}
        {/* The main page for unauthenticated users is the login page ('/') */}
        <Link to="/" className="text-2xl font-semibold text-primary hover:text-primary/90 transition-colors">
          AuthApp {/* Placeholder App Name - replace with your actual app name or LogoDisplay component */}
        </Link>
        {/* Example if using LogoDisplay component (assuming it's already created):
        <Link to="/">
          <LogoDisplay />
        </Link>
        */}
        <ThemeToggle /> {/* Added ThemeToggle component */}
      </div>
    </header>
  );
};

export default MinimalHeader;