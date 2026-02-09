import axios from 'axios';

const API_URL = 'https://dummyjson.com/auth';

export const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password
      });

      const data = response.data;
      let token = null;
      
      if (data.token) {
        token = data.token;
      } else if (data.accessToken) {
        token = data.accessToken;
      } else if (data.access_token) {
        token = data.access_token;
      }
      

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));

        return data;
      } else {
        throw new Error('Token non trouvé dans la réponse API');
      }
      
    } catch (error) {
      if (error.response) {

        throw new Error(error.response.data?.message || `Erreur ${error.response.status}`);
      } else if (error.request) {
        throw new Error('Pas de réponse du serveur');
      } else {
        throw new Error(error.message || 'Erreur de connexion');
      }
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  }
};