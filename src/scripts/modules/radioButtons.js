const radioBtns = document.querySelectorAll('.radio-btn');

function activateContent(radioInput) {
    let radioInputType = radioInput.dataset.radioType;
    if (radioInput.checked) {
        activate(
            document.querySelector(`[data-radio-content="${radioInputType}"]`)
        );
    }
}

function disableActiveContent(radioInput) {
    let radioInputType = radioInput.dataset.radioType;
    let activeRadios = document.querySelectorAll(`[data-radio-content]`);
    activeRadios.forEach((item) => {
        if (item.dataset.radioContent != radioInputType) {
            disable(item);
        }
    });
}

radioBtns.forEach((radio) => {
    const radioInput = radio.querySelector('input[type=radio]');

    if (radioInput.checked) {
        activateContent(radioInput);
    }

    radio.addEventListener('click', (e) => {
        disableActiveContent(radioInput);
        activateContent(radioInput);
    });
});

function disableRadioBtns(container) {
    let all = container.querySelectorAll('input[type=radio]');
    let content = container.querySelectorAll('form[data-radio-content]');

    all.forEach((btn) => {
        btn.checked = false;

        content.forEach((item) => {
            if (btn.dataset.radioType == item.dataset.radioContent) {
                disable(item);
            }
        });
    });
}
