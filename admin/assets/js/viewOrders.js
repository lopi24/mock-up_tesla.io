let isAdmin = localStorage.getItem('isAdmin')
console.log(isAdmin)
let userToken = localStorage.getItem('token')
console.log(userToken)

let orders = []

const loadData = async () => {
    const res = await fetch('http://localhost:3000/order', {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
    const data = await res.json()
    // console.log(data)
    orders = await data.orders
    displayUsers(orders)
}
loadData();

const tableDatas = document.querySelector('#tableDatas')

const displayUsers = (datas) => {
    console.log(datas)
    const htmlString = datas.map(order => {
        if(order < 1) {
            alert('There are no orders yet.')
        } else {
            return(
                `
                    <tr id="table-row-data" accessKey=${order._id}>
                        <td>${order._id}</td>
                        <td>${order.orderFrom._id}</td>
                        <td>${order.orderFrom.email}</td>
                        <td>${order.orderedOn}</td>
                    </tr>
                `
            )
        }
    }).join("")
    tableDatas.innerHTML = htmlString

    viewOrderData();
}

const viewOrderData = async () => {
    let tableRow = document.querySelectorAll('#table-row-data')
    for(i=0;i<tableRow.length;i++) {
        let data = tableRow[i]
        tableRow[i].addEventListener('click', async () => {
            console.log('clicked!')
            let orderId = await data.accessKey
            localStorage.setItem('orderId', orderId)
            console.log(localStorage)

            window.location.replace(`./order.html?productId=${orderId}`)
        })  
    }
}