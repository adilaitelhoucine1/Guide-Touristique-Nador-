import { Place } from '../../model/place';
import './PlaceCard.css';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <div className="place-card">
      <h3>{place.name}</h3>
      <p className="category">{place.category}</p>
      <p className="description">{place.description}</p>
      <p className="price">{place.price}</p>
    </div>
  );
};

export default PlaceCard;