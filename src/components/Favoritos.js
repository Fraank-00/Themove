import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Favoritos() {
    const [favorites, setFavorites] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            return;
        }

        const storedFavorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, [token]);

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mt-4 favorite-container">
            <h2>Favoritos</h2>
            <div className="row mt-4">
                {favorites.length > 0 ? (
                    favorites.map(movie => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={movie.id}>
                            <Card>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.overview}</Card.Text>
                                    <Link to={`/detalle/${movie.id}`}>
                                        <Button variant="primary">Ver Más</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>No tienes películas en favoritos.</p>
                )}
            </div>
        </div>
    );
}

export default Favoritos;
