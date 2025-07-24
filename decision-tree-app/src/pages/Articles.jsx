import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../../../docs/articles/index.js';

const Articles = () => (
  <main className="articles-list">
    <h1>مقالات تخصصی</h1>
    <ul>
      {articles.map((a) => (
        <li key={a.slug} className="article-item">
          <h2>{a.title}</h2>
          <p className="date">{a.date}</p>
          <p>{a.description}</p>
          <Link to={`/articles/${a.slug}`}>ادامه مطلب</Link>
        </li>
      ))}
    </ul>
  </main>
);

export default Articles;
