'use strict'
console.log("I'm sign up script");


/*
Purpose: This file SignupScript.js is responsible to store all the User Sign up data into local storage .
*/




//Getting fields in which user enters data
const SignUpBtn = document.querySelector('.SignUpBtn');
let pasmatch = document.querySelector(".pasmatch");
let pasmatch1 = document.querySelector(".pasmatch1");
let paslength = document.querySelector(".paslength");
let paslength1 = document.querySelector(".paslength1");
let mailExist = document.querySelector(".mailExist");
let accountCreated = document.querySelector(".accountCreated");


// this variable is responsible for checking emails it is already exists or not


// When we click on sign up now button this function will be invoked
// function signUpForm() 


SignUpBtn.addEventListener("click", function(e) {

    e.preventDefault();

    let validate = true;




    var signUpname = document.querySelector("#signUpInputname");
    var SignUpEmail = document.querySelector("#SignUpInputEmail");
    var SignUpPassword = document.querySelector("#password");
    var SignUpConPassword = document.querySelector("#password1");
    // console.log(pasmatch);

    displayNone();
 


    //Fetching the value that user entered in the fields
    signUpname = signUpname.value;
    SignUpEmail = SignUpEmail.value;
    SignUpPassword = SignUpPassword.value;
    SignUpConPassword = SignUpConPassword.value;


    //Saving Signup date and user agent
    const time = new Date();
    const agent = navigator.userAgent;


    // Storing all the data into an object
    const obj = {
        name: signUpname,
        email: SignUpEmail,
        password: SignUpPassword,
        confirmPassword: SignUpConPassword,
        SignUpTime: time,
        UserAgent: agent

    }


    //Sign up Form validation
    if ((signUpname && SignUpEmail && SignUpPassword && SignUpConPassword) != "") {


        // getting all the data keys from local storage and store it into a variable
        // "for of" loop treverse all the keys and if email is unique than data will be stored is L.S.
        const keys = Object.keys(localStorage);
        for (let key of keys) {
            // debugger;

            if (SignUpEmail === key) {
                validate = false;
                mailExist.style.display = "block";
            } else {
                mailExist.style.display = "none";
            }
        }
        if (validate) {

            if (((SignUpPassword.length >= 8) && (SignUpConPassword.length >= 8))) {

                if ((SignUpPassword === SignUpConPassword)) {


                    localStorage.setItem(obj.email, JSON.stringify(obj));
                    displayNone();
                    // alert("Congrats Yours account is successfully created");
                    accountCreated.style.display = "Block";

                    // reload();
                } else {
                    // alert("password does not match");
                    // SignUpPassword.style.border = "2px solid red";
                    pasmatch.style.display = "block";
                    pasmatch1.style.display = "block";
                }

            } else {

                paslength.style.display = "block";
                paslength1.style.display = "block";
            }

        }
    } else {
        alert("Kindly Fill the information Correctly");
    }

})

function displayNone() {
    pasmatch.style.display = "none";
    pasmatch1.style.display = "none";
    paslength.style.display = "none";
    paslength1.style.display = "none";
}