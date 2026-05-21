import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Swords, Save, ArrowLeft } from 'lucide-react';
import api from '../api/api'; // Or just mock for now if no contest API

const ManageContest = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Mocking API call for now since we just need the UI
            // await api.post('/admin/contests', formData);
            setTimeout(() => {
                toast.success('New contest created successfully!');
                navigate('/contests');
            }, 1000);
        } catch (err) {
            toast.error('Failed to create contest');
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
            <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
                <ArrowLeft size={16} /> Dashboard
            </button>
            <div className="glass-card" style={{ padding: '40px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', color: '#f8fafc' }}>
                    <Swords color="#ec4899" /> Create New Contest
                </h1>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                    <div className="input-group">
                        <label style={{ color: '#cbd5e1' }}>Contest Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Weekly Hackathon #46" />
                    </div>

                    <div className="input-group">
                        <label style={{ color: '#cbd5e1' }}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required style={{ height: '100px' }} placeholder="Contest rules and details..." />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="input-group">
                            <label style={{ color: '#cbd5e1' }}>Start Time</label>
                            <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label style={{ color: '#cbd5e1' }}>End Time</label>
                            <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
                        <Save size={18} /> {loading ? 'Processing...' : 'Launch Contest'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageContest;
