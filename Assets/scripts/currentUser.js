// ********************Nav bar welcome Name rendering *********************** 


/*
Purpose: This file CurrentUser.js is responsible to Render Current user name into nav bar..
*/



const user1 = localStorage.getItem("currentUser");


const keysOfLS = Object.keys(localStorage);
for (let key of keysOfLS) {
    // console.log(key);
    if (key === user1) {
        const CurrentUserData = JSON.parse(localStorage.getItem(key));
        // console.log(CurrentUserData);

        const welcomeTag = document.querySelector(".WelcomeTag");


        welcomeTag.insertAdjacentHTML("afterbegin", `

                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Welcome ${CurrentUserData.name}
                                            </a>
        `);
    }
}