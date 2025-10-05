const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const merged = {
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) }
  };
  const res = await fetch(url, merged);
  const isJson = (res.headers.get('content-type') || '').includes('application/json');
  const data = isJson ? await res.json() : await res.text();
  return { res, data };
}


