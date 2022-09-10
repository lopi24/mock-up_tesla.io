// console.log('addproducts')

let userToken = localStorage.getItem('token')

let createProductForm = document.querySelector('#create-product');
// console.log(createProductForm)

createProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let pName = document.querySelector('#productName').value;
    console.log(pName)
    let pDescription = document.querySelector('#productDescription').value;
    console.log(pName)
    let pPrice = document.querySelector('#productPrice').value;
    console.log(pPrice)
    let pCategory = document.querySelector('#category-select').value;
    console.log(pCategory);
    let pFile = document.querySelector('#files');
    console.log(pFile)

    const formData = new FormData();
    
    formData.append('name', pName)
    formData.append('description', pDescription)
    formData.append('price', pPrice)
    formData.append('category', pCategory)
    formData.append("productImage", pFile.files[0])
    console.log(pFile.files)

    if((pName !== "") && (pDescription !== "") && (pPrice !== "") && (pCategory!== "")) {
        const res = await fetch('http://localhost:3000/products/productName-exist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({
                name: pName,
                category: pCategory
            })
        })
        const data = await res.json();
        console.log(data)
        if(data.message === false) {
            const res = await fetch('http://localhost:3000/products/add-product', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
                body: formData
            })
            // const data = await res.json();
            console.log(res)
            // console.log(data)
            if(res.status === 500) {
                alert('Something is wrong, check your inputs')
            } else if(res.status === 201) {
                alert('Successfully Created a Product')
                window.location.replace('./admin.html');
            }
        } else {
            alert('Product already exists')
        }
    } else {
        alert('Something went wrong, check your credentials.')
    }
})