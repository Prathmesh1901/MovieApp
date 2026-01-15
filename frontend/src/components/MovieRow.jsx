import "../css/MovieRow.css";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
    return (
        <div className="movie-row-section">
            <h2 className="movie-row-title">{title}</h2>
            <div className="movie-row-container">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-row-item">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieRow;
