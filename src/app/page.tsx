'use client';import { useState } from 'react';
import { Mail, Github, Linkedin, ArrowRight, Menu, X, Search } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';
import BlogPage from '../components/BlogPage';
import ContactPage from '../components/ContactPage';

const Home = () => {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="min-h-screen bg-white/70 backdrop-blur-sm relative">
      <AnimatedBackground activeColor={activePage} />
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      <div className="relative z-10 page-transition">
        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'blog' && <BlogPage />}
        {activePage === 'contact' && <ContactPage />}
      </div>
      <footer className="relative z-10 bg-white/80 backdrop-blur-sm border-t">
        {/* ... footer content ... */}
      </footer>
    </div>
  );
};

export default Home;
