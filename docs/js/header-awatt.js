(function(){
  // toggle call panel
  const call = document.querySelector('.call');
  if (call) {
    const btn = call.querySelector('.btn');
    btn?.addEventListener('click', (e)=>{ e.preventDefault(); call.classList.toggle('open'); });
    document.addEventListener('click', (e)=>{ if(!call.contains(e.target)) call.classList.remove('open'); });
  }
  // dropdown for "خدمات"
  document.querySelectorAll('.dropdown').forEach(dd=>{
    const toggle = dd.querySelector('a[aria-haspopup="true"]');
    toggle?.addEventListener('click', (e)=>{ e.preventDefault(); dd.classList.toggle('open'); });
    document.addEventListener('click', (e)=>{ if(!dd.contains(e.target)) dd.classList.remove('open'); });
  });
  // mark active by pathname (simple)
  const path = location.pathname.replace(/\/+$/,'');
  document.querySelectorAll('.nav-list a[data-path]').forEach(a=>{
    const p = a.getAttribute('data-path').replace(/\/+$/,'');
    if (p && p === path) a.classList.add('active');
  });
})();
