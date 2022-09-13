let userToken = localStorage.getItem("token");
// console.log(userToken);

// burger animation
const menuBtn = document.querySelector('.nav');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});

// drop-down animation
let menuNav = document.querySelector('#menu-nav');
menuBtn.addEventListener('click', () => {
    menuNav.classList.toggle('open');
})

// cart animation toggle
const shopContainer = document.querySelector('.shop-container');
const cartContainer = document.querySelector('.cart-container');

const cartButton = document.querySelector('#cart-button');

// console.log(cartCount)

// cart-products count
let userCartData = [];

const loadViewCart = async () => {
    try {
        const res = await fetch('https://mockuptesla.herokuapp.com/cart/cart-details', {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        const datas = await res.json();
        // console.log(datas)
        userCartData = await datas.findCartFromVerifiedUserId[0].products
        // console.log(userCartData)
        await displayCartCount(userCartData)
    } catch (err) {
        console.error(err)
    }
}

const displayCartCount = (datas) => {
    document.querySelector('.count').value = datas.length
}

loadViewCart();


// const cartSvg = document.querySelector('.cart-svg');
// const column = document.querySelector('.column');

// cartSvg.addEventListener("click", () => {
//     shopContainer.classList.toggle('active');
//     cartContainer.classList.toggle('active');
//     cartButton.classList.toggle('active');
//     column.classList.toggle('active');

// })

// categories sliders animation toggle
let one = document.querySelector('.one');
let two = document.querySelector('.two');
let three = document.querySelector('.three');

let chargingCategory = document.querySelector('.charging-category');
let vehicle_accessoriesCategory = document.querySelector('.vehicle_accessories-category');
let apparelCategory = document.querySelector('.apparel-category');


if(!userToken) {
    menuNav.innerHTML = 
    `
    <li><a href="../index.html">Home</a></li>
    <li><a href="./login.html">Log-In</a></li>
    <li><a href="./sign-up.html">Sign-Up</a></li>
    `
} else {
    menuNav.innerHTML = 
    `
        <li><a href="../index.html">Home</a></li>
        <li><a href="./logout.html">Log-Out</a></li>
        <li><a href="./orders.html">My Orders</a></li>
    `
    menuNav.style.height = "100px";
}


one.addEventListener('click', () => {
    console.log('CLicked!');
    chargingCategory.classList.add('active');
    vehicle_accessoriesCategory.classList.remove('active');
    apparelCategory.classList.remove('active');
    //label
    one.classList.add('active');
    two.classList.remove('active');
    three.classList.remove('active');
})
two.addEventListener('click', () => {
    console.log('CLicked!');
    vehicle_accessoriesCategory.classList.add('active');
    // chargingCategory.classList.remove('active');
    apparelCategory.classList.remove('active');

    chargingCategory.classList.remove('active');

    //label
    two.classList.add('active');
    one.classList.remove('active');
    three.classList.remove('active');
})
three.addEventListener('click', () => {
    console.log('CLicked!');
    apparelCategory.classList.add('active');

    chargingCategory.classList.remove('active');
    vehicle_accessoriesCategory.classList.remove('active');

    //label
    three.classList.add('active');
    one.classList.remove('active');
    two.classList.remove('active');
})


// shop structure

let chargingContainer = document.querySelector('#charging-container');
let vehicleAccessoriesContainer = document.querySelector('#vehicle_accessories-container')
let apparelContainer = document.querySelector('#apparel-container')

let cartNav = document.querySelector('.cart-nav');
let midNav = document.querySelector('.mid');


let isAdmin = localStorage.getItem('isAdmin');

// cart container



const search = document.querySelector('#search');
const searchIcon = document.querySelector('.magnifyingGlass');

search.addEventListener('focus', () => {
    searchIcon.classList.toggle('active');
})
search.addEventListener('blur', () => {
    searchIcon.classList.toggle('active');
})


// charging
let chargingData = [];


search.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredChargingData = chargingData.filter((data) => {
            return (
                data.name.toLowerCase().includes(searchString)
            );
        // }
    });
    displayChargingData(filteredChargingData);
});

const loadChargingData = async () => {
    try {
        const res = await fetch('https://mockuptesla.herokuapp.com/products')
        const data = await res.json();
        // console.log(data)
        chargingData = await data.products
        // console.log(chargingData)
        await displayChargingData(chargingData);
    } catch (err) {
        console.error(err);
    }
};

// display data

const displayChargingData = (datas) => {
    const htmlString = datas.map(data => {
        if(data.category === "charging") {
            if (data < 1) {
                alert("Out of Stock")
            } else {
                if (isAdmin == 'false' || !isAdmin) {
                    return (
                        `
                            <div class="card">
                                <div class="card-body">
                                    <div class="sample-image">
                                        <img id="image" src="../../mock-up_tesla_server./${data.productImage}">
                                    </div>
                                    <div class="infos">
                                        <div>
                                            <h5 class="card-title">${data.name}</h5>
                                            <h5 class="card-price">$ ${data.price}</h5>
                                        </div>
                                        <div class="view-details">
                                            <a id="viewDetails" href="./product.html?productId=${data._id}">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    )
                } else {
                    return (
                        // console.log(`${data.productImage}`)
                        // console.log(`${data.name}`)
                        `
                            <div class="card">
                                <div class="card-body">
                                    <div class="sample-image">
                                        <img id="image" src="../../mock-up_tesla_server./${data.productImage}">
                                    </div>
                                    <div class="infos">
                                        <div>
                                            <h5 class="card-title">${data.name}</h5>
                                            <h5 class="card-price">$ ${data.price}</h5>
                                        </div>
                                        <div class="deleteButton">
                                            <a id="deleteButton" href="#">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    )
                }
            }
        }
    }).join("")
    chargingContainer.innerHTML = htmlString;
}

loadChargingData();


// vehicle accessories
let vehicleAccessoriesData = [];

search.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredVehicleAccessoriesData = vehicleAccessoriesData.filter((data) => {
            return (
                data.name.toLowerCase().includes(searchString)
            );
        // }
    });
    displayVehicleAccessoriesData(filteredVehicleAccessoriesData);
});

const loadVehicleAccessoriesData = async () => {
    try {
        const res = await fetch('https://mockuptesla.herokuapp.com/products');
        const data = await res.json();
        vehicleAccessoriesData = await data.products
        await displayVehicleAccessoriesData(vehicleAccessoriesData);
    } catch (err) {
        console.error(err);
    }
};


// display data

const displayVehicleAccessoriesData = (datas) => {
    const htmlString = datas.map(data => {
        if(data.category === "vehicle_accessories") {
            if (data < 1) {
                alert("Out of Stock")
            } else {
                if (isAdmin == 'false' || !isAdmin) {
                    return (
                        `
                            <div class="card">
                                <div class="card-body">
                                    <div class="sample-image">
                                        <img id="image" src="../../mock-up_tesla_server./${data.productImage}">
                                    </div>
                                    <div class="infos">
                                        <div>
                                            <h5 class="card-title">${data.name}</h5>
                                            <h5 class="card-price">$ ${data.price}</h5>
                                        </div>
                                        <div class="view-details">
                                            <a id="viewDetails" href="./product.html?productId=${data._id}">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    )
                } else {
                    return (
                        `
                            <div class="card">
                                <div class="card-body">
                                    <div class="sample-image">
                                        <img id="image" src="../../mock-up_tesla_server./${data.productImage}">
                                    </div>
                                    <div class="infos">
                                        <div>
                                            <h5 class="card-title">${data.name}</h5>
                                            <h5 class="card-price">$ ${data.price}</h5>
                                        </div>
                                        <div class="deleteButton">
                                            <a id="deleteButton" href="#">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    )
                }
            }
        }
    }).join("")
    vehicleAccessoriesContainer.innerHTML = htmlString;
}

loadVehicleAccessoriesData();


//apparel
let apparelData = [];

search.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredApparelData = apparelData.filter((data) => {
            return (
                data.name.toLowerCase().includes(searchString)
            );
        // }
    });
    displayApparelData(filteredApparelData);
});

const loadApparelData = async () => {
    try {
        const res = await fetch('https://mockuptesla.herokuapp.com/products');
        const data = await res.json();
        apparelData = await data.products;
        await displayApparelData(apparelData);
    } catch (err) {
        console.error(err);
    }
};


// display data

const displayApparelData = (datas) => {
    const htmlString = datas.map(data => {
        if(data.category === "apparel") {
            if (data < 1) {
                alert("Out of Stock")
            } else {
                if (isAdmin == 'false' || !isAdmin) {
                    return (
                        `
                        <div class="card">
                        <div class="card-body">
                            <div class="sample-image">
                                <img id="image" src="../../mock-up_tesla_server./${data.productImage}">
                            </div>
                            <div class="infos">
                                <div>
                                    <h5 class="card-title">${data.name}</h5>
                                    <h5 class="card-price">$ ${data.price}</h5>
                                </div>
                                <div class="view-details">
                                    <a id="viewDetails" href="./product.html?productId=${data._id}">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                        `
                    )
                } 
                else {
                    return (
                        `
                        <div class="card">
                            <div class="card-body">
                                <div class="sample-image">
                                    <img id="image" src="../../mock-up_tesla_server./${data.productImage}">
                                </div>
                                <div class="infos">
                                    <div>
                                        <h5 class="card-title">${data.name}</h5>
                                        <h5 class="card-price">$ ${data.price}</h5>
                                    </div>
                                    <div class="deleteButton">
                                        <a id="deleteButton" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                    )
                }
            }
        }
    }).join("")
    apparelContainer.innerHTML = htmlString;
}

loadApparelData();