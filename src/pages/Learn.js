import { useState } from 'react';

function Learn() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = {
    intro: {
      title: "What are Exoplanets?",
      content: (
        <div>
          <p>Exoplanets are planets that orbit stars outside our solar system. Since 1992, we've discovered over 5,000 confirmed exoplanets!</p>
          <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', margin: '16px 0'}}>
            <h4>Why Study Exoplanets?</h4>
            <ul>
              <li>🌍 Understand if Earth is unique in the universe</li>
              <li>🔍 Search for potentially habitable worlds</li>
              <li>📊 Learn about planet formation and evolution</li>
              <li>🚀 Prepare for future space exploration</li>
            </ul>
          </div>
        </div>
      )
    },
    detection: {
      title: "How We Detect Exoplanets",
      content: (
        <div>
          <div style={{display: 'grid', gap: '16px', marginTop: '16px'}}>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>🔍 Transit Method</h4>
              <p>When a planet passes in front of its star, it blocks some light, causing a dip in brightness. This is how Kepler and TESS find most exoplanets.</p>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>🌊 Radial Velocity</h4>
              <p>The planet's gravity causes the star to wobble slightly. We detect this by measuring changes in the star's light spectrum.</p>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>📸 Direct Imaging</h4>
              <p>Taking actual pictures of exoplanets using advanced telescopes with coronagraphs to block starlight.</p>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>🔮 Microlensing</h4>
              <p>When a planet's gravity bends and magnifies light from a background star, creating a temporary brightening.</p>
            </div>
          </div>
        </div>
      )
    },
    ai: {
      title: "AI in Exoplanet Discovery",
      content: (
        <div>
          <p>Modern telescopes collect massive amounts of data - too much for humans to analyze manually. That's where AI comes in!</p>
          <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', margin: '16px 0'}}>
            <h4>🤖 How AI Helps</h4>
            <ol>
              <li><strong>Telescope Data:</strong> Kepler/TESS collect light curves (brightness over time)</li>
              <li><strong>AI Analysis:</strong> Machine learning algorithms scan for transit patterns</li>
              <li><strong>Human Verification:</strong> Citizen scientists and astronomers confirm candidates</li>
              <li><strong>Discovery:</strong> New exoplanets are announced!</li>
            </ol>
          </div>
          <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', margin: '16px 0'}}>
            <h4>👥 Your Role as Citizen Scientist</h4>
            <p>You can help by analyzing light curves on platforms like Planet Hunters, confirming AI findings, and discovering new worlds!</p>
          </div>
        </div>
      )
    },
    types: {
      title: "Types of Exoplanets",
      content: (
        <div>
          <div style={{display: 'grid', gap: '16px', marginTop: '16px'}}>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>🔥 Hot Jupiters</h4>
              <p>Gas giants that orbit very close to their stars, with surface temperatures over 1000°C. They complete orbits in just days!</p>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>🌍 Super-Earths</h4>
              <p>Rocky planets 2-10 times Earth's mass. They might be habitable if they're in the right distance from their star.</p>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>🌊 Mini-Neptunes</h4>
              <p>Smaller versions of Neptune with thick atmospheres. They're between Earth and Neptune in size.</p>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>🌡️ Habitable Zone (Goldilocks Zone)</h4>
              <p>The perfect distance from a star where liquid water can exist - not too hot, not too cold, just right for life as we know it.</p>
            </div>
          </div>
        </div>
      )
    },
    milestones: {
      title: "Key Discoveries",
      content: (
        <div>
          <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', margin: '16px 0'}}>
            <h4>📅 Timeline of Exoplanet Science</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{margin: '12px 0', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px'}}>
                <strong>1992:</strong> First exoplanets discovered around pulsar PSR B1257+12
              </li>
              <li style={{margin: '12px 0', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px'}}>
                <strong>1995:</strong> 51 Pegasi b - First exoplanet around a Sun-like star
              </li>
              <li style={{margin: '12px 0', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px'}}>
                <strong>2009-2018:</strong> Kepler Space Telescope discovers 2,600+ exoplanets
              </li>
              <li style={{margin: '12px 0', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px'}}>
                <strong>2018-Present:</strong> TESS mission continues the search
              </li>
              <li style={{margin: '12px 0', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px'}}>
                <strong>2021:</strong> James Webb Space Telescope launches for atmosphere studies
              </li>
            </ul>
          </div>
        </div>
      )
    },
    howItWorks: {
      title: "How It Works",
      content: (
        <div>
          <p>ExoVet combines AI technology with citizen science to make exoplanet discovery accessible to everyone. Here's how our platform works:</p>
          
          <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
            <h4>🔬 Step 1: Data Collection</h4>
            <p>Space telescopes like Kepler and TESS continuously monitor thousands of stars, recording their brightness over time. This creates "light curves" - graphs showing how a star's brightness changes.</p>
            <div style={{background: 'rgba(74, 158, 255, 0.1)', padding: '12px', borderRadius: '8px', margin: '12px 0', border: '1px solid rgba(74, 158, 255, 0.3)'}}>
              <strong>💡 Fun Fact:</strong> Kepler monitored 150,000+ stars for 4 years, generating over 2 billion data points!
            </div>
          </div>

          <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
            <h4>🤖 Step 2: AI Analysis</h4>
            <p>Our AI algorithms analyze these light curves, looking for the telltale dips in brightness that indicate a planet passing in front of its star. The AI can process thousands of light curves in minutes.</p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '12px 0'}}>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Pattern Recognition</strong><br/>
                Identifies transit patterns
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Noise Filtering</strong><br/>
                Removes false signals
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Candidate Ranking</strong><br/>
                Scores potential planets
              </div>
            </div>
          </div>

          <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
            <h4>👥 Step 3: Citizen Science Validation</h4>
            <p>This is where you come in! Our platform allows citizen scientists to review AI-identified candidates, helping to confirm or reject potential exoplanet discoveries.</p>
            <div style={{background: 'rgba(74, 158, 255, 0.1)', padding: '12px', borderRadius: '8px', margin: '12px 0', border: '1px solid rgba(74, 158, 255, 0.3)'}}>
              <strong>🎯 Your Role:</strong> Review light curves, flag interesting patterns, and help validate AI findings. No prior experience required - our tutorials will guide you!
            </div>
          </div>

          <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
            <h4>🔬 Step 4: Scientific Verification</h4>
            <p>Promising candidates undergo further analysis by professional astronomers using ground-based telescopes and advanced instruments to confirm their planetary nature.</p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', margin: '12px 0'}}>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Radial Velocity</strong><br/>
                Measure star wobble
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Spectroscopy</strong><br/>
                Analyze atmosphere
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Follow-up</strong><br/>
                Confirm discovery
              </div>
            </div>
          </div>

          <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
            <h4>🌟 Step 5: Discovery & Publication</h4>
            <p>Confirmed exoplanets are added to the NASA Exoplanet Archive and published in scientific journals. You could be part of discovering the next Earth-like world!</p>
            <div style={{background: 'rgba(74, 158, 255, 0.1)', padding: '12px', borderRadius: '8px', margin: '12px 0', border: '1px solid rgba(74, 158, 255, 0.3)'}}>
              <strong>🏆 Recognition:</strong> Citizen scientists who contribute to discoveries are often credited in scientific publications!
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.1) 0%, rgba(74, 158, 255, 0.05) 100%)', padding: '20px', borderRadius: '12px', margin: '20px 0', border: '1px solid rgba(74, 158, 255, 0.3)'}}>
            <h4>🚀 Get Started Today!</h4>
            <p>Ready to become a planet hunter? Visit our <a href="/discussions" style={{color: '#4A9EFF', textDecoration: 'none'}}>Discussions</a> section to start analyzing real telescope data, or explore our <a href="/resources" style={{color: '#4A9EFF', textDecoration: 'none'}}>Resources</a> to learn more about exoplanet science!</p>
          </div>
        </div>
      )
    },
    feedback: {
      title: "Feedback & Support",
      content: (
        <div>
          <p>We value your feedback and are here to help you succeed in your exoplanet discovery journey!</p>
          
          <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
            <h4>💬 Share Your Experience</h4>
            <p>Tell us about your learning journey, discoveries you've made, or challenges you've faced. Your feedback helps us improve the platform for everyone.</p>
            <div style={{background: 'rgba(74, 158, 255, 0.1)', padding: '12px', borderRadius: '8px', margin: '12px 0', border: '1px solid rgba(74, 158, 255, 0.3)'}}>
              <strong>🎯 What we'd love to hear:</strong>
              <ul style={{margin: '8px 0', paddingLeft: '20px'}}>
                <li>Was the learning material helpful and clear?</li>
                <li>Did you find any interesting patterns in the data?</li>
                <li>What features would you like to see added?</li>
                <li>Any suggestions for improving the user experience?</li>
              </ul>
            </div>
          </div>

          <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
            <h4>🆘 Need Help?</h4>
            <p>Stuck on something? Don't worry - we're here to help you succeed!</p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', margin: '16px 0'}}>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px'}}>
                <h5 style={{color: '#4A9EFF', marginBottom: '8px'}}>📚 Learning Support</h5>
                <p style={{fontSize: '14px', opacity: 0.9}}>Need help understanding concepts? Check our tutorials and guides.</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px'}}>
                <h5 style={{color: '#4A9EFF', marginBottom: '8px'}}>🔧 Technical Issues</h5>
                <p style={{fontSize: '14px', opacity: 0.9}}>Experiencing bugs or technical problems? Let us know!</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px'}}>
                <h5 style={{color: '#4A9EFF', marginBottom: '8px'}}>💡 Feature Requests</h5>
                <p style={{fontSize: '14px', opacity: 0.9}}>Have ideas for new features? We'd love to hear them!</p>
              </div>
            </div>
          </div>

          <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
            <h4>📝 How to Submit Feedback</h4>
            <div style={{display: 'grid', gap: '12px', margin: '16px 0'}}>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px'}}>
                <strong>1. Use the Discussions Section</strong>
                <p style={{margin: '4px 0', fontSize: '14px', opacity: 0.8}}>Post your feedback in our <a href="/discussions" style={{color: '#4A9EFF', textDecoration: 'none'}}>Discussions</a> section where the community can also help.</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px'}}>
                <strong>2. Community Support</strong>
                <p style={{margin: '4px 0', fontSize: '14px', opacity: 0.8}}>Join our community discussions to get help from other users and share your experiences.</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px'}}>
                <strong>3. Direct Contact</strong>
                <p style={{margin: '4px 0', fontSize: '14px', opacity: 0.8}}>For urgent issues or detailed feedback, you can reach out through our contact channels.</p>
              </div>
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.1) 0%, rgba(74, 158, 255, 0.05) 100%)', padding: '20px', borderRadius: '12px', margin: '20px 0', border: '1px solid rgba(74, 158, 255, 0.3)'}}>
            <h4>🏆 Success Stories</h4>
            <p>Share your achievements! Whether you've identified a potential exoplanet candidate, mastered a new concept, or contributed to the community, we'd love to celebrate your success.</p>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', margin: '12px 0'}}>
              <strong>🌟 Recognition:</strong> Outstanding contributors may be featured in our community highlights and receive special recognition!
            </div>
          </div>

          <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
            <h4>📊 Help Us Improve</h4>
            <p>Your feedback directly impacts the development of ExoVet. We use your suggestions to:</p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '16px 0'}}>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Improve Features</strong><br/>
                <span style={{fontSize: '14px', opacity: 0.8}}>Enhance existing tools</span>
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Add New Tools</strong><br/>
                <span style={{fontSize: '14px', opacity: 0.8}}>Develop new capabilities</span>
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Fix Issues</strong><br/>
                <span style={{fontSize: '14px', opacity: 0.8}}>Resolve problems quickly</span>
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center'}}>
                <strong>Enhance UX</strong><br/>
                <span style={{fontSize: '14px', opacity: 0.8}}>Improve user experience</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    resources: {
      title: "Learning Resources",
      content: (
        <div>
          <div style={{display: 'grid', gap: '16px', marginTop: '16px'}}>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>🌐 Official NASA Resources</h4>
              <ul>
                <li><a href="https://exoplanets.nasa.gov/" target="_blank" rel="noreferrer">NASA Exoplanet Exploration</a></li>
                <li><a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer">NASA Exoplanet Archive</a></li>
                <li><a href="https://tess.mit.edu/" target="_blank" rel="noreferrer">TESS Mission</a></li>
              </ul>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>👥 Citizen Science Projects</h4>
              <ul>
                <li><a href="https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess" target="_blank" rel="noreferrer">Planet Hunters TESS</a></li>
                <li><a href="https://www.zooniverse.org/projects/ianc2/exoplanet-watch" target="_blank" rel="noreferrer">Exoplanet Watch</a></li>
              </ul>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px'}}>
              <h4>📚 Educational Materials</h4>
              <ul>
                <li>Light curve analysis tutorials</li>
                <li>Kepler and TESS data archives</li>
                <li>Interactive exoplanet databases</li>
                <li>Astronomy courses and MOOCs</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <main className="hero" style={{minHeight: 'calc(100vh - 64px)'}}>
      <div className="content">
        <span className="kicker">Learn</span>
        <h1 className="title">Exoplanet Education Hub</h1>
        <p className="subtitle">Master the fundamentals of exoplanet science and become a citizen scientist</p>

        {/* Navigation Tabs */}
        <div style={{display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap'}}>
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                padding: '8px 16px',
                background: activeSection === key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#e6f1ff',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{marginTop: '24px', minHeight: '400px'}}>
          <h2 style={{marginBottom: '16px', color: '#e6f1ff'}}>
            {sections[activeSection].title}
          </h2>
          <div style={{color: '#b8c5d1', lineHeight: '1.6'}}>
            {sections[activeSection].content}
          </div>
        </div>

        {/* Quick Knowledge Check */}
        {activeSection === 'howItWorks' && (
          <div style={{marginTop: '32px', background: 'rgba(74, 158, 255, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(74, 158, 255, 0.3)'}}>
            <h3 style={{color: '#4A9EFF', marginBottom: '16px'}}>🧠 Quick Knowledge Check</h3>
            <div style={{display: 'grid', gap: '12px'}}>
              <div style={{background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px'}}>
                <strong>Q: What is a light curve?</strong>
                <p style={{margin: '8px 0', opacity: 0.8}}>A: A graph showing how a star's brightness changes over time, which can reveal when planets pass in front of the star.</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px'}}>
                <strong>Q: How does AI help in exoplanet discovery?</strong>
                <p style={{margin: '8px 0', opacity: 0.8}}>A: AI algorithms can quickly analyze thousands of light curves to identify potential transit patterns that humans might miss.</p>
              </div>
              <div style={{background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px'}}>
                <strong>Q: What role do citizen scientists play?</strong>
                <p style={{margin: '8px 0', opacity: 0.8}}>A: They help validate AI findings by reviewing light curves and confirming potential exoplanet candidates.</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Quiz Section */}
        <div style={{background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', marginTop: '32px'}}>
          <h3 style={{color: '#e6f1ff', marginBottom: '16px'}}>🧠 Quick Knowledge Check</h3>
          <div style={{display: 'grid', gap: '12px'}}>
            <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px'}}>
              <strong>Q:</strong> What method does the Kepler telescope primarily use to find exoplanets?
              <div style={{marginTop: '8px', color: '#90cdf4'}}>
                <strong>A:</strong> Transit method - measuring dips in starlight when planets pass in front of their stars.
              </div>
            </div>
            <div style={{background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px'}}>
              <strong>Q:</strong> What is the "Goldilocks Zone"?
              <div style={{marginTop: '8px', color: '#90cdf4'}}>
                <strong>A:</strong> The habitable zone around a star where liquid water can exist on a planet's surface.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Learn;


