import '../styles/articles.css';

const container = document.getElementById('articles-grid');

const dateFormatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  month: 'long',
  day: '2-digit'
});

function formatDate(dateStr) {
  try {
    return dateFormatter.format(new Date(dateStr));
  } catch {
    return '';
  }
}

function metaLine(post) {
  const parts = [];
  if (post.author) parts.push(post.author);
  if (post.readingTime) parts.push(`${post.readingTime} دقیقه مطالعه`);
  if (post.comments) parts.push(`${post.comments} دیدگاه`);
  return parts.join(' · ');
}

function createCard(post) {
  const article = document.createElement('article');
  article.className = 'article-card';
  const meta = metaLine(post);
  article.innerHTML = `
    <a href="/articles/${post.slug}/" class="card-cover">
      <img src="${post.cover}" alt="${post.title}" loading="lazy">
      <span class="date-badge">${formatDate(post.date)}</span>
    </a>
    <div class="card-body">
      <h2 class="card-title"><a href="/articles/${post.slug}/">${post.title}</a></h2>
      <p class="card-excerpt">${post.excerpt}</p>
      ${meta ? `<div class="card-meta">${meta}</div>` : ''}
      <a class="card-readmore" href="/articles/${post.slug}/">ادامه مطلب</a>
    </div>
  `;
  return article;
}

fetch('/articles/posts.json')
  .then(r => r.json())
  .then(posts => {
    posts
      .filter(p => p.published !== false)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach(post => container.appendChild(createCard(post)));
  });

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

