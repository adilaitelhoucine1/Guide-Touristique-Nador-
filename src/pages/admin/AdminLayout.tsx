import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminLayout.css';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/5730/5730373.png" alt="Siya7a Logo" className="sidebar-logo" />
                    <h2>Siya7a</h2>
                </div>
                <nav className="sidebar-menu">
                    <button 
                        className={location.pathname === '/admin/dashboard' ? 'active' : ''}
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        <span>Tableau de bord</span>
                    </button>
                    <button 
                        className={location.pathname.includes('/admin/places') ? 'active' : ''}
                        onClick={() => navigate('/admin/places')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>Gestion des lieux</span>
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout-sidebar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>
            <div className="admin-main">
                <div className="admin-topbar">
                    <button onClick={() => navigate('/')} className="btn-explore">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <span>Explorer en visiteur</span>
                    </button>
                </div>
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
