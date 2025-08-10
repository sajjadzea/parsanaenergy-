import React from 'react';
import { useParams, Link } from 'react-router-dom';
import articles from '../../../docs/src/data/articles.js';
import ReactMarkdown from 'react-markdown';

const Article = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <main>
        <p>مقاله مورد نظر یافت نشد.</p>
      </main>
    );
  }

  let content;
  if (typeof article.content === 'string') {
    content = <ReactMarkdown>{article.content}</ReactMarkdown>;
  } else {
    const ArticleComponent = article.content;
    content = <ArticleComponent />;
  }

  return (
    <main className="article-detail">
      <h1>{article.title}</h1>
      <p className="date">{article.date}</p>
      {content}
      <Link to="/articles">بازگشت به مقالات</Link>
    </main>
  );
};

export default Article;
