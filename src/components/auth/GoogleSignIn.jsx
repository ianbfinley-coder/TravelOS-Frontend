import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase/firebaseConfig';

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Google Sign-In successful:', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      // TODO: Send user info to your backend API
      // You can use the user's ID token for authentication:
      // const token = await user.getIdToken();
      // Call your backend API with the token

      // Redirect to dashboard or home page
      // window.location.href = '/dashboard';
    } catch (err) {
      console.error('Google Sign-In error:', err);
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="google-signin">
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="signin-button google-button"
      >
        {loading ? 'Signing in...' : 'Log in with Google'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default GoogleSignIn;
