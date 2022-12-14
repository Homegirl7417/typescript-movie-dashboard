import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import MovieList from './pages/movieList';
import Search from './pages/search';
import UpdateMovie from './pages/updateMovie';
import AddMovie from './pages/addMovie';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/list" element={<MovieList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/item/update" element={<UpdateMovie />} />
        <Route path="/movie/item/add" element={<AddMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
