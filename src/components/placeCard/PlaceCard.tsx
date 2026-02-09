import { useState } from 'react';
import { Place } from '../../model/place';
import './PlaceCard.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../store/store';
import { deletePlace, togglePlaceStatus } from '../../store/slices/placesSlice';
import ConfirmDialog from '../ConfirmDialog';

interface PlaceCardProps {
  place: Place;
  isAdmin?: boolean;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, isAdmin = false }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: '', title: '', message: '' });

    const handleDetailsClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.admin-actions')) return;
        navigate(`/place/${place.id}`, { state: { place } });
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/admin/places/edit/${place.id}`);
    };

    const handleToggleStatus = (e: React.MouseEvent) => {
        e.stopPropagation();
        const action = place.isActive ? 'désactiver' : 'activer';
        setConfirmDialog({
            isOpen: true,
            type: 'toggle',
            title: `${action.charAt(0).toUpperCase() + action.slice(1)} le lieu`,
            message: `Voulez-vous ${action} "${place.name}" ?`
        });
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setConfirmDialog({
            isOpen: true,
            type: 'delete',
            title: 'Supprimer le lieu',
            message: `Êtes-vous sûr de vouloir supprimer "${place.name}" ? Cette action est irréversible.`
        });
    };

    const handleConfirm = async () => {
        if (confirmDialog.type === 'toggle') {
            await dispatch(togglePlaceStatus(place));
        } else if (confirmDialog.type === 'delete') {
            await dispatch(deletePlace(place.id));
        }
        setConfirmDialog({ isOpen: false, type: '', title: '', message: '' });
    };

    return (
        <>
            <div className={`place-card ${!place.isActive && isAdmin ? 'inactive-place' : ''}`} onClick={handleDetailsClick}>
                <div className="place-card-image">
                    <img src={place.images[0]} alt={place.name} />
                    <span className="place-card-category">{place.category}</span>
                    {isAdmin && !place.isActive && (
                        <span className="inactive-badge">Inactif</span>
                    )}
                </div>
                <div className="place-card-content">
                    <h3 className="place-card-title">{place.name}</h3>
                    <p className="place-card-description">{place.description}</p>
                    <div className="place-card-footer">
                        <p className="place-card-price">{place.price}</p>
                        {!isAdmin ? (
                            <button className="place-card-btn">
                                Voir détails →
                            </button>
                        ) : (
                            <div className="admin-actions">
                                <button onClick={handleEdit} className="btn-admin edit" title="Modifier">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                </button>
                                <button onClick={handleToggleStatus} className="btn-admin toggle" title={place.isActive ? 'Désactiver' : 'Activer'}>
                                    {place.isActive ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <line x1="15" y1="9" x2="9" y2="15"/>
                                            <line x1="9" y1="9" x2="15" y2="15"/>
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                            <polyline points="22 4 12 14.01 9 11.01"/>
                                        </svg>
                                    )}
                                </button>
                                <button onClick={handleDelete} className="btn-admin delete" title="Supprimer">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6"/>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.title}
                message={confirmDialog.message}
                onConfirm={handleConfirm}
                onCancel={() => setConfirmDialog({ isOpen: false, type: '', title: '', message: '' })}
            />
        </>
    );
};

export default PlaceCard;