let navItem = document.querySelector('#navSession');

let userToken = localStorage.getItem("token");
// console.log(userToken);
let userId = localStorage.getItem("id")
// console.log(userId);
let isAdmin = localStorage.getItem('isAdmin');
// console.log(isAdmin)

let tableDiv = document.querySelector('.tableDiv');

if(!userToken) {
    navItem.innerHTML = 
    `
        <a class="tag" href="../index.html">Home</a>
        <a class="tag" href="./shop.html">Shop</a>
        <a class="tag" href="./sign-up.html">Sign-Up</a>
        <a class="tag" href="./login.html">Log-In</a>
    `
    // let handleMessage = document.querySelector('.message');
    const handleMessage = document.createElement('div');
    handleMessage.className = 'message'
    handleMessage.innerHTML = '<h1 class="messageHandler">Nothing to show here. Please Login first.</h1>'
    tableDiv.remove();
    document.body.appendChild(handleMessage)

} else {
    navItem.innerHTML = 
    `
        <a class="tag" href="../index.html">Home</a>
        <a class="tag" href="./shop.html">Shop</a>
        <a class="tag" href="./logout.html">Log-Out</a>
    `
}

let theTable = document.querySelector('#tableDatas')
// console.log(theTable)

tableDiv.appendChild(theTable)

let tBody = document.querySelector('#tBody')
// console.log(tableBody)
theTable.appendChild(tBody);
// console.log(theTable)

let userCartData = [];

const loadViewCart = async () => {
    try {
        const res = await fetch('https://mockuptesla.herokuapp.com/cart/cart-details', {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        const datas = await res.json();
        console.log(datas)

        // save cartId to localStorage
        // console.log(datas.findCartFromVerifiedUserId[0]._id)
        let cartId = datas.findCartFromVerifiedUserId[0]._id;
        localStorage.setItem('cartId', cartId);
        console.log(localStorage)


        userCartData = await datas.findCartFromVerifiedUserId[0].products
        // console.log(userCartData)
        await displayOrdersData(userCartData)
        await displayCheckoutButton(userCartData)
    } catch (err) {
        console.error(err)
    }
}

const displayOrdersData = async (datas) => {
    // console.log(datas)
    const htmlString = datas.map(data => {
        if(data < 1) {
            alert(`You don't have orders yet`)
        } else {
            // console.log(data)
            if(isAdmin == 'false' || !isAdmin) {
                return (
                    `  
                        <tr class="table-row">
                            <td id="remove-data-td">
                            <span id="remove-product-data" accessKey="${data._id}">
                            &#10006</span>
                            </td>
                            <td>
                                <img id="productImage" src="../../mock-up_tesla_server./${data.productId.productImage}">
                            </td>
                            <td>${data.productId.name}</td>
                            <td id="productPrice">${data.productId.price}</td>
                        </tr>
                    `
                )
            }
        }        
    }).join("")
    // console.log(htmlString)
    tBody.innerHTML = htmlString

    
    //loop datas to get each quantity details
    // console.log(datas)
    for(let i=0; i < datas.length; i++) {
        // console.log(datas[i].quantity)
        let quantity = datas[i].quantity


        // create td for quantity
        let dataQuantity = document.createElement('td')
        dataQuantity.className = "data-quantity"
        // create input for quantity
        let inputQuantity = document.createElement('input')
        inputQuantity.className = "inputQuantity"
        inputQuantity.min = "1"
        inputQuantity.max = "99"
        inputQuantity.type = "number"
        inputQuantity.value = quantity
        inputQuantity.accessKey = datas[i]._id
        // inputQuantity.append(quantity)

        let quantityData = inputQuantity.value
        // console.log(quantityData)
        // console.log(inputQuantity.innerText)
        dataQuantity.append(inputQuantity)
        // console.log(dataQuantity)

        //get td price in dom
        let productPrice = document.querySelectorAll('#productPrice')
        // console.log(productPrice[i].innerText)
        let prices = productPrice[i].innerText
        // console.log(prices)

        //create td for total amount
        let dataTotalAmount = document.createElement('td')
        dataTotalAmount.className = "data-total-amount"
        // console.log(dataTotalAmount)

        //get table-row in dom
        let tableRow = document.querySelectorAll('.table-row')
        // console.log(tableRow[i])
        // append the quantity datas to table rows

        // the quantity
        tableRow[i].appendChild(dataQuantity)


        let totalAmountData = quantityData * prices
        dataTotalAmount.innerHTML = totalAmountData
        tableRow[i].appendChild(dataTotalAmount)


        //

        

        // update value onChange
        let quantityValue = document.querySelectorAll('.inputQuantity')
        // console.log(quantityValue[i].value)
        quantityValue[i].addEventListener('change', async () => {
            // console.log('changed')
            // console.log(quantityValue[i].accessKey)

            const res = await fetch('https://mockuptesla.herokuapp.com/cart/update-quantity', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    cartProductId: quantityValue[i].accessKey,
                    quantity: quantityValue[i].value
                })
            })
            const data = await res.json();
            console.log(data)
        
            totalAmountData = quantityValue[i].value * prices

            dataTotalAmount.innerHTML = totalAmountData
        })
        tableRow[i].appendChild(dataTotalAmount)



        // remove product route
        let remove = document.querySelectorAll('#remove-product-data');
        let addedProductId = remove[i].accessKey
        
        // console.log(remove[i])
        remove[i].addEventListener('click', async () => {
            console.log(addedProductId)
            const res = await fetch('https://mockuptesla.herokuapp.com/cart/remove-product', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    addedProductId: addedProductId
                })
            })
            const data = res.json();
            // console.log(data)
            alert('Product has been removed')
            location.reload();
        })
    }
}


loadViewCart();

const displayCheckoutButton = (datas) => {
    // console.log(datas.length)
    const checkOutButtonDiv = document.createElement('div');
    checkOutButtonDiv.className = "checkOutButtonDiv"
    const checkOutButton = document.createElement('button');
    checkOutButton.className = "checkOutButton"
    checkOutButton.innerHTML = "Checkout"
    checkOutButtonDiv.appendChild(checkOutButton)
    // console.log(checkOutButtonDiv)
    tableDiv.appendChild(checkOutButtonDiv)
    
    if(datas.length === 0) {
        checkOutButton.disabled = true
    } else {
        checkOutButton.disabled = false

    // insert the checkout route here
        let checkoutBtn = document.querySelector('.checkOutButton');
        // console.log(checkoutBtn)
        let cartId = localStorage.getItem('cartId')
        console.log(userId)
        console.log(cartId)
        console.log(userToken)

        checkoutBtn.addEventListener('click', async () => {
            console.log(cartId)
            const res = await fetch('https://mockuptesla.herokuapp.com/order/checkout', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userId: userId,
                    cartId: cartId
                })
            })
            const data = await res.json();
            console.log(data)
            alert('Successfully checkout.')
            window.location.replace('./orders.html');
        })
    //
        
    }

}


// the next thing you'll do is finish creating the myOrders page. That page will display all checkout orders. The profile page will not incllude anymore and the total amount as well.

// this project will not include the ordering of vehicles and payment method. Those mentioned above needs to have address and other personal information which needed to have another system for payment and shipping method.
// this project is only for showcasing the skills of the developer in backend(node, express, simple authentication, database) and frontend(html, css, javascript). Especially the rest-api and CRUD which is one of the main objectives of the developer.
// the lack on this project might include in future projects to showcase further the improvements of the developer