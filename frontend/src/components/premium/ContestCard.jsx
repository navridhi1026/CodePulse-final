import React, { useState } from 'react';
import { Trophy, Calendar, Clock, ChevronRight, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ContestCard = ({ contest }) => {
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleRegister = () => {
        if(isRegistered) return;
        setIsProcessing(true);
        setTimeout(() => {
            setIsRegistered(true);
            setIsProcessing(false);
        }, 1000);
    };

    return (
        <div className="glass-card" style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div>
                <h3 style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700 }}>
                    {contest.title}
                    {contest.status === 'Running' ? (
                        <motion.span 
                            animate={{ opacity: [1, 0.5, 1] }} 
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            style={{ fontSize: '0.75rem', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))', color: '#22c55e', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.3)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e'}}></div> Live Now
                        </motion.span>
                    ) : (
                        <span style={{ fontSize: '0.75rem', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))', color: '#f472b6', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {contest.status || 'Upcoming'}
                        </span>
                    )}
                </h3>
                <div style={{ display: 'flex', gap: '25px', color: '#cbd5e1', fontSize: '0.95rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} color="#ec4899" /> {contest.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} color="#8b5cf6" /> {contest.time} ({contest.duration})</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} color="#3b82f6" /> {contest.participants + (isRegistered ? 1 : 0)} Registered</span>
                </div>
            </div>
            {contest.status === 'Running' ? (
                <button onClick={() => navigate('/problems')} className="btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1rem', fontWeight: 'bold', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
                    Enter Contest <ChevronRight size={18} />
                </button>
            ) : (
                <button 
                    onClick={handleRegister}
                    disabled={isRegistered || isProcessing}
                    className="btn-primary" 
                    style={{ background: isRegistered ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #ec4899, #8b5cf6)', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1rem', fontWeight: 'bold', boxShadow: isRegistered ? '0 8px 20px rgba(59, 130, 246, 0.3)' : '0 8px 20px rgba(236, 72, 153, 0.3)', opacity: isProcessing ? 0.7 : 1, cursor: isRegistered ? 'default' : 'pointer' }}>
                    {isProcessing ? 'Registering...' : isRegistered ? <><CheckCircle size={18} /> Registered</> : <>Register <ChevronRight size={18} /></>}
                </button>
            )}
        </div>
    );
};

export default ContestCard;
