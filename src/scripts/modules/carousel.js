// Баннер
let banner = document.querySelector('[data-carousel="banner"]');
let bannerCarousel = new Splide(banner, {
    type: 'loop',
    perPage : 1,
    perMove: 1,
    focus: 0,
    classes: {
        pagination: 'splide__pagination pagination',
        page: 'splide__pagination__page pagination-item',
    },
});
bannerCarousel.mount();

// Специальные предложения
let itemsCarousel = document.querySelectorAll('.items-carousel');
itemsCarousel.forEach((item) => {
    let itemCarousel = new Splide(item, {
        type: 'loop',
        perPage : 5,
        perMove: 1,
        focus: 0,
        classes: {
            pagination: 'splide__pagination pagination-block',
            page: 'splide__pagination__page pagination-item',
            arrows: 'splide__arrows hidden items__arrows__hidden',
        },
    });
    itemCarousel.mount();

    // Клик для прокрутки
    let itemsArrows = document.querySelector('[data-arrows="items"]');
    let itemArrowFwd = itemsArrows.querySelector('.items-fwd');
    let itemArrowPrev = itemsArrows.querySelector('.items-prev');

    let hiddenItemsArrows = document.querySelectorAll('.items__arrows__hidden');

    hiddenItemsArrows.forEach((arrows) => {
        itemArrowFwd.addEventListener('click', () => {
            arrows.querySelectorAll('.splide__arrow--next').forEach((arw) => {
                arw.click();
            });
        });
        itemArrowPrev.addEventListener('click', () => {
            arrows.querySelectorAll('.splide__arrow--prev').forEach((arw) => {
                arw.click();
            });
        });
    });
});

// Хиты продаж
let hitsCarousel = document.querySelector('.hits-carousel');

new Slide(hitsCarousel, {
    type: 'loop',
    perPage: 1,
})
