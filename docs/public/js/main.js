/* درج سال جاری در فوتر */
document.getElementById("year").textContent = new Date().getFullYear();

/* -------- Projects Modal -------- */
const modal = document.getElementById('project-modal');
if(modal){
  const imgEl = modal.querySelector('img');
  const titleEl = modal.querySelector('h3');
  const descEl = modal.querySelector('p');

  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', () => {
      imgEl.src = item.querySelector('img').src;
      imgEl.alt = item.querySelector('img').alt;
      titleEl.textContent = item.dataset.title || '';
      descEl.textContent = item.dataset.description || '';
      modal.classList.remove('hidden');
    });
  });

  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', e => {
    if(e.target.id === 'project-modal'){
      modal.classList.add('hidden');
    }
  });
}
