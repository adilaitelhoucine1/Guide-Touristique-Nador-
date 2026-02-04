import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaces } from '../store/slices/placesSlice';
import { RootState, AppDispatch } from '../store/types';

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
            {places.map((place) => (
                <div key={place.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h3>{place.name}</h3>
                    <p>{place.category}</p>
                    <p>{place.description}</p>
                    <p>{place.price}</p>
                </div>
            ))}
        </div>
    );
};

export default PlacesList;
