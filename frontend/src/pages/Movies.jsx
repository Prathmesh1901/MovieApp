import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import { getPopularMovies } from "../Services/api";
import "../css/Home.css"; // Reuse home styles for grid

function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.error("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    return (
        <div className="home">
            <h2 className="section-title">Popular Movies</h2>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Movies;
