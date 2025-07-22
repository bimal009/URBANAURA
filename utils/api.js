const API_BASE_URL = 'http://localhost:8000/api'; 

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const getAuthHeaders = () => {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };
  

export const fetchUserProfile = async () => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/auth/user`, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user profile');
  }

  const data = await response.json();
  return data.user;
};

export const updateUserProfile = async (userData) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/auth/user`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update user profile');
  }

  const data = await response.json();
  return data.user;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();
  
  if (data.token) {
    localStorage.setItem('token', data.token);
    window.dispatchEvent(new Event('authStateChanged'));
  }
  
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('authStateChanged'));
};

export const isAuthenticated = () => {
  return !!getToken();
}; 