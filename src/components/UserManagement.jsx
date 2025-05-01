import { useState, useEffect } from 'react';
import api from '../api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (name) => {
    setLoading(true);
    try {
      await api.delete(`/users/${name}`);
      setUsers(users.filter((user) => user !== name));
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}
      <ul className="text-slate-100 space-y-2 max-h-[500px] overflow-y-scroll">
        {users.map((user) => (
          <li key={user} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-lg">{user}</span>
            <button
              onClick={() => deleteUser(user)}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;