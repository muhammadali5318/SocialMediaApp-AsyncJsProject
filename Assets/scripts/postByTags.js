'use strict'

console.log("Running index.js");

var ApiKey = "61836eb8186ebc024cedc6a9";
// const friendsList = document.querySelector(".friendsList");
// const middle = document.querySelector(".middle");
const tags = document.querySelector(".tags");



// ***********************fetching user data *******************************

const apiResponse = fetch('https://dummyapi.io/data/v1/tag?limit=10', {
    method: 'GET',
    headers: {
        'app-id': ApiKey,
    }
})

apiResponse.then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(data);
    const userData = data.data;
    console.log(userData);

    renderTags(userData);
})




// ********************* This function will render user in left side bar *********************
function renderTags(arr) {
    arr.forEach(element => {

        // console.log(arr);
        tags.insertAdjacentHTML("beforeend",
            `
            <h4><span  onclick="FetchTagData('${element}')"   class="badge bg-secondary">${element}</span></h4>
        `)

    });



}



// ********************* This function will fetch user data from api *********************
function FetchTagData(TagName) {
    // debugger;
    let Trimed = TagName.trim();
    console.log(Trimed);
    // TagName = 

    const apiResponse1 = fetch(`https://dummyapi.io/data/v1/tag/${Trimed}/post?limit=10`, {
        method: 'GET',
        headers: {
            'app-id': ApiKey,
        }
    })
    apiResponse1.then(function(response) {
        // console.log(response);
        return response.json();
    }).then(function(data) {

        // console.log("id data");
        // console.log(data);
        const userData = data.data;
        // renderUserPostsLoop(userData)
        console.log(userData);
        renderTagPosts(userData);
        // console.log();
    })


}



// ********************* This function will render user data in main contnaier *********************
function renderTagPosts(arr) {

    console.log(arr);

    arr.forEach(function(element) {


        // console.log(element);

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

                <p>
                    <a href="#">muhammad.ali </a> Lorem ipsum dolor sit amet.
                </p>

            </section>

        </section>

        `

        )

    });

}   