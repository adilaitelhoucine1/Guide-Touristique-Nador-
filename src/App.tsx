import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Dashboard from './pages/Dashboard';
import Home from './pages/visitor/Home/Home';
import PrivateRoute from './components/auth/PrivateRoute.jsx';
import PlaceDetails from "./pages/PlaceDetails/PlaceDetails";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
