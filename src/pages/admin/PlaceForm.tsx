import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addPlace, updatePlace, fetchPlaces } from '../../store/slices/placesSlice';
import { Place } from '../../model/place';
import AdminLayout from './AdminLayout';
import './PlaceForm.css';

const PlaceForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const places = useAppSelector(state => state.places.items);
    const isEdit = !!id;

    const [formData, setFormData] = useState<Partial<Place>>({
        name: '',
        category: '',
        description: '',
        fullDescription: '',
        images: [''],
        address: '',
        schedule: {
            monday: '', tuesday: '', wednesday: '', thursday: '',
            friday: '', saturday: '', sunday: ''
        },
        price: '',
        transport: [],
        accessibility: '',
        isActive: true
    });

    const [errors, setErrors] = useState<any>({});

    const categories = [
        'Plages', 'Sites naturels', 'Monuments et patrimoine', 'Musées et culture',
        'Restaurants', 'Hôtels et hébergements', 'Cafés et salons de thé',
        'Shopping et souks', 'Loisirs et divertissements'
    ];

    useEffect(() => {
        if (isEdit && id) {
            dispatch(fetchPlaces()).then((result: any) => {
                if (result.payload) {
                    const place = result.payload.find((p: Place) => p.id.toString() === id);
                    if (place) setFormData(place);
                }
            });
        }
    }, [isEdit, id, dispatch]);

    const validate = () => {
        const newErrors: any = {};
        if (!formData.name?.trim()) newErrors.name = 'Le nom est obligatoire';
        if (!formData.category) newErrors.category = 'La catégorie est obligatoire';
        if (!formData.description?.trim()) newErrors.description = 'La description est obligatoire';
        if (!formData.images?.some(img => img.trim())) newErrors.images = 'Au moins une photo est obligatoire';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const placeData = {
            ...formData,
            images: formData.images?.filter(img => img.trim()) || []
        };

        try {
            if (isEdit) {
                await dispatch(updatePlace(placeData as Place));
                alert('Lieu modifié avec succès');
            } else {
                await dispatch(addPlace(placeData as Omit<Place, 'id'>));
                alert('Lieu créé avec succès');
            }
            navigate('/admin/places');
        } catch (error) {
            alert('Erreur lors de la sauvegarde');
        }
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...(formData.images || []), ''] });
    };

    const removeImageField = (index: number) => {
        const newImages = formData.images?.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const updateImage = (index: number, value: string) => {
        const newImages = [...(formData.images || [])];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    return (
        <AdminLayout>
            <div className="place-form">
                <h1>{isEdit ? 'Modifier le lieu' : 'Ajouter un nouveau lieu'}</h1>
                
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom *</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Catégorie *</label>
                    <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className={errors.category ? 'error' : ''}
                    >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    {errors.category && <span className="error-msg">{errors.category}</span>}
                </div>

                <div className="form-group">
                    <label>Description courte *</label>
                    <textarea
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className={errors.description ? 'error' : ''}
                        rows={3}
                    />
                    {errors.description && <span className="error-msg">{errors.description}</span>}
                </div>

                <div className="form-group">
                    <label>Description complète</label>
                    <textarea
                        value={formData.fullDescription}
                        onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                        rows={5}
                    />
                </div>

                <div className="form-group">
                    <label>Photos * (URLs)</label>
                    {formData.images?.map((img, index) => (
                        <div key={index} className="image-input">
                            <input
                                type="url"
                                value={img}
                                onChange={e => updateImage(index, e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                            {formData.images!.length > 1 && (
                                <button type="button" onClick={() => removeImageField(index)}>❌</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addImageField} className="btn-add-image">+ Ajouter une photo</button>
                    {errors.images && <span className="error-msg">{errors.images}</span>}
                </div>

                <div className="form-group">
                    <label>Adresse</label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Tarifs</label>
                    <input
                        type="text"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                        placeholder="Ex: Gratuit, 50-100 MAD"
                    />
                </div>

                <div className="form-group">
                    <label>Moyens de transport (séparés par des virgules)</label>
                    <input
                        type="text"
                        value={formData.transport?.join(', ')}
                        onChange={e => setFormData({ ...formData, transport: e.target.value.split(',').map(t => t.trim()) })}
                        placeholder="Voiture, Bus, Taxi"
                    />
                </div>

                <div className="form-group">
                    <label>Horaires</label>
                    <div className="schedule-grid">
                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                            <div key={day} className="schedule-item">
                                <label>{day === 'monday' ? 'Lundi' : day === 'tuesday' ? 'Mardi' : day === 'wednesday' ? 'Mercredi' : day === 'thursday' ? 'Jeudi' : day === 'friday' ? 'Vendredi' : day === 'saturday' ? 'Samedi' : 'Dimanche'}</label>
                                <input
                                    type="text"
                                    value={formData.schedule?.[day as keyof typeof formData.schedule] || ''}
                                    onChange={e => setFormData({ 
                                        ...formData, 
                                        schedule: { ...formData.schedule!, [day]: e.target.value } 
                                    })}
                                    placeholder="Ex: 09:00 - 18:00"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Accessibilité</label>
                    <input
                        type="text"
                        value={formData.accessibility}
                        onChange={e => setFormData({ ...formData, accessibility: e.target.value })}
                    />
                </div>

                <div className="form-group checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                        />
                        Lieu actif (visible par les visiteurs)
                    </label>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-submit">
                        {isEdit ? 'Modifier' : 'Créer'}
                    </button>
                    <button type="button" onClick={() => navigate('/admin/places')} className="btn-cancel">
                        Annuler
                    </button>
                </div>
            </form>
        </div>
        </AdminLayout>
    );
};

export default PlaceForm;
