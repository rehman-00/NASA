import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

function Community() {
  const [stats, setStats] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiFetch('/api/stats');
        setStats(data);
      } catch (e) {
        setError(String(e));
      }
    })();
  }, []);

  return (
    <main className="hero" style={{minHeight: 'calc(100vh - 64px)'}}>
      <div className="content">
        <span className="kicker">Community</span>
        <h1 className="title">Community Dashboard</h1>
        <p className="subtitle">Join our community of citizen scientists and exoplanet researchers</p>
        
        {error ? <div style={{color:'#ffb4b4'}}>{error}</div> : null}

        {/* Community Stats */}
        <div className="metrics" style={{marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
          <div className="metric" style={{
            padding: '24px', 
            border: '2px solid #4A9EFF', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '2.5em', color: '#4A9EFF', fontWeight: 'bold', marginBottom: '8px'}}>
              {stats.num_users || 0}
            </div>
            <div style={{fontSize: '1.1em', opacity: 0.9}}>Active Contributors</div>
          </div>
          
          <div className="metric" style={{
            padding: '24px', 
            border: '2px solid #4A9EFF', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '2.5em', color: '#4A9EFF', fontWeight: 'bold', marginBottom: '8px'}}>
              {stats.num_candidates || 0}
            </div>
            <div style={{fontSize: '1.1em', opacity: 0.9}}>Candidates Analyzed</div>
          </div>
          
          <div className="metric" style={{
            padding: '24px', 
            border: '2px solid #4A9EFF', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '2.5em', color: '#4A9EFF', fontWeight: 'bold', marginBottom: '8px'}}>
              {stats.num_labels || 0}
            </div>
            <div style={{fontSize: '1.1em', opacity: 0.9}}>Data Labels</div>
          </div>
        </div>

        {/* Top Contributors */}
        {stats.top_users && stats.top_users.length > 0 && (
          <div style={{
            background: '#1a1a1a', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #333',
            marginTop: '32px'
          }}>
            <h2 style={{color: '#4A9EFF', marginBottom: '20px', textAlign: 'center'}}>🏆 Top Contributors</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px'}}>
              {stats.top_users.map((user, i) => (
                <div key={i} style={{
                  padding: '20px', 
                  background: '#2a2a2a', 
                  borderRadius: '8px',
                  border: '1px solid #4A9EFF',
                  textAlign: 'center'
                }}>
                  <div style={{fontSize: '1.5em', fontWeight: 'bold', color: '#4A9EFF', marginBottom: '8px'}}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {user.user}
                  </div>
                  <div style={{fontSize: '1.2em', opacity: 0.8, marginBottom: '4px'}}>{user.labels} labels</div>
                  <div style={{fontSize: '0.9em', opacity: 0.6}}>Contributions</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Features */}
        <div style={{marginTop: '32px'}}>
          <h2 style={{color: '#4A9EFF', marginBottom: '20px', textAlign: 'center'}}>🌐 Community Features</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
            <div style={{
              background: 'rgba(255,255,255,0.05)', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid #333'
            }}>
              <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>📊 Leaderboard</h3>
              <p style={{opacity: 0.8, marginBottom: '16px'}}>See who's contributing the most to exoplanet discovery</p>
              <ul style={{opacity: 0.7, paddingLeft: '20px'}}>
                <li>Top contributors by labels</li>
                <li>Recent activity tracking</li>
                <li>Achievement badges</li>
              </ul>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.05)', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid #333'
            }}>
              <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>🔬 Recent Activity</h3>
              <p style={{opacity: 0.8, marginBottom: '16px'}}>Stay updated with the latest discoveries and contributions</p>
              <ul style={{opacity: 0.7, paddingLeft: '20px'}}>
                <li>New candidates discovered</li>
                <li>Community discussions</li>
                <li>Research updates</li>
              </ul>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.05)', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid #333'
            }}>
              <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>🎯 Your Progress</h3>
              <p style={{opacity: 0.8, marginBottom: '16px'}}>Track your contributions and achievements</p>
              <ul style={{opacity: 0.7, paddingLeft: '20px'}}>
                <li>Personal statistics</li>
                <li>Contribution history</li>
                <li>Skill development</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.1) 0%, rgba(74, 158, 255, 0.05) 100%)', 
          padding: '24px', 
          borderRadius: '12px', 
          border: '1px solid rgba(74, 158, 255, 0.3)',
          marginTop: '32px',
          textAlign: 'center'
        }}>
          <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>Ready to Join the Community?</h3>
          <p style={{opacity: 0.9, marginBottom: '20px'}}>
            Start contributing to exoplanet discovery and connect with fellow citizen scientists!
          </p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap'}}>
            <a href="/discussions" style={{
              background: '#4A9EFF',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block'
            }}>
              Start Vetting Data
            </a>
            <a href="/learn" style={{
              background: 'transparent',
              color: '#4A9EFF',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid #4A9EFF',
              display: 'inline-block'
            }}>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Community;


