let isAdmin = localStorage.getItem('isAdmin')
console.log(isAdmin)
let userToken = localStorage.getItem('token');
console.log(userToken)
let orderId = localStorage.getItem('orderId')
console.log(orderId)

let orderData = []

let viewOrderData = document.querySelector('.viewOrderData')

loadData = async () => {
    const res = await fetch(`https://mockuptesla.herokuapp.com/order/${orderId}`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
    const data = await res.json();
    // console.log(data)
    orderData = data.findOrder
    displayOrderData(orderData)
    displayTotalAmount(orderData)
}
loadData();

const displayOrderData = (data) => {
    // console.log(data)
    let htmlString = () => {
        return (
            `
                <h3>order_id: <span>${data._id}</span></h3>
                <h3>orderFrom: <span>${data.orderFrom}</span></h3>
                <h3>orderedOn: <span>${data.orderedOn}</span></h3>
                <h3>Checkout Proudcts: </h3>
                <table class="orderDetailsContainer">
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Category</th>
                            <th>Product Price</th>
                            <th>Product Quantity</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                </table>
            `
        )
    }
    viewOrderData.innerHTML = htmlString()

    let productString = data.cart.products.map(product => {
        return(
            `
            <tr id="table-row-data">
                <td>
                    <img id="productImage" src="../../../mock-up_tesla_server./${product.productId.productImage}">
                </td>
                <td>${product.productId._id}</td>
                <td>${product.productId.name}</td>
                <td>${product.productId.category}</td>
                <td id="table-data-price">${product.productId.price}</td>
                <td id="table-data-quantity">${product.quantity}</td>
            </tr>
            `
        )
    }).join("")
    
    orderDetailsContainer = document.querySelector('.orderDetailsContainer')
    

    tbody = document.createElement('tbody')
    tbody.className = 'tBody'
    tbody.innerHTML = productString
    orderDetailsContainer.appendChild(tbody)
    viewOrderData.appendChild(orderDetailsContainer)
}

const displayTotalAmount = (datas) => {
    console.log(datas)
    let tableRowData = document.querySelectorAll('#table-row-data')
    let price = document.querySelectorAll('#table-data-price')
    let qty = document.querySelectorAll('#table-data-quantity')
    // let products = datas.cart.products
    
    let sum = 0;
        let overAllTotalAmount = document.createElement('td')
        let overAllTotalAmountDiv = document.createElement('tr')
        let tBody = document.querySelector('.tBody')

    for(i=0;i<tableRowData.length;i++) {
        let totalAmount = document.createElement('td')
        totalAmount.className = "total-amount"

        // console.log(tableRowData[i])
        // console.log(price[i])
        // console.log(qty[i])

        totalAmount.innerHTML = Number(price[i].innerHTML) * Number(qty[i].innerHTML)
        // console.log(totalAmount)
        tableRowData[i].appendChild(totalAmount)
        let sumTotalAmount = document.querySelectorAll('.total-amount')
        
        sum = sum + Number(sumTotalAmount[i].innerHTML)
        console.log(sum)
    }
    overAllTotalAmount.innerHTML = sum
    let header4 = document.createElement('h4')
    header4.innerHTML = 'Total Amount: '
    overAllTotalAmountDiv.append(header4, overAllTotalAmount)
    tBody.appendChild(overAllTotalAmountDiv)
    overAllTotalAmountDiv.className = 'over-all-total-amount-div'
}