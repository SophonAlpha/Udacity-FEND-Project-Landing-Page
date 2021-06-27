class Menu {

    constructor(menuIds) {
        // this.instance = this;
        this.activeMenuItems = [];
        this.initialise(menuIds);
    }

    initialise(menuIds) {
        for (let menuId of menuIds) {
            const menu = document.getElementById(menuId);
            this.activeMenuItems.push(menu.children[0]);
        }
        // Underline first menu entry.
        this.setUnderline(this.activeMenuItems);
    }

    menuItemClick(event) {
        let section = null;
        let menuItemIds = null
        let elem = event.target;
        while (!(elem === null) && !(elem.tagName === "BODY")) {
            if (elem.hasAttribute('data-section-id')) {
                section = elem.getAttribute('data-section-id');
                menuItemIds = elem.getAttribute('data-menu-items');
                break;
            }
            elem = elem.parentNode;
        }
        console.log("Section = " + section);
        console.log("Menu items = " + this.activeMenuItems);
    }


    // menuItemClick(menuItem) {
    //     // const menuItem = document.getElementById(menuItemId);
    //     const section = document.getElementById(
    //         menuItem.getAttribute('data-section-id')
    //     );
    //     section.scrollIntoView({behavior: "smooth"});
    //     this.setUnderline(menuItem);
    // }

    setUnderline(selectedMenuItems) {
        for (let selectedMenuItem of selectedMenuItems) {
            const menuItemText = document.getElementById(selectedMenuItem.id + "-text");
            // Remove underline from active menu item.
            if (this.activeMenuItems) {
                if (this.activeMenuItems.classList.contains("underlined")) {
                    this.activeMenuItems.classList.remove("underlined");
                }
                if (this.activeMenuItems.classList.contains("underline-anchor")) {
                    this.activeMenuItems.classList.remove("underline-anchor");
                }
            }
            // Add underline to selected menu item.
            menuItemText.classList.add("underlined");
            menuItemText.classList.add("underline-anchor");
        }
        // Save selected item as active item.
        this.activeMenuItems = selectedMenuItems;
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
    // Respond to media queries for window resizing.
    window.matchMedia('(min-width: 950px)')
        .addEventListener('change', toggleVerticalMenu);
    toggleVerticalMenu();
    // Scroll to top section.
    const sections = document.getElementById("sections");
    sections.scrollIntoView();
}

// function initMenus(menuHorizId, menuVertId) {
//     const menuHoriz = document.getElementById(menuHorizId);
//     const menuVert = document.getElementById(menuVertId);
//     const mapHorizToVert = {};
//     const mapVertToHoriz = {};
//     for (let i = 0; i < menuHoriz.children.length; i++) {
//         mapHorizToVert[menuHoriz.children[i].id] = menuVert.children[i];
//         mapVertToHoriz[menuVert.children[i].id] = menuHoriz.children[i];
//     }
//     mapHorizToVert["active"] =
//
//         // Underline first menu entry.
//         this.setUnderline(menu.children[0]);
//         // Attach event handler.
//         for (let menuItem of menu.children) {
//             const instance = this;
//             menuItem.addEventListener('click', function () {
//                 instance.menuItemClick(menuItem);
//             });
//         }
//
// }

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
