import React from 'react';
import { Calendar, Swords } from 'lucide-react';
import ContestCard from '../components/premium/ContestCard';

const Contests = () => {
    // Mock data for contests
    const upcomingContests = [
        { id: 1, title: 'Weekly Coding Challenge #45', date: 'Oct 24, 2026', time: '10:00 AM PST', duration: '2 hours', participants: 1204, status: 'Running' },
        { id: 2, title: 'Global Hackathon 2026', date: 'Nov 1, 2026', time: '09:00 AM PST', duration: '48 hours', participants: 5300, status: 'Featured' }
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '15px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                    <Swords size={16} /> GLOBAL ARENA
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #f472b6, #ec4899, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '15px' }}>
                    Compete & Conquer
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Test your skills against top developers worldwide. Climb the leaderboard, win prizes, and get noticed by recruiters.
                </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Calendar color="#ec4899" size={24} />
                <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#f8fafc' }}>Upcoming Contests</h2>
            </div>

            <div style={{ display: 'grid', gap: '25px' }}>
                {upcomingContests.map(contest => (
                    <ContestCard key={contest.id} contest={contest} />
                ))}
            </div>
            
            <div style={{ marginTop: '50px', textAlign: 'center', padding: '40px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '20px', border: '1px dashed rgba(139, 92, 246, 0.3)' }}>
                <h3 style={{ color: '#cbd5e1', marginBottom: '10px', fontSize: '1.4rem' }}>Past Contests Archive</h3>
                <p style={{ color: '#64748b', marginBottom: '20px' }}>Practice problems from previous official contests.</p>
                <button className="btn-secondary" style={{ background: 'transparent', border: '1px solid #8b5cf6', color: '#a78bfa' }}>
                    View Archive
                </button>
            </div>
        </div>
    );
};

export default Contests;
