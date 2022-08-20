const forms = () => {
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input');
    // Объект с описанием ошибок
    const message = {
        loading: 'Загрузка',
        success: document.querySelector('._success'),
        error: document.querySelector('._error'),
    };

    // Фукнция отправки POST запроса с формы
    const postData = async (url, data) => {
        let result = await fetch(url, {
            method: 'POST',
            body: data,
        });

        return await result.json();
    };
    // Очистка всех инпутов
    const clearInputs = () => {
        input.forEach((item) => {
            item.value = '';
            item.checked = false;
        });
    };
    // Удаление класса ошибок на шнпутах
    const deleteErrorClasses = (input) => {
        input.forEach((item) => {
            item.classList.remove('field-error');
            item.classList.remove('checkbox-error');
        });
    };

    // Обработка событий фокуса и взаимодействие с инпутами/чекбоксами
    input.forEach((item) => {
        // Проверка на пустое поле при уходе с фокуса
        item.onblur = function () {
            if (item.value.length != 0) {
                item.classList.remove('field-error');
            }
        };
        // Добавление маски на поля
        function addMask(input) {
            let maskOptions = {
                mask: '+{7}(000)000-00-00'
            }
        
            if(input.name == 'phone') {
                let mask = IMask(input, maskOptions)
            }
        };
        addMask(item);
        // 

        // Добавление ошибок на чекбоксы
        if (item.type == 'checkbox' && item.classList.contains('_req')) {
            const checkboxParent = item.parentElement;

            const addCheckboxError = (input) => {
                checkboxParent
                    .querySelector('.checkbox-label')
                    .classList.add('checkbox-error');
                checkboxParent
                    .querySelector('.checkbox-text')
                    .classList.add('text-error');
            };

            const deleteCheckboxError = (input) => {
                checkboxParent
                    .querySelector('.checkbox-label')
                    .classList.remove('checkbox-error');
                checkboxParent
                    .querySelector('.checkbox-text')
                    .classList.remove('text-error');
            };

            item.addEventListener('change', () => {
                if (item.checked != true) {
                    addCheckboxError(item);
                } else {
                    deleteCheckboxError(item);
                }
            });
            checkboxParent.addEventListener('click', () => {
                if (item.checked != true) {
                    addCheckboxError(item);
                } else {
                    deleteCheckboxError(item);
                }
            });
        }
        // Автозамена на кирилицу
        if (item.dataset.lang == 'ru') {
            item.addEventListener('keyup', (e) => {
                let mapKey = {
                    q: 'й',
                    w: 'ц',
                    e: 'у',
                    r: 'к',
                    t: 'е',
                    y: 'н',
                    u: 'г',
                    i: 'ш',
                    o: 'щ',
                    p: 'з',
                    '[': 'х',
                    ']': 'ъ',
                    a: 'ф',
                    s: 'ы',
                    d: 'в',
                    f: 'а',
                    g: 'п',
                    h: 'р',
                    j: 'о',
                    k: 'л',
                    l: 'д',
                    ';': 'ж',
                    "'": 'э',
                    z: 'я',
                    x: 'ч',
                    c: 'с',
                    v: 'м',
                    b: 'и',
                    n: 'т',
                    m: 'ь',
                    ',': 'б',
                    '.': 'ю',
                    Q: 'Й',
                    W: 'Ц',
                    E: 'У',
                    R: 'К',
                    T: 'Е',
                    Y: 'Н',
                    U: 'Г',
                    I: 'Ш',
                    O: 'Щ',
                    P: 'З',
                    '[': 'Х',
                    ']': 'Ъ',
                    A: 'Ф',
                    S: 'Ы',
                    D: 'В',
                    F: 'А',
                    G: 'П',
                    H: 'Р',
                    J: 'О',
                    K: 'Л',
                    L: 'Д',
                    ';': 'Ж',
                    "'": 'Э',
                    Z: '?',
                    X: 'ч',
                    C: 'С',
                    V: 'М',
                    B: 'И',
                    N: 'Т',
                    M: 'Ь',
                    ',': 'Б',
                    '.': 'Ю',
                };

                let inputValue = e.target.value;
                let result = '';
                for (i = 0; i < inputValue.length; i++) {
                    result +=
                        mapKey[inputValue.charAt(i)] || inputValue.charAt(i);
                }
                item.value = result;
            });
        }

        // Первая буква с верхнего регистра
        if (item.name == 'name' || item.name == 'surname') {
            item.addEventListener('input', () => {
                item.value = item.value.replace(
                    /( |^)[а-яёa-z]/g,
                    function (u) {
                        return u.toUpperCase();
                    }
                );
            });
        }
    });

    // Отправка формы
    form.forEach((item) => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let formData = new FormData(item);

            let errorCount = formValidate(item);
            console.log(errorCount);

            if (errorCount == 0) {
                postData('php/server.php', formData)
                    .then((result) => {
                        console.log(result);
                        // statusMessage.textContent = message.success;
                        document
                            .querySelector('.callback-popup')
                            .querySelector('.popup-body')
                            .classList.remove('active');
                        activate(message.success);
                    })
                    .catch(() => {
                        document
                            .querySelector('.callback-popup')
                            .querySelector('.popup-body')
                            .classList.remove('active');
                        activate(message.error);
                    })
                    .finally(() => {
                        clearInputs();
                        deleteErrorClasses(input);
                    });
            }
        });
    });
};
forms();

