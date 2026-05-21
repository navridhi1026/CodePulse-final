import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Briefcase, BookOpen, Rocket, PlayCircle, CheckCircle, Gift } from 'lucide-react';

const Home = () => {
    const features = [
        { icon: <Briefcase size={32} />, title: 'Job Portal', desc: 'Find your dream job at top product companies.', link: '/jobs', color: '#6366f1' },
        { icon: <BookOpen size={32} />, title: 'Preparation', desc: 'Curated materials for Aptitude, DSA, and Technical rounds.', link: '/resources', color: '#10b981' },
        { icon: <Code size={32} />, title: 'Coding Judge', desc: 'Solve real-world coding problems and test your skills.', link: '/problems', color: '#a855f7' }
    ];

    return (
        <div style={{ textAlign: 'center', marginTop: '60px', paddingBottom: '100px' }}>
            {/* Flashing Premium Offer Banner */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                style={{
                    background: 'linear-gradient(45deg, #ec4899, #8b5cf6, #3b82f6)',
                    backgroundSize: '200% 200%',
                    padding: '12px 20px',
                    borderRadius: '50px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '40px',
                    boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)',
                    border: '2px solid rgba(255,255,255,0.2)',
                    animation: 'gradientBG 3s ease infinite, pulseGlow 2s infinite'
                }}
            >
                <style>
                    {`
                    @keyframes gradientBG {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    @keyframes pulseGlow {
                        0% { box-shadow: 0 0 15px rgba(236, 72, 153, 0.4); }
                        50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.8), 0 0 20px rgba(139, 92, 246, 0.6); }
                        100% { box-shadow: 0 0 15px rgba(236, 72, 153, 0.4); }
                    }
                    `}
                </style>
                <Gift size={24} color="#fff" />
                <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                    Level Up Faster! Get <span style={{ color: '#fef08a', fontSize: '1.2rem', textShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>30% OFF</span> on Premium with code <span style={{ background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: '8px', fontFamily: 'monospace' }}>PRO30</span>
                </span>
                <Link to="/interview-prep" style={{ background: '#fff', color: '#8b5cf6', padding: '6px 15px', borderRadius: '20px', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.9rem', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                    Claim Now
                </Link>
            </motion.div>

            {/* Hero Section */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 800 }}
            >
                Ignite Your Tech Career with <span style={{ color: '#6366f1' }}>CodePulse</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 40px' }}
            >
                The core platform to practice data structures and algorithms. Solve problems, submit code, and track your progress with our integrated online judge.
            </motion.p>
            <div style={{ marginTop: '20px', marginBottom: '60px' }}>
                <Link to="/register" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', borderRadius: '50px' }}>
                    Get Started Now <Rocket size={20} style={{ marginLeft: '10px', verticalAlign: 'middle' }} />
                </Link>
            </div>

            {/* Video Demonstration Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginTop: '80px', padding: '0 20px' }}
            >
                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#334155' }}>See How It Works</h2>
                <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '1.1rem' }}>Watch our code execution engine test against hidden test cases in real-time.</p>
                <div style={{ maxWidth: '900px', margin: '0 auto', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <div style={{ backgroundColor: '#1e293b', padding: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem', marginLeft: '10px' }}>CodePulse - Execution Demo</span>
                    </div>
                    {/* Placeholder for video, using a simulated UI for demonstration or a generic video frame */}
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#0f172a' }}>
                        <iframe
                            src="https://www.youtube.com/embed/VbVQJRKXxBA?list=PL1w8k37X_6L86f3PUUVFoGYXvZiZHde1S"
                            title="Code Execution Demo"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ marginTop: '100px' }}
            >
                <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', color: '#334155' }}>Everything You Need</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
                    {features.map((feat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="glass-card"
                            style={{ width: '300px', padding: '30px', textAlign: 'left', borderTop: `4px solid ${feat.color}` }}
                        >
                            <div style={{ color: feat.color, marginBottom: '20px' }}>{feat.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{feat.title}</h3>
                            <p style={{ color: '#64748b', marginBottom: '25px', lineHeight: '1.6' }}>{feat.desc}</p>
                            <Link to={feat.link} style={{ color: feat.color, fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                Explore <PlayCircle size={16} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Testcases Overview */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ marginTop: '100px', display: 'flex', justifyContent: 'center', padding: '0 20px' }}
            >
                <div style={{ maxWidth: '800px', width: '100%', backgroundColor: '#f8fafc', padding: '50px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ marginBottom: '20px', fontSize: '2rem', color: '#334155' }}>Robust Code Evaluation</h2>
                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                        {['Support for multiple test cases per problem', 'Hidden test cases to challenge logic accuracy', 'Real-time compilation and execution logs', 'Detailed Accepted / Wrong Answer feedback'].map((item, i) => (
                            <li key={i} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.1rem', color: '#475569' }}>
                                <CheckCircle size={24} color="#10b981" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

        </div>
    );
};

export default Home;

