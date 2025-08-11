import fs from 'fs';
import path from 'path';

const postsPath = path.join('docs', 'articles', 'posts.json');
let posts = [];
try {
  posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
} catch {
  posts = [];
}
const template = fs.readFileSync(path.join('tools', 'templates', 'article.html'), 'utf8');
const articlesData = [];

function markdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  const html = [];
  let inUl = false;
  let inOl = false;
  const closeLists = () => {
    if (inUl) { html.push('</ul>'); inUl = false; }
    if (inOl) { html.push('</ol>'); inOl = false; }
  };
  for (let line of lines) {
    if (!line.trim()) { closeLists(); continue; }
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      closeLists();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${headingMatch[2]}</h${level}>`);
      continue;
    }
    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (!inOl) { closeLists(); html.push('<ol>'); inOl = true; }
      html.push(`<li>${olMatch[1]}</li>`);
      continue;
    }
    const ulMatch = line.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      if (!inUl) { closeLists(); html.push('<ul>'); inUl = true; }
      html.push(`<li>${ulMatch[1]}</li>`);
      continue;
    }
    closeLists();
    html.push(`<p>${line}</p>`);
  }
  closeLists();
  return html.join('\n');
}

posts.forEach((post, index) => {
  const slug = post.slug;
  const mdPath = path.join('docs', 'public', 'articles', `${slug}.md`);
  let rawMd = '';
  try {
    rawMd = fs.readFileSync(mdPath, 'utf8');
  } catch {
    rawMd = '';
  }
  const mdLines = rawMd.split(/\r?\n/);
  if (mdLines[0] && mdLines[0].startsWith('#')) {
    mdLines.shift();
  }
  const contentMd = mdLines.join('\n');
  const bodyHtml = markdownToHtml(contentMd);

  const canonical = post.canonical || `https://parsanaenergy.ir/articles/${slug}/`;
  const cover = post.cover === 'TODO' ? `/images/articles/${slug}.webp` : post.cover;

  const prev = posts[index - 1];
  const next = posts[index + 1];
  let navHtml = '';
  if (prev || next) {
    navHtml += '<nav class="article-nav">';
    if (prev) navHtml += `<a class="prev" href="/articles/${prev.slug}/">قبلی: ${prev.title}</a>`;
    if (next) navHtml += `<a class="next" href="/articles/${next.slug}/">بعدی: ${next.title}</a>`;
    navHtml += '</nav>';
  }
  navHtml += '<p><a href="/articles/">بازگشت به مقالات</a></p>';
  const content = `<div class="article-content">${bodyHtml}</div>${navHtml}`;

  const html = template
    .replace(/{{title}}/g, post.title)
    .replace(/{{date}}/g, post.date)
    .replace(/{{readingTime}}/g, post.readingTime)
    .replace(/{{cover}}/g, cover)
    .replace(/{{content}}/g, content)
    .replace(/{{canonical}}/g, canonical);

  const outDir = path.join('docs', 'articles', slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Parsana Energy'
    },
    image: cover,
    mainEntityOfPage: canonical
  };
  fs.writeFileSync(
    path.join(outDir, 'structured-data.json'),
    JSON.stringify(structuredData, null, 2)
  );

  articlesData.push({
    slug,
    title: post.title,
    date: post.date,
    description: post.excerpt,
    content: contentMd,
  });
});

const dataDir = path.join('docs', 'src', 'data');
fs.mkdirSync(dataDir, { recursive: true });
const dataPath = path.join(dataDir, 'articles.js');
fs.writeFileSync(dataPath, `export default ${JSON.stringify(articlesData, null, 2)};\n`);
