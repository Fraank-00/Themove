import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Listado from './components/Listado';
import Header from './components/Header';
import Footer from './components/Footer';
import Detalle from './components/Detalle';
import Favoritos from './components/Favoritos';
import './css/App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    if (!query) return;

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=99fa703cc923438e8e7ee0db3a3e7454&language=es-ES&query=${query}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/listado" element={<Listado searchResults={searchResults} />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
