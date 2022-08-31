// Логика табов
const tabBlock = document.querySelectorAll('.tabs-block');

tabBlock.forEach((item) => {
    const tabLine = item.querySelector('.tabline');
    const firstTab = item.querySelector('.tab');
    const tabs = item.querySelectorAll('.tab');

    // Двигаем подчеркивание таба
    tabs.forEach((item) => {
        let tabCoord = item.getBoundingClientRect();
        let firstTabCoord = firstTab.getBoundingClientRect();

        if (item.classList.contains('tab-active')) {
            tabLine.style.width = tabCoord.width + 'px';
            tabLine.style.left = tabCoord.left - firstTabCoord.left + 24 + 'px';

            let tabType = item.dataset.tabType;
            console.log(tabType);
            let activeTabContent = document.querySelector(
                `.tab-content[data-tab-type = "${tabType}"]`
            );
            console.log(activeTabContent);
            // activate(activeTabContent);
        }

        // Переключение таба
        item.addEventListener('click', (e) => {
            const target = e.target;
            // Убираем активность у всех табов
            tabs.forEach((tab) => {
                tab.classList.remove('tab-active');
            });
            // Убираем активность у контента таба
            let tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach((item) => {
                disable(item);
            });

            // Подчеркивание выбранного таба
            tabLine.style.width = tabCoord.width + 'px';
            item.classList.add('tab-active');

            tabLine.style.left = tabCoord.left - firstTabCoord.left + 24 + 'px';

            let index = getElIndexByClick(item, target);
            console.log(index);

            // Актививруем контент таба
            let tabType = item.dataset.tabType;
            let activeTabContent = document.querySelector(
                `.tab-content[data-tab-type = "${tabType}"]`
            );
            
            activate(activeTabContent);
        });
    });
});
