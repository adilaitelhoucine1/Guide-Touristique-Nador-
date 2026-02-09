import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import AdminLayout from './AdminLayout';
import './AdminDashboard.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Stats {
    totalPlaces: number;
    activePlaces: number;
    inactivePlaces: number;
    totalSubscribers: number;
    placesByCategory: { [key: string]: number };
    usedCategories?: number;
    unusedCategories?: number;
    unusedCategoryNames?: string[];
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [placesRes, subscribersRes, categoriesRes] = await Promise.all([
                axios.get('http://localhost:8000/places'),
                axios.get('http://localhost:8000/newsletter'),
                axios.get('http://localhost:8000/categories')
            ]);

            const places = placesRes.data;
            const allCategories = categoriesRes.data;
            const activePlaces = places.filter((p: any) => p.isActive).length;
            const placesByCategory = places.reduce((acc: any, place: any) => {
                acc[place.category] = (acc[place.category] || 0) + 1;
                return acc;
            }, {});

            const usedCategoryNames = Object.keys(placesByCategory);
            const unusedCategoryNames = allCategories
                .map((cat: any) => cat.name)
                .filter((name: string) => !usedCategoryNames.includes(name));

            setStats({
                totalPlaces: places.length,
                activePlaces,
                inactivePlaces: places.length - activePlaces,
                totalSubscribers: subscribersRes.data.length,
                placesByCategory,
                usedCategories: usedCategoryNames.length,
                unusedCategories: unusedCategoryNames.length,
                unusedCategoryNames
            });
        } catch (error) {
            console.error('Erreur lors du chargement des statistiques', error);
        }
    };

    const statusChartData = {
        labels: ['Actifs', 'Inactifs'],
        datasets: [{
            data: [stats?.activePlaces || 0, stats?.inactivePlaces || 0],
            backgroundColor: ['#4caf50', '#ff9800'],
            borderWidth: 0
        }]
    };

    const categoryChartData = {
        labels: Object.keys(stats?.placesByCategory || {}),
        datasets: [{
            label: 'Nombre de lieux',
            data: Object.values(stats?.placesByCategory || {}),
            backgroundColor: '#2196f3',
            borderRadius: 8
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: { font: { size: 12 } }
            }
        }
    };

    return (
        <AdminLayout>
            <div className="admin-dashboard">
                <h1>Tableau de bord administrateur</h1>

                <div className="stats-grid">
                    <div className="stat-card total">
                        <div className="stat-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                        </div>
                        <h3>Total des lieux</h3>
                        <p className="stat-number">{stats?.totalPlaces || 0}</p>
                    </div>
                    <div className="stat-card active">
                        <div className="stat-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                        </div>
                        <h3>Lieux actifs</h3>
                        <p className="stat-number">{stats?.activePlaces || 0}</p>
                    </div>
                    <div className="stat-card inactive">
                        <div className="stat-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="15" y1="9" x2="9" y2="15"/>
                                <line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                        </div>
                        <h3>Lieux inactifs</h3>
                        <p className="stat-number">{stats?.inactivePlaces || 0}</p>
                    </div>
                </div>

                <div className="charts-grid">
                    <div className="chart-card">
                        <h2>Catégories utilisées</h2>
                        <div className="chart-container">
                            <Doughnut data={{
                                labels: ['Utilisées', 'Non utilisées'],
                                datasets: [{
                                    data: [stats?.usedCategories || 0, stats?.unusedCategories || 0],
                                    backgroundColor: ['#8b4513', '#ff9800'],
                                    borderWidth: 0
                                }]
                            }} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom' as const,
                                        labels: { font: { size: 12 } }
                                    },
                                    tooltip: {
                                        callbacks: {
                                            afterLabel: (context: any) => {
                                                if (context.label === 'Non utilisées' && stats?.unusedCategoryNames) {
                                                    return ['', 'Catégories:', ...stats.unusedCategoryNames];
                                                }
                                                return '';
                                            }
                                        }
                                    }
                                }
                            }} />
                        </div>
                    </div>
                    
                    <div className="chart-card">
                        <h2>Lieux par catégorie</h2>
                        <div className="chart-container">
                            <Bar data={categoryChartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                <div className="quick-actions">
                    <h2>Actions rapides</h2>
                    <div className="actions-grid">
                        <button onClick={() => navigate('/admin/places/new')} className="action-btn add">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="16"/>
                                <line x1="8" y1="12" x2="16" y2="12"/>
                            </svg>
                            <span>Ajouter un lieu</span>
                        </button>
                        <button onClick={() => navigate('/admin/places')} className="action-btn list">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="8" y1="6" x2="21" y2="6"/>
                                <line x1="8" y1="12" x2="21" y2="12"/>
                                <line x1="8" y1="18" x2="21" y2="18"/>
                                <line x1="3" y1="6" x2="3.01" y2="6"/>
                                <line x1="3" y1="12" x2="3.01" y2="12"/>
                                <line x1="3" y1="18" x2="3.01" y2="18"/>
                            </svg>
                            <span>Voir la liste des lieux</span>
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
