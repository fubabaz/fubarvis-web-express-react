const API_URL = '/api';

const getProb = async () => {
  try {
    const response = await fetch(`${API_URL}/algorithm`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const individual = async () => {
  try {
    const response = await fetch(`${API_URL}/algorithm/individual`);
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
    getProb,
    individual,
};