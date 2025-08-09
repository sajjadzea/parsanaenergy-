function formatDate(iso){
  try{
    return new Date(iso).toLocaleDateString('fa-IR');
  }catch{
    return '';
  }
}

function renderCard(post){
  const cover = !post.cover || post.cover === 'TODO'
    ? '/images/articles/default.webp'
    : post.cover;
  return `
  <article class="card">
    <a href="/articles/${post.slug}/" class="card-cover" aria-label="${post.title}">
      <img src="${cover}" alt="${post.title}" loading="lazy" width="1200" height="675">
    </a>
    <div class="card-body">
      <div class="card-meta">${formatDate(post.date)} · ${post.readingTime} دقیقه مطالعه</div>
      <h3 class="card-title"><a href="/articles/${post.slug}/">${post.title}</a></h3>
      <p class="card-excerpt">${post.excerpt}</p>
      <a href="/articles/${post.slug}/" class="card-readmore">ادامه مطلب</a>
    </div>
  </article>`;
}

function renderLatest(posts){
  const ul = document.getElementById('latest-articles');
  ul.innerHTML = posts.slice(0,5).map(p => `<li><a href="/articles/${p.slug}/">${p.title}</a></li>`).join('');
}

(async function(){
  const res = await fetch('/articles/posts.json', { cache:'no-store' });
  const posts = (await res.json()).sort((a,b) => new Date(b.date) - new Date(a.date));
  document.getElementById('articles-grid').innerHTML = posts.map(renderCard).join('');
  renderLatest(posts);
})();
