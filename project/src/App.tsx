import React, { useState } from 'react';
import { Users, Palette, Code, Music2, MessageSquare, Search } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedTalents from './components/FeaturedTalents';
import Categories from './components/Categories';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import Home from './components/Home';

// Dummy user data for login
const dummyUser = {
  email: "user@example.com",
  password: "password123",
  name: "John Doe"
};

interface User {
  email: string;
  password: string;
  name: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [users, setUsers] = useState<User[]>([dummyUser]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      setShowAuth(false);
      setShowProfile(false); // Show home page by default after login
    } else {
      alert("Invalid credentials! Please check your email and password.");
    }
  };

  const handleSignup = (email: string, password: string, name: string) => {
    if (users.some(u => u.email === email)) {
      alert("Email already exists! Please use a different email or login.");
      return;
    }

    const newUser: User = {
      email,
      password,
      name
    };

    setUsers(prev => [...prev, newUser]);
    setIsAuthenticated(true);
    setCurrentUser(newUser);
    setShowAuth(false);
    setShowProfile(false); // Show home page by default after signup
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setShowProfile(false);
  };

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  if (showAuth) {
    return (
      <Auth 
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    );
  }

  if (isAuthenticated && currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          onLogout={handleLogout}
          onProfileClick={toggleProfile}
        />
        {showProfile ? (
          <UserProfile user={currentUser} />
        ) : (
          <Home />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main>
        <Hero onGetStarted={handleGetStarted} />
        <Categories />
        <FeaturedTalents />
      </main>
    </div>
  );
}

export default App;