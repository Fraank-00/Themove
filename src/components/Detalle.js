import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../css/App.css'; 

function Detalle() {
    const { id } = useParams();
    const token = sessionStorage.getItem('token');
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=99fa703cc923438e8e7ee0db3a3e7454&language=es-ES`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id, token]);

    if (!token) {
        return <Navigate to="/" />;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <Card className="movie-detail-card">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <Card.Img 
                            variant="top" 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            className="movie-image" 
                        />
                    </div>
                    <div className="col-md-8">
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text><strong>Descripción:</strong> {movie.overview}</Card.Text>
                            <Card.Text><strong>Géneros:</strong> {movie.genres.map(genre => genre.name).join(', ')}</Card.Text>
                            <Card.Text><strong>Lenguaje:</strong> {movie.original_language.toUpperCase()}</Card.Text>
                            <Card.Text><strong>Fecha de Estreno:</strong> {movie.release_date}</Card.Text>
                            <Card.Text><strong>Popularidad:</strong> {movie.popularity.toFixed(1)}</Card.Text>
                            <Card.Text><strong>Compañía de Producción:</strong> {movie.production_companies.map(company => company.name).join(', ')}</Card.Text>
                            <Card.Text><strong>Votación Promedio:</strong> {movie.vote_average} / 10</Card.Text>
                            <Card.Text><strong>Conteo de votos:</strong> {movie.vote_count}</Card.Text>
                            <Button variant="primary" onClick={() => window.history.back()}>Volver</Button>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Detalle;
