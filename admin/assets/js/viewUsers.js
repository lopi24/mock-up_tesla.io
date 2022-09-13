let isAdmin = localStorage.getItem('isAdmin')
console.log(isAdmin)
let userToken = localStorage.getItem('token')
console.log(userToken)

let users = []

const loadData = async () => {
    const res = await fetch('https://mockuptesla.herokuapp.com/user', {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
    const data = await res.json();
    // console.log(data)
    users = await data.users
    // console.log(users)
    displayUsers(users)
}

loadData();

const tableDatas = document.querySelector('#tableDatas')

const displayUsers = (data) => {
    console.log(data)
    const htmlString = data.map(user => {
        if(user < 1) {
            alert('There are no users registered')
        } else {
            return(
                `
                    <tr id="table-row-data">
                        <td>${user._id}</td>
                        <td>${user.email}</td>
                        <td>${user.isAdmin}</td>
                    </tr>
                `
            )
        }
    }).join("")
    tableDatas.innerHTML = htmlString
}