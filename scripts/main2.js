// Переменные
const activeClassName = 'active',
    subMenuActiveClass = 'submenu-active';

// Добавление класса active (display: flex)
function activate(elem) {
    elem.classList.add(activeClassName);
}
// Убираем класс active (display: flex)
function disable(elem) {
    elem.classList.remove(activeClassName);
}
// Убираем класс
function removeClass(elem, className) {
    elem.classList.remove(className);
}
// Открытие подтверждения города
let citySubmitPopup = document.querySelector('.city-submit-window');
document.addEventListener('DOMContentLoaded', () => {
    activate(citySubmitPopup);
});

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

// Открытие попап окон
const callbackPopup = document.querySelector('.callback-popup');
const popupBtns = document.querySelectorAll('.button_callback');

openPopup(callbackPopup, popupBtns);
closePopup(callbackPopup);

function openPopup(popup, btns) {
    // Находим кнопки открытия попапа.
    // Вешаем событие на каждую кнопку
    // Проверяем на попап и открываем
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (popup.classList.contains('popup-fade') != true) {
                return;
            }
            activate(popup);
        });
    });
}
// Функция закрытия попапа по кнопке
function closePopup(popup) {
    const btn = popup.querySelector('.popup-close');

    // Закрытие по кнопке «закрыть»
    btn.addEventListener('click', () => {
        disable(popup);
    });

    // Закрытие по клике вне попапа
    popup.addEventListener('click', (e) => {
        const target = e.target;
        if (target === popup || target === popup.querySelector('.popup-body')) {
            disable(popup);
        }
    });

    // Закрытие по кнопке Esc
    document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape') {
            disable(popup);
        }
    });
}

// Настройка чекбокса
const checkbox = document.querySelectorAll('.checkbox');

checkbox.forEach((item) => {
    item.addEventListener('click', () => {
        const input = item.querySelector('input');

        if (input.checked != true) {
            input.checked = true;
        } else {
            input.checked = false;
        }
    });
});

// Настройка радио кнопки


