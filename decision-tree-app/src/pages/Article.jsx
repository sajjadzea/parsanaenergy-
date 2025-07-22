import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle } from '../articles/index_backup.js';
import ReactMarkdown from 'react-markdown';

const Article = () => {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <main>
        <p>مقاله مورد نظر یافت نشد.</p>
      </main>
    );
  }

  return (
    <main className="article-detail">
      <h1>{article.title}</h1>
      <p className="date">{article.date}</p>
      <ReactMarkdown>{article.content}</ReactMarkdown>
      <Link to="/articles">بازگشت به مقالات</Link>
    </main>
  );
};

export default Article;
