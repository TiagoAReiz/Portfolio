const menu = document.getElementById("menu");
const menuBar = document.getElementById("menu-bar");

menu.addEventListener("click", () => {
    menuBar.classList.toggle("active")
    document.querySelector('.menu').classList.toggle('active');
    document.getElementById('menu-links').classList.toggle('active')
} )