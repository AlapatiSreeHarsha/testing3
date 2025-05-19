import React from 'react';
import { Search, Menu, X, Bell, LogOut, User } from 'lucide-react';

interface NavbarProps {
  isAuthenticated?: boolean;
  currentUser?: {
    name: string;
  } | null;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false, currentUser = null, onLogout, onProfileClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
              TalentHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <input
                type="text"
                placeholder="Search talents..."
                className="w-64 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
            </div>
            <a href="#" className="text-gray-700 hover:text-purple-600 relative group">
              Explore
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 relative group">
              Collaborate
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            {isAuthenticated && (
              <>
                <button className="relative">
                  <Bell className="h-6 w-6 text-gray-600 hover:text-purple-600 transition-colors duration-300" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">2</span>
                </button>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={onProfileClick}
                    className="flex items-center text-gray-700 hover:text-gray-900"
                  >
                    <User className="h-5 w-5 mr-2" />
                    <span>{currentUser?.name}</span>
                  </button>
                  <button 
                    onClick={onLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-300"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Explore
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Collaborate
            </a>
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2">
                  <button
                    onClick={onProfileClick}
                    className="flex items-center text-gray-700 hover:text-gray-900"
                  >
                    <User className="h-5 w-5 mr-2" />
                    <span>{currentUser?.name}</span>
                  </button>
                  <button 
                    onClick={onLogout}
                    className="mt-2 flex items-center space-x-2 text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500">
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;