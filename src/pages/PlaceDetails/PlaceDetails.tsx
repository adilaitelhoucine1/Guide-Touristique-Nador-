import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import './PlaceDetails.css';

const PlaceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const places = useSelector((state: RootState) => state.places.items);

    const place = places.find(p => p.id === Number(id));

    if (!place) {
        return (
            <div className="place-details-container">
                <div className="not-found">
                    <h2>Lieu non trouvé</h2>
                    <Link to="/" className="back-link">← Retour à l'accueil</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="place-details-container">
            <div className="place-details">
                <Link to="/" className="back-link">← Retour à l'accueil</Link>

                <div className="place-header">
                    <h1>{place.name}</h1>
                    <span className="category">{place.category}</span>
                </div>

                <div className="place-images">
                    {place.images.map((image, index) => (
                        <img key={index} src={image} alt={`${place.name} ${index + 1}`} />
                    ))}
                </div>

                <div className="place-info">
                    <div className="description">
                        <h3>Description</h3>
                        <p>{place.description}</p>
                    </div>

                    <div className="price-section">
                        <h3>Prix</h3>
                        <p className="price">{place.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceDetails;
