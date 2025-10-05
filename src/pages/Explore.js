import AskInline from '../components/AskInline';

function Explore() {
  return (
    <>
      <main className="hero" style={{minHeight: 'calc(100vh - 64px)'}}>
        <div className="content">
          <span className="kicker">Explore • Vet Candidates</span>
          <h1 className="title">AI Light Curve Tool</h1>
          <p className="subtitle">Search targets (TIC/Kepler ID), view light curves, and classify.</p>
          <div className="metric" style={{marginTop: 16}}>
            Coming soon: MAST fetch, plotly light curve, AI classification, vote buttons.
          </div>
        </div>
      </main>
      <AskInline />
    </>
  );
}

export default Explore;


