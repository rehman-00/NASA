"""
Exoplanet Education Hub - AI Backend API with Google Gemini
FastAPI backend for handling exoplanet-related questions
"""
import os
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Try to import Google Generative AI
try:
    import google.generativeai as genai
except ImportError:
    genai = None  # type: ignore

# Load environment variables
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
CORS_ALLOWLIST = [
    o.strip()
    for o in os.getenv(
        "CORS_ALLOWLIST",
        "http://localhost:3000,http://localhost:5173"
    ).split(",")
]

app = FastAPI(title="Exoplanet AI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOWLIST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    """Model for chat messages with role and content"""
    role: str
    content: str


class ChatRequest(BaseModel):
    """Request model for chat endpoint"""
    messages: List[ChatMessage]
    temperature: Optional[float] = 0.7


class AskRequest(BaseModel):
    """Request model for simple Q&A endpoint"""
    context: Optional[str] = ""
    question: Optional[str] = ""


@app.get("/api/health")
def health():
    """Health check endpoint"""
    return {"ok": True, "ai_provider": "Google Gemini"}


@app.get("/")
def root():
    """Root endpoint with service info"""
    return {
        "service": "exoplanet-ai-backend",
        "ai_provider": "Google Gemini",
        "health": "/api/health"
    }


def get_gemini_model():
    """
    Configure and return Google Gemini model.
    Raises HTTPException if API key is missing or SDK not installed.
    """
    if not GOOGLE_API_KEY:
        raise HTTPException(
            status_code=500,
            detail=(
                "GOOGLE_API_KEY missing. "
                "Get it from https://aistudio.google.com/app/apikey"
            )
        )

    if genai is None:
        raise HTTPException(
            status_code=500,
            detail=(
                "Google Generative AI SDK not installed. "
                "Run: pip install google-generativeai"
            )
        )

    genai.configure(api_key=GOOGLE_API_KEY)
    return genai.GenerativeModel(GEMINI_MODEL)


def convert_messages_to_gemini_format(messages: List[dict]) -> str:
    """
    Convert chat messages to Gemini-compatible format.
    Gemini uses a simpler prompt format.
    """
    conversation = ""
    system_prompt = ""

    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "")

        if role == "system":
            system_prompt = content
        elif role == "user":
            conversation += f"User: {content}\n"
        elif role == "assistant":
            conversation += f"Assistant: {content}\n"

    # Combine system prompt with conversation
    if system_prompt:
        full_prompt = f"{system_prompt}\n\n{conversation}"
                else:
        full_prompt = conversation

    return full_prompt


@app.post("/api/ask")
def ask(req: AskRequest):
    """
    Simple Q&A endpoint for exoplanet questions.
    Accepts context and question, returns AI-generated answer.
    """
    try:
        model = get_gemini_model()

        system_prompt = (
            "You are an expert exoplanet science educator. "
            "Answer questions about exoplanets, detection methods "
            "(transit, radial velocity, microlensing, direct imaging), "
            "space missions (Kepler, TESS, JWST), and astronomy clearly. "
            "Keep answers concise but informative and scientifically accurate."
        )

        user_prompt = ""
        if req.context:
            user_prompt += f"Context:\n{req.context}\n\n"
        if req.question:
            user_prompt += f"Question: {req.question}"

        full_prompt = f"{system_prompt}\n\n{user_prompt}"

        # Generate response
        response = model.generate_content(full_prompt)

        return {
            "answer": response.text,
            "model": GEMINI_MODEL,
            "provider": "Google Gemini"
        }

    except (ValueError, RuntimeError, ConnectionError) as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI generation error: {str(e)}"
        ) from e
        except Exception as e:
        # Log unexpected errors for debugging
        print(f"Unexpected error in ask endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again."
        ) from e


@app.post("/api/chat")
def chat(req: ChatRequest):
    """
    Multi-turn chat endpoint for conversational AI.
    Accepts list of messages in {role, content} format.
    """
    try:
        model = get_gemini_model()

    if not isinstance(req.messages, list):
            raise HTTPException(
                status_code=400,
                detail="messages must be a list of {role, content}"
            )

        # Convert messages to dict format
        messages = [m.model_dump() for m in req.messages]

        # Add system message if not present
        has_system = any(m.get("role") == "system" for m in messages)
        if not has_system:
            system_msg = {
                "role": "system",
                "content": (
                    "You are an expert exoplanet science educator. "
                    "Help users learn about exoplanets, their detection, "
                    "characterization, and the missions that discover them. "
                    "Explain concepts like the transit method, radial velocity, "
                    "habitable zones, and planetary atmospheres. "
                    "Be accurate, engaging, and educational."
                )
            }
            messages.insert(0, system_msg)

        # Convert to Gemini format
        prompt = convert_messages_to_gemini_format(messages)
        prompt += "Assistant: "

        # Generate response with temperature
        generation_config = {
            "temperature": req.temperature or 0.7,
            "max_output_tokens": 2048,
        }

        response = model.generate_content(
            prompt,
            generation_config=generation_config
        )

        return {
            "reply": response.text,
            "model": GEMINI_MODEL,
            "provider": "Google Gemini"
        }

    except (ValueError, RuntimeError, ConnectionError) as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI generation error: {str(e)}"
        ) from e
        except Exception as e:
        # Log unexpected errors for debugging
        print(f"Unexpected error in chat endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again."
        ) from e


@app.get("/api/resources")
def resources():
    """Get educational resources about exoplanets"""
    return {
        "videos": [
            {
                "title": "The Search for Exoplanets: A Complete Guide",
                "url": "https://www.youtube.com/watch?v=Qd6nLM2QlWw",
                "source": "NASA Goddard",
                "description": "Comprehensive overview of exoplanet discovery methods and techniques"
            },
            {
                "title": "Transit Photometry: How We Detect Exoplanets",
                "url": "https://www.youtube.com/watch?v=iEqrW-N7xT8",
                "source": "MIT OpenCourseWare",
                "description": "Detailed explanation of the transit method and light curve analysis"
            },
            {
                "title": "Kepler and TESS: The Planet-Hunting Missions",
                "url": "https://www.youtube.com/watch?v=Z9NN3F5K7dI",
                "source": "NASA Jet Propulsion Laboratory",
                "description": "In-depth look at space telescope missions and their discoveries"
            },
            {
                "title": "Radial Velocity Method for Exoplanet Detection",
                "url": "https://www.youtube.com/watch?v=3xKtBcXW3r0",
                "source": "Caltech Astronomy",
                "description": "Understanding Doppler spectroscopy and stellar wobble"
            },
            {
                "title": "Direct Imaging of Exoplanets",
                "url": "https://www.youtube.com/watch?v=7ATtD8x7vV0",
                "source": "European Southern Observatory",
                "description": "Advanced techniques for directly photographing exoplanets"
            },
            {
                "title": "Exoplanet Atmospheres and Biosignatures",
                "url": "https://www.youtube.com/watch?v=Qd6nLM2QlWw",
                "source": "NASA Astrobiology",
                "description": "Analyzing exoplanet atmospheres for signs of life"
            }
        ],
        "materials": [
            {
                "title": "NASA Exoplanet Exploration",
                "url": "https://exoplanets.nasa.gov/",
                "source": "NASA",
                "description": "Official NASA exoplanet database and mission information"
            },
            {
                "title": "Planet Hunters TESS (Citizen Science)",
                "url": "https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess",
                "source": "Zooniverse",
                "description": "Help discover new exoplanets through citizen science"
            },
            {
                "title": "NASA Exoplanet Archive",
                "url": "https://exoplanetarchive.ipac.caltech.edu/",
                "source": "NASA/IPAC",
                "description": "Complete catalog of confirmed and candidate exoplanets"
            },
            {
                "title": "TESS Mission Data Portal",
                "url": "https://tess.mit.edu/",
                "source": "MIT",
                "description": "Access TESS mission data and light curves"
            },
            {
                "title": "Kepler Mission Archive",
                "url": "https://archive.stsci.edu/kepler/",
                "source": "STScI",
                "description": "Complete Kepler mission data and publications"
            }
        ],
        "nasa_official": [
            {
                "title": "NASA Exoplanet Science Institute",
                "url": "https://nexsci.caltech.edu/",
                "source": "NASA/NExScI",
                "description": "Official NASA institute for exoplanet research and data"
            },
            {
                "title": "NASA Exoplanet Archive API",
                "url": "https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html",
                "source": "NASA/IPAC",
                "description": "API documentation for accessing exoplanet data programmatically"
            },
            {
                "title": "TESS Data Portal",
                "url": "https://heasarc.gsfc.nasa.gov/docs/tess/",
                "source": "NASA/HEASARC",
                "description": "TESS mission data access and analysis tools"
            },
            {
                "title": "Kepler Data Products",
                "url": "https://www.nasa.gov/mission_pages/kepler/overview/index.html",
                "source": "NASA",
                "description": "Official Kepler mission data and science products"
            },
            {
                "title": "James Webb Space Telescope Exoplanet Science",
                "url": "https://www.stsci.edu/jwst/science-execution/program-information",
                "source": "STScI",
                "description": "JWST exoplanet observation programs and data"
            }
        ],
        "api_resources": [
            {
                "title": "NASA Open Data Portal",
                "url": "https://data.nasa.gov/",
                "source": "NASA",
                "description": "Access to NASA's open data including exoplanet datasets"
            },
            {
                "title": "NASA API Documentation",
                "url": "https://api.nasa.gov/",
                "source": "NASA",
                "description": "Official NASA API documentation and key registration"
            },
            {
                "title": "Exoplanet Archive API Guide",
                "url": "https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html",
                "source": "NASA/IPAC",
                "description": "Complete API documentation for exoplanet data access"
            },
            {
                "title": "TESS Data API",
                "url": "https://heasarc.gsfc.nasa.gov/docs/tess/",
                "source": "NASA/HEASARC",
                "description": "TESS mission data API and access methods"
            },
            {
                "title": "MAST Portal API",
                "url": "https://mast.stsci.edu/api/v0/",
                "source": "STScI",
                "description": "Mikulski Archive for Space Telescopes API for exoplanet data"
            },
            {
                "title": "NASA Data APIs Overview",
                "url": "https://data.nasa.gov/developers",
                "source": "NASA",
                "description": "Comprehensive guide to all NASA data APIs and services"
            }
        ]
    }


@app.get("/api/stats")
def stats():
    """Get platform statistics"""
    return {
        "num_candidates": 2148,
        "num_labels": 87320,
        "num_users": 218,
        "confirmed_exoplanets": 5650,
        "top_users": [
            {"user": "Ayesha", "labels": 210},
            {"user": "Bilal", "labels": 180},
            {"user": "Fatima", "labels": 165},
        ],
    }


@app.get("/api/explore")
def explore():
    """Get exoplanet datasets for exploration"""
    return {
        "datasets": [
            {
                "name": "Kepler Candidates",
                "count": 8054,
                "link": "https://exoplanetarchive.ipac.caltech.edu/",
                "description": "Candidates from Kepler mission"
            },
            {
                "name": "TESS Alerts",
                "count": 15230,
                "link": "https://tess.mit.edu/",
                "description": "Recent TESS discoveries"
            },
            {
                "name": "Confirmed Exoplanets",
                "count": 5650,
                "link": "https://exoplanets.nasa.gov/",
                "description": "All confirmed exoplanets"
            },
        ]
    }


@app.get("/api/discussions")
def discussions():
    """Get community discussion threads"""
    return {
        "threads": [
            {
                "title": "Transit vs. Eclipse: What's the difference?",
                "posts": 42,
                "last_activity": "2025-10-03",
                "author": "AstroFan92"
            },
            {
                "title": "Identifying false positives in TESS data",
                "posts": 31,
                "last_activity": "2025-10-02",
                "author": "DataScientist"
            },
            {
                "title": "Best practices for spectroscopy follow-up",
                "posts": 18,
                "last_activity": "2025-09-30",
                "author": "StarGazer"
            },
        ]
    }


@app.get("/api/papers")
def papers():
    """Get research papers about exoplanets"""
    return {
        "papers": [
            {
                "title": (
                    "A Machine Learning Framework for "
                    "Exoplanet Transit Classification"
                ),
                "authors": ["Shallue", "Vanderburg"],
                "link": "https://arxiv.org/abs/1712.05044",
                "year": "2018",
                "journal": "Astronomical Journal"
            },
            {
                "title": "The TESS Mission",
                "authors": ["Ricker", "Winn", "Vanderspek", "et al."],
                "link": "https://arxiv.org/abs/1406.0151",
                "year": "2014",
                "journal": "Journal of Astronomical Telescopes"
            },
            {
                "title": "The TRAPPIST-1 System",
                "authors": ["Gillon", "Triaud", "Demory", "et al."],
                "link": "https://arxiv.org/abs/1703.01424",
                "year": "2017",
                "journal": "Nature"
            },
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
