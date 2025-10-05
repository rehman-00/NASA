import { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import { Link } from 'react-router-dom';

function Resources() {
  const [data, setData] = useState({ videos: [], materials: [], nasa_official: [], api_resources: [] });
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [resourcesResponse, papersResponse] = await Promise.all([
          apiFetch('/api/resources'),
          apiFetch('/api/papers')
        ]);
        setData(resourcesResponse.data);
        setPapers((papersResponse.data && papersResponse.data.papers) || []);
      } catch (e) {
        setError(String(e));
      }
    })();
  }, []);

  return (
    <main className="hero" style={{minHeight: 'calc(100vh - 64px)'}}>
      <div className="content">
        <span className="kicker">Resources</span>
        <h1 className="title">Educational Resources</h1>
        <p className="subtitle">Comprehensive collection of videos, tutorials, and learning materials for exoplanet exploration</p>
        {error ? <div style={{color:'#ffb4b4'}}>{error}</div> : null}
        
        <div className="metrics" style={{marginTop:24}}>
          {/* Educational Videos Section */}
          <div className="metric" style={{textAlign:'left', padding: '20px', border: '1px solid #333', borderRadius: '8px', marginBottom: '16px'}}>
            <strong style={{fontSize: '1.2em', color: '#4A9EFF'}}>🎥 Educational Videos</strong>
            <p style={{opacity: 0.8, marginTop: '8px', marginBottom: '16px'}}>Comprehensive video content for serious exoplanet research and education</p>
            <ul style={{marginTop:12, listStyle: 'none', padding: 0}}>
              {data.videos.map((v, i) => (
                <li key={i} style={{marginBottom: '12px', padding: '12px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333'}}>
                  <a href={v.url} target="_blank" rel="noreferrer" style={{color: '#4A9EFF', textDecoration: 'none', fontWeight: 'bold'}}>
                    {v.title}
                  </a> 
                  <div style={{opacity:0.7, marginTop: '4px', fontSize: '0.9em'}}>
                    <span style={{color: '#4A9EFF'}}>({v.source})</span>
                    {v.description && <span style={{marginLeft: '8px', opacity: 0.8}}> - {v.description}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Learning Materials Section */}
          <div className="metric" style={{textAlign:'left', padding: '20px', border: '1px solid #333', borderRadius: '8px', marginBottom: '16px'}}>
            <strong style={{fontSize: '1.2em', color: '#4A9EFF'}}>📚 Learning Materials</strong>
            <p style={{opacity: 0.8, marginTop: '8px', marginBottom: '16px'}}>Essential resources for exoplanet research and citizen science</p>
            <ul style={{marginTop:12, listStyle: 'none', padding: 0}}>
              {data.materials.map((m, i) => (
                <li key={i} style={{marginBottom: '12px', padding: '12px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333'}}>
                  <a href={m.url} target="_blank" rel="noreferrer" style={{color: '#4A9EFF', textDecoration: 'none', fontWeight: 'bold'}}>
                    {m.title}
                  </a> 
                  <div style={{opacity:0.7, marginTop: '4px', fontSize: '0.9em'}}>
                    <span style={{color: '#4A9EFF'}}>({m.source})</span>
                    {m.description && <span style={{marginLeft: '8px', opacity: 0.8}}> - {m.description}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* NASA Official Resources Section */}
          <div className="metric" style={{textAlign:'left', padding: '20px', border: '1px solid #4A9EFF', borderRadius: '8px', marginBottom: '16px', background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.05) 0%, rgba(74, 158, 255, 0.02) 100%)'}}>
            <strong style={{fontSize: '1.2em', color: '#4A9EFF'}}>🚀 NASA Official Resources</strong>
            <p style={{opacity: 0.8, marginTop: '8px', marginBottom: '16px'}}>Official NASA websites and institutes for exoplanet research</p>
            <ul style={{marginTop:12, listStyle: 'none', padding: 0}}>
              {data.nasa_official.map((n, i) => (
                <li key={i} style={{marginBottom: '12px', padding: '12px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333'}}>
                  <a href={n.url} target="_blank" rel="noreferrer" style={{color: '#4A9EFF', textDecoration: 'none', fontWeight: 'bold'}}>
                    {n.title}
                  </a> 
                  <div style={{opacity:0.7, marginTop: '4px', fontSize: '0.9em'}}>
                    <span style={{color: '#4A9EFF'}}>({n.source})</span>
                    {n.description && <span style={{marginLeft: '8px', opacity: 0.8}}> - {n.description}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* API Resources Section */}
          <div className="metric" style={{textAlign:'left', padding: '20px', border: '1px solid #4A9EFF', borderRadius: '8px', marginBottom: '16px', background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.05) 0%, rgba(74, 158, 255, 0.02) 100%)'}}>
            <strong style={{fontSize: '1.2em', color: '#4A9EFF'}}>🔧 API & Developer Resources</strong>
            <p style={{opacity: 0.8, marginTop: '8px', marginBottom: '16px'}}>Official NASA APIs and developer documentation for accessing exoplanet data</p>
            <ul style={{marginTop:12, listStyle: 'none', padding: 0}}>
              {data.api_resources.map((a, i) => (
                <li key={i} style={{marginBottom: '12px', padding: '12px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333'}}>
                  <a href={a.url} target="_blank" rel="noreferrer" style={{color: '#4A9EFF', textDecoration: 'none', fontWeight: 'bold'}}>
                    {a.title}
                  </a> 
                  <div style={{opacity:0.7, marginTop: '4px', fontSize: '0.9em'}}>
                    <span style={{color: '#4A9EFF'}}>({a.source})</span>
                    {a.description && <span style={{marginLeft: '8px', opacity: 0.8}}> - {a.description}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

          {/* Research Papers Link */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.1) 0%, rgba(74, 158, 255, 0.05) 100%)', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid rgba(74, 158, 255, 0.3)',
            marginTop: '32px',
            textAlign: 'center'
          }}>
            <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>📚 Research Papers</h3>
            <p style={{opacity: 0.9, marginBottom: '20px'}}>
              Explore our comprehensive collection of research papers and scientific publications
            </p>
            <Link 
              to="/papers" 
              style={{
                background: '#4A9EFF',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block'
              }}
            >
              Browse Research Papers →
            </Link>
          </div>
      </div>
    </main>
  );
}

export default Resources;


