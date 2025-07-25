import React from 'react';
import { Header } from './Header';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  user?: {
    username: string;
    role: 'USER' | 'ADMIN';
  } | null;
  onLogout: () => void;
}

export const Layout = ({ children, user, onLogout }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navbar user={user} onLogout={onLogout} />
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  );
};