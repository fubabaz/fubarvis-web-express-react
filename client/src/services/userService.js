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

export const fetchTrophyData = async (githubId) => {
  try {
    const response = await fetch(`${API_URL}/users/${githubId}/trophies`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching trophy data:", error);
    throw error;
  }
};

export default {
  getUsers,
  fetchTrophyData,
};