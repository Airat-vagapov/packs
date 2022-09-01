// const { fuchsia } = require("color-name");

// Логика табов
const tabs = () => {
const tabBlock = document.querySelectorAll('.tabs-block');

tabBlock.forEach((item) => {
    const tabLine = item.querySelector('.tabline');
    const firstTab = item.querySelector('.tab');

    const tabs = item.querySelectorAll('.tab');

    // Для каждого таба
    tabs.forEach((item) => {

        let tabCoord = item.getBoundingClientRect();
        let firstTabCoord = firstTab.getBoundingClientRect();

        if (item.classList.contains('tab-active')) {
            tabLine.style.width = tabCoord.width + 'px';
            tabLine.style.left = tabCoord.left - firstTabCoord.left + 24 + 'px';

            let tabType = item.dataset.tabType;

            let activeTabContent = document.querySelector(
                `.tab-content[data-tab-type = "${tabType}"]`
            );
            // activate(activeTabContent);
        }

        // Переключение таба
        changeTab(item);

        function changeTab(tab) {
            tab.addEventListener('click', (e) => {
                const target = e.target;

                // Убираем активность у всех табов
                tabs.forEach((tab) => {
                    tab.classList.remove('tab-active');
                });
                // Убираем активность у контента таба
                let tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach((tab) => {
                    disable(tab);
                });

                // Подчеркивание выбранного таба
                tabLine.style.width = tabCoord.width + 'px';
                tab.classList.add('tab-active');

                tabLine.style.left =
                    tabCoord.left - firstTabCoord.left + 24 + 'px';

                let index = getElIndexByClick(item, target);

                // Актививруем контент таба
                let tabType = tab.dataset.tabType;
                let activeTabContent = document.querySelector(
                    `.tab-content[data-tab-type = "${tabType}"]`
                );

                activate(activeTabContent);
            });
        }
    });
});
};
tabs();



function closeTabContent(container) {
    let tabContents = container.querySelectorAll('.tab-content');
    tabContents.forEach((item) => {
        disable(item);
    });
}

function deactivateAllTabs(container) {
    const tabBlocks = container.querySelectorAll('.tabs-block');

    tabBlocks.forEach((tabBlock) => {
        const tabs = tabBlock.querySelectorAll('.tab');

        tabs.forEach((tab) => {
            tab.classList.remove('tab-active');
        });
    });
}

function activateTabByName (container, tabName) {
    let tab = container.querySelector(`[data-tab-type='${tabName}']`);
    tab.classList.add('tab-active');
    
    if (tab.classList.contains('tab-active')) {
        moveTabline(container);

        let activeTabContent = document.querySelector(
            `.tab-content[data-tab-type = "${tabName}"]`
        );
        activate(activeTabContent);
    }
};

function moveTabline (container) {
    let tabs = container.querySelectorAll(`.tab[data-tab-type]`);
    
    tabs.forEach((tab) => {
        if(tab.classList.contains('tab-active')) {

            let tabLine = container.querySelector('.tabline');
            let firstTab = container.querySelector('.tab');
    
            let tabCoord = tab.getBoundingClientRect();
            let firstTabCoord = firstTab.getBoundingClientRect();
    
            tabLine.style.width = tabCoord.width + 'px';
            tabLine.style.left = tabCoord.left - firstTabCoord.left + 24 + 'px';
        }
    }) 

    
}


