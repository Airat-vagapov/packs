// Баннер
let banner = document.querySelector('.splide');
let bannerCarousel = new Splide(banner, {
  type: 'loop',
  prePage: 1,
  focus  : 0,
  classes: {
    pagination: 'splide__pagination pagination',
    page: 'splide__pagination__page pagination-item'
  }
});
bannerCarousel.mount();

