// Баннер
let banner = document.querySelector('[data-carousel="banner"]');
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

let itemsCarousel = document.querySelectorAll('.items-carousel')
itemsCarousel.forEach((item) => {
  let itemCarousel = new Splide(item, {
    type: 'loop'
  });
  itemCarousel.mount();
})
