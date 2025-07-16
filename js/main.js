/* درج سال جاری در فوتر */
document.getElementById("year").textContent = new Date().getFullYear();

/* Mobile menu toggle */
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

navToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
});
