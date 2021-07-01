let state = {
    activeMenuItems: [],
}

function main() {
    // Initialise horizontal and vertical menus.
    menuInitialise(['menu-horiz', 'menu-vert']);
    document.getElementById("header-box")
        .addEventListener('click', menuItemClick);
    // Attach event function to menu icon (visible on narrow screens).
    document.getElementById('menu-icon')
        .addEventListener('click', menuIconClick);
    // Set up the intersection observer to detect when a section moves into view.
    const observer = new IntersectionObserver(sectionIsVisible, {
        root: document.getElementById("sections"),
        threshold: Array.from(range(0, 1, 0.1)),
    })
    observer.observe(document.getElementById("section-1"));
    observer.observe(document.getElementById("section-2"));
    observer.observe(document.getElementById("section-3"));
    observer.observe(document.getElementById("section-4"));
    // Set up response to media queries for window resizing.
    window.matchMedia('(min-width: 950px)')
        .addEventListener('change', toggleVerticalMenu);
    toggleVerticalMenu();
    // Scroll to top section.
    const sections = document.getElementById("sections");
    sections.scrollIntoView();
}

function menuInitialise(menuIds) {
    let menuItems = [];
    for (let menuId of menuIds) {
        const menu = document.getElementById(menuId);
        menuItems.push(menu.children[0]);
    }
    // Underline first menu entry in horizontal and vertical menus.
    menuSetUnderline(menuItems);
}

function menuItemClick(event) {
    let sectionId = null;
    let menuItemIds = null;
    let elem = event.target;
    let menuItems = [];
    // Traverse up the DOM tree to find which menu item was clicked
    while (!(elem === null) && !(elem.tagName === "BODY")) {
        if (elem.hasAttribute('data-section-id')) {
            sectionId = elem.getAttribute('data-section-id');
            menuItemIds = elem.getAttribute('data-menu-items');
            break;
        }
        elem = elem.parentNode;
    }
    // Get the IDs of the selected item in horizontal and vertical menus.
    if (menuItemIds) {
        for (let menuItemId of menuItemIds.split(" ")) {
            menuItems.push(document.getElementById(menuItemId));
        }
        // Scroll to selected section.
        document.getElementById(sectionId).scrollIntoView({behavior: "smooth"});
        // Set underline at menu item in horizontal and vertical menus.
        menuSetUnderline(menuItems);
    }
}

function menuSetUnderline(menuItems) {
    // Remove underline from active menu item.
    if (!(state.activeMenuItems === undefined || state.activeMenuItems.length === 0)) {
        while (state.activeMenuItems.length > 0) {
            let activeMenuItem = state.activeMenuItems.pop();
            if (activeMenuItem.classList.contains("underlined")) {
                activeMenuItem.classList.remove("underlined");
            }
            if (activeMenuItem.classList.contains("underline-anchor")) {
                activeMenuItem.classList.remove("underline-anchor");
            }
        }
    }
    // Add underline to selected menu items.
    for (let menuItem of menuItems) {
        const menuItemText = document.getElementById(menuItem.id + "-text");
        menuItemText.classList.add("underlined");
        menuItemText.classList.add("underline-anchor");
        // Save selected item as active item.
        state.activeMenuItems.push(menuItemText);
    }
}

function* range(start, stop, step) {
    for (let x = start; x <= stop; x = x + step) {
        yield x;
    }
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

function sectionIsVisible(entries, observer) {
    const viewWindow = document.getElementById("sections");
    const triggerTop = viewWindow.getBoundingClientRect().top;
    const triggerBottom = triggerTop + viewWindow.getBoundingClientRect().height * 0.3;

    // Find the section that is in focus.
    const sections = document.getElementsByClassName("section");
    let focusSection = null;
    for (let section of sections) {
        if ((section.getBoundingClientRect().top >= triggerTop) &&
            (section.getBoundingClientRect().top <= triggerBottom)) {
            console.log("section = " + section.id);
            focusSection = section;
            break;
        }
    }

    // Get the item of the horizontal and vertical menus corresponding to the section in focus.
    if (!(focusSection == null)) {
        let menuItems = [];
        let menuItemIds = focusSection.getAttribute('data-menu-items');
        for (let menuItemId of menuItemIds.split(" ")) {
            menuItems.push(document.getElementById(menuItemId));
        }
        // Set underline at menu item in horizontal and vertical menus.
        menuSetUnderline(menuItems);
    }
}

document.addEventListener('DOMContentLoaded', main);
