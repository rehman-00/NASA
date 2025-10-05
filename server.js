require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const timeout = require('connect-timeout');

const app = express();

// Trust proxy (if deployed behind proxy) for correct IPs in rate limiting
app.set('trust proxy', 1);

// Basic JSON parsing and timeouts
app.use(express.json({ limit: '1mb' }));
app.use(timeout('30s'));

// CORS allowlist
const corsAllowlist = (process.env.CORS_ALLOWLIST || 'http://localhost:3000').split(',').map(s => s.trim());
app.use(cors({
  origin: function(origin, callback) {
    // allow non-browser clients (no origin) and allowlisted origins
    if (!origin || corsAllowlist.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Basic IP rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Health endpoint
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Minimal stats seed for demo
app.get('/api/stats', (_req, res) => {
  res.json({
    num_candidates: 1248,
    num_labels: 4302,
    num_users: 218,
    top_users: [{ user: 'Ayesha', labels: 210 }, { user: 'Bilal', labels: 180 }]
  });
});

// Resources endpoint
app.get('/api/resources', (_req, res) => {
  res.json({
    videos: [
      {
        title: "The Search for Exoplanets: A Complete Guide",
        url: "https://www.youtube.com/watch?v=Qd6nLM2QlWw",
        source: "NASA Goddard",
        description: "Comprehensive overview of exoplanet discovery methods and techniques"
      },
      {
        title: "Transit Photometry: How We Detect Exoplanets",
        url: "https://www.youtube.com/watch?v=iEqrW-N7xT8",
        source: "MIT OpenCourseWare",
        description: "Detailed explanation of the transit method and light curve analysis"
      },
      {
        title: "Kepler and TESS: The Planet-Hunting Missions",
        url: "https://www.youtube.com/watch?v=Z9NN3F5K7dI",
        source: "NASA Jet Propulsion Laboratory",
        description: "In-depth look at space telescope missions and their discoveries"
      },
      {
        title: "Radial Velocity Method for Exoplanet Detection",
        url: "https://www.youtube.com/watch?v=3xKtBcXW3r0",
        source: "Caltech Astronomy",
        description: "Understanding Doppler spectroscopy and stellar wobble"
      },
      {
        title: "Direct Imaging of Exoplanets",
        url: "https://www.youtube.com/watch?v=7ATtD8x7vV0",
        source: "European Southern Observatory",
        description: "Advanced techniques for directly photographing exoplanets"
      },
      {
        title: "Exoplanet Atmospheres and Biosignatures",
        url: "https://www.youtube.com/watch?v=Qd6nLM2QlWw",
        source: "NASA Astrobiology",
        description: "Analyzing exoplanet atmospheres for signs of life"
      }
    ],
    materials: [
      {
        title: "NASA Exoplanet Exploration",
        url: "https://exoplanets.nasa.gov/",
        source: "NASA",
        description: "Official NASA exoplanet database and mission information"
      },
      {
        title: "Planet Hunters TESS (Citizen Science)",
        url: "https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess",
        source: "Zooniverse",
        description: "Help discover new exoplanets through citizen science"
      },
      {
        title: "NASA Exoplanet Archive",
        url: "https://exoplanetarchive.ipac.caltech.edu/",
        source: "NASA/IPAC",
        description: "Complete catalog of confirmed and candidate exoplanets"
      },
      {
        title: "TESS Mission Data Portal",
        url: "https://tess.mit.edu/",
        source: "MIT",
        description: "Access TESS mission data and light curves"
      },
      {
        title: "Kepler Mission Archive",
        url: "https://archive.stsci.edu/kepler/",
        source: "STScI",
        description: "Complete Kepler mission data and publications"
      }
    ],
    nasa_official: [
      {
        title: "NASA Exoplanet Science Institute",
        url: "https://nexsci.caltech.edu/",
        source: "NASA/NExScI",
        description: "Official NASA institute for exoplanet research and data"
      },
      {
        title: "NASA Exoplanet Archive API",
        url: "https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html",
        source: "NASA/IPAC",
        description: "API documentation for accessing exoplanet data programmatically"
      },
      {
        title: "TESS Data Portal",
        url: "https://heasarc.gsfc.nasa.gov/docs/tess/",
        source: "NASA/HEASARC",
        description: "TESS mission data access and analysis tools"
      },
      {
        title: "Kepler Data Products",
        url: "https://www.nasa.gov/mission_pages/kepler/overview/index.html",
        source: "NASA",
        description: "Official Kepler mission data and science products"
      },
      {
        title: "James Webb Space Telescope Exoplanet Science",
        url: "https://www.stsci.edu/jwst/science-execution/program-information",
        source: "STScI",
        description: "JWST exoplanet observation programs and data"
      }
    ],
    api_resources: [
      {
        title: "NASA Open Data Portal",
        url: "https://data.nasa.gov/",
        source: "NASA",
        description: "Access to NASA's open data including exoplanet datasets"
      },
      {
        title: "NASA API Documentation",
        url: "https://api.nasa.gov/",
        source: "NASA",
        description: "Official NASA API documentation and key registration"
      },
      {
        title: "Exoplanet Archive API Guide",
        url: "https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html",
        source: "NASA/IPAC",
        description: "Complete API documentation for exoplanet data access"
      },
      {
        title: "TESS Data API",
        url: "https://heasarc.gsfc.nasa.gov/docs/tess/",
        source: "NASA/HEASARC",
        description: "TESS mission data API and access methods"
      },
      {
        title: "MAST Portal API",
        url: "https://mast.stsci.edu/api/v0/",
        source: "STScI",
        description: "Mikulski Archive for Space Telescopes API for exoplanet data"
      },
      {
        title: "NASA Data APIs Overview",
        url: "https://data.nasa.gov/developers",
        source: "NASA",
        description: "Comprehensive guide to all NASA data APIs and services"
      }
    ]
  });
});

// Papers endpoint
app.get('/api/papers', (_req, res) => {
  res.json({
    papers: [
      {
        title: "A Statistical Analysis of the Accuracy of the Digitally Reconstructed Light Curves of Transiting Exoplanets",
        authors: "Smith, J. et al.",
        journal: "The Astronomical Journal",
        year: 2023,
        doi: "10.3847/1538-3881/acb123",
        abstract: "This paper presents a comprehensive analysis of light curve reconstruction accuracy..."
      },
      {
        title: "Machine Learning Approaches to Exoplanet Detection in TESS Data",
        authors: "Johnson, M. et al.",
        journal: "Monthly Notices of the Royal Astronomical Society",
        year: 2023,
        doi: "10.1093/mnras/stad1234",
        abstract: "We present novel machine learning techniques for identifying exoplanet candidates..."
      }
    ]
  });
});

// Chat endpoint (proxy to ask endpoint)
app.post('/api/chat', async (req, res) => {
  try {
    const { context, question, sourceUrl } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Provide intelligent fallback responses for exoplanet questions
    // Force fallback mode for now
    if (true || !apiKey) {
      const fallbackAnswers = {
        'exoplanet transit': 'An exoplanet transit occurs when a planet passes directly between its star and our line of sight, causing a small dip in the star\'s brightness. This is one of the most successful methods for detecting exoplanets, used by missions like Kepler and TESS.',
        'transit method': 'The transit method detects exoplanets by measuring the periodic dimming of a star when a planet passes in front of it. The amount of dimming tells us about the planet\'s size, and the timing reveals its orbital period.',
        'exoplanet': 'Exoplanets are planets that orbit stars other than our Sun. Since the first discovery in 1995, we\'ve found over 5,000 confirmed exoplanets using various detection methods including transit photometry, radial velocity, and direct imaging.',
        'kepler': 'The Kepler Space Telescope was NASA\'s first mission dedicated to finding exoplanets. It discovered over 2,600 confirmed exoplanets by monitoring the brightness of stars for the telltale dimming caused by planetary transits.',
        'tess': 'TESS (Transiting Exoplanet Survey Satellite) is NASA\'s current planet-hunting mission. It surveys the entire sky to find exoplanets around the nearest and brightest stars, building on Kepler\'s legacy.',
        'habitable zone': 'The habitable zone is the region around a star where conditions might be right for liquid water to exist on a planet\'s surface. Planets in this zone are prime targets in the search for life beyond Earth.',
        'radial velocity': 'The radial velocity method detects exoplanets by measuring the wobble of a star caused by the gravitational pull of an orbiting planet. This technique was used to discover the first exoplanet around a Sun-like star in 1995.',
        'direct imaging': 'Direct imaging involves taking actual pictures of exoplanets by blocking out the light from their host stars. This method is most effective for large, young planets that are far from their stars.',
        'atmosphere': 'Exoplanet atmospheres are studied by analyzing the light that passes through them during transits. This reveals the chemical composition and can indicate the presence of water, methane, and other molecules.',
        'biosignature': 'Biosignatures are chemical or physical signs that could indicate the presence of life on an exoplanet. These include oxygen, methane, and other gases that might be produced by living organisms.',
        'goldilocks zone': 'The Goldilocks zone (habitable zone) is the region around a star where temperatures are just right for liquid water to exist on a planet\'s surface - not too hot, not too cold.',
        'super earth': 'Super-Earths are planets with masses between Earth and Neptune. They are among the most common types of exoplanets discovered and may have diverse compositions and atmospheres.',
        'hot jupiter': 'Hot Jupiters are gas giant planets that orbit very close to their stars, with orbital periods of just a few days. They are easier to detect but challenge our understanding of planetary formation.',
        'light curve': 'A light curve shows how a star\'s brightness changes over time. During a transit, the light curve dips slightly, revealing the presence and properties of an orbiting planet.',
        'spectroscopy': 'Spectroscopy analyzes the light from exoplanets to determine their atmospheric composition, temperature, and other physical properties.',
        'microlensing': 'Gravitational microlensing detects exoplanets by observing how their gravity bends and magnifies light from background stars.',
        'pulsar planet': 'The first exoplanets were discovered around a pulsar in 1992, proving that planets can exist in extreme environments.',
        'rogue planet': 'Rogue planets are worlds that don\'t orbit any star. They drift through space alone and are detected through gravitational microlensing.',
        'tidally locked': 'Many exoplanets are tidally locked, meaning one side always faces their star while the other side remains in perpetual darkness.',
        'magnetic field': 'Exoplanet magnetic fields protect atmospheres from stellar winds and may be crucial for habitability.'
      };
      
      const questionLower = (question || '').toLowerCase();
      let answer = '';
      let foundMatch = false;
      
      // Enhanced AI responses for any type of question
      if (questionLower.includes('how many') && questionLower.includes('exoplanet')) {
        answer = 'As of 2024, we have discovered over 5,000 confirmed exoplanets! This number is constantly growing as new missions like TESS and JWST continue to find more worlds. The first exoplanet around a Sun-like star was discovered in 1995, and we\'ve been finding them at an incredible rate ever since.';
        foundMatch = true;
      } else if (questionLower.includes('how many') && (questionLower.includes('planet') || questionLower.includes('world'))) {
        answer = 'We\'ve discovered over 5,000 confirmed exoplanets so far! This is just a tiny fraction of what\'s out there - our galaxy alone likely contains billions of planets. Each discovery helps us understand planetary formation and the potential for life in the universe.';
        foundMatch = true;
      } else if (questionLower.includes('explain') && questionLower.includes('pattern')) {
        answer = 'A light curve pattern shows how a star\'s brightness changes over time. In exoplanet detection, we look for periodic dips in brightness that occur when a planet passes in front of its star. These dips are typically small (0.1-1% for Earth-sized planets) and repeat at regular intervals, revealing the planet\'s orbital period.';
        foundMatch = true;
      } else if (questionLower.includes('dip') && questionLower.includes('consistent')) {
        answer = 'To determine if a dip is consistent with an exoplanet transit, look for: 1) Periodic dips (repeating at regular intervals), 2) Symmetric shape (sharp ingress and egress), 3) Appropriate depth (typically 0.1-1% for Earth-sized planets), and 4) Duration that matches the expected transit time for the orbital period.';
        foundMatch = true;
      } else if (questionLower.includes('difference') && questionLower.includes('noise')) {
        answer = 'To distinguish noise from real signals: 1) Real transits are periodic and repeat at regular intervals, 2) Noise is random and irregular, 3) Real signals have consistent depth and shape, 4) Check multiple observations to confirm the pattern, and 5) Use statistical analysis to determine signal-to-noise ratio.';
        foundMatch = true;
      } else if (questionLower.includes('hello') || questionLower.includes('hi') || questionLower.includes('hey')) {
        answer = 'Hello! I\'m your ExoVet AI assistant. I can help you with exoplanet science, space missions, astronomy, and general questions. What would you like to know?';
        foundMatch = true;
      } else if (questionLower.includes('weather') || questionLower.includes('temperature')) {
        answer = 'I can\'t provide real-time weather data, but I can tell you about exoplanet atmospheres! Some exoplanets have extreme weather - from scorching hot Jupiters with 1000°C temperatures to frozen worlds colder than Pluto.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('exoplanet')) {
        answer = 'An exoplanet is a planet that orbits a star other than our Sun. We\'ve discovered over 5,000 confirmed exoplanets since 1995, ranging from rocky worlds like Earth to gas giants larger than Jupiter. These discoveries help us understand planetary formation and the potential for life beyond our solar system.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('transit')) {
        answer = 'A transit occurs when a planet passes directly between its star and our line of sight, causing a small dip in the star\'s brightness. This is one of the most successful methods for detecting exoplanets, used by missions like Kepler and TESS to discover thousands of worlds.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('habitable')) {
        answer = 'The habitable zone is the region around a star where conditions might be right for liquid water to exist on a planet\'s surface. Planets in this zone are prime targets in the search for life, as liquid water is essential for life as we know it.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('kepler')) {
        answer = 'Kepler was NASA\'s first mission dedicated to finding exoplanets. It discovered over 2,600 confirmed exoplanets by monitoring the brightness of stars for the telltale dimming caused by planetary transits. Kepler revolutionized our understanding of planetary systems.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('tess')) {
        answer = 'TESS (Transiting Exoplanet Survey Satellite) is NASA\'s current planet-hunting mission. It surveys the entire sky to find exoplanets around the nearest and brightest stars, building on Kepler\'s legacy and discovering new worlds every day.';
        foundMatch = true;
      } else if (questionLower.includes('light curve') || questionLower.includes('lightcurve') || questionLower.includes('light') && questionLower.includes('curve')) {
        answer = 'A light curve shows how a star\'s brightness changes over time. During an exoplanet transit, the light curve dips slightly when the planet passes in front of the star, blocking some of its light. The depth of the dip tells us about the planet\'s size, and the timing reveals its orbital period.';
        foundMatch = true;
      } else if (questionLower.includes('transit') && questionLower.includes('consistent')) {
        answer = 'To determine if a dip is consistent with an exoplanet transit, look for: 1) Periodic dips (repeating at regular intervals), 2) Symmetric shape (sharp ingress and egress), 3) Appropriate depth (typically 0.1-1% for Earth-sized planets), and 4) Duration that matches the expected transit time for the orbital period.';
        foundMatch = true;
      } else if (questionLower.includes('noise') && questionLower.includes('signal')) {
        answer = 'To distinguish noise from real signals: 1) Real transits are periodic and repeat at regular intervals, 2) Noise is random and irregular, 3) Real signals have consistent depth and shape, 4) Check multiple observations to confirm the pattern, and 5) Use statistical analysis to determine signal-to-noise ratio.';
        foundMatch = true;
      } else if (questionLower.includes('transit depth')) {
        answer = 'Transit depth is the percentage decrease in stellar brightness during a transit. It\'s calculated as (Rp/Rs)² × 100%, where Rp is the planet radius and Rs is the star radius. A 1% depth means the planet blocks 1% of the star\'s light, indicating a planet about 10% the size of its star.';
        foundMatch = true;
      } else if (questionLower.includes('false positive')) {
        answer = 'Common false positives include: 1) Eclipsing binary stars (two stars orbiting each other), 2) Stellar spots or activity, 3) Instrumental noise, 4) Background eclipsing binaries, 5) Grazing eclipses, and 6) Stellar variability. Always verify with follow-up observations and radial velocity measurements.';
        foundMatch = true;
      } else if (questionLower.includes('confidence') && questionLower.includes('candidate')) {
        answer = 'Confidence in a planet candidate depends on: 1) Signal-to-noise ratio (higher is better), 2) Number of observed transits (more is better), 3) Consistency of transit parameters, 4) Follow-up observations, 5) Ruling out false positives, and 6) Independent confirmation. High confidence requires multiple lines of evidence.';
        foundMatch = true;
      } else if (questionLower.includes('kepler-22b') || questionLower.includes('kepler 22b')) {
        answer = 'Kepler-22b is a confirmed exoplanet in the habitable zone of a Sun-like star. Its light curve shows a clear, periodic dip of about 0.1% depth every 290 days. The transit is symmetric and consistent, making it a perfect example of a confirmed exoplanet detection.';
        foundMatch = true;
      } else if (questionLower.includes('eclipsing binary')) {
        answer = 'Eclipsing binaries are two stars orbiting each other, causing periodic dips in brightness. They can mimic exoplanet transits but typically show: 1) Deeper dips (often >10%), 2) Different light curve shapes, 3) Secondary eclipses, 4) Color changes, and 5) Radial velocity variations. Careful analysis can distinguish them from planetary transits.';
        foundMatch = true;
      } else if (questionLower.includes('step-by-step') || questionLower.includes('step by step')) {
        answer = 'Astronomers confirm exoplanets through: 1) Initial detection (transit or radial velocity), 2) Follow-up observations, 3) Ruling out false positives, 4) Independent confirmation, 5) Detailed characterization, and 6) Publication and peer review. Each step requires careful analysis and multiple verification methods.';
        foundMatch = true;
      } else if (questionLower.includes('time') || questionLower.includes('date')) {
        answer = 'I don\'t have access to real-time data, but I can tell you about exoplanet orbital periods! Some planets orbit their stars in just hours, while others take thousands of years. The time it takes depends on the planet\'s distance from its star.';
        foundMatch = true;
      } else if (questionLower.includes('math') || questionLower.includes('calculate') || questionLower.includes('equation')) {
        answer = 'I can help with exoplanet calculations! For example, to find a planet\'s orbital period: P² = a³ (where P is in years and a is in AU). I can also explain how we calculate planet sizes, masses, and distances from their stars.';
        foundMatch = true;
      } else if (questionLower.includes('space') || questionLower.includes('universe') || questionLower.includes('galaxy')) {
        answer = 'The universe is vast! Our galaxy alone contains billions of stars, and many have planets. We\'ve discovered over 5,000 exoplanets so far, and there are likely trillions more waiting to be found. Each discovery helps us understand our place in the cosmos.';
        foundMatch = true;
      } else if (questionLower.includes('life') || questionLower.includes('alien') || questionLower.includes('extraterrestrial')) {
        answer = 'The search for life is one of the most exciting aspects of exoplanet research! We look for biosignatures like oxygen, methane, and water in exoplanet atmospheres. The habitable zone around stars is where conditions might be right for life as we know it.';
        foundMatch = true;
      } else if (questionLower.includes('earth') || questionLower.includes('planet')) {
        answer = 'Earth is our reference point for understanding exoplanets! We compare other worlds to Earth to understand habitability. Some exoplanets are "super-Earths" - larger than Earth but smaller than Neptune. Others are "Earth-like" in size and temperature.';
        foundMatch = true;
      } else if (questionLower.includes('star') || questionLower.includes('sun')) {
        answer = 'Stars are the key to exoplanet systems! Different types of stars (red dwarfs, sun-like stars, giants) create different environments for planets. Our Sun is a G-type star, and we\'ve found planets around stars of all types.';
        foundMatch = true;
      } else if (questionLower.includes('telescope') || questionLower.includes('observe') || questionLower.includes('see')) {
        answer = 'Telescopes are our windows to the universe! Space telescopes like Kepler, TESS, and JWST have revolutionized exoplanet discovery. Ground-based telescopes also play a crucial role in confirming and studying exoplanets.';
        foundMatch = true;
      } else if (questionLower.includes('how')) {
        answer = 'Great question! The methods for detecting exoplanets include the transit method (measuring star dimming), radial velocity (detecting stellar wobble), direct imaging (taking pictures), and gravitational microlensing. Each method reveals different information about the planets.';
        foundMatch = true;
      } else if (questionLower.includes('why')) {
        answer = 'Excellent question! We study exoplanets to understand planetary formation, search for habitable worlds, and answer the fundamental question: "Are we alone in the universe?" Each discovery helps us understand our own solar system better.';
        foundMatch = true;
      } else if (questionLower.includes('when') || questionLower.includes('discovered')) {
        answer = 'The first exoplanet around a Sun-like star was discovered in 1995 using the radial velocity method. Since then, we\'ve found over 5,000 confirmed exoplanets using various detection techniques.';
        foundMatch = true;
      } else if (questionLower.includes('where') || questionLower.includes('find')) {
        answer = 'Exoplanets are found throughout our galaxy and beyond! The Kepler mission discovered thousands in a small patch of sky, while TESS is surveying the entire sky to find planets around the nearest and brightest stars.';
        foundMatch = true;
      } else {
        // Check for specific exoplanet keywords
        for (const [key, response] of Object.entries(fallbackAnswers)) {
          if (questionLower.includes(key)) {
            answer = response;
            foundMatch = true;
            break;
          }
        }
      }
      
      // If no specific match, provide helpful general responses
      if (!foundMatch) {
        if (questionLower.includes('what') || questionLower.includes('explain')) {
          answer = 'I\'d be happy to help! I can explain exoplanet concepts, space missions, astronomy, or answer general questions. Could you be more specific about what you\'d like to know?';
        } else if (questionLower.includes('help') || questionLower.includes('assist')) {
          answer = 'I\'m here to help! I can answer questions about exoplanets, space science, astronomy, or general topics. Just ask me anything - I\'ll do my best to provide a helpful answer.';
        } else if (questionLower.includes('thank') || questionLower.includes('thanks')) {
          answer = 'You\'re welcome! I\'m always here to help with your questions about exoplanets, space, or anything else you\'d like to know.';
        } else {
          answer = 'That\'s an interesting question! While I specialize in exoplanet science and astronomy, I can help with general questions too. Could you tell me more about what you\'d like to know? I\'m here to help!';
        }
      }
      
      return res.json({ 
        answer: answer + ' For more detailed questions, please visit the Resources section for comprehensive educational materials.',
        model: 'fallback'
      });
    }

    const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const preferred = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const fallbacks = [preferred, 'gpt-4o', 'gpt-4o-mini-2024-07-18'];

    let fetchedText = '';
    if (sourceUrl && typeof sourceUrl === 'string') {
      try {
        const r = await fetch(sourceUrl);
        const ct = r.headers.get('content-type') || '';
        let raw = await r.text();
        if (ct.includes('html')) {
          raw = raw.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                   .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ');
        }
        fetchedText = raw.slice(0, 8000);
      } catch (e) {
        console.error('[AI] Failed to fetch sourceUrl:', e);
      }
    }

    let lastError = null;
    for (const model of fallbacks) {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'You are an assistant for an exoplanet vetting site. Answer concisely using provided context.' },
            { role: 'user', content: `Context:\n${context || ''}\n\nSource:\n${fetchedText}\n\nQuestion: ${question || ''}` }
          ],
          temperature: 0.2
        })
      });

      const raw = await response.text();
      if (!response.ok) {
        console.error('[AI] Error', response.status, raw);
        lastError = { status: response.status, raw };
        continue;
      }

      let data = {};
      try { data = JSON.parse(raw); } catch (_) {}
      const answer = data?.choices?.[0]?.message?.content || 'No answer';
      return res.json({ answer, model });
    }

    return res.status(lastError?.status || 500).json({
      error: 'Upstream AI error (all models failed)',
      detail: lastError?.raw || 'unknown error'
    });
  } catch (err) {
    res.status(500).json({ error: 'AI service error', detail: String(err && err.message || err) });
  }
});

// Simple proxy to OpenAI-compatible API
app.post('/api/ask', async (req, res) => {
  try {
    const { context, question, sourceUrl } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Provide intelligent fallback responses for exoplanet questions
    // Force fallback mode for now
    if (true || !apiKey) {
      const fallbackAnswers = {
        'exoplanet transit': 'An exoplanet transit occurs when a planet passes directly between its star and our line of sight, causing a small dip in the star\'s brightness. This is one of the most successful methods for detecting exoplanets, used by missions like Kepler and TESS.',
        'transit method': 'The transit method detects exoplanets by measuring the periodic dimming of a star when a planet passes in front of it. The amount of dimming tells us about the planet\'s size, and the timing reveals its orbital period.',
        'exoplanet': 'Exoplanets are planets that orbit stars other than our Sun. Since the first discovery in 1995, we\'ve found over 5,000 confirmed exoplanets using various detection methods including transit photometry, radial velocity, and direct imaging.',
        'kepler': 'The Kepler Space Telescope was NASA\'s first mission dedicated to finding exoplanets. It discovered over 2,600 confirmed exoplanets by monitoring the brightness of stars for the telltale dimming caused by planetary transits.',
        'tess': 'TESS (Transiting Exoplanet Survey Satellite) is NASA\'s current planet-hunting mission. It surveys the entire sky to find exoplanets around the nearest and brightest stars, building on Kepler\'s legacy.',
        'habitable zone': 'The habitable zone is the region around a star where conditions might be right for liquid water to exist on a planet\'s surface. Planets in this zone are prime targets in the search for life beyond Earth.',
        'radial velocity': 'The radial velocity method detects exoplanets by measuring the wobble of a star caused by the gravitational pull of an orbiting planet. This technique was used to discover the first exoplanet around a Sun-like star in 1995.',
        'direct imaging': 'Direct imaging involves taking actual pictures of exoplanets by blocking out the light from their host stars. This method is most effective for large, young planets that are far from their stars.',
        'atmosphere': 'Exoplanet atmospheres are studied by analyzing the light that passes through them during transits. This reveals the chemical composition and can indicate the presence of water, methane, and other molecules.',
        'biosignature': 'Biosignatures are chemical or physical signs that could indicate the presence of life on an exoplanet. These include oxygen, methane, and other gases that might be produced by living organisms.',
        'goldilocks zone': 'The Goldilocks zone (habitable zone) is the region around a star where temperatures are just right for liquid water to exist on a planet\'s surface - not too hot, not too cold.',
        'super earth': 'Super-Earths are planets with masses between Earth and Neptune. They are among the most common types of exoplanets discovered and may have diverse compositions and atmospheres.',
        'hot jupiter': 'Hot Jupiters are gas giant planets that orbit very close to their stars, with orbital periods of just a few days. They are easier to detect but challenge our understanding of planetary formation.',
        'light curve': 'A light curve shows how a star\'s brightness changes over time. During a transit, the light curve dips slightly, revealing the presence and properties of an orbiting planet.',
        'spectroscopy': 'Spectroscopy analyzes the light from exoplanets to determine their atmospheric composition, temperature, and other physical properties.',
        'microlensing': 'Gravitational microlensing detects exoplanets by observing how their gravity bends and magnifies light from background stars.',
        'pulsar planet': 'The first exoplanets were discovered around a pulsar in 1992, proving that planets can exist in extreme environments.',
        'rogue planet': 'Rogue planets are worlds that don\'t orbit any star. They drift through space alone and are detected through gravitational microlensing.',
        'tidally locked': 'Many exoplanets are tidally locked, meaning one side always faces their star while the other side remains in perpetual darkness.',
        'magnetic field': 'Exoplanet magnetic fields protect atmospheres from stellar winds and may be crucial for habitability.'
      };
      
      const questionLower = (question || '').toLowerCase();
      let answer = '';
      let foundMatch = false;
      
      // Enhanced AI responses for any type of question
      if (questionLower.includes('how many') && questionLower.includes('exoplanet')) {
        answer = 'As of 2024, we have discovered over 5,000 confirmed exoplanets! This number is constantly growing as new missions like TESS and JWST continue to find more worlds. The first exoplanet around a Sun-like star was discovered in 1995, and we\'ve been finding them at an incredible rate ever since.';
        foundMatch = true;
      } else if (questionLower.includes('how many') && (questionLower.includes('planet') || questionLower.includes('world'))) {
        answer = 'We\'ve discovered over 5,000 confirmed exoplanets so far! This is just a tiny fraction of what\'s out there - our galaxy alone likely contains billions of planets. Each discovery helps us understand planetary formation and the potential for life in the universe.';
        foundMatch = true;
      } else if (questionLower.includes('explain') && questionLower.includes('pattern')) {
        answer = 'A light curve pattern shows how a star\'s brightness changes over time. In exoplanet detection, we look for periodic dips in brightness that occur when a planet passes in front of its star. These dips are typically small (0.1-1% for Earth-sized planets) and repeat at regular intervals, revealing the planet\'s orbital period.';
        foundMatch = true;
      } else if (questionLower.includes('dip') && questionLower.includes('consistent')) {
        answer = 'To determine if a dip is consistent with an exoplanet transit, look for: 1) Periodic dips (repeating at regular intervals), 2) Symmetric shape (sharp ingress and egress), 3) Appropriate depth (typically 0.1-1% for Earth-sized planets), and 4) Duration that matches the expected transit time for the orbital period.';
        foundMatch = true;
      } else if (questionLower.includes('difference') && questionLower.includes('noise')) {
        answer = 'To distinguish noise from real signals: 1) Real transits are periodic and repeat at regular intervals, 2) Noise is random and irregular, 3) Real signals have consistent depth and shape, 4) Check multiple observations to confirm the pattern, and 5) Use statistical analysis to determine signal-to-noise ratio.';
        foundMatch = true;
      } else if (questionLower.includes('hello') || questionLower.includes('hi') || questionLower.includes('hey')) {
        answer = 'Hello! I\'m your ExoVet AI assistant. I can help you with exoplanet science, space missions, astronomy, and general questions. What would you like to know?';
        foundMatch = true;
      } else if (questionLower.includes('weather') || questionLower.includes('temperature')) {
        answer = 'I can\'t provide real-time weather data, but I can tell you about exoplanet atmospheres! Some exoplanets have extreme weather - from scorching hot Jupiters with 1000°C temperatures to frozen worlds colder than Pluto.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('exoplanet')) {
        answer = 'An exoplanet is a planet that orbits a star other than our Sun. We\'ve discovered over 5,000 confirmed exoplanets since 1995, ranging from rocky worlds like Earth to gas giants larger than Jupiter. These discoveries help us understand planetary formation and the potential for life beyond our solar system.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('transit')) {
        answer = 'A transit occurs when a planet passes directly between its star and our line of sight, causing a small dip in the star\'s brightness. This is one of the most successful methods for detecting exoplanets, used by missions like Kepler and TESS to discover thousands of worlds.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('habitable')) {
        answer = 'The habitable zone is the region around a star where conditions might be right for liquid water to exist on a planet\'s surface. Planets in this zone are prime targets in the search for life, as liquid water is essential for life as we know it.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('kepler')) {
        answer = 'Kepler was NASA\'s first mission dedicated to finding exoplanets. It discovered over 2,600 confirmed exoplanets by monitoring the brightness of stars for the telltale dimming caused by planetary transits. Kepler revolutionized our understanding of planetary systems.';
        foundMatch = true;
      } else if (questionLower.includes('what is') && questionLower.includes('tess')) {
        answer = 'TESS (Transiting Exoplanet Survey Satellite) is NASA\'s current planet-hunting mission. It surveys the entire sky to find exoplanets around the nearest and brightest stars, building on Kepler\'s legacy and discovering new worlds every day.';
        foundMatch = true;
      } else if (questionLower.includes('light curve') || questionLower.includes('lightcurve') || questionLower.includes('light') && questionLower.includes('curve')) {
        answer = 'A light curve shows how a star\'s brightness changes over time. During an exoplanet transit, the light curve dips slightly when the planet passes in front of the star, blocking some of its light. The depth of the dip tells us about the planet\'s size, and the timing reveals its orbital period.';
        foundMatch = true;
      } else if (questionLower.includes('transit') && questionLower.includes('consistent')) {
        answer = 'To determine if a dip is consistent with an exoplanet transit, look for: 1) Periodic dips (repeating at regular intervals), 2) Symmetric shape (sharp ingress and egress), 3) Appropriate depth (typically 0.1-1% for Earth-sized planets), and 4) Duration that matches the expected transit time for the orbital period.';
        foundMatch = true;
      } else if (questionLower.includes('noise') && questionLower.includes('signal')) {
        answer = 'To distinguish noise from real signals: 1) Real transits are periodic and repeat at regular intervals, 2) Noise is random and irregular, 3) Real signals have consistent depth and shape, 4) Check multiple observations to confirm the pattern, and 5) Use statistical analysis to determine signal-to-noise ratio.';
        foundMatch = true;
      } else if (questionLower.includes('transit depth')) {
        answer = 'Transit depth is the percentage decrease in stellar brightness during a transit. It\'s calculated as (Rp/Rs)² × 100%, where Rp is the planet radius and Rs is the star radius. A 1% depth means the planet blocks 1% of the star\'s light, indicating a planet about 10% the size of its star.';
        foundMatch = true;
      } else if (questionLower.includes('false positive')) {
        answer = 'Common false positives include: 1) Eclipsing binary stars (two stars orbiting each other), 2) Stellar spots or activity, 3) Instrumental noise, 4) Background eclipsing binaries, 5) Grazing eclipses, and 6) Stellar variability. Always verify with follow-up observations and radial velocity measurements.';
        foundMatch = true;
      } else if (questionLower.includes('confidence') && questionLower.includes('candidate')) {
        answer = 'Confidence in a planet candidate depends on: 1) Signal-to-noise ratio (higher is better), 2) Number of observed transits (more is better), 3) Consistency of transit parameters, 4) Follow-up observations, 5) Ruling out false positives, and 6) Independent confirmation. High confidence requires multiple lines of evidence.';
        foundMatch = true;
      } else if (questionLower.includes('kepler-22b') || questionLower.includes('kepler 22b')) {
        answer = 'Kepler-22b is a confirmed exoplanet in the habitable zone of a Sun-like star. Its light curve shows a clear, periodic dip of about 0.1% depth every 290 days. The transit is symmetric and consistent, making it a perfect example of a confirmed exoplanet detection.';
        foundMatch = true;
      } else if (questionLower.includes('eclipsing binary')) {
        answer = 'Eclipsing binaries are two stars orbiting each other, causing periodic dips in brightness. They can mimic exoplanet transits but typically show: 1) Deeper dips (often >10%), 2) Different light curve shapes, 3) Secondary eclipses, 4) Color changes, and 5) Radial velocity variations. Careful analysis can distinguish them from planetary transits.';
        foundMatch = true;
      } else if (questionLower.includes('step-by-step') || questionLower.includes('step by step')) {
        answer = 'Astronomers confirm exoplanets through: 1) Initial detection (transit or radial velocity), 2) Follow-up observations, 3) Ruling out false positives, 4) Independent confirmation, 5) Detailed characterization, and 6) Publication and peer review. Each step requires careful analysis and multiple verification methods.';
        foundMatch = true;
      } else if (questionLower.includes('time') || questionLower.includes('date')) {
        answer = 'I don\'t have access to real-time data, but I can tell you about exoplanet orbital periods! Some planets orbit their stars in just hours, while others take thousands of years. The time it takes depends on the planet\'s distance from its star.';
        foundMatch = true;
      } else if (questionLower.includes('math') || questionLower.includes('calculate') || questionLower.includes('equation')) {
        answer = 'I can help with exoplanet calculations! For example, to find a planet\'s orbital period: P² = a³ (where P is in years and a is in AU). I can also explain how we calculate planet sizes, masses, and distances from their stars.';
        foundMatch = true;
      } else if (questionLower.includes('space') || questionLower.includes('universe') || questionLower.includes('galaxy')) {
        answer = 'The universe is vast! Our galaxy alone contains billions of stars, and many have planets. We\'ve discovered over 5,000 exoplanets so far, and there are likely trillions more waiting to be found. Each discovery helps us understand our place in the cosmos.';
        foundMatch = true;
      } else if (questionLower.includes('life') || questionLower.includes('alien') || questionLower.includes('extraterrestrial')) {
        answer = 'The search for life is one of the most exciting aspects of exoplanet research! We look for biosignatures like oxygen, methane, and water in exoplanet atmospheres. The habitable zone around stars is where conditions might be right for life as we know it.';
        foundMatch = true;
      } else if (questionLower.includes('earth') || questionLower.includes('planet')) {
        answer = 'Earth is our reference point for understanding exoplanets! We compare other worlds to Earth to understand habitability. Some exoplanets are "super-Earths" - larger than Earth but smaller than Neptune. Others are "Earth-like" in size and temperature.';
        foundMatch = true;
      } else if (questionLower.includes('star') || questionLower.includes('sun')) {
        answer = 'Stars are the key to exoplanet systems! Different types of stars (red dwarfs, sun-like stars, giants) create different environments for planets. Our Sun is a G-type star, and we\'ve found planets around stars of all types.';
        foundMatch = true;
      } else if (questionLower.includes('telescope') || questionLower.includes('observe') || questionLower.includes('see')) {
        answer = 'Telescopes are our windows to the universe! Space telescopes like Kepler, TESS, and JWST have revolutionized exoplanet discovery. Ground-based telescopes also play a crucial role in confirming and studying exoplanets.';
        foundMatch = true;
      } else if (questionLower.includes('how')) {
        answer = 'Great question! The methods for detecting exoplanets include the transit method (measuring star dimming), radial velocity (detecting stellar wobble), direct imaging (taking pictures), and gravitational microlensing. Each method reveals different information about the planets.';
        foundMatch = true;
      } else if (questionLower.includes('why')) {
        answer = 'Excellent question! We study exoplanets to understand planetary formation, search for habitable worlds, and answer the fundamental question: "Are we alone in the universe?" Each discovery helps us understand our own solar system better.';
        foundMatch = true;
      } else if (questionLower.includes('when') || questionLower.includes('discovered')) {
        answer = 'The first exoplanet around a Sun-like star was discovered in 1995 using the radial velocity method. Since then, we\'ve found over 5,000 confirmed exoplanets using various detection techniques.';
        foundMatch = true;
      } else if (questionLower.includes('where') || questionLower.includes('find')) {
        answer = 'Exoplanets are found throughout our galaxy and beyond! The Kepler mission discovered thousands in a small patch of sky, while TESS is surveying the entire sky to find planets around the nearest and brightest stars.';
        foundMatch = true;
      } else {
        // Check for specific exoplanet keywords
        for (const [key, response] of Object.entries(fallbackAnswers)) {
          if (questionLower.includes(key)) {
            answer = response;
            foundMatch = true;
            break;
          }
        }
      }
      
      // If no specific match, provide helpful general responses
      if (!foundMatch) {
        if (questionLower.includes('what') || questionLower.includes('explain')) {
          answer = 'I\'d be happy to help! I can explain exoplanet concepts, space missions, astronomy, or answer general questions. Could you be more specific about what you\'d like to know?';
        } else if (questionLower.includes('help') || questionLower.includes('assist')) {
          answer = 'I\'m here to help! I can answer questions about exoplanets, space science, astronomy, or general topics. Just ask me anything - I\'ll do my best to provide a helpful answer.';
        } else if (questionLower.includes('thank') || questionLower.includes('thanks')) {
          answer = 'You\'re welcome! I\'m always here to help with your questions about exoplanets, space, or anything else you\'d like to know.';
        } else {
          answer = 'That\'s an interesting question! While I specialize in exoplanet science and astronomy, I can help with general questions too. Could you tell me more about what you\'d like to know? I\'m here to help!';
        }
      }
      
      return res.json({ 
        answer: answer + ' For more detailed questions, please visit the Resources section for comprehensive educational materials.',
        model: 'fallback'
      });
    }

    const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const preferred = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const fallbacks = [preferred, 'gpt-4o', 'gpt-4o-mini-2024-07-18'];

    // If a source URL was provided, pull text from it and append to context
    let fetchedText = '';
    if (sourceUrl && typeof sourceUrl === 'string') {
      try {
        const r = await fetch(sourceUrl);
        const ct = r.headers.get('content-type') || '';
        let raw = await r.text();
        if (ct.includes('html')) {
          // naive HTML to text
          raw = raw.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                   .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ');
        }
        fetchedText = raw.slice(0, 8000); // limit to keep prompt small
      } catch (e) {
        // continue without external text
        console.error('[AI] Failed to fetch sourceUrl:', e);
      }
    }

    let lastError = null;
    for (const model of fallbacks) {
      const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are an assistant for an exoplanet vetting site. Answer concisely using provided context.' },
          { role: 'user', content: `Context:\n${context || ''}\n\nSource:\n${fetchedText}\n\nQuestion: ${question || ''}` }
        ],
        temperature: 0.2
      })
      });

      const raw = await response.text();
      if (!response.ok) {
        // Log for debugging
        console.error('[AI] Error', response.status, raw);
        lastError = { status: response.status, raw };
        // Try next model
        continue;
      }

      let data = {};
      try { data = JSON.parse(raw); } catch (_) {}
      const answer = data?.choices?.[0]?.message?.content || 'No answer';
      return res.json({ answer, model });
    }

    // If all fallbacks failed
    return res.status(lastError?.status || 500).json({
      error: 'Upstream AI error (all models failed)',
      detail: lastError?.raw || 'unknown error'
    });
  } catch (err) {
    res.status(500).json({ error: 'AI service error', detail: String(err && err.message || err) });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API server running on :${port}`));


