let params = new URLSearchParams(window.location.search);

let productId = params.get('productId')
console.log(productId);

let userToken = localStorage.getItem('token')
console.log(userToken)

let productData = [];

let viewProductData = document.querySelector('.viewProductData')

const getData = async () => {
    try {
        const res = await fetch(`https://mockuptesla.herokuapp.com/products/${productId}`);
        const data = await res.json();
        // console.log(data)
        productData = await data
        // console.log(productData)
        displayData(productData)
    } catch(err) {
        console.error(err)
    }
}
getData();

const displayData = (data) => {
    console.log(data.product)
    let htmlString = () => {
        return (
            `
            <div class="viewProductContainer">
                <div class="image">
                    <img src="../../../mock-up_tesla_server/${data.product.productImage}">
                </div>
                <form class="productDetails">
                    <div class="productId">
                        <label>productId: </label>
                        <input class="id" value="${data.product._id}" disabled></input>
                    </div>
                    <div class="productName">
                        <label>productName: </label>
                        <input class="name enabled" value="${data.product.name}" disabled></input>
                    </div>
                    <div class="productDesc">
                        <label>productDescription: </label>
                        <textarea class="description enabled" disabled>${data.product.description}</textarea>
                    </div>
                    
                    <div class="category">
                        <label for="category">category: </label>
                        <select id="category" class=" category enabled" disabled>
                            <option value="${data.product.category}">${data.product.category}</option>
                        </select>
                    </div>
                    <div>
                        <label>productPrice: </label>
                        <input class="price enabled" value="${data.product.price}" disabled></input>
                    </div>
                    <div class="isAvailable">
                        <label for="isAvailable">isAvailable: </label>
                        <select class="isAvailable enabled" id="isAvailable" type="isAvailable" disabled>
                            <option value="${data.product.isAvailable}">${data.product.isAvailable}
                        </select>
                    </div>
                    <div class="updateSection">
                        <button class="edit">Edit</button>
                        <button type="submit" class="update" disabled>Update</button>
                    </div>
                </form>
            </div>
            `
        )
    }

    



    
    // console.log(htmlString())
    viewProductData.innerHTML = htmlString()


    // add options for category and isAdmin
    let addCategory = document.getElementById('category')
    // console.log(addCategory, addIsAvailable)
    if(addCategory.value === 'charging') {
        let option1 = document.createElement('option')
        option1.value = 'vehicle_accessories'
        option1.innerHTML = 'vehicle_accessories'
        addCategory.appendChild(option1)

        let option2 = document.createElement('option')
        option2.value = 'apparel'
        option2.innerHTML = 'apparel'
        addCategory.appendChild(option2)
        // console.log(addCategory.value, 'okay')
    } else if(addCategory.value === 'vehicle_accessories') {
        let option1 = document.createElement('option')
        option1.value = 'charging'
        option1.innerHTML = 'charging'
        addCategory.appendChild(option1)

        let option2 = document.createElement('option')
        option2.value = 'apparel'
        option2.innerHTML = 'apparel'
        addCategory.appendChild(option2)

    } else if(addCategory.value === 'apparel') {
        let option1 = document.createElement('option')
        option1.value = 'charging'
        option1.innerHTML = 'charging'
        addCategory.appendChild(option1)

        let option2 = document.createElement('option')
        option2.value = 'vehicle_accessories'
        option2.innerHTML = 'vehicle_accessories'
        addCategory.appendChild(option2)
    }


    // add options for isAvailable
    let addIsAvailable = document.getElementById('isAvailable')
    if(addIsAvailable.value === 'true') {
        let option1 = document.createElement('option')
        option1.value = 'false'
        option1.innerHTML = 'false'
        addIsAvailable.appendChild(option1)
        // console.log(addIsAvailable.value)
    } else if(addIsAvailable.value === 'false') {
        let option2 = document.createElement('option')
        option2.value = 'true'
        option2.innerHTML = 'true'
        addIsAvailable.appendChild(option2)
    }




    
    // console.log(name, description, category, price, isAvailable)

    let editBtn = document.querySelector('.edit');
    // console.log(editBtn)
    let enabled = document.querySelectorAll('.enabled')
    // console.log(enabled)
    let updateBtn = document.querySelector('.update')

    editBtn.addEventListener('click', () => {
        for(i=0;i<enabled.length;i++) {
            enabled[i].disabled = false
            editBtn.disabled = true
            updateBtn.disabled = false
        }
    })

    let form = document.querySelector('.productDetails')

    form.addEventListener('submit', async (e) => {
        // get DOM details
    let name = document.querySelector('.name').value
    let description = document.querySelector('.description').value
    let category = document.querySelector('#category').value
    let price = document.querySelector('.price').value
    let isAvailable = document.querySelector('#isAvailable').value

        e.preventDefault();

    const res = await fetch(`https://mockuptesla.herokuapp.com/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
            name: name,
            description: description,
            category: category,
            price: price,
            isAvailable: isAvailable
        })
    })
    const data = await res.json();
    console.log(data)

    alert('Product has been updated')
    location.reload();

        // console.log(name)
        // console.log(description)
        // console.log(category)
        // console.log(price)
    })

    // add here the when the update button clicked it will fetch the update all route and set the enabled elements to disbaled = true
    // and in admin page add the add-product route
    deleteProduct();
}


deleteProduct = () => {
    let deleteDiv = document.createElement('div');
    deleteDiv.className = 'deleteDiv'
    let deleteBtn = document.createElement('button')
    deleteBtn.id = 'dltBtn'
    deleteBtn.type = 'delete'
    deleteBtn.innerHTML  = 'Delete Product'
    let prodDets = document.querySelector('.viewProductData')

    deleteDiv.appendChild(deleteBtn)
    prodDets.appendChild(deleteDiv)
    console.log(prodDets)
    let dltBtn = document.querySelector('#dltBtn')
    
    dltBtn.addEventListener('click', async () => {
        // console.log('delete')
        const res = await fetch(`https://mockuptesla.herokuapp.com/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        const data = await res.json();
        console.log(data)
        alert('Product Successfully Deleted.')
        window.location.replace('./admin.html')
    })
    
}