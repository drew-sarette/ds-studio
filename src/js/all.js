const currentPageLink = document.querySelector(`a[href*="${location.pathname}"]`);
currentPageLink.classList.add("current-page-a");
currentPageLink.parentElement.classList.add("current-page-li");


const menuViolinBow = document.querySelectorAll(".main-menu-label svg");
const nav = document.getElementById("main-nav")
document.querySelector(".main-menu-label").addEventListener("click", () => {
    menuViolinBow.forEach(svg => svg.classList.toggle("open"));
    nav.classList.toggle("open");
})