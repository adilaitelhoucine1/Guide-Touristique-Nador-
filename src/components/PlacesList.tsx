import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaces } from '../store/slices/placesSlice';
import { RootState, AppDispatch } from '../store/types';
import PlaceCard from './placeCard/PlaceCard';
import './PlacesList.css';

const PlacesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: places, status, error } = useSelector((state: RootState) => state.places);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Toutes');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPlaces());
        }
    }, [status, dispatch]);

    // Get unique categories from places
    const categories = ['Toutes', ...Array.from(new Set(places.map(place => place.category)))];

    // Filter places based on search term and selected category
    const filteredPlaces = places.filter(place => {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Toutes' || place.category === selectedCategory;
        return matchesSearch && matchesCategory && place.isActive;
    });

    if (status === 'loading') return <div className="loading-message">Chargement...</div>;
    if (status === 'failed') return <div className="error-message">Erreur: {error}</div>;

    return (
        <div className="places-list-container">
            <h2 className="places-title">Lieux Touristiques</h2>

            {/* Search and Filter Section */}
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
            </div>

            {/* Results count */}
            <div className="results-info">
                {filteredPlaces.length} lieu{filteredPlaces.length !== 1 ? 'x' : ''} trouvé{filteredPlaces.length !== 1 ? 's' : ''}
            </div>

            {/* Places Grid */}
            <div className="places-grid">
                {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place) => (
                        <PlaceCard key={place.id} place={place} />
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
