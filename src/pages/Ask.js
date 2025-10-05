import { useState } from 'react';
import { apiFetch } from '../api';

function Ask() {
  const [context, setContext] = useState(
    'You are an assistant for an exoplanet vetting site. Answer concisely using the given data.'
  );
  const [question, setQuestion] = useState('What is an exoplanet transit?');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  async function onAsk(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { res, data } = await apiFetch('/api/ask', {
        method: 'POST',
        body: JSON.stringify({ context, question, sourceUrl })
      });
      if (!res.ok) {
        setError(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail || data));
        setMessages(m => [...m, { role: 'user', content: question }, { role: 'assistant', content: 'AI error: see details below.' }]);
      } else {
        setError('');
        setMessages(m => [...m, { role: 'user', content: question }, { role: 'assistant', content: (data && data.answer) || 'No answer' }]);
      }
    } catch (e) {
      setError(String(e));
      setMessages(m => [...m, { role: 'assistant', content: 'Error contacting AI service.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="hero" style={{minHeight: 'calc(100vh - 64px)'}}>
      <div className="content">
        <span className="kicker">Ask AI</span>
        <h1 className="title">Get answers from your project data</h1>
        <p className="subtitle">Provide context (docs, stats, notes) and ask a question. The backend will use ChatGPT or similar models.</p>

        <form onSubmit={onAsk} style={{display:'grid', gap: 12, marginTop: 12}}>
          <textarea value={context} onChange={e=>setContext(e.target.value)} rows={5} placeholder="Paste relevant data or instructions" style={{background:'rgba(255,255,255,0.02)', color:'#e6f1ff', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:12}} />
          <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Your question" style={{background:'rgba(255,255,255,0.02)', color:'#e6f1ff', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:12}} />
          <input value={sourceUrl} onChange={e=>setSourceUrl(e.target.value)} placeholder="Optional: source URL to include (docs/notes)" style={{background:'rgba(255,255,255,0.02)', color:'#e6f1ff', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:12}} />
          <div>
            <button className="btn btn-primary" disabled={loading}>{loading ? 'Asking…' : 'Ask'}</button>
          </div>
        </form>

        <div className="metrics" style={{marginTop: 16}}>
          {error ? (
            <div className="metric" style={{textAlign:'left', color:'#ffb4b4'}}>
              <strong>Error</strong>
              <div style={{marginTop:6, whiteSpace:'pre-wrap'}}>{error}</div>
            </div>
          ) : null}
          {messages.map((m, i) => (
            <div key={i} className="metric" style={{textAlign:'left'}}>
              <strong>{m.role === 'user' ? 'You' : 'AI'}</strong>
              <div style={{marginTop:6}}>{m.content}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Ask;


