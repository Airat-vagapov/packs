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

function removeClass(elem, className) {
    elem.classList.remove(className);
}

function fadeIn(elem) {
    elem.classList.add('fadeIn');
    setTimeout(activate, 100, elem);
    let className = 'fadeIn';
    setTimeout(removeClass, 400, elem, className);
}

function fadeOut(elem) {
    let className = 'fadeOut';
    elem.classList.add(className);
    setTimeout(disable, 300, elem);
    setTimeout(removeClass, 300, elem, className);
}

// Открытие подтверждения города
let citySubmitPopup = document.querySelector('.city-submit-window');
document.addEventListener('DOMContentLoaded', () => {
    fadeIn(citySubmitPopup)
});

// Закрытие окна подтверждения города
let closeBtn = citySubmitPopup.querySelector('.submit-close');
closeBtn.addEventListener('click', () => {
    fadeOut(citySubmitPopup);
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
                fadeIn(dropMenu);
            }
        });

        item.addEventListener('mouseleave', () => {
            fadeOut(dropMenu);
        });
    });
}
