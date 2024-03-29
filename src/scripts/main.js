// Классы активации
const activeClassName = 'active',
    subMenuActiveClass = 'submenu-active',
    disableClass = 'disable';

// Fade in animation
function fadeIn (elem) {
    anime({
        targets: elem,
        opacity: 1,
    });
}

// Добавление класса active (display: flex)
function activate(elem) {
    
    elem.classList.add(activeClassName);
    anime({
        targets: elem,
        opacity: 1,
    });
}

// Активация для скролла
function scrollActivate(elem) {
    elem.classList.add('.scroll__active')
}

// Убираем класс active (display: flex)
function disable(elem) {
    elem.classList.remove(activeClassName);
    anime({
        targets: elem,
        opacity: 0,
        delay: .3
    });
}
// Убираем класс disable
function removeDisableClass(elem) {
    elem.classList.remove(disableClass);
}

// Убираем класс
function removeClass(elem, className) {
    elem.classList.remove(className);
}

// Закрытие окна подтверждения города
let citySubmitPopup = document.querySelector(
    '.city-submit-window'
);
let closeBtn = citySubmitPopup.querySelector('.submit-close');
closeBtn.addEventListener('click', () => {
    disable(citySubmitPopup);
});

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
            .catch(() => console.log('error'));
    });
};
