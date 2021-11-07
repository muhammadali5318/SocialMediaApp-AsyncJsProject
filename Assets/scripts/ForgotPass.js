'use strict'

console.log("hello I'm forgot password Script");

/*
Purpose: This file ForgotPass.js is responsible recover the password if email is correct.
*/


//Getting fields in which user enters data

let ForgotBtn = document.querySelector(".ForgotBtn");





// When we click on "Recover Pass button" this function will be invoked
// function ForgotPass() {
ForgotBtn.addEventListener('click', function() {

    let ForgotEmail = document.querySelector("#ForgotPasswordEmail");
    let forgotPas = document.querySelector("#password");
    let ForgotDiv = document.querySelector(".forgotDiv");
    let WrongMail = document.querySelector(".WrongMail");
    ForgotEmail = ForgotEmail.value;



    //forgot pass Form validation
    if (ForgotEmail != "") {


        // getting all the data keys from local storage and store it into a variable 
        // "for of" loop treverse all the keys and if entered email matched the record it will show the password.
        const keys = Object.keys(localStorage);
        for (let key of keys) {

            if (ForgotEmail === key) {
                WrongMail.style.display = "none";
                ForgotDiv.insertAdjacentHTML("beforeend", `<h5 style=" text-align: center;"> Your Password:  ${JSON.parse(localStorage.getItem(key)).password} </h5>`);
            } else {
                WrongMail.style.display = "block";
            }
        }


    } else {
        alert("Please enter the Email");
    }
})




// these two fuctions are responsile for show password option. When user click on show password icon password will be visible to user 
let state = false;

function toggle() {
    const pass = document.getElementById("password");


    if (state) {
        pass.setAttribute("type", "password");
        state = false;

    } else {
        pass.setAttribute("type", "text");
        state = true;

    }

}

function toggle1() {
    const pass1 = document.getElementById("password1");

    if (state) {
        pass1.setAttribute("type", "password");
        state = false;

    } else {
        pass1.setAttribute("type", "text");
        state = true;

    }

}