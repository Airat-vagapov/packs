
// Классы активации
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
// // Открытие подтверждения города
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


function getElIndexByClick (el, clickElement) {
    let index = 0;
    while (el = el.previousElementSibling) {
        if(el != clickElement) {
            index++;
        }
    }
    return index;
};

function getElIndex (el) {
    let index = 0;
    while (el = el.previousElementSibling) {
        if(el != el.previousElementSibling) {
            index++;
        }
    }
    return index;
};


