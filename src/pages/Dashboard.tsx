import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import {User} from '../model/user';
import PlacesList from '../components/PlacesList';
import './Dashboard.css';



const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
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
          <div className="logo-section">
            <img src="https://cdn-icons-png.flaticon.com/512/5730/5730373.png" alt="Siya7a Logo" className="logo" />
            <h1 className="logo-text">Siya7a</h1>
          </div>
          <div className="user-info">
            <span>Bienvenue, {user?.firstName} {user?.lastName}</span>
            <button onClick={handleLogout} className="logout-button">
              Déconnexion
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <PlacesList />
        </main>
      </div>
  );
};

export default Dashboard;
