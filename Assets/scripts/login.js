'use strict'

/*
Purpose: This file Login.js is responsible Data validation of user and log him into the system
*/

console.log("I'm Login Script");
const user = localStorage.getItem("currentUser");



let SignInBtn = document.querySelector(".SignInBtn");



// When we click on "sign in"  button this function will be invoked
SignInBtn.addEventListener('click', function(e) {
    
    //Getting fields in which user enters data
    let WrongMail = document.querySelector(".WrongMail");
    let pasmatch = document.querySelector(".pasmatch");
    let SignInEmail = document.querySelector("#signInEmail");
    let SignInpassword = document.querySelector("#password");
    e.preventDefault();

    //Fetching the value that user entered in the fields
    SignInEmail = SignInEmail.value;
    SignInpassword = SignInpassword.value;


    //Sign in Form validation
    if ((SignInEmail && SignInpassword) != "") {


        
        // getting all the data keys from local storage and store it into a variable
        // "for of" loop treverse all the keys and if email is unique than data will be stored is L.S.
        const keys = Object.keys(localStorage);
        for (let key of keys) {
            
            if (SignInEmail === key) {
                WrongMail.style.display = "none";
                if (SignInpassword === JSON.parse(localStorage.getItem(key)).password) {
                    
                    // storing the user information who is logged in 
                    localStorage.setItem("currentUser", SignInEmail);
                    pasmatch.style.display = "none";
                    window.location.href = "../index.html";

                } else {

                    pasmatch.style.display = "block";
                }

            } else {
                WrongMail.style.display = "block";
            }
        }
    } else {
        alert("Please Fill all the fields")
    }


});




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