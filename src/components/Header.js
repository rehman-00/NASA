import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="topnav">
      <div className="brand">
        <span className="dot" />
        ExoVet
      </div>
      <div className="navlinks">
        <NavLink end to="/" className={({isActive}) => `navlink${isActive ? ' active' : ''}`}>Home</NavLink>
        <NavLink to="/learn" className={({isActive}) => `navlink${isActive ? ' active' : ''}`}>Learn</NavLink>
        <NavLink to="/ask" className={({isActive}) => `navlink${isActive ? ' active' : ''}`}>Ask AI</NavLink>
        <NavLink to="/community" className={({isActive}) => `navlink${isActive ? ' active' : ''}`}>Community</NavLink>
        <NavLink to="/resources" className={({isActive}) => `navlink${isActive ? ' active' : ''}`}>Resources</NavLink>
        <NavLink to="/papers" className={({isActive}) => `navlink${isActive ? ' active' : ''}`}>Research</NavLink>
        <NavLink to="/about" className={({isActive}) => `navlink${isActive ? ' active' : ''}`}>About</NavLink>
      </div>
    </nav>
  );
}

export default Header;


