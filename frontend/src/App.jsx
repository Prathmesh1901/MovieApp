import "./css/App.css";
import Sidebar from "./components/Sidebar";

import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import MovieDetails from "./pages/MovieDetails";
import { Routes, Route } from "react-router-dom"
import { MovieProvider } from "./contexts/MovieContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import NavBar from "./components/NavBar";
function App() {
  const isMobile = window.innerWidth < 768; // Simple check, better to use media queries/hook

  return (
    <ThemeProvider>
      <MovieProvider>
        <div className="app-container">
          <Sidebar />
          <div className="content-wrapper">
            <NavBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv" element={<TVShows />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
              </Routes>
            </main>
          </div>
        </div>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
