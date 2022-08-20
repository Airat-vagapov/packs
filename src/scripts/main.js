// import forms from "scripts/modules/forms.js";
// import popup from "./modules/popups";

// window.addEventListener('DOMContentLoaded', () => {
//     forms();
//     popup();
// })

// Переменные
const activeClassName = 'active',
    subMenuActiveClass = 'submenu-active',
    disableClass = 'disable';

// Добавление класса active (display: flex)
function activate(elem) {
    elem.classList.add(activeClassName);
}
// Убираем класс active (display: flex)
function disable(elem) {
    elem.classList.remove(activeClassName);
}
// Убираем класс disable
function removeDisableClass(elem) {
    elem.classList.remove(disableClass);
}

// Убираем класс
function removeClass(elem, className) {
    elem.classList.remove(className);
}
// Открытие подтверждения города
let citySubmitPopup = document.querySelector('.city-submit-window');
document.addEventListener(
    'DOMContentLoaded',
    () => {
        activate(citySubmitPopup);
    },
    { once: true }
);

// Закрытие окна подтверждения города
let closeBtn = citySubmitPopup.querySelector('.submit-close');
closeBtn.addEventListener('click', () => {
    disable(citySubmitPopup);
});

// Выбор раздела в верхней шапке
const headLeftMenu = document.querySelector('.menu_left'),
    menuPoint = headLeftMenu.querySelectorAll('.menu_drop');

// Всплывающие подменю в шапке сайта
openHideMenu(menuPoint);
function openHideMenu(elem) {
    elem.forEach((item) => {
        const dropMenu = item.querySelector('.menu_drop_container');
        item.addEventListener('mouseenter', (e) => {
            if (item.classList.contains('drop-active')) {
                activate(dropMenu);
            }
        });

        item.addEventListener('mouseleave', () => {
            disable(dropMenu);
        });
    });
}

// Настройка чекбокса
const checkbox = document.querySelectorAll('.checkbox');
checkbox.forEach((item) => {
    item.addEventListener('click', () => {
        const input = item.querySelector('input');

        if (input.checked == true) {
            input.checked = false;
            input.value = false;
        } else {
            input.checked = true;
            input.value = true;
        }
    });
});

// Логика табов
const tabBlock = document.querySelectorAll('.tabs-block');

tabBlock.forEach((item) => {
    const tabLine = item.querySelector('.tabline');
    const firstTab = item
        .querySelector('.items-tabs')
        .querySelector('.items-tab');
    const tab = item
        .querySelector('.items-tabs')
        .querySelectorAll('.items-tab');

    tab.forEach((item) => {
        let tabCoord = item.getBoundingClientRect();
        let firstTabCoord = firstTab.getBoundingClientRect();

        if (item.classList.contains('tab-active')) {
            tabLine.style.width = tabCoord.width + 'px';
            tabLine.style.left = tabCoord.left - firstTabCoord.left + 24 + 'px';
        }

        item.addEventListener('click', (e) => {
            tab.forEach((tab) => {
                tab.classList.remove('tab-active');
            });
            tabLine.style.width = tabCoord.width + 'px';

            item.classList.add('tab-active');

            
            tabLine.style.left = tabCoord.left - firstTabCoord.left + 24 + 'px';
        });
    });
});

// document.addEventListener('click', (e) => {
//     console.log(e.target);
// })