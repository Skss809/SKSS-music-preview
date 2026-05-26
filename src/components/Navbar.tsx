import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Music, LogOut, ChevronDown } from 'lucide-react';
import { auth } from '../lib/firebase';

export default function Navbar() {
  const { user, loading, signInWithGoogle, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setShowLogin(false);
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setAuthError('Email/Password login is not enabled. Please enable it in your Firebase Console > Authentication > Sign-in method.');
      } else {
        setAuthError(err.message);
      }
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError('');
    try {
      await signInWithGoogle();
      setShowLogin(false);
    } catch (err: any) {
      setAuthError('Failed to sign in with Google.');
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">SKSS Music</span>
          </div>

          <div className="flex items-center gap-4">
            {!loading && user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-400 hidden sm:inline-block">
                  {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
                  aria-label="Log Out"
                >
                  <LogOut className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
            ) : !loading ? (
              <button
                onClick={() => setShowLogin(true)}
                className="text-sm font-medium px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
              >
                Login / Register
              </button>
            ) : null}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-2xl w-full max-w-md relative shadow-2xl">
            <button 
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-white text-center">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h2>

            {authError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {authError}
              </div>
            )}

            <button
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-neutral-800 flex-1"></div>
              <span className="text-sm text-neutral-500 font-medium">OR</span>
              <div className="h-px bg-neutral-800 flex-1"></div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors mt-2"
              >
                {isRegister ? 'Sign Up' : 'Log In'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-neutral-400">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                onClick={() => setIsRegister(!isRegister)}
                className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
              >
                {isRegister ? 'Log In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
