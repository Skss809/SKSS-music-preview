import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import USP from './components/USP';
import Feedback from './components/Feedback';
import { Music } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans selection:bg-indigo-500/30">
      <Navbar />
      
      <main>
        <Hero />
        <USP />
        <Feedback />
      </main>

      <footer className="bg-neutral-950 border-t border-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-neutral-400">SKSS Music</span>
          </div>
          
          <div className="text-neutral-500 text-sm text-center md:text-left">
            <p>Updates and patches will be added to this site.</p>
            <p className="mt-1">&copy; {new Date().getFullYear()} SKSS Music App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
