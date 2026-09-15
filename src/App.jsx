import { useState, useEffect } from 'react';
import './App.css';
import { checkHealth, getAirQuality, searchPlaces, searchFlights, searchEvents } from './api/client';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check backend health on mount
    checkHealth()
      .then(response => {
        setHealth(response.data);
        console.log('✅ Backend connected:', response.data);
      })
      .catch(err => {
        setError('Failed to connect to backend');
        console.error('❌ Backend error:', err.message);
      })
      .finally(() => setLoading(false));

    // Check for existing session
    const storedUser = localStorage.getItem('travelosUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('travelosUser');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('travelosUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('travelosUser');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🌍 TravelOS</h1>
          <p>Your entire trip. One intelligent app.</p>
        </div>
        <div className="user-menu">
          <span className="user-name">Welcome, {user.name || 'Traveler'}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="content">
        <Dashboard health={health} loading={loading} error={error} />
      </main>

      <footer>
        <p>TravelOS • Intelligent Trip Planning • Backend on port 3000</p>
      </footer>
    </div>
  );
}

export default App;
