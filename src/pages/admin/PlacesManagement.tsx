import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchPlaces, deletePlace, togglePlaceStatus } from '../../store/slices/placesSlice';
import { Place } from '../../model/place';
import AdminLayout from './AdminLayout';
import './PlacesManagement.css';

const PlacesManagement = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items: places, status } = useAppSelector(state => state.places);
    
    const [filter, setFilter] = useState({ category: '', status: '' });
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        dispatch(fetchPlaces());
    }, [dispatch]);

    const filteredPlaces = places
        .filter(p => !filter.category || p.category === filter.category)
        .filter(p => !filter.status || (filter.status === 'active' ? p.isActive : !p.isActive))
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'category') return a.category.localeCompare(b.category);
            if (sortBy === 'createdAt') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            return 0;
        });

    const categories = [...new Set(places.map(p => p.category))];

    const handleDelete = async (place: Place) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${place.name}" ?`)) {
            await dispatch(deletePlace(place.id));
            alert('Lieu supprimé avec succès');
        }
    };

    const handleToggleStatus = async (place: Place) => {
        const action = place.isActive ? 'désactiver' : 'activer';
        if (window.confirm(`Voulez-vous ${action} "${place.name}" ?`)) {
            await dispatch(togglePlaceStatus(place));
            alert(`Lieu ${place.isActive ? 'désactivé' : 'activé'} avec succès`);
        }
    };

    if (status === 'loading') return <AdminLayout><div className="loading">Chargement...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="places-management">
                <div className="header">
                    <h1>Gestion des lieux</h1>
                    <button onClick={() => navigate('/admin/places/new')} className="btn-add">
                        ➕ Ajouter un lieu
                    </button>
                </div>

                <div className="filters">
                    <select value={filter.category} onChange={e => setFilter({...filter, category: e.target.value})}>
                        <option value="">Toutes les catégories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select value={filter.status} onChange={e => setFilter({...filter, status: e.target.value})}>
                        <option value="">Tous les statuts</option>
                        <option value="active">Actifs</option>
                        <option value="inactive">Inactifs</option>
                    </select>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="name">Trier par nom</option>
                        <option value="category">Trier par catégorie</option>
                        <option value="createdAt">Trier par date</option>
                    </select>
                </div>

                <div className="places-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Catégorie</th>
                                <th>Statut</th>
                                <th>Date création</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlaces.map(place => (
                                <tr key={place.id}>
                                    <td>{place.name}</td>
                                    <td>{place.category}</td>
                                    <td>
                                        <span className={`status ${place.isActive ? 'active' : 'inactive'}`}>
                                            {place.isActive ? '✓ Actif' : '✗ Inactif'}
                                        </span>
                                    </td>
                                    <td>{place.createdAt ? new Date(place.createdAt).toLocaleDateString() : '-'}</td>
                                    <td className="actions">
                                        <button onClick={() => navigate(`/admin/places/edit/${place.id}`)} className="btn-edit">
                                            ✏️
                                        </button>
                                        <button onClick={() => handleToggleStatus(place)} className="btn-toggle">
                                            {place.isActive ? '⏸️' : '▶️'}
                                        </button>
                                        <button onClick={() => handleDelete(place)} className="btn-delete">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default PlacesManagement;
