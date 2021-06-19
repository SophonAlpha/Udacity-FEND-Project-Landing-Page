function main() {
    const menu = document.getElementById('menu');
    for (let menuItem of menu.children) {
        menuItem.addEventListener('click', menuItemClick);
    }
}

function menuItemClick(elem) {
    console.log(`Menu item "${elem.target.id}" clicked.`);
}

document.addEventListener('DOMContentLoaded', main);
