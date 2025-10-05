import { useState } from 'react';
import { apiFetch } from '../api';

function Discussions() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant for NASA exoplanet discussions.' }
  ]);
  const [input, setInput] = useState('What are hot Jupiters?');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('chat');

  async function send() {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', content: input }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const { res, data } = await apiFetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: next.filter(m => m.role !== 'system') })
      });
      if (!res.ok) {
        setError(typeof data.detail === 'string' ? data.detail : JSON.stringify(data));
        setMessages(m => [...m, { role: 'assistant', content: 'AI error: see details below.' }]);
      } else {
        setError('');
        setMessages(m => [...m, { role: 'assistant', content: (data && data.reply) || '' }]);
      }
    } catch (e) {
      setError(String(e));
      setMessages(m => [...m, { role: 'assistant', content: 'Error contacting AI service.' }]);
    } finally {
      setLoading(false);
    }
  }

  // Quick action functions for vetting
  const quickActions = {
    dataAnalysis: [
      "Explain this light curve pattern in simple terms.",
      "Is this dip consistent with an exoplanet transit?",
      "How can I tell the difference between noise and a real signal?"
    ],
    comparison: [
      "Show me an example of a confirmed exoplanet light curve.",
      "Compare this candidate to Kepler-22b's transit data.",
      "Does this look like an eclipsing binary or a planet?"
    ],
    decisionSupport: [
      "What factors should I check before labeling as a planet candidate?",
      "List possible reasons for false positives here.",
      "How confident should I be about this candidate?"
    ],
    learning: [
      "Explain what 'transit depth' means in this context.",
      "Why is the star's brightness important in exoplanet detection?",
      "Step-by-step: how do astronomers confirm exoplanets?"
    ],
    community: [
      "What should I do after labeling this candidate?",
      "How can I contribute my findings to NASA or citizen science projects?",
      "Summarize my vetting so I can share it in the community section."
    ]
  };

  const handleQuickAction = (action) => {
    setInput(action);
    setActiveTab('chat');
  };

  return (
    <main className="hero" style={{minHeight: 'calc(100vh - 64px)'}}>
      <div className="content">
        <span className="kicker">Vet Data</span>
        <h1 className="title">Exoplanet Data Vetting</h1>
        <p className="subtitle">Analyze light curves, chat with AI, and contribute to exoplanet discovery.</p>

        {/* Tab Navigation */}
        <div style={{display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap'}}>
          <button
            onClick={() => setActiveTab('chat')}
            style={{
              padding: '8px 16px',
              background: activeTab === 'chat' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: '#e6f1ff',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            💬 AI Chat
          </button>
          <button
            onClick={() => setActiveTab('vetting')}
            style={{
              padding: '8px 16px',
              background: activeTab === 'vetting' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: '#e6f1ff',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔬 Start Vetting
          </button>
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div>
            <div className="metrics" style={{marginTop:12, display:'grid', gap:12}}>
              {messages.filter(m => m.role !== 'system').map((m, i) => (
                <div key={i} className="metric" style={{textAlign:'left'}}>
                  <strong>{m.role === 'user' ? 'You' : 'AI'}</strong>
                  <div style={{marginTop:6, whiteSpace:'pre-wrap'}}>{m.content}</div>
                </div>
              ))}
              {error ? (
                <div className="metric" style={{textAlign:'left', color:'#ffb4b4'}}>
                  <strong>Error</strong>
                  <div style={{marginTop:6, whiteSpace:'pre-wrap'}}>{error}</div>
                </div>
              ) : null}
            </div>

            <div style={{display:'flex', gap:10, marginTop:12}}>
              <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" style={{flex:1, background:'rgba(255,255,255,0.02)', color:'#e6f1ff', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:12}} />
              <button className="btn btn-primary" onClick={send} disabled={loading}>{loading ? 'Sending…' : 'Send'}</button>
            </div>
          </div>
        )}

        {/* Vetting Tab */}
        {activeTab === 'vetting' && (
          <div style={{marginTop: '24px'}}>
            <div style={{background: 'rgba(74, 158, 255, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(74, 158, 255, 0.3)', marginBottom: '24px'}}>
              <h2 style={{color: '#4A9EFF', marginBottom: '12px'}}>🔬 Professional Exoplanet Vetting Tools</h2>
              <p style={{opacity: 0.9, marginBottom: '16px'}}>
                Use these specialized prompts to analyze light curves, identify transit patterns, 
                and make informed decisions about exoplanet candidates. Each category is designed for 
                different stages of the vetting process.
              </p>
            </div>

            {/* Data Analysis Section */}
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px'}}>
              <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>📊 Data Analysis</h3>
              <p style={{opacity: 0.8, marginBottom: '16px'}}>Analyze light curve patterns and identify key characteristics</p>
              <div style={{display: 'grid', gap: '12px'}}>
                {quickActions.dataAnalysis.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#e6f1ff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(74, 158, 255, 0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison & Examples Section */}
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px'}}>
              <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>🔍 Comparison & Examples</h3>
              <p style={{opacity: 0.8, marginBottom: '16px'}}>Compare candidates with known exoplanets and identify patterns</p>
              <div style={{display: 'grid', gap: '12px'}}>
                {quickActions.comparison.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#e6f1ff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(74, 158, 255, 0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Decision Support Section */}
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px'}}>
              <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>⚖️ Decision Support</h3>
              <p style={{opacity: 0.8, marginBottom: '16px'}}>Get guidance on labeling and confidence assessment</p>
              <div style={{display: 'grid', gap: '12px'}}>
                {quickActions.decisionSupport.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#e6f1ff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(74, 158, 255, 0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Learning & Guidance Section */}
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px'}}>
              <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>📚 Learning & Guidance</h3>
              <p style={{opacity: 0.8, marginBottom: '16px'}}>Understand key concepts and methodologies</p>
              <div style={{display: 'grid', gap: '12px'}}>
                {quickActions.learning.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#e6f1ff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(74, 158, 255, 0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Community & Next Steps Section */}
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '20px'}}>
              <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>🌐 Community & Next Steps</h3>
              <p style={{opacity: 0.8, marginBottom: '16px'}}>Share findings and contribute to the scientific community</p>
              <div style={{display: 'grid', gap: '12px'}}>
                {quickActions.community.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(action)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#e6f1ff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(74, 158, 255, 0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Professional Vetting Workflow */}
            <div style={{background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.1) 0%, rgba(74, 158, 255, 0.05) 100%)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(74, 158, 255, 0.3)'}}>
              <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>🔄 Professional Vetting Workflow</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'}}>
                <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>
                  <div style={{fontSize: '24px', marginBottom: '8px'}}>1️⃣</div>
                  <strong>Data Analysis</strong>
                  <p style={{fontSize: '14px', opacity: 0.8, margin: '8px 0 0 0'}}>Examine light curve patterns</p>
                </div>
                <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>
                  <div style={{fontSize: '24px', marginBottom: '8px'}}>2️⃣</div>
                  <strong>Comparison</strong>
                  <p style={{fontSize: '14px', opacity: 0.8, margin: '8px 0 0 0'}}>Compare with known examples</p>
                </div>
                <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>
                  <div style={{fontSize: '24px', marginBottom: '8px'}}>3️⃣</div>
                  <strong>Decision</strong>
                  <p style={{fontSize: '14px', opacity: 0.8, margin: '8px 0 0 0'}}>Make informed labeling decisions</p>
                </div>
                <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>
                  <div style={{fontSize: '24px', marginBottom: '8px'}}>4️⃣</div>
                  <strong>Community</strong>
                  <p style={{fontSize: '14px', opacity: 0.8, margin: '8px 0 0 0'}}>Share and contribute findings</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Discussions;


