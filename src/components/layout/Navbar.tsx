import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  user?: {
    username: string;
    role: 'USER' | 'ADMIN';
  } | null;
  onLogout: () => void;
}

export const Navbar = ({ user, onLogout }: NavbarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (path: string) => `
    px-4 py-2 rounded transition-colors font-medium
    ${isActive(path) 
      ? 'bg-accent text-accent-foreground' 
      : 'hover:bg-accent hover:text-accent-foreground text-primary-foreground'
    }
  `;

  if (!user) return null;

  return (
    <nav className="bg-primary border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-2">
        <div className="flex space-x-2">
          <Link to="/products" className={linkClasses('/products')}>
            Products
          </Link>
          <Link to="/my-orders" className={linkClasses('/my-orders')}>
            My Orders
          </Link>
          {user.role === 'ADMIN' && (
            <>
              <Link to="/user-management" className={linkClasses('/user-management')}>
                User Management
              </Link>
              <Link to="/database-logs" className={linkClasses('/database-logs')}>
                Database Logs
              </Link>
              <Link to="/dashboard" className={linkClasses('/dashboard')}>
                Dashboard
              </Link>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-primary-foreground font-medium">
            Welcome, {user.username}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout}
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};