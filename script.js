const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const year = document.getElementById('year');

const accents = ['blue', 'red', 'pink', 'yellow', 'green'];

if (year) {
  year.textContent = new Date().getFullYear();
}

const applyTheme = (theme, accent) => {
  document.body.setAttribute('data-theme', theme);
  document.body.setAttribute('data-accent', accent);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
  }
  localStorage.setItem('portfolio-theme', theme);
  localStorage.setItem('portfolio-accent', accent);
};

const savedTheme = localStorage.getItem('portfolio-theme');
const savedAccent = localStorage.getItem('portfolio-accent');
const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
applyTheme(savedTheme || preferredTheme, savedAccent || 'blue');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const currentAccent = document.body.getAttribute('data-accent') || 'blue';
    const currentIndex = accents.indexOf(currentAccent);
    const nextAccent = accents[(currentIndex + 1) % accents.length];
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme, nextAccent);
  });
}
