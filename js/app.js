/*
TODO:
 - Get width of menu items and adjust @media dynamically.
*/

function main() {
    // Attach event function to all menu items.
    for (let menuId of ['menu-horiz', 'menu-vert']) {
        const menu = document.getElementById(menuId);
        for (let menuItem of menu.children) {
            menuItem.addEventListener('click', menuItemClick);
        }
    }
    // Attach event function to menu icon (visible on narrow screens).
    document.getElementById('menu-icon').addEventListener('click', menuIconClick);
    // Respond to media queries for window resizing.
    window.matchMedia('(min-width: 950px)').addEventListener('change', toggleVerticalMenu);
    toggleVerticalMenu();
}

function menuItemClick(elem) {
    const section = document.getElementById(
        document
            .getElementById(elem.target.id)
            .getAttribute('data-section-id')
    );
    section.scrollIntoView({behavior: 'smooth'});
}

function toggleVerticalMenu() {
    // Toggle the vertical menu whenever a media query resize event fires.
    const headerBottom = document.querySelector('#header-bottom');
    headerBottom.classList.replace('header-bottom--expanded',
    'header-bottom--collapsed');
}

function menuIconClick(elem) {
    const headerBottom = document.querySelector('#header-bottom');
    if (!(headerBottom.classList.replace('header-bottom--expanded',
        'header-bottom--collapsed'))) {
        headerBottom.classList.replace('header-bottom--collapsed',
            'header-bottom--expanded')
    }
}

document.addEventListener('DOMContentLoaded', main);
