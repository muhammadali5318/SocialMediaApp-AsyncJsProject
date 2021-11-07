'use strict'

const toga = document.querySelector(".toga");
const left = document.querySelector(".left");
const closee = document.querySelector(".close")

toga.addEventListener('click', function() {
    left.classList.toggle("mediaToggle");
})

closee.addEventListener('click', function() {
    left.classList.add("mediaToggle");
})