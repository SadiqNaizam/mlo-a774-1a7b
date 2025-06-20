import React from 'react';
import { Link } from 'react-router-dom';

const MinimalFooter: React.FC = () => {
  console.log('MinimalFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t bg-background text-muted-foreground">
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center text-sm gap-3 sm:gap-4">
        <p className="text-center sm:text-left">
          &copy; {currentYear} AuthApp. All rights reserved. {/* Placeholder App Name */}
        </p>
        <nav className="flex gap-4 md:gap-6">
          {/* These links currently point to placeholder routes.
              Update them to actual routes or external URLs as needed.
              As per App.tsx, these will lead to the NotFound page if not updated. */}
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default MinimalFooter;