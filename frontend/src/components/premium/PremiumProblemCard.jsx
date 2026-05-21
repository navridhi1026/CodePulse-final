import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Briefcase, ChevronRight, Flame } from 'lucide-react';

const PremiumProblemCard = ({ p }) => {
    return (
        <Link to={`/problems/${p.id}`} className="glass-card problem-card" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px', borderRadius: '20px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(245, 158, 11, 0.2)', transition: 'all 0.3s ease' }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', margin: 0, fontWeight: 700 }}>{p.title}</h3>
                    <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.1))', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        <Star size={14} fill="#fbbf24" /> Premium
                    </span>
                    {p.frequency > 0 && (
                        <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                            <Flame size={14} /> {p.frequency}% Asked
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span className={`difficulty-badge ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                    {p.company_tags && p.company_tags.split(',').map(tag => (
                        <span key={tag} style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '6px' }}>
                            <Briefcase size={14} color="#94a3b8" /> {tag.trim()}
                        </span>
                    ))}
                </div>
            </div>
            <div style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={24} />
            </div>
        </Link>
    );
};

export default PremiumProblemCard;
