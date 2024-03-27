const light = document.querySelector(".light");
const dark = document.querySelector(".dark");

const title = document.querySelector(".app-title");

const back = document.querySelector(".container");

light.addEventListener("click", function () {
    back.style.backgroundColor = "white";
    title.style.color = "#293251";
});

dark.addEventListener("click", function () {
    back.style.backgroundColor = "black";
    title.style.color = "white";
});
