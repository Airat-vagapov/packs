// import IMask from 'node_modules/imask';

function formValidate(form) {
    const inputs = form.querySelectorAll('input');

    let error = 0;

    inputs.forEach((input) => {
        // Проверка на пустоту
        if (input.classList.contains('_req')) {
            emptyValueCheck(input);
            checkboxCheck(input);
        }
        
        // Проверка номера телефона
        if (input.name == 'phone') {phoneCheck(input)}
    });


    // Проверка на пустой инпут
    function emptyValueCheck(input) {
        if (input.type != 'checkbox') {
            let inpLength = input.value.trim().length;

            let result = inpLength === 0 ? true : false;
            if (result == true) {
                input.classList.add('field-error');
                error++;
            }

            if (result == false) {
                input.classList.remove('field-error');
            }
        }
    }
    // Проверка на чекбокс
    function checkboxCheck(input) {
        if (input.type == 'checkbox') {
            const addCheckboxError = (input) => {
                const checkboxParent = input.parentElement;
                checkboxParent
                    .querySelector('.checkbox-label')
                    .classList.add('checkbox-error');
                checkboxParent
                    .querySelector('.checkbox-text')
                    .classList.add('text-error');
            };

            const deleteCheckboxError = (input) => {
                const checkboxParent = input.parentElement;
                checkboxParent
                    .querySelector('.checkbox-label')
                    .classList.remove('checkbox-error');
                checkboxParent
                    .querySelector('.checkbox-text')
                    .classList.remove('text-error');
            };

            let result = input.checked ? true : false;

            if (result != true) {
                addCheckboxError(input);
                error++;
            }

            if (result == true) {
                deleteCheckboxError(input);
            }
        }
        return;
    }

    // Проверка номера телефона
    function phoneCheck(input) {
        
        let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if(regex.test(input.value) == true) {
            return;
        } else {
            input.classList.add('field-error');
            error++
        };
        return;
    }

    return error;
}





