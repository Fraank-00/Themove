// src/components/Resultado.js

import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Resultado({ results, query }) {
    return (
        <div className="container mt-4">
            <h2>Buscaste: {query}</h2>
            <div className="row mt-4">
                {results.length > 0 ? (
                    results.map(movie => (
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
                    <p>No se encontraron resultados.</p>
                )}
            </div>
        </div>
    );
}

export default Resultado;
