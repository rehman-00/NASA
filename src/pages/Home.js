import { useEffect, useState } from 'react';
import StatsCards from '../components/StatsCards';
import HowItWorks from '../components/HowItWorks';
import SiteFooter from '../components/SiteFooter';

function Home() {
  const [stats, setStats] = useState({
    num_candidates: 1248,
    num_labels: 4302,
    num_users: 218,
    top_users: [
      { user: 'Ayesha', labels: 210 },
      { user: 'Bilal', labels: 180 }
    ]
  });
  const [connectionStatus, setConnectionStatus] = useState('Testing...');

  useEffect(() => {
    // Test API connection
    const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
    fetch(`${API_BASE}/api/health`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setConnectionStatus('✅ Backend Connected');
        // Now fetch stats
        return fetch(`${API_BASE}/api/stats`);
      })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setStats(data))
      .catch(() => {
        setConnectionStatus('❌ Backend Disconnected');
      });
  }, []);

  return (
    <>
      <main className="hero">
        <img
          className="astronaut-bg"
          alt="Astronaut floating in deep space"
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop"
        />
        <div className="content">
          <span className="kicker">Exoplanet Vetting Assistant</span>
          <h1 className="title">Help discover exoplanets</h1>
          <p className="subtitle">
            Exoplanet Vetting Assistant — help AI and citizen scientists discover
            new worlds by reviewing light curves from NASA missions.
          </p>
          <div className="cta-row">
            <a href="/ask" className="btn btn-primary">Ask AI</a>
            <a href="/learn" className="btn btn-ghost">Learn More</a>
          </div>
          <div style={{marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center'}}>
            <strong>Backend Status:</strong> {connectionStatus}
          </div>
          <StatsCards stats={stats} />
        </div>
      </main>
      <HowItWorks />
      <SiteFooter />
    </>
  );
}

export default Home;


