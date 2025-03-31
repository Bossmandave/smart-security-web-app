import { useState } from 'react';
import api from '../api';

const DoorControl = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const lockDoor = async () => {
    setLoading(true);
    try {
      const response = await api.post('/lock');
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to lock door');
    } finally {
      setLoading(false);
    }
  };

  const unlockDoor = async () => {
    setLoading(true);
    try {
      const response = await api.post('/unlock');
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to unlock door');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h1 className='mb-3 text-xl font-semibold'>Door Lock Control</h1>
      <div className="flex gap-4">
        <button
          onClick={lockDoor}
          disabled={loading}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Locking...' : 'Lock Door'}
        </button>
        <button
          onClick={unlockDoor}
          disabled={loading}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Unlocking...' : 'Unlock Door'}
        </button>
      </div>
      {status && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-lg font-semibold">Status: {status}</p>
        </div>
      )}
    </div>
  );
};

export default DoorControl;