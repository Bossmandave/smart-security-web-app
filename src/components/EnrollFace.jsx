/* eslint-disable no-unused-vars */
import { useState } from 'react';
import api from '../api';

const EnrollFace = () => {
  const [name, setName] = useState('');
  const [files, setFiles] = useState([]); // Store multiple files
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Convert FileList to an array
   
    // Append new files to the existing files state
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    console.log(files); // Debugging

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0 || !name) {
      alert('Please provide a name and at least one image file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);

    // Append all files to the FormData object
    files.forEach((file, index) => {
      formData.append('files', file); // Use 'files' as the key
    });

    try {
      const response = await api.post('/enroll', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Failed to enroll face' });
    } finally {
      setLoading(false);
      setFiles([]); // Clear the files
      setName(''); // Clear the name
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Enroll New Face</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Images</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
            multiple // Allow multiple file selection
            required
          />
        </div>
        {files.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Selected files:</p>
            <ul className="list-disc list-inside">
              {files.map((file, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enrolling...' : 'Enroll Face'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {result.error ? (
            <p className="text-lg font-semibold text-red-500">Error: {result.error}</p>
          ) : (
            <p className="text-lg font-semibold">Status: {result.status}</p>
          )}
        </div>
      )}
      
    </div>
  );
};

export default EnrollFace;