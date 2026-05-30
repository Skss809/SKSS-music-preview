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
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure local persistence is set
    setPersistence(auth, browserLocalPersistence).catch(err => {
      console.warn("Could not set persistence", err);
    });

    // Check for redirect result on mount
    console.log("Checking for redirect result...");
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Successfully signed in via redirect:", result.user.email);
          setUser(result.user);
        } else {
          console.log("No redirect result found");
        }
      })
      .catch((err) => {
        console.error("Redirect sign in error", err);
        setError(`Redirect error: ${err.message}`);
      });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser ? "User found" : "No user");
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // Hint for mobile browsers
    provider.setCustomParameters({ prompt: 'select_account' });
    
    setError(null);
    try {
      // Use redirect on mobile for better reliability, popup on desktop
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      console.log("Starting Google Auth. Mobile mode:", isMobile);
      
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        try {
          await signInWithPopup(auth, provider);
        } catch (err: any) {
          if (err.code === 'auth/popup-blocked') {
            console.log("Popup blocked, falling back to redirect...");
            await signInWithRedirect(auth, provider);
          } else {
            throw err;
          }
        }
      }
    } catch (err: any) {
      console.error("Google sign in error", err);
      if (err.code === 'auth/popup-closed-by-user') {
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
