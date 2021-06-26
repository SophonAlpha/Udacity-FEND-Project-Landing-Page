let activeMenuItemText = null;

function main() {
    // Attach event function to all menu items.
    for (let menuId of ['menu-horiz', 'menu-vert']) {
        const menu = document.getElementById(menuId);
        // Underline first menu entry.
        setUnderline(menu.children[0]);
        for (let menuItem of menu.children) {
            menuItem.addEventListener('click', function() {
                menuItemClick(menuItem.id);
            });
        }
    }
    // Attach event function to menu icon (visible on narrow screens).
    document.getElementById('menu-icon').addEventListener('click', menuIconClick);
    // Respond to media queries for window resizing.
    window.matchMedia('(min-width: 950px)').addEventListener('change', toggleVerticalMenu);
    toggleVerticalMenu();
    // Scroll to top section.
    const sections = document.getElementById("sections");
    sections.scrollIntoView();
}

function setUnderline(menuItem) {
    const menuItemText = document.getElementById(menuItem.id + "-text");
    // Remove underline from current menu item.
    if (activeMenuItemText) {
        if (activeMenuItemText.classList.contains("underlined")) {
            activeMenuItemText.classList.remove("underlined");
        }
        if (activeMenuItemText.classList.contains("underline-anchor")) {
            activeMenuItemText.classList.remove("underline-anchor");
        }
    }
    // Add underline to active menu item.
    menuItemText.classList.add("underlined");
    console.log(menuItemText);
    menuItemText.classList.add("underline-anchor");
    // Save active item as current item.
    activeMenuItemText = menuItemText;
}

function menuItemClick(menuItemId) {
    console.log(menuItemId);
    const section = document.getElementById(
        document
            .getElementById(menuItemId)
            .getAttribute('data-section-id')
    );
    section.scrollIntoView({behavior: "smooth"});
}

function toggleVerticalMenu() {
    // Toggle the vertical menu whenever a media query resize event fires.
    const headerBottom = document.querySelector('#header-bottom');
    headerBottom.classList.add('collapsed');
}

function menuIconClick(elem) {
    const headerBottom = document.querySelector('#header-bottom');
    headerBottom.classList.toggle('collapsed');
}

document.addEventListener('DOMContentLoaded', main);
