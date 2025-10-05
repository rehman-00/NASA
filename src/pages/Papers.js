import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

function Papers() {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiFetch('/api/papers');
        setPapers((data && data.papers) || []);
      } catch (e) {
        setError(String(e));
      }
    })();
  }, []);

  return (
    <main className="hero" style={{minHeight: 'calc(100vh - 64px)'}}>
      <div className="content">
        <span className="kicker">Research</span>
        <h1 className="title">Popular Research Papers</h1>
        <p className="subtitle">Curated reading list for exoplanet research. Click to view or download.</p>
        
        <div className="papers-section">
          <h2 className="section-heading">Featured Publications</h2>
          <p className="section-description">
            Discover the most influential and widely-cited research papers in exoplanet discovery, AI applications, and space exploration.
          </p>
        {error ? <div style={{color:'#ffb4b4'}}>{error}</div> : null}
        <div className="metrics" style={{marginTop:16}}>
          {papers.map((p, i) => (
            <div key={i} className="metric" style={{textAlign:'left', padding: '20px', border: '1px solid #333', borderRadius: '8px', marginBottom: '16px'}}>
              <strong style={{fontSize: '1.1em', color: '#4A9EFF'}}>{p.title}</strong>
              <div style={{opacity:0.8, marginTop:8, fontSize: '0.9em'}}>
                <strong>Authors:</strong> {Array.isArray(p.authors) ? p.authors.join(', ') : ''}
              </div>
              {p.year && (
                <div style={{opacity:0.7, marginTop:4, fontSize: '0.85em'}}>
                  <strong>Year:</strong> {p.year}
                </div>
              )}
              {p.journal && (
                <div style={{opacity:0.7, marginTop:4, fontSize: '0.85em'}}>
                  <strong>Journal:</strong> {p.journal}
                </div>
              )}
              {p.summary && (
                <div style={{opacity:0.8, marginTop:8, fontSize: '0.9em', fontStyle: 'italic', lineHeight: '1.4'}}>
                  <strong>Summary:</strong> {p.summary}
                </div>
              )}
              <div style={{marginTop:12}}>
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    background: '#4A9EFF',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '0.9em',
                    display: 'inline-block'
                  }}
                >
                  Read Paper
                </a>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </main>
  );
}

export default Papers;


