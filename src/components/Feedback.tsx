import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/error';
import { Send, LogIn, CheckCircle2 } from 'lucide-react';

export default function Feedback() {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user || !user.email) return;

    setLoading(true);
    setError('');
    
    try {
      // Create a unique ID for the feedback document
      const feedbackId = window.crypto.randomUUID();
      const feedbackRef = doc(db, 'feedback', feedbackId);
      
      const payload = {
        text: text.trim(),
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date().toISOString()
      };
      
      await setDoc(feedbackRef, payload);
      setSuccess(true);
      setText('');
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.CREATE, 'feedback');
      } catch (formattedErr: any) {
        setError("Could not submit feedback at this time. Network or permission issue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Got Feedback?</h2>
            <p className="text-neutral-400">
              Found a bug? Have a suggestion? Share it directly with the developer.
            </p>
          </div>

          {!user ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
              <LogIn className="w-10 h-10 text-neutral-500 mx-auto mb-4" />
              <p className="text-neutral-300 font-medium mb-2">Please login to submit feedback</p>
              <p className="text-sm text-neutral-500">Your feedback is tied to your account so we can follow up if needed.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5" />
                  Your feedback has been sent directly to the developer!
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-xs font-bold text-neutral-400 uppercase">
                  {user.email?.charAt(0)}
                </div>
                <div className="text-sm">
                  <p className="text-white font-medium">Posting as</p>
                  <p className="text-neutral-500">{user.email}</p>
                </div>
              </div>

              <div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us what you think..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all min-h-[120px] resize-y"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
              >
                {loading ? 'Sending...' : 'Send Feedback'}
                {!loading && <Send className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
