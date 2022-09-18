const headLeftMenu = document.querySelector('.menu_left'),
    menuPoint = headLeftMenu.querySelectorAll('.menu_drop');

// Всплывающие подменю в шапке сайта
openHideMenu(menuPoint);
function openHideMenu(elem) {
    elem.forEach((item) => {
        const dropMenu = item.querySelector('.menu_drop_container');
        item.addEventListener('mouseenter', (e) => {
            if (item.classList.contains('drop-active')) {
                activate(dropMenu);
            }
        });

        item.addEventListener('mouseleave', () => {
            disable(dropMenu);
        });
    });
}

