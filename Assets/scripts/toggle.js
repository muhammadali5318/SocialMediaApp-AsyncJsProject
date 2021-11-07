'use strict'

// this file to make website responsive on mobile design. 
// we display and hide some container on mobile view on specific action


const toga = document.querySelector(".toga");
const left = document.querySelector(".left");
const closee = document.querySelector(".close")

toga.addEventListener('click', function() {
    left.classList.toggle("mediaToggle");
})

closee.addEventListener('click', function() {
    left.classList.add("mediaToggle");
})