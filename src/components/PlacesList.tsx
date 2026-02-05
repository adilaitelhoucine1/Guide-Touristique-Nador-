import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaces } from '../store/slices/placesSlice';
import { RootState, AppDispatch } from '../store/types';
import PlaceCard from './placeCard/PlaceCard';

const PlacesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: places, status, error } = useSelector((state: RootState) => state.places);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPlaces());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div>Chargement...</div>;
    if (status === 'failed') return <div>Erreur: {error}</div>;

    return (
        <div>
            <h2>Lieux Touristiques</h2>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '20px', 
                justifyContent: 'flex-start',
                padding: '10px 0' 
            }}>
                {places.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </div>
        </div>
    );
};

export default PlacesList;
