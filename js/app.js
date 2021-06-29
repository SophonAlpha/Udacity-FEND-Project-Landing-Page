class Menu {

    constructor(menuIds) {
        this.activeMenuItems = [];
        this.initialise(menuIds);
    }

    initialise(menuIds) {
        let menuItems = [];
        for (let menuId of menuIds) {
            const menu = document.getElementById(menuId);
            menuItems.push(menu.children[0]);
        }
        // Underline first menu entry in horizontal and vertical menus.
        this.setUnderline(menuItems);
    }

    menuItemClick(event) {
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
            // Scroll
            document.getElementById(sectionId).scrollIntoView({behavior: "smooth"});
            // Set underline at menu item in horizontal and vertical menus.
            this.setUnderline(menuItems);
        }
    }

    setUnderline(menuItems) {
        // Remove underline from active menu item.
        if (!(this.activeMenuItems === undefined || this.activeMenuItems.length === 0)) {
            while (this.activeMenuItems.length > 0) {
                let activeMenuItem = this.activeMenuItems.pop();
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
            this.activeMenuItems.push(menuItemText);
        }
    }

}

function main() {
    // Initialise horizontal and vertical menus.
    const menus = new Menu(['menu-horiz', 'menu-vert']);
    document.getElementById("header-box")
        .addEventListener('click', menus.menuItemClick.bind(menus));
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
    // Set up respons to media queries for window resizing.
    window.matchMedia('(min-width: 950px)')
        .addEventListener('change', toggleVerticalMenu);
    toggleVerticalMenu();
    // Scroll to top section.
    const sections = document.getElementById("sections");
    sections.scrollIntoView();
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

// TODO:
// - Intersection Observer API
//   https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

function sectionIsVisible(entries, observer) {
    const viewWindow = document.getElementById("sections");
    const viewWindowTop = viewWindow.getBoundingClientRect().top;
    const viewWindowHeight = viewWindow.getBoundingClientRect().height;
    const viewWindowMiddle = viewWindowHeight / 2;

    let sections = {};
    entries.forEach(entry => {
        let section = document.getElementById(entry.target.id);
        let distance = viewWindowMiddle - section.getBoundingClientRect().top;
        console.log(section.id + " = " + distance);
        // if (distance >= 0 ) {
        //     console.log(section.id + " = " + distance);
        // }
    })
    // Object.keys(a).sort().reduce(function (entry, key) {entry[key] = a[key]; return entry;}, {});
    console.log("---------------------------------");
}

document.addEventListener('DOMContentLoaded', main);
