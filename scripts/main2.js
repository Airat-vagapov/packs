// Переменные
const activeClassName = 'active',
    subMenuActiveClass = 'submenu-active';

// Добавление класса active (display: block)
function activate(elem) {
    elem.classList.add(activeClassName);
}

function disable(elem) {
    elem.classList.remove(activeClassName);
}

// Открытие подтверждения города
let citySubmitPopup = document.querySelector('.city-submit-window');
document.addEventListener('DOMContentLoaded', activate(citySubmitPopup));

// Закрытие окна подтверждения города
let closeBtn = citySubmitPopup.querySelector('.submit-close');
closeBtn.addEventListener('click', () => {
    disable(citySubmitPopup);
});

// Выбор раздела в верхней шапке
const headLeftMenu = document.querySelector('.menu_left'),
    menuPoint = headLeftMenu.querySelectorAll('.menu_drop'),
    headerTop = document.querySelector('.header_top-2');

// Всплывающие подменю в шапке сайта
openHideMenu(menuPoint);
function openHideMenu(menuPoint) {
    menuPoint.forEach((item) => {
        const dropMenu = item.querySelector('.menu_drop_container');

        item.addEventListener('mouseenter', (e) => {
            if (item.classList.contains('drop-active')) {
                dropMenu.classList.add(activeClassName);
            }
        });

        item.addEventListener('mouseleave', () => {
            dropMenu.classList.remove(activeClassName);
        });
    });
}
