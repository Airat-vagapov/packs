

// Всплывающие подменю в шапке сайта
const headLeftMenu = document.querySelector('.menu_left'),
    menuPoint = headLeftMenu.querySelectorAll('.menu_drop');

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

// Меню каталога
const catalogMenu = document.querySelector('.catalog-menu');
const menuEl = catalogMenu.querySelectorAll('.main-menu__item');

// Вывод подменю
menuEl.forEach((menu) => {
    const submenu = menu.querySelector('.submenu');
    if(submenu) {
        menu.addEventListener('mouseenter', () => {
            activate(submenu);
        })
        menu.addEventListener('mouseleave', () => {
            disable(submenu);
        })
    } else {
        const icon = menu.querySelector('.icon-drop');
        icon.remove();
    }
})


