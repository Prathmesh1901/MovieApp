import { Link } from 'react-router-dom';
import { FaHome, FaHeart, FaFire, FaFilm, FaTv } from 'react-icons/fa';
import '../css/Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <span className="logo-icon">🎬</span>
                <span className="logo-text">MovieApp</span>
            </div>

            <div className="sidebar-section">
                <h3>New Feed</h3>
                <Link to="/" className="sidebar-link">
                    <FaHome className="icon" />
                    <span>Home</span>
                </Link>
                <Link to="/favorites" className="sidebar-link">
                    <FaHeart className="icon" />
                    <span>Favorites</span>
                </Link>
                <Link to="/trending" className="sidebar-link">
                    <FaFire className="icon" />
                    <span>Trending</span>
                </Link>
            </div>

            <div className="sidebar-section">
                <h3>Media</h3>
                <Link to="/movies" className="sidebar-link">
                    <FaFilm className="icon" />
                    <span>Movies</span>
                </Link>
                <Link to="/tv" className="sidebar-link">
                    <FaTv className="icon" />
                    <span>TV Shows</span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;
