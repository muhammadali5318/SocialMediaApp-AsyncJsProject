'use strict'

console.log("I'm user profile");


/*
Purpose: This file profile.js is responsible to show user data who is logged in.
and user can also update his data from this page
*/



//Getting all the fields of update profile form
let ProfileName = document.querySelector("#ProfileName");
let ProfileEmail = document.querySelector("#ProfileEmail");
let ProfilePassword = document.querySelector("#ProfilePassword");
let ProfileConPassword = document.querySelector("#ProfileConPassword");

//Gatinng the current user who is logged In
const user = localStorage.getItem("currentUser");



// getting all the data keys from local storage and store it into a variable
// "for of" loop treverse all the keys and fetch data against current user variable and render it into the form.

const keys = Object.keys(localStorage);
for (let key of keys) {
    if (key === user) {
        const CurrentUserData = JSON.parse(localStorage.getItem(key));
        ProfileName.setAttribute("value", CurrentUserData.name);
        ProfileEmail.setAttribute("value", CurrentUserData.email);
        ProfilePassword.setAttribute("value", CurrentUserData.password);
        ProfileConPassword.setAttribute("value", CurrentUserData.confirmPassword);
    }
}

//getting all the values that user entered in the into forms.
ProfileName = ProfileName.value;
ProfileEmail = ProfileEmail.value;
ProfilePassword = ProfilePassword.value;
ProfileConPassword = ProfileConPassword.value;




// this variable is responsible for checking emails it is already exists or not
let validate = true;

function UpdateInfo() {


    //Getting all the fields of update profile form
    let ProfileNameUpdate = document.querySelector("#ProfileName");
    let ProfilePasswordUpdate = document.querySelector("#ProfilePassword");
    let ProfileConPasswordUpdate = document.querySelector("#ProfileConPassword");
    let ProfileEmailUpdate = document.querySelector("#ProfileEmail");


    //getting all the values after user updated the value into forms.
    ProfileNameUpdate = ProfileNameUpdate.value;
    ProfileEmailUpdate = ProfileEmailUpdate.value;
    ProfilePasswordUpdate = ProfilePasswordUpdate.value;
    ProfileConPasswordUpdate = ProfileConPasswordUpdate.value;

    //stroing date and user agent into the L.S
    const time = new Date();
    const agent = navigator.userAgent;


    //Storing all the values into the object
    const obj = {
        name: ProfileNameUpdate,
        email: ProfileEmailUpdate,
        password: ProfilePasswordUpdate,
        confirmPassword: ProfileConPasswordUpdate,
        SignUpTime: time,
        UserAgent: agent
    }


    if (true) {


        // getting all the data keys from local storage and store it into a variable
        // "for of loop" treverse all the key and fetch the data againset desired email. and render that specific data on the form
        const keys = Object.keys(localStorage);
        for (let key of keys) {

            if (ProfileEmailUpdate === key) {
                validate = false;
                alert("Email Already Exists");

            }
        }

        if (validate) {

            if ((ProfilePassword === ProfileConPassword)) {

                localStorage.setItem(obj.email, JSON.stringify(obj));
                localStorage.setItem("currentUser", ProfileEmailUpdate);
                localStorage.removeItem(ProfileEmail);
                alert("Your account Information is Updated");
            } else {
                alert("Password Does not match")
            }

        }
    }
}