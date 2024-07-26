import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Listado({ searchResults }) {
    const [movies, setMovies] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchMovies = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=99fa703cc923438e8e7ee0db3a3e7454&language=es-ES&page=1");
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching the movies:", error);
            }
        };

        fetchMovies();
    }, [token]);

    const handleFavoriteToggle = (movie) => {
        const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        const isFavorite = favorites.some(fav => fav.id === movie.id);
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
        } else {
            updatedFavorites = [...favorites, movie];
        }

        sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (movieId) => {
        const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        return favorites.some(fav => fav.id === movieId);
    };

    if (!token) {
        return <Navigate to="/" />;
    }

    const moviesToDisplay = searchResults.length > 0 ? searchResults : movies;

    return (
        <div className="container mt-4">
            <div className="row mt-4">
                {moviesToDisplay.map(movie => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={movie.id}>
                        <Card>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>{movie.overview}</Card.Text>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to={`/detalle/${movie.id}`}>
                                        <Button variant="primary">Ver Más</Button>
                                    </Link>
                                    {token && (
                                        <Button
                                            variant="link"
                                            onClick={() => handleFavoriteToggle(movie)}
                                            className="favorite-btn"
                                        >
                                            {isFavorite(movie.id) ? <FaHeart size={24} color="red" /> : <FaRegHeart size={24} />}
                                        </Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Listado;
