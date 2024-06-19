const API_URL = '/api';

const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default {
  getUsers,
};