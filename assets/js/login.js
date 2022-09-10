let loginForm = document.querySelector('#login');

loginForm.addEventListener("submit",  async (e) => {
    e.preventDefault();
    let email= document.querySelector('#userEmail').value
    let password = document.querySelector("#userPassword").value

    if(email === "" || password === "") {
        alert("Please input your email and/or password.")
    } else {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json();
        console.log(data)
        const token = await data.token
        console.log(token)

        if(token) {
            localStorage.setItem('token', data.token) // for saving to the localStorage
            console.log(localStorage) //for checking

            alert('Access key saved on local storage.')

            // const detailsResponse = await 

            fetch('http://localhost:3000/user/details', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                return res.json()
            }).then(data => {
                // console.log(data)
                console.log(data.user.isAdmin)
                
                if(data.user.isAdmin === false) {
                    localStorage.setItem("id", data.user._id)
                    localStorage.setItem("isAdmin", data.user.isAdmin)

                    console.log("items are set inside the local storage.") // for checking only

                    window.location.replace('../index.html');
                    // window.location.replace('./shop.html');
                } else if(data.user.isAdmin === true) {
                    localStorage.setItem("id", data.user._id)
                    localStorage.setItem("isAdmin", data.user.isAdmin)

                    window.location.replace('../admin/html/admin.html')
                }

                

            })
        } else {
            alert('Something went wrong!')
        }
    }
})