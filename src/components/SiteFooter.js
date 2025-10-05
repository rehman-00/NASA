function SiteFooter() {
  return (
    <footer style={{
      background: '#000000',
      color: '#ffffff',
      padding: '60px 0 20px',
      borderTop: '1px solid #333333'
    }}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 24px'}}>
        
        {/* NASA Logo and Branding Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
          paddingBottom: '30px',
          borderBottom: '1px solid #333333'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            {/* NASA Logo */}
            <div style={{
              width: '60px',
              height: '60px',
              background: '#ffffff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000000'
            }}>
              NASA
            </div>
            <div style={{textAlign: 'center'}}>
              <h2 style={{
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: 'bold',
                margin: '0 0 8px 0',
                letterSpacing: '1px'
              }}>
                ExoVet
              </h2>
              <p style={{
                color: '#cccccc',
                fontSize: '14px',
                margin: '0',
                opacity: 0.8
              }}>
                NASA Space Apps Challenge 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          
          {/* Quick Links */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Navigation
            </h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <a href="/learn" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                Learn
              </a>
              <a href="/discussions" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                Vet Data
              </a>
              <a href="/community" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                Community
              </a>
              <a href="/resources" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                Resources
              </a>
              <a href="/papers" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                Research
              </a>
              <a href="/about" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                About
              </a>
            </div>
          </div>

          {/* NASA & Partners */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              NASA Partners
            </h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <a href="https://exoplanets.nasa.gov/" target="_blank" rel="noreferrer" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                NASA Exoplanet Exploration
              </a>
              <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                NASA Exoplanet Archive
              </a>
              <a href="https://tess.mit.edu/" target="_blank" rel="noreferrer" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                TESS Mission
              </a>
              <a href="https://www.nasa.gov/" target="_blank" rel="noreferrer" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                NASA Official
              </a>
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Support
            </h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <a href="mailto:contact@exovet.nasa.gov" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                Contact NASA
              </a>
              <a href="https://github.com/exovet/issues" target="_blank" rel="noreferrer" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                Report Issues
              </a>
              <a href="https://github.com/exovet/discussions" target="_blank" rel="noreferrer" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                GitHub Discussions
              </a>
              <a href="/learn#feedback" style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease',
                padding: '4px 0'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#cccccc'}>
                Feedback
              </a>
            </div>
          </div>
        </div>

        {/* Data Sources & Credits */}
        <div style={{
          background: '#111111',
          padding: '30px',
          borderRadius: '8px',
          marginBottom: '40px',
          border: '1px solid #333333'
        }}>
          <h4 style={{
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Data Sources & Credits
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{textAlign: 'center'}}>
              <strong style={{color: '#ffffff', fontSize: '16px', display: 'block', marginBottom: '8px'}}>MAST</strong>
              <p style={{color: '#cccccc', fontSize: '12px', margin: '0'}}>Light curves & telescope data</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <strong style={{color: '#ffffff', fontSize: '16px', display: 'block', marginBottom: '8px'}}>Exoplanet Archive</strong>
              <p style={{color: '#cccccc', fontSize: '12px', margin: '0'}}>Catalog & metadata</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <strong style={{color: '#ffffff', fontSize: '16px', display: 'block', marginBottom: '8px'}}>ADS</strong>
              <p style={{color: '#cccccc', fontSize: '12px', margin: '0'}}>Literature & provenance</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <strong style={{color: '#ffffff', fontSize: '16px', display: 'block', marginBottom: '8px'}}>Kepler/TESS</strong>
              <p style={{color: '#cccccc', fontSize: '12px', margin: '0'}}>Mission datasets</p>
            </div>
          </div>
        </div>

        {/* Social Media & External Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '30px 0',
          borderTop: '1px solid #333333',
          borderBottom: '1px solid #333333'
        }}>
          <div style={{display: 'flex', gap: '30px', flexWrap: 'wrap'}}>
            <a href="https://github.com/exovet" target="_blank" rel="noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#cccccc',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#ffffff'}
            onMouseOut={(e) => e.target.style.color = '#cccccc'}>
              <img src="/github logo.png" alt="GitHub" style={{width: '20px', height: '20px'}} /> GitHub
            </a>
            <a href="https://linkedin.com/company/exovet" target="_blank" rel="noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#cccccc',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#ffffff'}
            onMouseOut={(e) => e.target.style.color = '#cccccc'}>
              <img src="/linked in logo.png" alt="LinkedIn" style={{width: '20px', height: '20px'}} /> LinkedIn
            </a>
            <a href="https://twitter.com/NASAExoplanets" target="_blank" rel="noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#cccccc',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#ffffff'}
            onMouseOut={(e) => e.target.style.color = '#cccccc'}>
              <span style={{fontSize: '20px'}}>𝕏</span> Twitter
            </a>
            <a href="https://youtube.com/c/NASA" target="_blank" rel="noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#cccccc',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#ffffff'}
            onMouseOut={(e) => e.target.style.color = '#cccccc'}>
              <img src="/yt logo.png" alt="YouTube" style={{width: '20px', height: '20px'}} /> YouTube
            </a>
          </div>
          
          <div style={{color: '#999999', fontSize: '12px', textAlign: 'right'}}>
            © 2024 ExoVet. Built for NASA Space Apps Challenge 2025
          </div>
        </div>

        {/* Legal & Privacy */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          padding: '20px 0',
          color: '#999999',
          fontSize: '12px'
        }}>
          <a href="/privacy" style={{color: '#999999', textDecoration: 'none', transition: 'color 0.3s ease'}}
          onMouseOver={(e) => e.target.style.color = '#ffffff'}
          onMouseOut={(e) => e.target.style.color = '#999999'}>Privacy Policy</a>
          <a href="/terms" style={{color: '#999999', textDecoration: 'none', transition: 'color 0.3s ease'}}
          onMouseOver={(e) => e.target.style.color = '#ffffff'}
          onMouseOut={(e) => e.target.style.color = '#999999'}>Terms of Service</a>
          <a href="/accessibility" style={{color: '#999999', textDecoration: 'none', transition: 'color 0.3s ease'}}
          onMouseOver={(e) => e.target.style.color = '#ffffff'}
          onMouseOut={(e) => e.target.style.color = '#999999'}>Accessibility</a>
          <a href="https://github.com/exovet/blob/main/LICENSE" target="_blank" rel="noreferrer" style={{color: '#999999', textDecoration: 'none', transition: 'color 0.3s ease'}}
          onMouseOver={(e) => e.target.style.color = '#ffffff'}
          onMouseOut={(e) => e.target.style.color = '#999999'}>License</a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;


