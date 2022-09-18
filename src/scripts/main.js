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

// Получить индекс элемента по клику
function getElIndexByClick(el, clickElement) {
    let index = 0;
    while ((el = el.previousElementSibling)) {
        if (el != clickElement) {
            index++;
        }
    }
    return index;
}

// Получить индекс элемента
function getElIndex(el) {
    let index = 0;
    while ((el = el.previousElementSibling)) {
        if (el != el.previousElementSibling) {
            index++;
        }
    }
    return index;
}

// Получить все элементы в блоке
function getAllElems(container) {
    let all = container.querySelectorAll('.city__select__col');
    return all;
}

// Удалить все элементы в блоке
function removeElems(container) {
    let all = getAllElems(container);
    all.forEach((item) => {
        item.remove();
    });
}

// Получить IP адрес юзера
const getUserIp = async () => {
    return new Promise((resolve, reject) => {
        fetch('https://api.ipify.org?format=json')
            .then((response) => response.json())
            .then((data) => {
                resolve(data.ip);
            })
            .catch(console.log('error'));
    });
};

// Получаем город по IP
const getCityByIp = (ip) => {
    ip.then((ip) => console.log(ip));
};
getCityByIp(getUserIp());
