import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLUBS } from '../config';
import { brawlStarsApi } from '../services/brawlStarsApi';

function Dashboard({ apiKey }) {
    const [clubsData, setClubsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTag, setSearchTag] = useState('');

    useEffect(() => {
        const fetchClubs = async () => {
            setLoading(true);
            setError(null);
            try {
                const promises = CLUBS.map(club =>
                    brawlStarsApi.getClub(club.tag, apiKey)
                        .then(data => ({ ...data, configName: club.name }))
                        .catch(err => ({
                            configName: club.name,
                            tag: club.tag,
                            error: true,
                            errorMessage: err.message
                        }))
                );

                const results = await Promise.all(promises);
                setClubsData(results);
            } catch (err) {
                setError("Failed to load club data. Please check your API key.");
            } finally {
                setLoading(false);
            }
        };

        if (apiKey) {
            fetchClubs();
        }
    }, [apiKey]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTag) {
            const cleanTag = searchTag.replace('#', '');
            window.location.href = `/club/${cleanTag}`;
        }
    };

    if (loading) return <div className="loading">Loading Club Data...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <h2 className="card-title" style={{ fontSize: '2rem', textAlign: 'center' }}>Club Dashboard</h2>

            <div className="mb-4 text-center">
                <form onSubmit={handleSearch} style={{ display: 'inline-block' }}>
                    <input
                        type="text"
                        placeholder="Search Club by Tag (e.g. 29UPLG8QQ)"
                        className="api-input"
                        style={{ width: '300px', marginRight: '10px' }}
                        value={searchTag}
                        onChange={(e) => setSearchTag(e.target.value)}
                    />
                    <button type="submit" className="btn-back" style={{ background: 'var(--bs-blue)', color: 'white', border: 'none' }}>
                        Search
                    </button>
                </form>
            </div>

            <div className="card-grid">
                {clubsData.map((club, index) => (
                    <Link to={`/club/${club.tag.replace('#', '')}`} key={index} style={{ display: 'block' }}>
                        <div className="card">
                            <h3 className="card-title">{club.name || club.configName}</h3>
                            {club.error ? (
                                <div style={{ color: '#ff6b6b' }}>
                                    Error loading data: {club.errorMessage}
                                </div>
                            ) : (
                                <>
                                    <div className="stat-row">
                                        <span className="stat-label">Total Trophies</span>
                                        <span className="stat-value" style={{ color: 'var(--bs-yellow)' }}>
                                            {club.trophies?.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-label">Members</span>
                                        <span className="stat-value">{club.members?.length} / 30</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-label">Required Trophies</span>
                                        <span className="stat-value">{club.requiredTrophies?.toLocaleString()}</span>
                                    </div>
                                    <div className="stat-row" style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
                                        <span className="stat-label">Top Player</span>
                                    </div>
                                    <div style={{ fontWeight: 'bold', color: 'var(--bs-blue)' }}>
                                        {club.members?.sort((a, b) => b.trophies - a.trophies)[0]?.name || 'N/A'}
                                    </div>
                                </>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
