/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import api from '../api';

const AccessLogs = ({onAttempt}) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/access-logs');
      setLogs(response.data.logs);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch access logs');
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = async () => {
    setLoading(true);
    try {
      await api.post('/clear-logs');
      setLogs([]); // Clear logs in the UI
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to clear logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [onAttempt]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Access Logs</h2>
      {error && <p className="text-lg text-red-500">{error}</p>}
      
      {loading && <p className="text-lg">Loading...</p>}
      <ul className="space-y-2 max-h-[500px] overflow-y-scroll">
        {logs.map((log, index) => (
          <li key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-lg">{log}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={clearLogs}
        disabled={loading}
        className="px-4 py-2 mt-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        Clear Logs
      </button>
    </div>
  );
};

export default AccessLogs;