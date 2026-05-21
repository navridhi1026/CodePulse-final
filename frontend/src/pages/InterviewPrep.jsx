import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Building, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import PremiumProblemCard from '../components/premium/PremiumProblemCard';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const InterviewPrep = () => {
    const { user } = useAuth();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState('All');
    const [isSubscribed, setIsSubscribed] = useState(user?.is_subscribed || false);

    const companies = ['All', 'Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'];

    useEffect(() => {
        api.get('/problems')
            .then(res => {
                const premium = res.data.filter(p => p.is_premium);
                // Sort by frequency descending
                setProblems(premium.sort((a, b) => (b.frequency || 0) - (a.frequency || 0)));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSubscribe = () => {
        // Mock subscription process for demo
        const loadingToast = toast.loading('Processing payment...');
        setTimeout(() => {
            toast.update(loadingToast, { render: "Welcome to CodePulse Premium! ✨", type: "success", isLoading: false, autoClose: 3000 });
            setIsSubscribed(true);
        }, 1500);
    };

    const filteredProblems = selectedCompany === 'All' 
        ? problems 
        : problems.filter(p => p.company_tags?.includes(selectedCompany));

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '15px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <Sparkles size={16} /> EXCLUSIVE TIER
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #fcd34d, #f59e0b, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '15px' }}>
                    Ace Your Dream Interview
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Get access to the most frequently asked questions by top tech companies. Real questions, real data.
                </p>
            </div>

            {!isSubscribed ? (
                <div className="glass-card" style={{ padding: '50px', textAlign: 'center', background: 'linear-gradient(145deg, rgba(15,23,42,0.9), rgba(30,41,59,0.9))', border: '1px solid rgba(245, 158, 11, 0.3)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: '#f59e0b', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%' }}></div>
                    
                    <Lock size={64} color="#f59e0b" style={{ margin: '0 auto 20px', opacity: 0.9 }} />
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#f8fafc' }}>Unlock Premium Access</h2>
                    <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
                        Join thousands of developers who landed offers at FAANG companies using our curated, high-frequency question banks.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '0 auto 40px', textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}><CheckCircle2 size={20} color="#10b981" /> Company-specific question banks</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}><CheckCircle2 size={20} color="#10b981" /> Frequency metrics and probability</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}><CheckCircle2 size={20} color="#10b981" /> Official solution editorials</div>
                    </div>

                    <button onClick={handleSubscribe} className="btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', padding: '15px 40px', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)' }}>
                        Upgrade Now - $9.99/mo
                    </button>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                        {companies.map(company => (
                            <button 
                                key={company}
                                onClick={() => setSelectedCompany(company)}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '30px',
                                    border: '1px solid rgba(245, 158, 11, 0.5)',
                                    background: selectedCompany === company ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(15, 23, 42, 0.6)',
                                    color: selectedCompany === company ? '#fff' : '#fcd34d',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: selectedCompany === company ? '0 5px 15px rgba(245, 158, 11, 0.3)' : 'none'
                                }}
                            >
                                {company}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="loader" style={{ color: '#f59e0b' }}>Loading premium banks...</div>
                    ) : (
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {filteredProblems.length === 0 ? (
                                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '60px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '20px', border: '1px dashed rgba(245, 158, 11, 0.2)' }}>
                                    <Building size={48} color="#f59e0b" style={{ opacity: 0.5, margin: '0 auto 15px' }} />
                                    <h3 style={{ color: '#cbd5e1', marginBottom: '10px' }}>No Data Available</h3>
                                    <p>We are still collecting interview data for {selectedCompany}. Check back soon!</p>
                                </div>
                            ) : (
                                filteredProblems.map(p => (
                                    <PremiumProblemCard key={p.id} p={p} />
                                ))
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default InterviewPrep;
