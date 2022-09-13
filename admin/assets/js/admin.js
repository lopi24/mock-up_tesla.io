let isAdmin = localStorage.getItem('isAdmin')
console.log(isAdmin)

let userToken = localStorage.getItem('token');
console.log(userToken)

let products = []

loadData = async () => {
    const res = await fetch('https://mockuptesla.herokuapp.com/products')

    const data = await res.json();
    products = await data.products
    // console.log(data)
    displayProducts(products)
}
loadData();

const tableDatas = document.querySelector('#tableDatas');
// console.log(tableDatas)

displayProducts = (data) => {
    // console.log(data)
    const htmlString = data.map(product => {
        // console.log(product)
        if(product < 1) {
            alert('There are no products.')
        } else {
            if(isAdmin === "true") {
                return(
                    `
                        <tr id="table-row-data" accessKey="${product._id}">
                            <td>${product._id}</td>
                            <td>${product.name}</td>
                            <td>${product.category}</td>
                            <td>${product.price}</td>
                            <td>${product.isAvailable}</td>
                        </tr>
                    `
                )
            }
        }
    }).join("")
    tableDatas.innerHTML = htmlString;
    // console.log(tableDatas)
    updateData()
}

const updateData = async () => {
    let tableRow = document.querySelectorAll('#table-row-data')
    // console.log(tableRow)
    for(i=0;i<tableRow.length;i++) {
        // console.log(tableRow[i].accessKey)
        let data = tableRow[i]
        tableRow[i].addEventListener('click', () => {
            // console.log('clicked')
            // console.log(data.accessKey)

            // continue tomorrow
            // make another product page for admin where you can update infos
            window.location.replace(`./product.html?productId=${data.accessKey}`)
        })
    }
}

const addData = async () => {
    let theTable = document.querySelector('.theTableContent')
    console.log(theTable)
    let addProductContainer = document.createElement("div")
    addProductContainer.className = "addProductContainer"
    let btn = document.createElement("button")
    btn.id = "add-btn"
    btn.innerHTML = 'Add Product'
    addProductContainer.append(btn)
    theTable.appendChild(addProductContainer)

    let addBtn = document.querySelector('#add-btn')
    addBtn.addEventListener('click', () => {
        // console.log('click')
        window.location.replace('./addProduct.html')
        // create 
    })
}
addData()