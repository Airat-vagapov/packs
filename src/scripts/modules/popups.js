// Попап обратного звонка
class Popup {
    constructor(name, popupContainer, success, error, openBtns) {
        (this.name = name),
            (this.popupContainer = popupContainer),
            (this.success = success),
            (this.error = error),
            (this.openBtns = openBtns);
    }

    openPopupByBtns() {
        // Находим кнопки открытия попапа.
        // Вешаем событие на каждую кнопку
        // Проверяем на попап и открываем
        this.openBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                disable(citySubmitPopup);
                activate(this.popupContainer);

                // Очистка инпутов
                const inputs = this.popupContainer.querySelectorAll('input');
                const clearInputs = () => {
                    inputs.forEach((item) => {
                        item.value = '';
                        if (item.type != 'radio') {
                            item.checked = false;
                        }
                    });
                };
                clearInputs(inputs);

                // Активация формы логина
                if (this.name == 'login') {
                    // Включение радиокнопки
                    let radioBtns =
                        this.popupContainer.querySelectorAll(
                            'input[type=radio]'
                        );
                    disableRadioBtns(this.popupContainer);

                    radioBtns.forEach((radio) => {
                        if (radio.checked == false) {
                            if (radio.dataset.radioType == 'byPhone') {
                                radio.checked = true;
                                activateContent(radio);
                            }
                        }
                    });

                    if ('input[type=radio]'.checked == false) {
                    }
                    // Активация таба Вход
                    activateTabByName(this.popupContainer, 'login');
                }

                if(this.name == 'citySelect') {
                    showCities(this);
                }
            });
        });
    }

    closePopup() {
        disable(this.popupContainer);
        const btn = document.querySelectorAll('.popup-close');
        

        // Закрытие по кнопке «закрыть» (крестик)
        btn.forEach((btn) => {
            btn.addEventListener('click', () => {
                disable(this.popupContainer);

                // Закрытие success/error
                if(this.success || this.error) {
                    if (
                        this.success.classList.contains('active') ||
                        this.error.classList.contains('active')
                    ) {
                        disable(this.success);
                        disable(this.error);
                    }
                }

                // Сброс активности форм на попапе логина
                setTimeout(closeTabContent, 300, this.popupContainer);
                setTimeout(deactivateAllTabs, 300, this.popupContainer);
            });
        });

        // Закрытие по клике вне попапа
        document.addEventListener('click', (e) => {
            const target = e.target;
            const popupFade = document.querySelectorAll('.popup-fade');

            popupFade.forEach((item) => {
                if (target == item) {
                    disable(item.parentElement);
                }
            });
        });

        // Закрытие по кнопке Esc
        document.addEventListener('keydown', (e) => {
            if (e.key == 'Escape') {
                disable(this.popupContainer);
                if(this.success || this.error) {
                    disable(this.success);
                    disable(this.error);
                }
                setTimeout(closeTabContent, 300, this.popupContainer);
                setTimeout(deactivateAllTabs, 300, this.popupContainer);
            }
        });

        // Закрытие success и error по кнопке «закрыть»
        if (this.success != undefined) {
            const successTextClose =
                this.success.querySelector('.text-close-btn');
            successTextClose.addEventListener('click', () => {
                disable(this.success);
            });
        }

        if (this.error != undefined) {
            const errorTextClose = this.error.querySelector('.text-close-btn');
            errorTextClose.addEventListener('click', () => {
                disable(this.error);
                closeTabContent(this.popupContainer);
                deactivateAllTabs(this.popupContainer);
            });
        }
    }
}

// Попап обратного звонка
const callbackPopup = new Popup(
    'Callback',
    document.querySelector('div[data-popup-name="callback"]'),
    document.querySelector('div[data-popup-status="success"]'),
    document.querySelector('div[data-popup-status="error"]'),
    document.querySelectorAll('[data-action="callback__Popup__Open"]')
);

callbackPopup.openPopupByBtns();
callbackPopup.closePopup();

// Попап профиля (логин и регистрация)
const loginPopup = new Popup(
    'login',
    document.querySelector('div[data-popup-name="login"'),
    document.querySelector('div[data-popup-status="success"]'),
    document.querySelector('div[data-popup-status="error"]'),
    document.querySelectorAll('[data-action=profile__popup_open]')
);

loginPopup.openPopupByBtns();
loginPopup.closePopup();

// Попап выбора другого города
const citySelect = new Popup(
    'citySelect',
    document.querySelector('div[data-popup-name="city-select"'),
    undefined,
    undefined,
    document.querySelectorAll('[data-action="citySelect__popup_open"]')
);

citySelect.openPopupByBtns();
citySelect.closePopup();

function getAllPopups() {
    let result = document.querySelectorAll('.popup');
    return result;
}

function getActivePopup() {
    let all = getAllPopups();
    let result;
    all.forEach((popup) => {
        if (popup.classList.contains('active')) {
            result = popup;
        }
    });
    return result;
}

// Поиск города в попапе выбора города
function citySearch(popup) {
    const container = popup.popupContainer;
    const contentContainer = container.querySelector('.popup-content');
    const cityListTag = container.querySelector('[data-type="city-tag"]');
    const search = container.querySelector('[data-type="city-search"]');
    const content = container.querySelectorAll('[data-type="city-name"]');
    const error = container.querySelector('[data-type="city-search-error"]');
    

    // Элемент списка городов по букве (контейнер)
    const cityTag = document.createElement('div');
    cityTag.classList.add('black-text', 'head-text', 'mb12');

    let arr = Array.from(content);

    search.addEventListener('keyup', () => {
        // Удаляем все элементы в контенте попапа
        while (contentContainer.firstChild) {
            contentContainer.removeChild(contentContainer.firstChild);
        }
        // Фильтруем города по введенному значению
        let result = arr.filter((el) =>
            el.innerHTML.toLowerCase().includes(search.value.toLowerCase())
        );

        // Сортируем по алфавиту
        let sortArr = result.sort((a, b) => {
            if (a.innerHTML > b.innerHTML) {
                return 1;
            }
            if (a.innerHTML < b.innerHTML) {
                return -1;
            }
            return 0;
        });

        // Убираем дубли
        let cities = sortArr.filter((item, pos) => {
            let i = 1;
            if (pos > 0) {
                if (item.innerHTML == sortArr[pos - i].innerHTML) {
                    i++;
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });

        if (cities.length == 0) {
            // Отображаем ошибку
            contentContainer.appendChild(error);
            activate(error);
        }

        // Строим выдачу (расставляем каждый элемент)
        cities.forEach((elem) => {
            // Новый контейнер для городов по букве
            const newCityList = document.createElement('div');
            newCityList.classList.add('flex-col', 'city__select__col', 'mb24');

            // Отображение популярных городов
            if (elem.dataset.popularCity == 't') {
                const popularList = contentContainer.querySelector(
                    'div[data-city-list="popular"]'
                );

                if (popularList) {
                    popularList.appendChild(elem);
                } else {
                    cityTag.innerHTML = 'Популярные города';
                    newCityList.dataset.cityList = 'popular';
                    newCityList.append(cityTag, elem);

                    const beforeElem =
                        contentContainer.querySelector('.city__select__col');
                    contentContainer.insertBefore(newCityList, beforeElem);
                }
            } else {
                // Отображение остальных
                // Находим первую букву
                let inner = elem.innerHTML;
                let toDel = 'г. ';
                let cityName = inner.replace(toDel, '');
                let first = cityName.charAt(0);

                // Создаем элемент списка с буквой
                const cityList = contentContainer.querySelector(
                    `div[data-city-list="${first}"]`
                );

                // Проверка на наличие уже такого списка
                if (cityList) {
                    cityList.appendChild(elem);
                } else {
                    // Создание нового списка
                    // Буква списка
                    const cityTag = document.createElement('div');
                    cityTag.classList.add('black-text', 'head-text', 'mb12');

                    // Формирование элементов
                    newCityList.dataset.cityList = first;
                    cityTag.innerHTML = first;
                    newCityList.append(cityTag, elem);
                    contentContainer.append(newCityList);
                }
            }
        });

    });
    const cityOnHead = document.querySelector('[data-type="city"]');
        content.forEach((city) => {
            city.addEventListener('click', () => {
                let value = city.innerHTML;
                cityOnHead.innerHTML = value;
                popup.closePopup();
            });
            
        })
}
citySearch(citySelect);

function showCities (popup) {

    const container = popup.popupContainer;
    const contentContainer = container.querySelector('.city__select__content')
    const content = container.querySelectorAll('.city__select__col');
    const error = container.querySelector('.popup__error__contaner');

    console.log(content);
    content.forEach((item) => {
        contentContainer.appendChild(item);
    });
    contentContainer.appendChild(error);
}