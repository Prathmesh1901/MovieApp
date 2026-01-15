import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../Services/api";
import "../css/Home.css";

function Trending() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTrending = async () => {
            try {
                const trendingMovies = await getTrendingMovies();
                setMovies(trendingMovies);
            } catch (err) {
                console.error("Failed to load trending movies...");
            } finally {
                setLoading(false);
            }
        };

        loadTrending();
    }, []);

    return (
        <div className="home">
            <h2 className="section-title">Trending This Week</h2>
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

export default Trending;
