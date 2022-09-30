window.addEventListener('load', function(){
  // Главный баннер 
  new Glider(document.querySelector('[data-carousel="banner"]'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 1,
    itemWidth: 320,
    scrollLock: true,
    rewind: true,
    arrows: {
      prev: '.banner-prev',
      next: '.banner-fwd'
    },
    rewind: true,
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 767,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 1,
          slidesToScroll: 'auto',
          rewind: true,
          itemWidth: 150,
          duration: 0.3
        }
      },{
        // screens greater than >= 1024px
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rewind: true,
          itemWidth: 150,
          duration: 0.3
        }
      }
    ]
  });

    // Прокрутка новинки
    let itemsSlider = this.document.querySelectorAll('[data-carousel="items"]');

    itemsSlider.forEach(item => {
      new Glider(item, {
        slidesToShow: 1,
        slidesToScroll: 1,
        itemWidth: 320,
        scrollLock: true,
        rewind: true,
        dots: '.pagination',
        arrows: {
          prev: '.items-prev',
          next: '.items-fwd'
        },
        rewind: true,
        responsive: [
          {
            breakpoint: 450,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              rewind: true,
              itemWidth: 150,
              duration: 0.3
            }
          }, 
          {
            // screens greater than >= 775px
            breakpoint: 767,
            settings: {
              // Set to `auto` and provide item width to adjust to viewport
              slidesToShow: 3,
              slidesToScroll: 1,
              rewind: true,
              itemWidth: 150,
              duration: 0.3
            }
          },{
            // screens greater than >= 1024px
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              rewind: true,
              itemWidth: 150,
              duration: 0.3
            }
          }
        ]
      })
    })
});