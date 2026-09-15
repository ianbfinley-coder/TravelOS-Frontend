import { useState, useEffect } from 'react';
import './App.css';
import { checkHealth, getAirQuality } from './api/client';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    // Check backend health
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
  }, []);

  const handleAirQuality = async () => {
    try {
      const response = await getAirQuality(40.7128, -74.0060);
      setAirQuality(response.data);
      console.log('Air Quality Data:', response.data);
    } catch (err) {
      console.error('Air quality error:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 TravelOS</h1>
        <p>Your entire trip. One intelligent app.</p>
      </header>

      <main className="content">
        <section className="status">
          <h2>Backend Status</h2>
          {loading && <p>Checking backend connection...</p>}
          {error && <p className="error">❌ {error}</p>}
          {health && (
            <div className="health-info">
              <p className="success">✅ Backend Connected</p>
              <p>Status: {health.status}</p>
              <p>Time: {new Date(health.timestamp).toLocaleString()}</p>
            </div>
          )}
        </section>

        <section className="api-test">
          <h2>API Testing</h2>
          <button onClick={handleAirQuality}>
            Test Air Quality API (NYC)
          </button>
          {airQuality && (
            <div className="api-response">
              <pre>{JSON.stringify(airQuality, null, 2)}</pre>
            </div>
          )}
        </section>

        <section className="features">
          <h2>Available Features</h2>
          <ul>
            <li>✈️ Flight Search & Booking</li>
            <li>🏨 Hotel & Accommodation Finder</li>
            <li>🍽️ Restaurant & Dining Discovery</li>
            <li>🎫 Event & Activity Planning</li>
            <li>💰 Expense Tracking</li>
            <li>📍 Smart Itinerary Management</li>
            <li>🌡️ Weather & Air Quality</li>
            <li>🗺️ Maps & Directions</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>TravelOS • Backend on port 3000 • React Frontend</p>
      </footer>
    </div>
  );
}

export default App;
