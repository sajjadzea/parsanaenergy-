(function(){
  const categories = document.querySelectorAll('.category-card');
  const categoriesList = document.querySelector('.categories-list');
  const servicesList = document.querySelector('.services-list');
  const backBtn = document.querySelector('.back-btn');

  function showServices(catId){
    categoriesList.classList.add('hidden');
    servicesList.classList.remove('hidden');
    servicesList.querySelectorAll('.service-card').forEach(card => {
      card.style.display = card.dataset.category === catId ? 'flex' : 'none';
    });
  }

  categories.forEach(cat => {
    cat.addEventListener('click', () => showServices(cat.dataset.category));
  });

  if(backBtn){
    backBtn.addEventListener('click', () => {
      servicesList.classList.add('hidden');
      categoriesList.classList.remove('hidden');
    });
  }
})();
