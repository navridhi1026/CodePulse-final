import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { toast } from 'react-toastify';
import { User, UploadCloud, Camera } from 'lucide-react';

const Profile = () => {
    const { user, token } = useAuth();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(user?.profile_pic || null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.warning('Please select an image first.');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const res = await api.post('/profile/upload-avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Profile picture updated via Cloudinary! ☁️');
            setPreview(res.data.url);
            // In a real app, you'd update the context user.profile_pic here
        } catch (err) {
            toast.error('Upload failed. Check console for details.');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', paddingBottom: '40px' }}>
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'rgba(15, 23, 42, 0.6)' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <User color="#6366f1" /> Developer Profile
                </h1>

                <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 30px', borderRadius: '50%', border: '4px solid #6366f1', overflow: 'hidden', background: '#1e293b' }}>
                    {preview ? (
                        <img src={preview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <User size={80} color="#64748b" style={{ margin: '30px' }} />
                    )}
                    <label style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}>
                        <Camera size={14} /> Change
                        <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
                    </label>
                </div>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{user?.name || 'Developer'}</h2>
                <p style={{ color: '#94a3b8', marginBottom: '30px' }}>{user?.email || 'dev@codepulse.com'}</p>

                <button 
                    onClick={handleUpload} 
                    disabled={!file || uploading}
                    className="btn-primary" 
                    style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto', opacity: (!file || uploading) ? 0.5 : 1 }}
                >
                    <UploadCloud size={20} />
                    {uploading ? 'Uploading to Cloudinary...' : 'Save Avatar'}
                </button>
            </div>
        </div>
    );
};

export default Profile;
