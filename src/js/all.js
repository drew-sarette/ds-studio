const menuViolinBow = document.querySelectorAll(".main-menu-btn svg");
const nav = document.getElementById("main-nav")
const navBtn = document.querySelector(".main-menu-btn");
navBtn.addEventListener("click", () => {
    menuViolinBow.forEach(svg => svg.classList.toggle("open"));
    nav.classList.toggle("open");
})
document.querySelector("span.current-year").textContent = new Date().getFullYear();