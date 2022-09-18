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

// Получить все попапы
function getAllPopups() {
    let result = document.querySelectorAll('.popup');
    return result;
}

// Получить активный попап
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
