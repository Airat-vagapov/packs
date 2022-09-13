const forms = () => {
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input');
    // Объект с описанием ошибок
    const message = {
        success: document.querySelector('[data-popup-status="success"]'),
        error: document.querySelector('[data-popup-status="error"]'),
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

                        // Если форма в попапе
                        if(item.dataset.popupForm == "t"){
                            let popup = getActivePopup();
                            console.log(popup);
                            disable(popup);
                            activate(message.success);
                        }
                        
                    })
                    .catch(() => {
                        if(item.dataset.popupForm == "t"){
                            let popup = getActivePopup();
                            console.log(popup);
                            disable(popup);
                            activate(message.error);
                        }
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

