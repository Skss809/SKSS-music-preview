import { useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for redirect result on mount
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Successfully signed in via redirect");
          setUser(result.user);
        }
      })
      .catch((err) => {
        console.error("Redirect sign in error", err);
        setError(err.message);
      });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    try {
      // Use popup first, but the app is now prepared to handle redirect results too
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Google sign in error", err);
      if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups or try again.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        // User closed the popup, don't show as a scary error
      } else {
        setError(err.message);
      }
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.error("Sign out error", err);
      setError(err.message);
    }
  };

  return { 
    user, 
    loading, 
    error,
    signInWithGoogle, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
  };
}
