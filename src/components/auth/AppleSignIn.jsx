import { useState, useEffect } from 'react';
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase/firebaseConfig';

const AppleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check if browser is Safari (Apple Sign-In works best on Safari)
    const ua = navigator.userAgent;
    setIsSafari(/^((?!chrome|android).)*safari/i.test(ua));
  }, []);

  const handleAppleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new OAuthProvider('apple.com');

      // Optional: Request additional scopes for user info
      // Note: User info is only available on first sign-in
      provider.addScope('email');
      provider.addScope('name');

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get user info from ID token claims (optional)
      const credential = result.credential;
      const idTokenResult = await user.getIdTokenResult();

      console.log('Apple Sign-In successful:', {
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
      console.error('Apple Sign-In error:', err);

      if (err.code === 'auth/popup-blocked') {
        setError('Pop-up blocked. Please allow pop-ups for this site.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError('Sign-in cancelled.');
      } else {
        setError(err.message || 'Failed to sign in with Apple');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apple-signin">
      <button
        onClick={handleAppleSignIn}
        disabled={loading}
        className="signin-button apple-button"
      >
        {loading ? 'Signing in...' : 'Log in with Apple'}
      </button>
      {isSafari && (
        <p className="info-message">
          Recommended: Sign in with Apple works best on Safari
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AppleSignIn;
