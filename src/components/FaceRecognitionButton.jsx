/* eslint-disable react/prop-types */
import { useState } from 'react';
import api from '../api';

const FaceRecognitionButton = ({onAttempt}) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecognition = async () => {
    setLoading(true);
    try {
      const response = await api.post('/recognize');
      setResult(response.data);
      onAttempt()
    } catch (error) {
      console.error('Error:', error);
      setResult({ status: 'Error', message: 'Failed to recognize face' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h1 className='mb-3 text-xl font-semibold'>Remote Facial Recognition</h1>
      <button
        onClick={handleRecognition}
        disabled={loading}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Recognizing...' : 'Start Facial Recognition'}
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-lg font-semibold">Status: {result.status}</p>
          {result.name && <p className="text-lg">Name: {result.name}</p>}
        </div>
      )}
    </div>
  );
};

export default FaceRecognitionButton;