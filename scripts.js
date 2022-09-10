// script for dsplaying anchor tags when token is true
let navItem = document.querySelector('#navSession');

let userToken = localStorage.getItem("token");
console.log(userToken);

if(!userToken) {
    navItem.innerHTML = 
    `
        <a class="tag" href="">Home</a>
        <a class="tag" href="./pages/shop.html">Shop</a>
        <a class="tag" href="./pages/sign-up.html">Sign-Up</a>
        <a class="tag" href="./pages/login.html">Log-In</a>
    `
} else {
    navItem.innerHTML = 
    `
        <a class="tag" href="">Home</a>
        <a class="tag" href="./pages/shop.html">Shop</a>
        <a class="tag" href="./pages/logout.html">Log-Out</a>
    `
}

let orderNow = document.querySelectorAll('#more')
// console.log(orderNow)
let divOrderNow = document.querySelectorAll('#divOrderNow')
// console.log(divOrderNow)

let isAdmin = localStorage.getItem('isAdmin');

// console.log(isAdmin)

for(i=0; i < divOrderNow.length; i++) {

    if (isAdmin == 'false' || !isAdmin) {
        // console.log(divOrderNow.length)
        divOrderNow[i].innerHTML = 
        `
            <a id="more"> Order Now!</a>
        `

        let orderNowBtn = document.querySelectorAll('#more');
            let selectedBtn = orderNowBtn[i];
            selectedBtn.addEventListener('click', () => {
                alert('We are currently out of stock due to pandemic.')
            })
    } 
    else {
        divOrderNow.remove();
    }

}


// console.log(orderNow)

// for(i=0; i < orderNow.length; i++) {
//     let selectedOrderNow = orderNow[i];
//     selectedOrderNow.addEventListener('click', () => {
//         console.log(selectedOrderNow.length)
        
//     })
// }




// simple animations

let one = document.querySelector('.one');
let two = document.querySelector('.two');
let three = document.querySelector('.three');

let imgOne = document.querySelector('.img-1');
let imgTwo = document.querySelector('.img-2');
let imgThree = document.querySelector('.img-3');


one.addEventListener("click", function(){
    // console.log('Clicked');
    imgOne.classList.add('active');
    imgTwo.classList.remove('active');
    imgThree.classList.remove('active');
//label
    one.classList.add('active');
    two.classList.remove('active');
    three.classList.remove('active');
});

two.addEventListener('click', () => {
    // console.log('Clicked');
    imgOne.classList.add('active');
    imgTwo.classList.add('active');
    imgThree.classList.remove('active');
//label
    two.classList.add('active');
    one.classList.remove('active');
    three.classList.remove('active');
})

three.addEventListener("click", () => {
    imgOne.classList.add('active');
    imgTwo.classList.add('active');
    imgThree.classList.add('active');
//label
    three.classList.add('active');
    one.classList.remove('active');
    two.classList.remove('active');
})



//model-s
let MS_one = document.querySelector('.model-s_one');
let MS_two = document.querySelector('.model-s_two');
let MS_three = document.querySelector('.model-s_three');

let MS_imgOne = document.querySelector('.model-s_img-1');
let MS_imgTwo = document.querySelector('.model-s_img-2');
let MS_imgThree = document.querySelector('.model-s_img-3');

MS_one.addEventListener("click", function(){
    // console.log('Clicked');
    MS_imgOne.classList.add('active');
    MS_imgTwo.classList.remove('active');
    MS_imgThree.classList.remove('active');
//label
    MS_one.classList.add('active');
    MS_two.classList.remove('active');
    MS_three.classList.remove('active');
});

MS_two.addEventListener('click', () => {
    // console.log('Clicked');
    MS_imgOne.classList.add('active');
    MS_imgTwo.classList.add('active');
    MS_imgThree.classList.remove('active');
//label
    MS_two.classList.add('active');
    MS_one.classList.remove('active');
    MS_three.classList.remove('active');
})

MS_three.addEventListener("click", () => {
    MS_imgOne.classList.add('active');
    MS_imgTwo.classList.add('active');
    MS_imgThree.classList.add('active');
//label
    MS_three.classList.add('active');
    MS_one.classList.remove('active');
    MS_two.classList.remove('active');
})


//model-x
let MX_one = document.querySelector('.model-x_one');
let MX_two = document.querySelector('.model-x_two');
let MX_three = document.querySelector('.model-x_three');

let MX_imgOne = document.querySelector('.model-x_img-1');
let MX_imgTwo = document.querySelector('.model-x_img-2');
let MX_imgThree = document.querySelector('.model-x_img-3');

MX_one.addEventListener("click", function(){
    // console.log('Clicked');
    MX_imgOne.classList.add('active');
    MX_imgTwo.classList.remove('active');
    MX_imgThree.classList.remove('active');
//label
    MX_one.classList.add('active');
    MX_two.classList.remove('active');
    MX_three.classList.remove('active');
});

MX_two.addEventListener('click', () => {
    // console.log('Clicked');
    MX_imgOne.classList.add('active');
    MX_imgTwo.classList.add('active');
    MX_imgThree.classList.remove('active');
//label
    MX_two.classList.add('active');
    MX_one.classList.remove('active');
    MX_three.classList.remove('active');
})

MX_three.addEventListener("click", () => {
    MX_imgOne.classList.add('active');
    MX_imgTwo.classList.add('active');
    MX_imgThree.classList.add('active');
//label
    MX_three.classList.add('active');
    MX_one.classList.remove('active');
    MX_two.classList.remove('active');
})


//model-y
let MY_one = document.querySelector('.model-y_one');
let MY_two = document.querySelector('.model-y_two');
let MY_three = document.querySelector('.model-y_three');

let MY_imgOne = document.querySelector('.model-y_img-1');
let MY_imgTwo = document.querySelector('.model-y_img-2');
let MY_imgThree = document.querySelector('.model-y_img-3');

MY_one.addEventListener("click", function(){
    // console.log('Clicked');
    MY_imgOne.classList.add('active');
    MY_imgTwo.classList.remove('active');
    MY_imgThree.classList.remove('active');
//label
    MY_one.classList.add('active');
    MY_two.classList.remove('active');
    MY_three.classList.remove('active');
});

MY_two.addEventListener('click', () => {
    // console.log('Clicked');
    MY_imgOne.classList.add('active');
    MY_imgTwo.classList.add('active');
    MY_imgThree.classList.remove('active');
//label
    MY_two.classList.add('active');
    MY_one.classList.remove('active');
    MY_three.classList.remove('active');
})

MY_three.addEventListener("click", () => {
    MY_imgOne.classList.add('active');
    MY_imgTwo.classList.add('active');
    MY_imgThree.classList.add('active');
//label
    MY_three.classList.add('active');
    MY_one.classList.remove('active');
    MY_two.classList.remove('active');
})

//sticky
const navs = document.querySelector('.navs');
const tags = document.querySelectorAll('.tag');

window.addEventListener('scroll', () => {

    navs.classList.toggle('sticky', window.scrollY > 0)

    for (i = 0; i < tags.length; i++) {
        tags[i].classList.toggle('active', window.scrollY > 0);
        
    }
    
})