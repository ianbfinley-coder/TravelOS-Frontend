import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check (on root, not /api)
export const checkHealth = () =>
  axios.get(`${BACKEND_BASE_URL}/health`);

// Air quality
export const getAirQuality = (lat, lon) =>
  apiClient.get(`/air-quality/${lat}/${lon}`);

// Places
export const searchPlaces = (query, location) =>
  apiClient.get('/places/search', { params: { query, location } });

// Flights
export const searchFlights = (departure, arrival, date) =>
  apiClient.get('/flights/search', { params: { departure, arrival, date } });

// Events
export const searchEvents = (query, location) =>
  apiClient.get('/events/search', { params: { query, location } });

// Map
export const geocodeAddress = (address) =>
  apiClient.post('/map/geocode', { address });

export const getDirections = (origin, destination) =>
  apiClient.post('/map/directions', { origin, destination });
