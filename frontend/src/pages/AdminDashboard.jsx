import { useState, useEffect } from 'react';
import api from '../api/api';
import { Users, FileCode, CheckCircle, Database, Clock, Trash2, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/stats');
            setStats(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loader">Analyzing Platform Metrics...</div>;

    const cards = [
        { title: 'Total Users', value: stats.users, icon: <Users size={24} color="#6366f1" />, bg: 'rgba(99, 102, 241, 0.1)' },
        { title: 'Challenges', value: stats.problems, icon: <Database size={24} color="#f59e0b" />, bg: 'rgba(245, 158, 11, 0.1)' },
        { title: 'Submissions', value: stats.submissions, icon: <FileCode size={24} color="#10b981" />, bg: 'rgba(16, 185, 129, 0.1)' },
        { title: 'Success Rate', value: '42%', icon: <CheckCircle size={24} color="#8b5cf6" />, bg: 'rgba(139, 92, 246, 0.1)' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '30px' }}>Admin Command Center</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {cards.map((card, i) => (
                    <div key={i} className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(15, 23, 42, 0.6)' }}>
                        <div style={{ background: card.bg, padding: '15px', borderRadius: '15px' }}>{card.icon}</div>
                        <div>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '4px' }}>{card.title}</p>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{card.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div className="glass-card" style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Clock size={20} color="#6366f1" /> Recent Activity</h3>
                        <button className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>Refresh Feed</button>
                    </div>
                    
                    <div className="activity-feed" style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                        {stats.recent.map((sub, i) => (
                            <div 
                                key={i} 
                                onClick={() => setSelectedSubmission(sub)}
                                style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <p style={{ fontWeight: 600, color: '#f8fafc', margin: 0 }}>{sub.User.name}</p>
                                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{new Date(sub.created_at).toLocaleString()}</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Solved <b>{sub.problem.title}</b></p>
                                </div>
                                <span style={{ 
                                    padding: '4px 12px', 
                                    borderRadius: '12px', 
                                    fontSize: '0.75rem', 
                                    fontWeight: 700,
                                    background: sub.status === 'Accepted' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: sub.status === 'Accepted' ? '#10b981' : '#ef4444'
                                }}>{sub.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '30px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}><Database size={20} color="#f59e0b" /> Manage Logic</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>Control the coding challenges and system parameters.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Link to="/admin/problems/new" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>
                            <Plus size={18} /> New Challenge (Standard / Premium)
                        </Link>
                        <Link to="/admin/contests/new" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
                            <Plus size={18} /> New Contest
                        </Link>
                        <button className="btn-secondary" style={{ width: '100%' }}>User Management</button>
                        <button className="btn-secondary" style={{ width: '100%', color: '#ef4444' }}>System Maintenance</button>
                    </div>
                </div>
            </div>

            {/* Modal for Submission Details */}
            {selectedSubmission && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div className="glass-card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '30px', position: 'relative' }}>
                        <button 
                            onClick={() => setSelectedSubmission(null)}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                        >
                            <X size={24} />
                        </button>
                        
                        <h2 style={{ marginBottom: '5px' }}>{selectedSubmission.User.name}'s Submission</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Problem: <b>{selectedSubmission.problem.title}</b> | Status: <span style={{ color: selectedSubmission.status === 'Accepted' ? '#10b981' : '#ef4444' }}>{selectedSubmission.status}</span></p>

                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: '#cbd5e1' }}>Submitted Code ({selectedSubmission.language})</h3>
                            <pre style={{ background: '#020617', padding: '15px', borderRadius: '8px', fontSize: '0.85rem', color: '#10b981', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                {selectedSubmission.code}
                            </pre>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: '#cbd5e1' }}>Test Case Results (Admin View)</h3>
                            {selectedSubmission.test_results ? (
                                (() => {
                                    try {
                                        const results = JSON.parse(selectedSubmission.test_results);
                                        return (
                                            <div style={{ display: 'grid', gap: '15px' }}>
                                                {results.map((tr, idx) => (
                                                    <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1e293b', borderRadius: '8px', padding: '15px' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                            <strong style={{ color: tr.passed ? '#10b981' : (tr.status === 'Skipped' ? '#64748b' : '#ef4444') }}>
                                                                {tr.is_hidden ? `🔒 Hidden Test Case ${tr.id}` : `Test Case ${tr.id}`} - {tr.status}
                                                            </strong>
                                                        </div>
                                                        {tr.status !== 'Skipped' && (
                                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
                                                                <div>
                                                                    <span style={{ color: '#94a3b8' }}>Input:</span>
                                                                    <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', marginTop: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{tr.input}</pre>
                                                                </div>
                                                                <div>
                                                                    <span style={{ color: '#94a3b8' }}>Expected:</span>
                                                                    <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', marginTop: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{tr.expected_output}</pre>
                                                                </div>
                                                                <div style={{ gridColumn: 'span 2' }}>
                                                                    <span style={{ color: '#94a3b8' }}>Actual Output / Error:</span>
                                                                    <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', marginTop: '4px', color: tr.passed ? '#cbd5e1' : '#fca5a5', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                                                        {tr.error ? tr.error : (tr.actual_output || 'No output')}
                                                                    </pre>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    } catch (e) {
                                        return <p style={{ color: '#ef4444' }}>Error parsing test results.</p>;
                                    }
                                })()
                            ) : (
                                <p style={{ color: '#64748b' }}>No detailed test case data available for this submission.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
