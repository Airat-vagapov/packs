// Переменные
let citySubmitPopup = document.querySelector('.city-submit-window');
let activeClassName = "active";


// Добавление класса active (display: block)
function activate (element) {
	element.classList.add(activeClassName);
}

function deActivate (element) {
	element.classList.remove(activeClassName);
}

// Открытие подтверждения города
window.addEventListener("load", activate(citySubmitPopup));

// Закрытие окна подтверждения города
let closeBtn = document.querySelector('submit-close');
console.log(closeBtn);
closeBtn.addEventListener('click', deActivate(citySubmitPopup));


// Отображение баннера через Owl Carousel

let owl = $('.owl-carousel'); 
	owl.owlCarousel({
		loop: true,
		items: 1,
	});
	let fwdBanner = $('.banner-left').find('.arrow-fwd')
	let prevBanner = $('.banner-left').find('.arrow-prev')
	
	fwdBanner.click(function () {
		owl.trigger('next.owl.carousel', (700));
	});
	prevBanner.click(function () {
		owl.trigger('prev.owl.carousel', (700));
	});