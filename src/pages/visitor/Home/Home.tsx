import { Link } from 'react-router-dom';
import PlacesList from '../../../components/PlacesList';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="visitor-home">
      <header className="visitor-header">
        <div className="logo-section">
          <img src="https://cdn-icons-png.flaticon.com/512/5730/5730373.png" alt="Siya7a Logo" className="logo" />
          <h1 className="logo-text">Siya7a - Guide Touristique Nador</h1>
        </div>
        <nav>
          <Link to="/admin/login" className="admin-link">
            Espace Admin
          </Link>
        </nav>
      </header>

      <main className="visitor-content">
        <section className="hero">
          <h2>Découvrez les merveilles de Nador</h2>
          <p>Explorez les plus beaux lieux touristiques de notre région</p>
        </section>
        
        <PlacesList />
      </main>
    </div>
  );
};

export default Home;