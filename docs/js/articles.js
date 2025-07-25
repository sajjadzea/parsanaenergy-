const articles = [
  {
    slug: 'monthly-generator-pm-checklist',
    title: 'چک لیست سرویس ماهانه ژنراتور',
    excerpt: 'در این مقاله به موارد اصلی سرویس ماهانه ژنراتور و نکات نگهداری آن می‌پردازیم.',
    image: '../images/generator-maintenance-check.png'
  }
];

function createCard(article) {
  const card = document.createElement('div');
  card.className = 'article-card';

  const img = document.createElement('img');
  img.src = article.image || '../images/generator.png';
  img.alt = article.title;
  card.appendChild(img);

  const content = document.createElement('div');
  content.className = 'article-card-content';

  const h3 = document.createElement('h3');
  h3.textContent = article.title;
  content.appendChild(h3);

  const p = document.createElement('p');
  p.textContent = article.excerpt;
  content.appendChild(p);

  const link = document.createElement('a');
  link.href = article.slug + '.html';
  link.className = 'read-more';
  link.textContent = 'ادامه مطلب';
  content.appendChild(link);

  card.appendChild(content);
  return card;
}

function populateArticles() {
  const grid = document.getElementById('articles-grid');
  const latestList = document.getElementById('latest-articles');

  articles.forEach(article => {
    if(grid) grid.appendChild(createCard(article));

    if(latestList) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = article.slug + '.html';
      a.textContent = article.title;
      li.appendChild(a);
      latestList.appendChild(li);
    }
  });
}

document.addEventListener('DOMContentLoaded', populateArticles);

