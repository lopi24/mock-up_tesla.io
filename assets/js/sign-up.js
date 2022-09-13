console.log('Hello World!')
let signUpForm = document.getElementById('signUp');

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    let userEmail = document.getElementById('userEmail').value
    // console.log(email);
    let password = document.getElementById('userPassword').value
    // console.log(password);
    let verifyPassword = document.getElementById('userVerifyPassword').value
    // console.log(verifyPassword);


    if((password !== "" && verifyPassword !== "") && (verifyPassword === password) && (userEmail !== /\S+@\S+\.\S+/ )) {
        fetch('https://mockuptesla.herokuapp.com/user/email-exists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.message === 'Email is available.') {
                fetch('https://mockuptesla.herokuapp.com/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        password: password
                    })
                }).then(res => {
                    console.log(res)
                    // return res.json();
                    if(res.ok) {
                        alert("Successfully Created New Account");
                    } else {
                        alert("Failed to Register");
                    }
                })
            } else if(data.message === 'Conflict, Email already Exist!') {
                alert("Email Already Exists, Choose Another Email")
            }
        })
    } else {
        alert("Something went wrong please check your credentials")
    }
})