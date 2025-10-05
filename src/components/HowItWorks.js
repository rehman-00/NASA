function Step({ title, desc, index }) {
  return (
    <div className="metric">
      <strong>{index}. {title}</strong>
      <div style={{opacity: 0.85, marginTop: 6}}>{desc}</div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="hero" style={{minHeight: 'auto', padding: '48px 24px'}}>
      <div className="content">
        <span className="kicker">How it works</span>
        <h2 className="title" style={{fontSize: 'clamp(28px,4vw,40px)'}}>Fetch → AI → Vet</h2>
        <div className="metrics">
          <Step index={1} title="Fetch light curves" desc="We source TESS/Kepler data from NASA MAST and preprocess it." />
          <Step index={2} title="AI suggestion" desc="A model proposes Planet / False Positive with a confidence score." />
          <Step index={3} title="You vet" desc="You review the plot, pick a label, and add a comment." />
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;


