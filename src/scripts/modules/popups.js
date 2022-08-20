// Попап обратного звонка
class Popup {
    constructor(name, popupContainer, success, error, openBtns) {
        (this.name = name),
            (this.popupContainer = popupContainer),
            (this.success = success),
            (this.error = error),
            (this.openBtns = openBtns);
    }

    openPopupByBtns(name) {
        // Находим кнопки открытия попапа.
        // Вешаем событие на каждую кнопку
        // Проверяем на попап и открываем
        this.openBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
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
                if (name == 'login') {
                    const phoneRadio = this.popupContainer.querySelector(
                            'input[data-type="phone"]'
                        ),
                        loginByPhone = this.popupContainer.querySelector(
                            'form[data-login="byPhone"]'
                        );

                    if (phoneRadio.checked) {
                        if (this.popupContainer.contains(loginByPhone)) {
                            activate(loginByPhone);
                        }
                    }
                }
            });
        });
    }

    closePopup(name) {
        const btn = document.querySelectorAll('.popup-close');

        // Закрытие по кнопке «закрыть»
        btn.forEach((btn) => {
            btn.addEventListener('click', () => {
                disable(this.popupContainer);

                // Убираем активность с формы логина
                const loginByPhone = this.popupContainer.querySelector(
                    'form[data-login="byPhone"]'
                );
                if (this.popupContainer.contains(loginByPhone)) {
                    setTimeout(disable, 300, loginByPhone);
                }

                // Закрытие success/error
                if (
                    this.success.classList.contains('active') ||
                    this.error.classList.contains('active')
                ) {
                    disable(this.success);
                    disable(this.error);
                }
            });
        });

        // Закрытие по клике вне попапа
        document.addEventListener('click', (e) => {
            const target = e.target;
            const popupFade = document.querySelectorAll('.popup-fade');

            popupFade.forEach((item) => {
                if (target == item) {
                    disable(item.parentElement);

                    // Убираем активность с формы логина
                    const loginByPhone = item.parentElement.querySelector(
                        'form[data-login="byPhone"]'
                    );
                    if (item.parentElement.contains(loginByPhone)) {
                        setTimeout(disable, 300, loginByPhone);
                    }
                }
            });
        });

        // Закрытие по кнопке Esc
        document.addEventListener('keydown', (e) => {
            if (e.key == 'Escape') {
                disable(this.popupContainer);
                // Убираем активность с формы логина
                const loginByPhone = this.popupContainer.querySelector(
                    'form[data-login="byPhone"]'
                );
                if (this.popupContainer.contains(loginByPhone)) {
                    setTimeout(disable, 300, loginByPhone);
                }

                disable(this.success);
                disable(this.error);
            }
        });
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

callbackPopup.openPopupByBtns(callbackPopup.name);
console.log(callbackPopup);

callbackPopup.closePopup(callbackPopup.name);

// Попап профиля (логин и регистрация)
const loginPopup = new Popup(
    'login',
    document.querySelector('div[data-popup-name="login"'),
    document.querySelector('div[data-popup-status="success"]'),
    document.querySelector('div[data-popup-status="error"]'),
    document.querySelectorAll('[data-action=profile__popup_open]')
);

loginPopup.openPopupByBtns(loginPopup.name);
loginPopup.closePopup(loginPopup.name);

// const popupContent = profilePopup.popupContent,
//       loginPopup = popupContent.querySelector('.login-popup-login-tab'),
//       loginPopupRadioBtns = loginPopup
//         .querySelector('div[name="radiobtns"]')
//         .querySelectorAll('.radio-btn');

// // Меняем типы входа по значению радиокнопки
// const switchPopupByRadio = (elem) => {
//     const radioInput = elem.querySelector('input[type=radio]');

//     if (radioInput.dataset.type == 'phone' && radioInput.checked) {
//         disable(loginPopup.querySelector('[data-login="byEmail"]'));
//         activate(loginPopup.querySelector('[data-login="byPhone"]'));
//     }
//     if (radioInput.dataset.type == 'email' && radioInput.checked) {
//         disable(loginPopup.querySelector('[data-login="byPhone"]'));
//         activate(loginPopup.querySelector('[data-login="byEmail"]'));
//     }
// };
// loginPopupRadioBtns.forEach((item) => {

//     switchPopupByRadio(item);

//     item.addEventListener('click', () => {
//         switchPopupByRadio(item);
//     });
// });
