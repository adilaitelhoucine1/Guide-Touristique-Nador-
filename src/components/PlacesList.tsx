import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchPlaces } from '../store/slices/placesSlice';
import PlaceCard from './placeCard/PlaceCard';
import './PlacesList.css';

interface PlacesListProps {
    isAdmin?: boolean;
}

const PlacesList = ({ isAdmin = false }: PlacesListProps) => {
    const dispatch = useAppDispatch();
    const { items: places, status, error } = useAppSelector(state => state.places);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Toutes');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPlaces());
        }
    }, [status, dispatch]);

    const categories = ['Toutes', ...Array.from(new Set(places.map(place => place.category)))];

    const filteredPlaces = places.filter(place => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Toutes' || place.category === selectedCategory;
        const matchesStatus = !isAdmin || statusFilter === 'all' || 
            (statusFilter === 'active' && place.isActive) || 
            (statusFilter === 'inactive' && !place.isActive);
        const isVisible = isAdmin || place.isActive;
        return matchesSearch && matchesCategory && matchesStatus && isVisible;
    });

    if (status === 'loading') return <div className="loading-message">Chargement...</div>;
    if (status === 'failed') return <div className="error-message">Erreur: {error}</div>;

    return (
        <div className="places-list-container">
            <h2 className="places-title">{isAdmin ? 'Gestion des Lieux' : 'Lieux Touristiques'}</h2>

            <div className="filters-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Rechercher un lieu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="category-filters">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
                {isAdmin && (
                    <div className="status-filters">
                        <button 
                            className={`status-btn ${statusFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('all')}
                        >
                            Tous
                        </button>
                        <button 
                            className={`status-btn ${statusFilter === 'active' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('active')}
                        >
                            Actifs
                        </button>
                        <button 
                            className={`status-btn ${statusFilter === 'inactive' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('inactive')}
                        >
                            Inactifs
                        </button>
                    </div>
                )}
            </div>

            <div className="results-info">
                {filteredPlaces.length} lieu{filteredPlaces.length !== 1 ? 'x' : ''} trouvé{filteredPlaces.length !== 1 ? 's' : ''}
            </div>

            <div className="places-grid">
                {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place) => (
                        <PlaceCard key={place.id} place={place} isAdmin={isAdmin} />
                    ))
                ) : (
                    <div className="no-results">
                        <p>Aucun lieu trouvé pour votre recherche.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlacesList;
