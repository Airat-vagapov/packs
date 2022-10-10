// Баннер
let banner = document.querySelector('[data-carousel="banner"]');
let bannerCarousel = new Splide(banner, {
    type: 'loop',
    perPage: 1,
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
        perPage: 5,
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

    let hiddenItemsArrows = item.querySelectorAll('.items__arrows__hidden');

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
let hitsBlc = document.querySelector('.hits-carousel');
let hitsCarousel = new Splide(hitsBlc, {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    focus: 0,
    classes: {
        pagination: 'splide__pagination pagination-block',
        page: 'splide__pagination__page pagination-item',
        arrows: 'splide__arrows hidden hits__arrows__hidden',
    },
});
hitsCarousel.mount();

// Клик для прокрутки

let itemsArrows = document.querySelector('[data-arrows="hits"]');
let hitsArrowFwd = itemsArrows.querySelector('.hits-fwd');
let hitsArrowPrev = itemsArrows.querySelector('.hits-prev');

let hiddenItemsArrows = hitsBlc.querySelectorAll('.hits__arrows__hidden');

hiddenItemsArrows.forEach((arrows) => {
    hitsArrowFwd.addEventListener('click', () => {
        arrows.querySelectorAll('.splide__arrow--next').forEach((arw) => {
            arw.click();
        });
    });
    hitsArrowPrev.addEventListener('click', () => {
        arrows.querySelectorAll('.splide__arrow--prev').forEach((arw) => {
            arw.click();
        });
    });
});

// Хит продаж мобилка
let hitsBlcMob = document.querySelector('.hits-carousel-mobile');
let hitsCarouselMobile = new Splide(hitsBlcMob, {
    type: 'loop',
    perPage: 2,
    perMove: 1,
    focus: 0,
    classes: {
        pagination: 'splide__pagination pagination-block',
        page: 'splide__pagination__page pagination-item',
        arrows: 'splide__arrows hidden hits__arrows__hidden_mob',
    },
});
hitsCarouselMobile.mount();

// Клик для прокрутки
let itemsArrowsMob = document.querySelector('[data-arrows="hits-mob"]');
let hitsArrowFwdMob = itemsArrowsMob.querySelector('.hits-fwd-mob');
let hitsArrowPrevMob = itemsArrowsMob.querySelector('.hits-prev-mob');
let hiddenItemsArrowsMob = hitsBlcMob.querySelectorAll(
    '.hits__arrows__hidden_mob'
);
hiddenItemsArrowsMob.forEach((arrows) => {
    hitsArrowFwdMob.addEventListener('click', () => {
        arrows.querySelectorAll('.splide__arrow--next').forEach((arw) => {
            arw.click();
        });
    });
    hitsArrowPrevMob.addEventListener('click', () => {
        arrows.querySelectorAll('.splide__arrow--prev').forEach((arw) => {
            arw.click();
        });
    });
});
