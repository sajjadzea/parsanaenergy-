(async function(){
  const LIST_URL = '/articles/posts.json';
  const $grid = document.getElementById('articles-grid');
  const $latest = document.getElementById('latest-articles');

  function renderCard(post){ /* در پرامپت ۵ تکمیل می‌کنیم */ }
  function renderLatest(posts){ /* در پرامپت ۵ تکمیل می‌کنیم */ }

  try {
    const res = await fetch(LIST_URL, { cache: 'no-store' });
    const posts = await res.json();
    // TODO: sort + render in prompt 5
  } catch(e){ console.error('Failed to load posts:', e); }
})();
