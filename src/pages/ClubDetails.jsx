import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ClubDetails() {
    const { tag } = useParams();
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClub = async () => {
            setLoading(true);
            try {
                // Fetch from static JSON file
                const response = await fetch('/mon-dashboard-brawl/clubs-data.json');
                if (!response.ok) {
                    throw new Error('Failed to load club data');
                }
                const allClubs = await response.json();

                // Find the club by tag
                const foundClub = allClubs.find(c => c.tag.replace('#', '') === tag);

                if (!foundClub) {
                    throw new Error('Club not found');
                }

                // Sort members by trophies descending
                if (foundClub.members) {
                    foundClub.members.sort((a, b) => b.trophies - a.trophies);
                }

                setClub(foundClub);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (tag) {
            fetchClub();
        }
    }, [tag]);

    if (loading) return <div className="loading">Loading Club Details...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!club) return <div className="error">Club not found</div>;

    // Chart Data Preparation
    const chartData = {
        labels: club.members.slice(0, 10).map(m => m.name), // Top 10 for chart clarity
        datasets: [
            {
                label: 'Trophies',
                data: club.members.slice(0, 10).map(m => m.trophies),
                backgroundColor: 'rgba(255, 193, 7, 0.8)', // bs-yellow
                borderColor: 'rgba(255, 193, 7, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'white' } },
            title: { display: true, text: 'Top 10 Players by Trophies', color: 'white' },
        },
        scales: {
            y: { ticks: { color: '#adb5bd' }, grid: { color: 'rgba(255,255,255,0.1)' } },
            x: { ticks: { color: '#adb5bd' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        }
    };

    return (
        <div>
            <Link to="/" className="btn-back">← Back to Dashboard</Link>

            <div className="card mb-4" style={{ cursor: 'default', borderColor: 'var(--bs-blue)' }}>
                <h1 className="card-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{club.name}</h1>
                <p style={{ color: 'var(--bs-text-muted)' }}>{club.description}</p>
                <div className="stat-row" style={{ justifyContent: 'flex-start', gap: '2rem', marginTop: '1rem' }}>
                    <div>
                        <span className="stat-label">Total Trophies: </span>
                        <span className="stat-value" style={{ color: 'var(--bs-yellow)' }}>{club.trophies.toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="stat-label">Members: </span>
                        <span className="stat-value">{club.members.length} / 30</span>
                    </div>
                </div>
            </div>

            <div className="card mb-4">
                <div style={{ height: '300px' }}>
                    <Bar options={chartOptions} data={chartData} />
                </div>
            </div>

            <div className="table-container">
                <h3 className="card-title">Member Leaderboard</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Trophies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {club.members.map((member, index) => (
                            <tr key={member.tag}>
                                <td>{index + 1}</td>
                                <td style={{ fontWeight: '600', color: index < 3 ? 'var(--bs-yellow)' : 'inherit' }}>
                                    {member.name}
                                </td>
                                <td style={{ textTransform: 'capitalize', color: 'var(--bs-text-muted)' }}>
                                    {member.role}
                                </td>
                                <td style={{ fontWeight: 'bold' }}>
                                    {member.trophies.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClubDetails;
