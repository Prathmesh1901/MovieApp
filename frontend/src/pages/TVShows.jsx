import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import { getPopularTV } from "../Services/api";
import "../css/Home.css";

function TVShows() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTV = async () => {
            try {
                const popularTV = await getPopularTV();
                setShows(popularTV);
            } catch (err) {
                console.error("Failed to load TV shows...");
            } finally {
                setLoading(false);
            }
        };

        loadTV();
    }, []);

    return (
        <div className="home">
            <h2 className="section-title">Popular TV Shows</h2>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {shows.map(show => (
                        <MovieCard movie={show} key={show.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TVShows;
