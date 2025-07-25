import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Login } from "./pages/Login";
import { MyOrders } from "./pages/MyOrders";
import { AddNewOrder } from "./pages/AddNewOrder";
import { Products } from "./pages/Products";
import { UserManagement } from "./pages/UserManagement";
import { DatabaseLogs } from "./pages/DatabaseLogs";
import { Dashboard } from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface User {
  username: string;
  role: 'USER' | 'ADMIN';
  token: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = sessionStorage.getItem('bearerToken');
    const userData = sessionStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({ ...parsedUser, token });
      } catch (error) {
        console.error('Error parsing user data:', error);
        sessionStorage.removeItem('bearerToken');
        sessionStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    // Simulate authentication
    if (username === 'admin' && password === 'admin') {
      const userData = { username: 'admin', role: 'ADMIN' as const };
      const token = 'mock-bearer-token-admin';
      
      sessionStorage.setItem('bearerToken', token);
      sessionStorage.setItem('userData', JSON.stringify(userData));
      setUser({ ...userData, token });
      return true;
    } else if (username === 'user' && password === 'user') {
      const userData = { username: 'user', role: 'USER' as const };
      const token = 'mock-bearer-token-user';
      
      sessionStorage.setItem('bearerToken', token);
      sessionStorage.setItem('userData', JSON.stringify(userData));
      setUser({ ...userData, token });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bearerToken');
    sessionStorage.removeItem('userData');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!user ? (
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : (
            <Layout user={user} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Navigate to="/my-orders" replace />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/add-order" element={<AddNewOrder />} />
                <Route path="/products" element={<Products />} />
                {user.role === 'ADMIN' && (
                  <>
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/database-logs" element={<DatabaseLogs />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </>
                )}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
