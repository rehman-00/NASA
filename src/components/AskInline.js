import { useState } from 'react';
import { apiFetch } from '../api';

function AskInline() {
  const [context, setContext] = useState('Use the project stats and exoplanet vetting context to answer concisely.');
  const [question, setQuestion] = useState('How do I classify a transit?');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  async function onAsk(e) {
    e.preventDefault();
    if (!question.trim()) return;
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
    <section className="hero" style={{minHeight:'auto', padding:'24px 0'}}>
      <div className="content">
        <span className="kicker">Ask AI</span>
        <h2 className="title" style={{fontSize:'clamp(22px,3.5vw,32px)'}}>Answers on this page</h2>
        <form onSubmit={onAsk} style={{display:'grid', gap: 10, marginTop: 8}}>
          <textarea value={context} onChange={e=>setContext(e.target.value)} rows={3} placeholder="Optional: paste relevant context from this page" style={{background:'rgba(255,255,255,0.02)', color:'#e6f1ff', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:10}} />
          <div style={{display:'flex', gap:10}}>
            <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask a question" style={{flex:1, background:'rgba(255,255,255,0.02)', color:'#e6f1ff', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:10}} />
            <button className="btn btn-primary" disabled={loading}>{loading ? 'Asking…' : 'Ask'}</button>
          </div>
          <input value={sourceUrl} onChange={e=>setSourceUrl(e.target.value)} placeholder="Optional: source URL to include (docs/notes)" style={{background:'rgba(255,255,255,0.02)', color:'#e6f1ff', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:10}} />
        </form>
        <div className="metrics" style={{marginTop: 12}}>
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
    </section>
  );
}

export default AskInline;


