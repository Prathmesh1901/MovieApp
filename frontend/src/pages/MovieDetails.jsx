import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../Services/api";
import "../css/MovieDetails.css";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [movieData, castData] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id)
                ]);
                setMovie(movieData);
                setCast(castData);
            } catch (error) {
                console.error("Failed to fetch movie details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (!movie) return <div className="error-message">Movie not found</div>;

    return (
        <div className="movie-details-container">
            {/* Hero Banner */}
            <div className="details-hero" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}>
                <div className="details-content">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="details-poster"
                    />
                    <div className="details-info">
                        <h1 className="details-title">{movie.title}</h1>
                        <p className="details-tagline">{movie.tagline}</p>

                        <div className="details-meta">
                            <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                            <span>{movie.release_date?.split("-")[0]}</span>
                            <span>{movie.runtime} min</span>
                        </div>

                        <div className="details-genres">
                            {movie.genres?.map(genre => (
                                <span key={genre.id} className="genre-tag">{genre.name}</span>
                            ))}
                        </div>

                        <h3 className="section-header">Overview</h3>
                        <p className="details-overview">{movie.overview}</p>
                    </div>
                </div>
            </div>

            {/* Cast Section */}
            <div className="cast-section">
                <h2 className="section-title">Top Cast</h2>
                <div className="cast-list">
                    {cast.slice(0, 10).map(actor => (
                        <div key={actor.id} className="cast-card">
                            <img
                                src={actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                    : "https://via.placeholder.com/200x300?text=No+Image"}
                                alt={actor.name}
                                className="cast-image"
                            />
                            <p className="cast-name">{actor.name}</p>
                            <p className="cast-character">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
