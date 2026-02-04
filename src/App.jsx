import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route publique */}
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          
          {/* Routes d'authentification */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Routes protégées */}
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          
          {/* Route par défaut */}
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
