import { Place } from '../../model/place';
import './PlaceCard.css';
import { useNavigate } from "react-router-dom";

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/place/${place.id}`, { state: { place } });
    }

    return (
        <div className="place-card" onClick={handleDetailsClick}>
            <div className="place-card-image">
                <img src={place.images[0]} alt={place.name} />
                <span className="place-card-category">{place.category}</span>
            </div>
            <div className="place-card-content">
                <h3 className="place-card-title">{place.name}</h3>
                <p className="place-card-description">{place.description}</p>
                <div className="place-card-footer">
                    <p className="place-card-price">{place.price}</p>
                    <button className="place-card-btn">
                        Voir détails →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceCard;