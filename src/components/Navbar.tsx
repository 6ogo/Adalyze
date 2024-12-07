import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-bold text-xl">Adalyze</span>
                <span className="text-xs text-gray-600">Marketing Analytics</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/pricing" className="text-gray-700 hover:text-blue-600">
              Pricing
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3">
                  <img
                    src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}`}
                    alt={user.email}
                    className="h-8 w-8 rounded-full"
                  />
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}