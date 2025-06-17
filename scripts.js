console.log("Script cargado correctamente");

document.addEventListener('DOMContentLoaded', () => {
  const animarAlScroll = (elemento, claseAnimacion) => {
    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    function checkScroll() {
      if (isInViewport(elemento)) {
        elemento.classList.add(claseAnimacion);
      }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); 
  };
  const seccionInicio = document.querySelector('.landing-home');
  animarAlScroll(seccionInicio, 'animate__fadeInDown');

  const seccionServicios = document.getElementById('servicios');
  animarAlScroll(seccionServicios, 'animate__fadeInLeftBig');
});


const items = document.querySelectorAll('.cards__header--contain .cards__header--item');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let active = 3;

function loadShow() {
  let stt = 0;

  items.forEach((el, i) => {
    el.style.zIndex = 0;
    el.style.opacity = 0;
    el.style.transform = 'scale(0.5)';
    el.style.filter = 'blur(5px)';
  });

  // Tarjeta activa
  items[active].style.transform = `translateX(-50%) scale(1)`;
  items[active].style.zIndex = 2;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1;

  // Tarjetas siguientes
  stt = 0;
  for (let i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `translateX(${120 * stt - 50}%) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
    items[i].style.zIndex = 1 - stt;
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }

  // Tarjetas anteriores
  stt = 0;
  for (let i = active - 1; i >= 0; i--) {
    stt++;
    items[i].style.transform = `translateX(${-120 * stt - 50}%) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
    items[i].style.zIndex = 1 - stt;
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}

loadShow();

next.onclick = () => {
  active = (active + 1) % items.length;  // vuelve a 0 si pasa el último
  loadShow();
};

prev.onclick = () => {
  active = (active - 1 + items.length) % items.length; // vuelve al último si baja de 0
  loadShow();
};