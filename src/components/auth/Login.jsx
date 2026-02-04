import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice.ts';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      return;
    }

    const result = await dispatch(loginUser(formData));
    if (result.type === 'auth/login/fulfilled') {
      window.location.href = '/admin/dashboard';
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Connexion Administrateur</h2>
        <p className="login-subtitle">Guide Touristique Nador</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Identifiant</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Entrez votre identifiant"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Identifiants de test :</strong></p>
          <p>Username: emilys</p>
          <p>Password: emilyspass</p>
        </div>
      </div>
    </div>
  );
};

export default Login;