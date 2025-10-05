import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

function About() {
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
        <span className="kicker">About</span>
        <h1 className="title">About ExoVet</h1>
        <p className="subtitle">Your gateway to exoplanet discovery and citizen science</p>
        
        {error ? <div style={{color:'#ffb4b4'}}>{error}</div> : null}

        {/* Dashboard Section */}
        <div className="dashboard-section" style={{marginTop: '32px'}}>
          <h2 style={{fontSize: '1.8em', color: '#4A9EFF', marginBottom: '20px', textAlign: 'center'}}>
            Community Dashboard
          </h2>
          <div className="metrics" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px'}}>
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
              <div style={{fontSize: '1.1em', opacity: 0.9}}>Registered Users</div>
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
              <div style={{fontSize: '1.1em', opacity: 0.9}}>Exoplanet Candidates</div>
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
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid #333',
              marginBottom: '32px'
            }}>
              <h3 style={{color: '#4A9EFF', marginBottom: '16px', textAlign: 'center'}}>Top Contributors</h3>
              <div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
                {stats.top_users.map((user, i) => (
                  <div key={i} style={{
                    padding: '12px 20px', 
                    background: '#2a2a2a', 
                    borderRadius: '8px',
                    border: '1px solid #4A9EFF',
                    textAlign: 'center'
                  }}>
                    <div style={{fontWeight: 'bold', color: '#4A9EFF'}}>{user.user}</div>
                    <div style={{fontSize: '0.9em', opacity: 0.8}}>{user.labels} labels</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* About Us Section */}
        <div className="about-section" style={{marginTop: '32px'}}>
          <h2 style={{fontSize: '1.8em', color: '#4A9EFF', marginBottom: '20px', textAlign: 'center'}}>
            About ExoVet
          </h2>
          
          {/* Project Overview */}
          <div style={{
            background: '#1a1a1a', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #333',
            marginBottom: '20px'
          }}>
            <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>Project Overview</h3>
            <p style={{lineHeight: '1.6', opacity: 0.9}}>
              This platform is designed to help students, educators, and citizen scientists explore the fascinating world of exoplanets. 
              Using AI-powered tools and real NASA data, we make it easier to learn how planets beyond our solar system are discovered, 
              studied, and understood.
            </p>
          </div>

          {/* Mission Statement */}
          <div style={{
            background: '#1a1a1a', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #333',
            marginBottom: '20px'
          }}>
            <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>Mission Statement</h3>
            <ul style={{lineHeight: '1.6', opacity: 0.9, paddingLeft: '20px'}}>
              <li>Make space science accessible</li>
              <li>Empower students with hands-on tools to explore real data</li>
              <li>Encourage citizen science participation in exoplanet discoveries</li>
            </ul>
          </div>

          {/* Why Exoplanets Matter */}
          <div style={{
            background: '#1a1a1a', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #333',
            marginBottom: '20px'
          }}>
            <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>Why Exoplanets Matter</h3>
            <ul style={{lineHeight: '1.6', opacity: 0.9, paddingLeft: '20px'}}>
              <li>Humanity's search for habitable worlds</li>
              <li>Expanding our understanding of planetary systems</li>
              <li>Potential to find signs of life elsewhere</li>
            </ul>
          </div>

          {/* Data Sources */}
          <div style={{
            background: '#1a1a1a', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #333',
            marginBottom: '20px'
          }}>
            <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>Data Sources</h3>
            <p style={{lineHeight: '1.6', opacity: 0.9, marginBottom: '12px'}}>
              We are transparent about where our site gets data:
            </p>
            <ul style={{lineHeight: '1.6', opacity: 0.9, paddingLeft: '20px'}}>
              <li><strong>NASA Exoplanet Archive</strong></li>
              <li><strong>Kepler Mission & TESS Mission datasets</strong></li>
              <li><strong>ESA missions (Gaia, CHEOPS)</strong></li>
              <li><strong>Research papers & AI models</strong></li>
            </ul>
          </div>

          {/* Technology & AI */}
          <div style={{
            background: '#1a1a1a', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #333',
            marginBottom: '20px'
          }}>
            <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>Technology & AI</h3>
            <p style={{lineHeight: '1.6', opacity: 0.9, marginBottom: '12px'}}>
              Here's how AI helps in exoplanet discovery:
            </p>
            <ul style={{lineHeight: '1.6', opacity: 0.9, paddingLeft: '20px'}}>
              <li>Analyzes light curves (brightness changes in stars)</li>
              <li>Identifies potential exoplanet candidates</li>
              <li>Supports citizen scientists in confirming discoveries</li>
            </ul>
          </div>

          {/* Team / Contributors */}
          <div style={{
            background: '#1a1a1a', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #333',
            marginBottom: '20px'
          }}>
            <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>Team & Contributors</h3>
            <p style={{lineHeight: '1.6', opacity: 0.9, marginBottom: '12px'}}>
              This project was built for the NASA Space Apps Challenge 2025.
            </p>
            <p style={{lineHeight: '1.6', opacity: 0.9}}>
              Created by passionate space enthusiasts and developers who believe in making astronomy accessible to everyone.
            </p>
          </div>

          {/* Acknowledgments */}
          <div style={{
            background: '#1a1a1a', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #333',
            marginBottom: '20px'
          }}>
            <h3 style={{color: '#4A9EFF', marginBottom: '12px'}}>Acknowledgments</h3>
            <p style={{lineHeight: '1.6', opacity: 0.9, marginBottom: '12px'}}>
              We thank the following organizations and contributors:
            </p>
            <ul style={{lineHeight: '1.6', opacity: 0.9, paddingLeft: '20px'}}>
              <li><strong>NASA</strong> for providing mission data and support</li>
              <li><strong>ESA</strong> for European space mission contributions</li>
              <li><strong>Open-source contributors</strong> and the scientific community</li>
              <li><strong>Tools & frameworks:</strong> React, FastAPI, OpenAI, and many others</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '2px solid #4A9EFF',
            textAlign: 'center'
          }}>
            <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>Ready to Explore?</h3>
            <p style={{lineHeight: '1.6', opacity: 0.9, marginBottom: '16px'}}>
              Join us in the exciting journey of exoplanet discovery!
            </p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap'}}>
              <a href="/learn" style={{
                background: '#4A9EFF',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block'
              }}>
                Explore Learn Section
              </a>
              <a href="/community" style={{
                background: 'transparent',
                color: '#4A9EFF',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                border: '2px solid #4A9EFF',
                display: 'inline-block'
              }}>
                Join Community
              </a>
              <a href="/discussions" style={{
                background: 'transparent',
                color: '#4A9EFF',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                border: '2px solid #4A9EFF',
                display: 'inline-block'
              }}>
                Start Discussions
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;


