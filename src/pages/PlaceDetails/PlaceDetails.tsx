import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { Place } from '../../model/place';
import './PlaceDetails.css';
import { useState } from 'react';

const PlaceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const places = useSelector((state: RootState) => state.places.items);
    const [selectedImage, setSelectedImage] = useState(0);

    // Get place from navigation state (props) or fallback to Redux
    const place: Place | undefined = location.state?.place || places.find(p => p.id == Number(id));

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    if (!place) {
        return (
            <div className="place-details-container">
                <div className="not-found">
                    <h2>Lieu non trouvé</h2>
                    <button onClick={handleBack} className="back-link">← Retour</button>
                </div>
            </div>
        );
    }

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames: { [key: string]: string } = {
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi',
        sunday: 'Dimanche'
    };

    return (
        <div className="place-details-container">
            <div className="place-details">
                <button onClick={handleBack} className="back-link">← Retour</button>

                <div className="place-header">
                    <h1>{place.name}</h1>
                    <span className="category-badge">{place.category}</span>
                </div>

                {/* Image Gallery */}
                <div className="place-images-gallery">
                    <div className="main-image">
                        <img src={place.images[selectedImage]} alt={`${place.name}`} />
                    </div>
                    {place.images.length > 1 && (
                        <div className="thumbnail-images">
                            {place.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${place.name} ${index + 1}`}
                                    className={selectedImage === index ? 'active' : ''}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Information */}
                <div className="place-content">
                    <div className="place-main-info">
                        <section className="info-section">
                            <h3>Description</h3>
                            <p className="full-description">{place.fullDescription || place.description}</p>
                        </section>

                        {place.address && (
                            <section className="info-section">
                                <h3>📍 Adresse</h3>
                                <p>{place.address}</p>
                            </section>
                        )}

                        {place.transport && place.transport.length > 0 && (
                            <section className="info-section">
                                <h3>🚗 Moyens de transport</h3>
                                <div className="transport-options">
                                    {place.transport.map((transport, index) => (
                                        <span key={index} className="transport-badge">{transport}</span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {place.accessibility && (
                            <section className="info-section">
                                <h3>♿ Accessibilité</h3>
                                <p>{place.accessibility}</p>
                            </section>
                        )}
                    </div>

                    <div className="place-sidebar">
                        <div className="price-card">
                            <h3>Prix</h3>
                            <p className="price-value">{place.price}</p>
                        </div>

                        {place.schedule && (
                            <div className="schedule-card">
                                <h3>🕐 Horaires d'ouverture</h3>
                                <div className="schedule-list">
                                    {daysOfWeek.map((day) => (
                                        <div key={day} className="schedule-item">
                                            <span className="day-name">{dayNames[day]}</span>
                                            <span className="day-hours">{place.schedule![day as keyof typeof place.schedule]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceDetails;
