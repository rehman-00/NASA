import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Community from './pages/Community';
import About from './pages/About';
import Discussions from './pages/Discussions';
import Resources from './pages/Resources';
import Papers from './pages/Papers';
import Ask from './pages/Ask';

function App() {
  return (
    <div className="App">
      <div className="stars" />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/community" element={<Community />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
