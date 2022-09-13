let navItem = document.querySelector('#navSession');

let userToken = localStorage.getItem("token");
// console.log(userToken);
let userId = localStorage.getItem("id")

if(!userToken) {
    navItem.innerHTML = 
    `
        <a class="tag" href="../index.html">Home</a>
        <a class="tag" href="./pages/shop.html">Shop</a>
        <a class="tag" href="./pages/sign-up.html">Sign-Up</a>
        <a class="tag" href="./pages/login.html">Log-In</a>
    `
} else {
    navItem.innerHTML = 
    `
        <a class="tag" href="../index.html">Home</a>
        <a class="tag" href="./shop.html">Shop</a>
        <a class="tag" href="./logout.html">Log-Out</a>
    `
}

let userOrderData = []

const getOrders = async () => {
    try {
        const res = await fetch('https://mockuptesla.herokuapp.com/user/details', {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        const data = await res.json();
        console.log(data.user.orders)
        userOrderData = await data.user.orders
        await displayOrders(userOrderData)
        await displayTotalAmount(userOrderData)
    } catch(err) {
        console.error(err)
    }
}
getOrders();


const displayOrders = async (orders) => {
    // console.log(orders.length)

    if(orders.length < 1) {
        alert('You have no orders')
    } else {
        // get .orderTableBodies from DOM
        const orderTable = document.querySelector('.orderTableBodies')

        for(let i = 0 ; i < orders.length ; i++) {
            let order = orders[i]
            // console.log(order)

            // here: create tableDatas for 1st order
            let tableDatas = document.createElement('table')
            tableDatas.id = 'tableDatas'
            // append tableDatas to orderTable
            orderTable.appendChild(tableDatas)

            // get the tableDatas from DOM
            let tableDatasFromDom = document.querySelectorAll('#tableDatas')
            // console.log(tableDatasFromDom[i])

            // create h3 for the orderId
            let orderId = document.createElement('h3')
            orderId.className = "ordId"
            // append orderId to tableDatas
            tableDatas.appendChild(orderId)
            // append order._id to the orderId header
            orderId.append('orderId: ' + order._id)
            // create thead for the table Header
            let thead = document.createElement('thead')
            thead.id = "tHead"
            //create tr for the thead
            let tRow = document.createElement('tr')
            //create th for the tr
            // create th for Image
            let tHeaderImage = document.createElement('th')
            tHeaderImage.innerHTML = "Image"
            // create th for Name
            let tHeaderName = document.createElement('th')
            tHeaderName.innerHTML = "Name"
            // create th for Price
            let tHeaderPrice = document.createElement('th')
            tHeaderPrice.innerHTML = "Price"
            // create th for Quantity
            let tHeaderQuantity = document.createElement('th')
            tHeaderQuantity.innerHTML = "Quantity"
            // create th for totalAmount
            let tHeaderTotalAmount = document.createElement('th')
            tHeaderTotalAmount.innerHTML = "Total Amount"
            // append th to tr and tr to thead and thead to tableDatas
            thead.append(tRow)
            tRow.append(tHeaderImage, tHeaderName, tHeaderPrice, tHeaderQuantity, tHeaderTotalAmount)
            tableDatas.appendChild(thead)

            // create tbody for the cart details
            let tableBody = document.createElement('tbody')
            tableBody.id = "tBody"
            tableDatas.appendChild(tableBody)
            
            for(let j = 0; j < order.cart.products.length; j++){
                // console.log(j)
                let product = order.cart.products[j]
                // console.log(product)
                // continue tomorrow
                // you're on the creation of td which is for the product details, which is the td inside the tr and the tr inside the tableBody
                // create tr
                let TBodTRow = document.createElement('tr');
                TBodTRow.className = 'table-row'
                // create td for img
                let TBodTData = document.createElement('td')
                let tDataImage = document.createElement('img')
                tDataImage.id = "productImage"
                tDataImage.src = `../${product.productId.productImage}`
                // append img to td
                TBodTData.append(tDataImage)
                // append td to tr
                TBodTRow.appendChild(TBodTData)
                tableBody.appendChild(TBodTRow)

                // create td for name
                let TBodTRowName = document.createElement('td')
                // insert the data to td name
                TBodTRowName.innerHTML = product.productId.name
                // create td for price
                let TBodTRowPrice = document.createElement('td')
                // insert the data to td price
                TBodTRowPrice.innerHTML = product.productId.price
                // create td for quantity
                let TBodTRowQty = document.createElement('td')
                // insert the data to td qty
                TBodTRowQty.innerHTML = product.quantity
                // create td for total amount
                let TBodTRowTAmount = document. createElement('td')
                // insert the data to td total amount
                TBodTRowTAmount.innerHTML = Number(product.quantity) * Number(product.productId.price)
                // append to tr
                TBodTRow.append(TBodTRowName, TBodTRowPrice, TBodTRowQty, TBodTRowTAmount, TBodTRowTAmount)
            }   
        }
    }
}

const displayTotalAmount = (datas) => {

    


    // console.log(datas)
    for(let i=0 ; i<datas.length; i++) {
        let order = datas[i]
        // console.log(order)
        let TableRow = document.createElement('tr')
        let td3ColSpan = document.createElement('td')
        td3ColSpan.style.width = "60%"
        let TDTotalAmount = document.createElement('td')
        TDTotalAmount.style.width = "20%"
        TDTotalAmount.style.fontWeight = "bold"
        let TDTALabel = document.createElement('td')
        TDTALabel.style.width = "20%";
        TDTALabel.style.fontWeight = "bold"
        TDTALabel.style.padding = "0px .5rem 0px .5rem"
        // console.log(TDTotalAmount)
        let tBody = document.querySelectorAll('#tBody')
        let sum = 0
        for(let j=0; j < order.cart.products.length; j++) {
            let product = order.cart.products[j]
            // console.log(product)
            let productPrice = product.productId.price
            // console.log(productPrice)
            let productQty = product.quantity
            // console.log(productQty)
            
            let totalAmount = productQty * productPrice;
            sum += totalAmount
            // console.log(sum)
            // console.log(totalAmount)
            TDTotalAmount.innerHTML = sum
            TDTALabel.innerHTML = 'Overall Total Amount: '
            console.log(TDTotalAmount)
            TableRow.append(td3ColSpan, TDTALabel, TDTotalAmount)
            tBody[i].append(TableRow)


            
        }
    }
}