import { useNavigate } from 'react-router-dom';
import PlacesList from '../../components/PlacesList';
import AdminLayout from './AdminLayout';
import './AdminPlacesView.css';

const AdminPlacesView = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout>
            <div className="admin-places-view">
                <div className="admin-header">
                    <h1>Gestion des Lieux</h1>
                    <button onClick={() => navigate('/admin/places/new')} className="btn-add-place">
                        ➕ Ajouter un lieu
                    </button>
                </div>
                <PlacesList isAdmin={true} />
            </div>
        </AdminLayout>
    );
};

export default AdminPlacesView;
