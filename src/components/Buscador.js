// src/components/Buscador.js

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Buscador({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Buscar"
            className="mr-sm-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Buscar</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Buscador;
