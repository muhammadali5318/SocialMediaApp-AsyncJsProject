'use strict'

//this file "Index.js" is the main file of the project in which all the main
// data will be fetched from api and render in the main container

console.log("Running index.js");

const logout = document.querySelector(".logout");
logout.addEventListener('click', function() {
    localStorage.setItem("currentUser", "");
    window.location.href = "login.html";
})


const PageRedirect = localStorage.getItem("currentUser");
console.log(PageRedirect);

if (PageRedirect === "") {
    window.location.href = "login.html";
}




var ApiKey = "61836eb8186ebc024cedc6a9";
const friendsList = document.querySelector(".friendsList");
const userPostContainer = document.querySelector(".userPostContainer");
const userListApi = "https://dummyapi.io/data/v1/user?limit=10";
const postCommentsApi = "https://dummyapi.io/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10";


// ***********************fetching user data *******************************

// ******************* This is Immediately Invoked Function It will Render data of first user*********************
(function() {
    const id = "60d0fe4f5311236168a109d3";
    fetchSpecificUserData(id);
})();

// this function is responsible for data fetching from api
const req = fetchApi(userListApi);

// In response list of users will be rendered on left side bar
req.then(function(response) {
    return response.json();
}).then(function(data) {
    const userData = data.data;
    renderUsers(userData);
})




// ********************* This function will render user in left side bar *********************
function renderUsers(arr) {
    let a = 1;
    let profileData = arr;
    // console.log(profileData);
    arr.forEach(element => {

        friendsList.insertAdjacentHTML("afterbegin",
            `
        <div onclick="fetchSpecificUserData('${element.id}')" class="LeftBarFriends mt-4 px-3 py-1 d-flex align-items-center
        justify-content-between"  >
        <div class="d-flex align-items-center gap-4">
        <figure alt="hi" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  class="userModal my-0 group-img-container">
        <img src="${element.picture}" alt="">
        </figure>
        <div class="userPostHead"  >
        <h6 class="mb-0"> ${element.firstName} ${element.lastName}</h4>
        </div>
        </div>
        
        <div>
        <i style="color: #51cf66;" class="fas
        fa-dot-circle"></i>
        </div>
        </div>
         
        `)

    });
}



// ********************* This function will fetch user data from api *********************
function fetchSpecificUserData(id) {

    const ar1 = [];

    // *****************************this api call fetch the user comments*****************
    const req2 = fetchApi(postCommentsApi);

    req2.then(function(response) {
        return response.json();
    }).then(function(data) {

        const userData = data.data;
        let [comment1, comment2] = userData;
        ar1.push(comment1);
        ar1.push(comment2);
    }).catch(function(error) {
        console.log(error);
    })


    // this will render the specific user data on which we click
    setTimeout(() => {
        const req1 = fetch(`https://dummyapi.io/data/v1/user/${id}/post?limit=10`, {
            method: 'GET',
            headers: {
                'app-id': ApiKey,
            }
        })
        req1.then(function(response) {
            return response.json();
        }).then(function(data) {
            const userData = data.data;
            renderUserPosts(userData, ar1);
        })


        fetchUserProfile(id);

    }, 2000);
}





// ********************* This function will render user data in main contnaier *********************
function renderUserPosts(arr, commentArr) {

    // const commentId = 0;
    // const commentId1 = 0;
    arr.forEach(function(element) {


        userPostContainer.insertAdjacentHTML("afterbegin",

            `
            <section class="userPost postNow p-3 my-3">

            <section class="d-flex
                    justify-content-between
                    align-items-center">

                <div class="d-flex justify-content-between
                        align-items-center gap-3">
                    <figure class="my-0 img-container">
                        <img src="${element.owner.picture}" alt="">
                    </figure>
                    <div class="userPostHead">
                        <h4>${element.owner.firstName}</h4>
                        <span class="time">${element.publishDate} <i class="fas
                                    fa-globe-americas"></i> </span>
                    </div>
                </div>
                <div>
                    <a href="#"><i style="color: #333;" class="me-3
                                navIcon fas
                                fa-ellipsis-h"></i></a>
                </div>

            </section>

            <section class="userPostDescription my-3">
                <p>${element.text}
                </p>


            </section>
            <section class="userPostImage">
                <figure>
                    <img src="${element.image}" alt="" class="img-fluid">
                </figure>

            </section>
            <section class="userPostTags p-3 postNow d-flex gap-4
                    flex-wrap">
                <h4><span class="badge bg-secondary">${element.tags[0]}</span></h4>
                <h4><span class="badge bg-secondary">${element.tags[1]}</span></h4>
                <h4><span class="badge bg-secondary">${element.tags[2]}</span></h4>
                
            </section>

            <section class="userPostLikes my-3 px-3 d-flex gap-4
                    align-items-center justify-content-between">
                <div>

                    <a id="likePost"><i class="likePostIcon
                                navIcon far
                                fa-heart"></i></a>
                    <a href="#"><i class="navIcon far fa-comment"></i></a>
                    <a href="#"><i class="navIcon px-1 fas
                                fa-share-alt"></i></a>
                </div>
                <div>
                    <a href="#"><i class="navIcon far fa-bookmark"></i></a>
                </div>

            </section>

            <section class="userPostLikes d-flex gap-4
                    align-items-center">

                <div class="delivered-imgs">
                    <img src="Assets/Images/20170108_200725.jpg" alt="Customer photo" />
                    <img src="Assets/Images/20170108_200725.jpg" alt="Customer photo" />
                    <img src="Assets/Images/20170108_200725.jpg" alt="Customer photo" />

                </div>
                <p class="my-0">liked by <span>${element.likes}</span> People</p>
            </section>


            <section class="userPostComment px-2 my-3">

                          <div class=" d-flex align-items-center gap-3
                            postNowHead">
                        <figure  class="commentContainer my-0 img-container">
                            <img src="${commentArr[0].owner.picture}" alt="">
                        </figure>
                        <div d-flex flex-column  >
                        <label for="commentLabel">${commentArr[0].owner.firstName}</label>
                        <div>
                        <input class="commentInput" type="text" value="${commentArr[0].message}" id="commentLabel" >
                        <i onclick="deleteComment()" class="ms-1 deleteIcon fas fa-trash"></i>
                        </div>
                        </div>
                        </div>  

                        <div class="d-flex align-items-center mt-2 gap-3
                        postNowHead">
                        <figure class="my-0 img-container">
                        <img src="${commentArr[1].owner.picture}" alt="">
                        </figure>
                        <div d-flex flex-column  >
                        <label for="commentLabel">${commentArr[1].owner.firstName}</label>
                        
                        <div>
                        <input class="commentInput" type="text" value="${commentArr[1].message}" id="commentLabel" >
                        <i onclick="deleteComment()" class="ms-1 deleteIcon fas fa-trash"></i>
                        
                        </div>
                        </div>
                         </div>                
               
            </section>

        </section>

        `

        )

    });

}

function deleteComment() {
    const commentContainer = document.querySelectorAll(".commentContainer");
    console.log(commentContainer);
    commentContainer.forEach(element => {

        element.style.display = "none";
    });
}


// this fuction will fetch user profile from api to display in modal
function fetchUserProfile(id) {
    const req1 = fetch(`https://dummyapi.io/data/v1/user/${id}`, {
        method: 'GET',
        headers: {
            'app-id': ApiKey,
        }
    })
    req1.then(function(response) {
        return response.json();
    }).then(function(data) {
        setUserProfileAttributes(data);
    })

}

// this funtion will set user profile data in  modal
function setUserProfileAttributes(object) {
    const profilePicture = document.querySelector(".profilePicture");
    const profileName = document.querySelector(".profileName");
    const profileGender = document.querySelector("#profileGender");
    const profileDOB = document.querySelector("#profileDOB");
    const profileRegisterDate = document.querySelector("#profileRegisterDate");
    const profileEmail = document.querySelector("#profileEmail");
    const profilePhone = document.querySelector("#profilePhone");
    const profileState = document.querySelector("#profileState");
    const profileStreet = document.querySelector("#profileStreet");
    const profileCity = document.querySelector("#profileCity");
    const profileCountry = document.querySelector("#profileCountry");
    const profileTimezone = document.querySelector("#profileTimezone");

    profilePicture.setAttribute("src", object.picture);
    profileName.innerHTML = `${object.firstName} ${object.lastName} `;
    profileGender.setAttribute("value", object.gender);
    profileDOB.setAttribute("value", object.dateOfBirth);
    profileRegisterDate.setAttribute("value", object.registerDate);
    profileEmail.setAttribute("value", object.email);
    profilePhone.setAttribute("value", object.phone);
    profileState.setAttribute("value", object.location.state);
    profileStreet.setAttribute("value", object.location.street);
    profileCity.setAttribute("value", object.location.city);
    profileCountry.setAttribute("value", object.location.country);
    profileTimezone.setAttribute("value", object.location.timezone);

}


// function for fectching api
function fetchApi(ApiURL) {

    const req = fetch(ApiURL, {
        method: 'GET',
        headers: {
            'app-id': ApiKey,
        }
    })
    return req;
}



// *************this function will load posts after reaching at the end of the page********************
window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if ((scrollTop + clientHeight) >= scrollHeight) {

        const req = fetchApi("https://dummyapi.io/data/v1/post?limit=10");
        req.then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            const userData = data.data;
            userData.forEach(function(element) {
                const htmlData = `
<section class="userPost postNow p-3 my-3">

<section class="d-flex
        justify-content-between
        align-items-center">

    <div class="d-flex justify-content-between
            align-items-center gap-3">
        <figure class="my-0 img-container">
            <img src="${element.owner.picture}" alt="">
        </figure>
        <div class="userPostHead">
            <h4>${element.owner.firstName}</h4>
            <span class="time">${element.publishDate} <i class="fas
                        fa-globe-americas"></i> </span>
        </div>
    </div>
    <div>
        <a href="#"><i style="color: #333;" class="me-3
                    navIcon fas
                    fa-ellipsis-h"></i></a>
    </div>

</section>

<section class="userPostDescription my-3">
    <p>${element.text}
    </p>


</section>
<section class="userPostImage">
    <figure>
        <img src="${element.image}" alt="" class="img-fluid">
    </figure>

</section>
<section class="userPostTags p-3 postNow d-flex gap-4
        flex-wrap">
    <h4><span class="badge bg-secondary">${element.tags[0]}</span></h4>
    <h4><span class="badge bg-secondary">${element.tags[1]}</span></h4>
    <h4><span class="badge bg-secondary">${element.tags[2]}</span></h4>
    
</section>

<section class="userPostLikes my-3 px-3 d-flex gap-4
        align-items-center justify-content-between">
    <div>

        <a id="likePost"><i class="likePostIcon
                    navIcon far
                    fa-heart"></i></a>
        <a href="#"><i class="navIcon far fa-comment"></i></a>
        <a href="#"><i class="navIcon px-1 fas
                    fa-share-alt"></i></a>
    </div>
    <div>
        <a href="#"><i class="navIcon far fa-bookmark"></i></a>
    </div>

</section>

<section class="userPostLikes d-flex gap-4
        align-items-center">

    <div class="delivered-imgs">
        <img src="Assets/Images/20170108_200725.jpg" alt="Customer photo" />
        <img src="Assets/Images/20170108_200725.jpg" alt="Customer photo" />
        <img src="Assets/Images/20170108_200725.jpg" alt="Customer photo" />

    </div>
    <p class="my-0">liked by <span>${element.likes}</span> People</p>
</section>




</section>

`;

                userPostContainer.insertAdjacentHTML("beforeend",

                    htmlData
                )

            });


        })
    }

})


// ************************load posts end********************