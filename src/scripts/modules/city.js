// Подставляем город по IP
const userCity = (ip) => {
    ip.then((ip) => {
        let url =
            'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=';
        let token = '115230963031bbf7ed762698d1932584cf0d2078';
        let query = ip;

        let options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Token ' + token,
            },
        };

        fetch(url + query, options)
            .then((response) => response.json())
            .then((data) => {
                let cityByIp = data.location.data.city;
                const myCity = document.querySelectorAll(
                    '[data-type="my_city"]'
                );

                myCity.forEach((city) => {
                    city.innerHTML = cityByIp;
                });
            })
            .then(() => {
                // Открытие подтверждения города
                let citySubmitPopup = document.querySelector(
                    '.city-submit-window'
                );
                activate(citySubmitPopup);
            })
            .catch((error) => console.log('error', error));
    });
};

userCity(getUserIp());

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

    // Выбор города по клику
    const cityOnHead = document.querySelector('[data-type="my_city"]');
    content.forEach((city) => {
        city.addEventListener('click', () => {
            let value = city.innerHTML;
            cityOnHead.innerHTML = value;
            popup.closePopup();
        });
    });
}

citySearch(citySelect);

// Выстраивание контента для попапа города (при первом открытии)
function showCities(popup) {
    const container = popup.popupContainer;
    const contentContainer = container.querySelector('.city__select__content');
    const content = container.querySelectorAll('.city__select__col');
    const error = container.querySelector('.popup__error__contaner');

    content.forEach((item) => {
        contentContainer.appendChild(item);
    });
    contentContainer.appendChild(error);
}
