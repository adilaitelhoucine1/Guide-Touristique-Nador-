import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Tableau de Bord - Guide Touristique Nador</h1>
        <div className="user-info">
          <span>Bienvenue, {user?.firstName} {user?.lastName}</span>
          <button onClick={handleLogout} className="logout-button">
            Déconnexion
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Lieux Touristiques</h3>
            <div className="stat-number">0</div>
            <p>Total des lieux</p>
          </div>
          
          <div className="stat-card">
            <h3>Lieux Actifs</h3>
            <div className="stat-number">0</div>
            <p>Visibles aux visiteurs</p>
          </div>
          
          <div className="stat-card">
            <h3>Abonnés Newsletter</h3>
            <div className="stat-number">0</div>
            <p>Inscrits à la newsletter</p>
          </div>
          
          <div className="stat-card">
            <h3>Catégories</h3>
            <div className="stat-number">9</div>
            <p>Types de lieux</p>
          </div>
        </div>

        <div className="actions-section">
          <h2>Actions Rapides</h2>
          <div className="action-buttons">
            <button className="action-button primary">
              Ajouter un Lieu
            </button>
            <button className="action-button secondary">
              Gérer les Lieux
            </button>
            <button className="action-button secondary">
              Voir les Abonnés
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;