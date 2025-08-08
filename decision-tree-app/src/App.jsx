import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Articles from './pages/Articles.jsx';
import Article from './pages/Article.jsx';
import Typography from './pages/Typography.jsx';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/blog" element={<Articles />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/typography" element={<Typography />} />
        </Routes>
      </div>
    );
  }
