let state = {
    activeMenuItem: [],
    lastScrollPos: 0,
    isScrolling: null,
    sectionsElem: null,
    scrollStartedByMenuClick: false,
}

function main() {

    // Build horizontal and vertical menus based on sections in the document.
    buildMenu();
    document.getElementById('header-box')
        .addEventListener('click', menuItemClick);

    // Attach event function to menu icon (visible on narrow screens).
    document.getElementById('menu-icon')
        .addEventListener('click', menuIconClick);

    // Attach scroll event handler.
    state.sectionsElem = document.getElementById('sections');
    state.sectionsElem.addEventListener('scroll', scroll);

    // Set up response to media queries for window resizing.
    //
    // Note: The menu items are dynamically added based on the sections in the HTML page.
    // We need to wait for the browser reflow and repaint to complete before we can query
    // the width of the menu bar. If we don't do this .getBoundingClientRect() will report
    // 0's for widths and heights
    window.requestAnimationFrame(updateMediaQuery);

    // Scroll to top section.
    const sections = document.getElementById('sections');
    sections.scrollIntoView();
}

function buildMenu() {
    const menuId = 'menu';
    // Get all sections.
    const sections = document.getElementsByClassName('section');
    // Add sections to menu.
    for (let section of sections) {
        let sectionId = section.id
        let menuText = section.getAttribute('data-menu-item-text');
        let elem = document.createElement('DIV');
        // Add menu item to horizontal and vertical menus.
        elem.innerHTML =
            `<li id="${menuId}-${sectionId}" data-section-id="${sectionId}" ` +
            `class="header__menu-item"> ` +
            `<span id="${menuId}-${sectionId}-text">${menuText}</span>` +
            `</li>`;
        let menuItem = elem.firstChild;
        document.getElementById(menuId).appendChild(menuItem);
    }
    // Underline first menu entry.
    menuSetUnderline(document.getElementById(menuId).children[0]);
}

function updateMediaQuery() {
    // console.log(document.getElementById('menu').getBoundingClientRect().width);
    // console.log(document.getElementById('header__logo').getBoundingClientRect().width);
    // const triggerWidth = document.getElementById('menu')
    //         .getBoundingClientRect().width +
    //     document.getElementById('header__logo')
    //         .getBoundingClientRect().width + 70;
    // console.log('triggerWidth = ' + triggerWidth);
    // // Add media rule.
    // const mediaRule = '' +
    //     `@media screen and (min-width: ${triggerWidth}px) {` +
    //     '  .header__menu {' +
    //     '    visibility: visible;' +
    //     '  }' +
    //     '  .header__menu-icon {' +
    //     '    display: none;' +
    //     '  }' +
    //     '}';
    // const style = document.createElement('style');
    // document.head.appendChild(style);
    // style.sheet.insertRule(mediaRule);
    // Attache event handler to toggle horizontal or vertical menu.
    window.matchMedia(`(min-width: ${950}px)`)
        .addEventListener('change', toggleVerticalMenu);
    toggleVerticalMenu();
}

function menuItemClick(event) {
    let sectionId = null;
    let menuItem = null;
    let elem = event.target;

    // Traverse up the DOM tree to find the menu item clicked.
    while (!(elem === null) && !(elem.tagName === 'BODY')) {
        if (elem.hasAttribute('data-section-id')) {
            sectionId = elem.getAttribute('data-section-id');
            menuItem = elem;
            break;
        }
        elem = elem.parentNode;
    }

    // Get the IDs of the selected item in horizontal and vertical menus.
    if (menuItem) {
        // Scroll to selected section.
        state.scrollStartedByMenuClick = true;
        document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
        // Set underline at menu item in horizontal and vertical menus.
        menuSetUnderline(menuItem);
    }
}

function menuSetUnderline(menuItem) {
    // Remove underline from active menu item.
    if (!(state.activeMenuItem === undefined || state.activeMenuItem.length === 0)) {
        while (state.activeMenuItem.length > 0) {
            let activeMenuItem = state.activeMenuItem.pop();
            if (activeMenuItem.classList.contains('underlined')) {
                activeMenuItem.classList.remove('underlined');
            }
            if (activeMenuItem.classList.contains('underline-anchor')) {
                activeMenuItem.classList.remove('underline-anchor');
            }
        }
    }
    // Add underline to selected menu items.
    const menuItemText = document.getElementById(menuItem.id + '-text');
    menuItemText.classList.add('underlined');
    menuItemText.classList.add('underline-anchor');
    // Save selected item as active item.
    state.activeMenuItem.push(menuItemText);
}

function toggleVerticalMenu() {
    // Toggle the vertical menu whenever a media query resize event fires.
    const header = document.getElementById('menu');
    if (window.innerWidth > 950 && header.classList.contains('header__menu--display-none')) {
        header.classList.remove('header__menu--display-none');
    }
    if (window.innerWidth <= 950 && !(header.classList.contains('header__menu--display-none'))) {
        header.classList.add('header__menu--display-none');
    }
}

function menuIconClick() {
    const header = document.getElementById('menu');
    header.classList.toggle('header__menu--display-none');
}

function scroll() {
    const viewWindow = document.getElementById('sections');
    const triggerDiff = 30; // Minimum scroll distance before doing something.
    const scrollTimeOut = 100;

    if (Math.abs(viewWindow.scrollTop - state.lastScrollPos) > triggerDiff) {
        state.lastScrollPos = viewWindow.scrollTop;

        window.clearTimeout(state.isScrolling);
        state.isScrolling = setTimeout(scrollingStopped, scrollTimeOut);
    }
}

function scrollingStopped() {
    // Only update the menu item underline when the user scrolls.
    // Do nothing if the scrolling happens because of .scrollIntoView().
    if (!(state.scrollStartedByMenuClick)) {
        const viewWindow = document.getElementById('sections');
        const triggerTop = viewWindow.getBoundingClientRect().top;
        const triggerBottom = triggerTop + viewWindow.getBoundingClientRect().height * 0.3;

        // Find the section that is in focus.
        const sections = document.getElementsByClassName('section');
        let focusSection = null;
        for (let section of sections) {
            if ((section.getBoundingClientRect().top >= triggerTop) &&
                (section.getBoundingClientRect().top <= triggerBottom)) {
                focusSection = section;
                break;
            }
        }

        // Get the item of the horizontal and vertical menus corresponding to the section in focus.
        if (!(focusSection == null)) {
            let menuItems = [];
            let menuItemIds = focusSection.getAttribute('data-menu-items');
            for (let menuItemId of menuItemIds.split(' ')) {
                menuItems.push(document.getElementById(menuItemId));
            }
            // Set underline at menu item in horizontal and vertical menus.
            menuSetUnderline(menuItems);
        }
    }
    state.scrollStartedByMenuClick = false;
}

document.addEventListener('DOMContentLoaded', main);
