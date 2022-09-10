let navItem = document.querySelector('#navSession');

let params = new URLSearchParams(window.location.search)

let productId = params.get('productId')
console.log(productId)

let userToken = localStorage.getItem("token");
console.log(userToken);
let userId = localStorage.getItem("id")

if(!userToken) {
    navItem.innerHTML = 
    `
        <a class="tag" href="../index.html">Home</a>
        <a class="tag" href="./shop.html">Shop</a>
        <a class="tag" href="./sign-up.html">Sign-Up</a>
        <a class="tag" href="./login.html">Log-In</a>
    `
} else {
    navItem.innerHTML = 
    `
        <a class="tag" href="../index.html">Home</a>
        <a class="tag" href="./shop.html">Shop</a>
        <a class="tag" href="./logout.html">Log-Out</a>
    `
}

let pName = document.querySelector("#productName")
let pDesc = document.querySelector("#productDesc")
let pPrice = document.querySelector("#productPrice")
let order = document.querySelector("#orderContainer")
let quantity = document.querySelector('#quantity')
let pImage = document.querySelector("#image");


fetch(`http://localhost:3000/products/${productId}`).then(res => res.json()).then(data => {
    console.log(data)

    // console.log(data.product.productImage)

    pImage.appendChild(document.createElement('img')).src = '../../backend./' + data.product.productImage
    pName.innerHTML = data.product.name
	pDesc.innerHTML = data.product.description
	pPrice.innerHTML = data.product.price
	order.innerHTML = `<input type="submit" id="orderButton" value="add to cart"></input>`
    quantity.innerHTML = '<input type="number" id="qty" name="quantity" min="1" value="1">'

    let qty = document.querySelector('#qty')
    qty.addEventListener('change', () => {
        // console.log(qty.value)
    })
    
    let addToCart = document.querySelector("#form-container");

    addToCart.addEventListener('submit', (e) => {
        e.preventDefault();

    // check if it is already in the cart. If it is already in the cart just add quantity
        fetch('http://localhost:3000/cart/cart-details', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)

            if(data.findCartFromVerifiedUserId[0].products.length === 0) {
                fetch('http://localhost:3000/cart/add-to-cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: JSON.stringify({
                        productId: productId,
                        quantity: qty.value
                    })
                }).then(res => {
                    return res.json();
                }).then(data => {
                    // console.log(data)
                    if(data.message === 'Successfully added to cart') {
                        alert('Successfully added to cart')
                    } else {
                        alert('add to cart unsuccessfull.')
                    }
                })
            } else {
                console.log('carts has products')
                console.log(productId)
                fetch('http://localhost:3000/cart/cart-product-exists', {
                    method: "POST",
                    headers: {
                        'Content-Type':
                        'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                    body: JSON.stringify({
                        productId: productId
                    })
                }).then(res => {
                    return res.json();
                }).then(messageData => {
                    console.log(messageData.message)
                    if(messageData.message === "There are no Product with that Id inside the cart.") {
                        fetch('http://localhost:3000/cart/add-to-cart', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${userToken}`
                            },
                            body: JSON.stringify({
                                productId: productId,
                                quantity: qty.value
                            })
                        }).then(res => {
                            return res.json();
                        }).then(dataMessage => {
                            // console.log(dataMessage)
                            if(dataMessage.message === 'Successfully added to cart') {
                                alert('Successfully added to cart')
                            } else {
                                alert('add to cart unsuccessfull.')
                            }
                        })
                    } else if(messageData.message === "Product already exists") {
                        // console.log(data)
                        let products = data.findCartFromVerifiedUserId[0].products
                        // console.log(products)

                        for(i=0;i < products.length; i++) {

                            // cartProductId 
                            if(productId === products[i].productId._id) {
                                let cartProductId = products[i]._id
                                // console.log('cartProductId: ' + cartProductId)
                                let productQuantity = products[i].quantity
                                // console.log('productQuantity: ' + productQuantity)
                                let totalQuantity = Number(productQuantity) + Number(qty.value)
                                // console.log('quantity: ' + qty.value)
                                // console.log('totalQuantity: ' + totalQuantity)

                                fetch('http://localhost:3000/cart/update-quantity', {
                                    method: "PATCH",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${userToken}`
                                    },
                                    body: JSON.stringify({
                                        cartProductId: cartProductId,
                                        quantity: totalQuantity
                                    })
                                }).then(res => {
                                    return res.json();
                                }).then(data => {
                                    // console.log(data)
                                    alert('Successfully added the quantity')
                                })
                            }
                        }
                    }
                })
            }
        })
    })
})