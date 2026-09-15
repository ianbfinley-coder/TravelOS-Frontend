import { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import { getAirQuality, searchPlaces, searchFlights, searchEvents } from '../api/client';

export default function Dashboard({ health, loading, error }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [tripData, setTripData] = useState({
    origin: '',
    destination: '',
    departure: '',
    arrival: '',
    travelers: 1,
  });
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleTripChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    setSearchError('');
    setResults(null);

    try {
      if (!tripData.destination) {
        throw new Error('Please enter a destination');
      }

      const [places, events] = await Promise.all([
        searchPlaces('attractions', tripData.destination),
        searchEvents('activities', tripData.destination),
      ]);

      setResults({
        places: places.data,
        events: events.data,
        timestamp: new Date().toLocaleString(),
      });
    } catch (err) {
      setSearchError(err.message || 'Failed to search trips');
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
          onClick={() => setActiveTab('planner')}
        >
          Trip Planner
        </button>
        <button
          className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Trips
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="tab-content">
          <h2>Welcome to TravelOS</h2>
          <p className="subtitle">Your entire trip. One intelligent app.</p>

          <div className="status-card">
            <h3>System Status</h3>
            {loading ? (
              <p className="loading">Checking system status...</p>
            ) : error ? (
              <p className="error">Backend connection failed</p>
            ) : health ? (
              <div className="status-info">
                <p className="success">✅ Backend Connected</p>
                <p className="timestamp">Status: {health.status}</p>
                <p className="timestamp">Updated: {new Date(health.timestamp).toLocaleString()}</p>
              </div>
            ) : null}
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <h4>📍 Smart Destinations</h4>
              <p>Discover places, attractions, and events at your destination</p>
            </div>
            <div className="feature-card">
              <h4>✈️ Flight Search</h4>
              <p>Find and compare flights with real-time pricing</p>
            </div>
            <div className="feature-card">
              <h4>🎭 Local Events</h4>
              <p>Explore concerts, shows, and activities happening now</p>
            </div>
            <div className="feature-card">
              <h4>🗺️ Route Planning</h4>
              <p>Get directions and navigation for your trip</p>
            </div>
            <div className="feature-card">
              <h4>💨 Air Quality</h4>
              <p>Check air quality and weather at your destination</p>
            </div>
            <div className="feature-card">
              <h4>🏖️ Trip Management</h4>
              <p>Organize all your travel details in one place</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'planner' && (
        <div className="tab-content">
          <h2>Plan Your Trip</h2>

          <form className="trip-form" onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="origin">Departing From</label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  value={tripData.origin}
                  onChange={handleTripChange}
                  placeholder="e.g., New York"
                />
              </div>
              <div className="form-group">
                <label htmlFor="destination">Going To</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={tripData.destination}
                  onChange={handleTripChange}
                  placeholder="e.g., Paris"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="departure">Departure Date</label>
                <input
                  type="date"
                  id="departure"
                  name="departure"
                  value={tripData.departure}
                  onChange={handleTripChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="arrival">Return Date</label>
                <input
                  type="date"
                  id="arrival"
                  name="arrival"
                  value={tripData.arrival}
                  onChange={handleTripChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="travelers">Travelers</label>
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  min="1"
                  max="10"
                  value={tripData.travelers}
                  onChange={handleTripChange}
                />
              </div>
            </div>

            {searchError && <div className="error-message">{searchError}</div>}

            <button type="submit" className="search-btn" disabled={searching}>
              {searching ? 'Searching...' : 'Search Trips'}
            </button>
          </form>

          {results && (
            <div className="results-section">
              <h3>Results for {tripData.destination}</h3>
              <p className="results-timestamp">Found {new Date(results.timestamp).toLocaleString()}</p>

              {results.places && results.places.length > 0 && (
                <div className="results-group">
                  <h4>📍 Attractions & Places</h4>
                  <div className="results-list">
                    {results.places.slice(0, 5).map((place, idx) => (
                      <div key={idx} className="result-item">
                        <p className="result-name">{place.name || place.type || 'Attraction'}</p>
                        {place.rating && <p className="result-meta">⭐ {place.rating}/5</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.events && results.events.length > 0 && (
                <div className="results-group">
                  <h4>🎭 Events & Activities</h4>
                  <div className="results-list">
                    {results.events.slice(0, 5).map((event, idx) => (
                      <div key={idx} className="result-item">
                        <p className="result-name">{event.name || event.type || 'Event'}</p>
                        {event.date && <p className="result-meta">📅 {event.date}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="tab-content">
          <h2>Saved Trips</h2>
          <div className="empty-state">
            <p>📚 No saved trips yet</p>
            <p className="subtitle">Start planning your first trip above!</p>
          </div>
        </div>
      )}
    </div>
  );
}
