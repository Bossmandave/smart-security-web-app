import { useState } from 'react';
import api from '../api';

const AlarmControl = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const soundAlarm = async () => {
    setLoading(true);
    try {
      const response = await api.post('/alarm_on');
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to sound alarm');
    } finally {
      setLoading(false);
    }
  };

  const stopAlarm = async () => {
    setLoading(true);
    try {
      const response = await api.post('/alarm_off');
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to stop alarm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
        <h1 className='mb-3 text-xl font-semibold'>Alarm Control</h1>
      <div className="flex gap-4">
        <button
          onClick={soundAlarm}
          disabled={loading}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Connecting...' : 'Alarm On'}
        </button>
        <button
          onClick={stopAlarm}
          disabled={loading}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Connecting...' : 'Alarm Off'}
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

export default AlarmControl;