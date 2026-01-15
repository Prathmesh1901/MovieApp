import MovieCard from "../components/MovieCard"
import MovieRow from "../components/MovieRow"
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getTrendingMovies, getTopRatedMovies, getAnime } from "../Services/api";
import "../css/Home.css";
import SplitText from "../components/SplitText";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]); // Used for search results
    const [popularMovies, setPopularMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [animeList, setAnimeList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const [popular, trending, topRated, anime] = await Promise.all([
                    getPopularMovies(),
                    getTrendingMovies(),
                    getTopRatedMovies(),
                    getAnime()
                ]);
                setPopularMovies(popular);
                setTrendingMovies(trending);
                setTopRatedMovies(topRated);
                setAnimeList(anime);
            } catch (err) {
                setError("Failed to load movies...");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    };

    // Hero Movie (1st trending movie)
    const heroMovie = trendingMovies[0];

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    {/* Show Search Results if query exists, otherwise Dashboard */}
                    {searchQuery ? (
                        <div className="movies-grid">
                            {movies.map(movie => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                        </div>
                    ) : (
                        <div className="dashboard-content">
                            {/* Hero Section */}
                            {heroMovie && (
                                <div className="hero-section" style={{
                                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`
                                }}>
                                    <div className="hero-content">
                                        <SplitText
                                            text={heroMovie.title}
                                            className="hero-title"
                                            duration={0.8}
                                            delay={0}
                                        />
                                        <div className="hero-meta">
                                            <span className="hero-rating">⭐ {heroMovie.vote_average?.toFixed(1)}</span>
                                            <span className="hero-date">{heroMovie.release_date}</span>
                                        </div>
                                        <p className="hero-overview">{heroMovie.overview}</p>
                                        <div className="hero-actions">
                                            <button className="primary-btn">Play Now</button>
                                            <button className="secondary-btn">More Info</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <MovieRow title="Trending Now" movies={trendingMovies} />
                            <MovieRow title="Popular Movies" movies={popularMovies} />
                            <MovieRow title="Top Rated" movies={topRatedMovies} />
                            <MovieRow title="Anime" movies={animeList} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;
