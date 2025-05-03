
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Plus, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-theme-500 text-white p-1 rounded">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 20L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold">Devsidian</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/new-project">
                <Plus className="mr-1 h-4 w-4" />
                New Project
              </Link>
            </Button>
          )}
          
          {user ? (
            <Button variant="outline" size="sm" asChild>
              <Link to="/profile">
                <User className="mr-1 h-4 w-4" />
                Profile
              </Link>
            </Button>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link to="/auth">
                <LogIn className="mr-1 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
