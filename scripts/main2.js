// Переменные
const activeClassName = "active";

// Добавление класса active (display: block)
function activate(elem) {
  elem.classList.add(activeClassName);
}

function disable(elem) {
	elem.classList.remove(activeClassName);
}

// Открытие подтверждения города
let citySubmitPopup = document.querySelector(".city-submit-window");
document.addEventListener("DOMContentLoaded", activate(citySubmitPopup));

// Закрытие окна подтверждения города
let closeBtn = citySubmitPopup.querySelector(".submit-close");

closeBtn.addEventListener("click", disable(closeBtn.parentNode.parentElement));
console.log(closeBtn.parentNode.parentElement)