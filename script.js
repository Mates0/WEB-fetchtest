let container
let array = []

window.onload = () => {
    container = document.getElementById('work-container')
    display()
}

function display() {
    let sum = 0
    fetch("http://159.223.27.219/87ec1114-49ae-4e04-9774-909f851ba57a/User/")
        .then(res => res.json())
        .then(users => {
            document.getElementById("btnupdate").addEventListener("click", () => {
                fetch("http://159.223.27.219/87ec1114-49ae-4e04-9774-909f851ba57a/User/", {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullName: document.getElementById("name").value,
                        wage: document.getElementById("wage").value
                    })
                })
            })
        })
    container.innerHTML = ""
    fetch("http://159.223.27.219/87ec1114-49ae-4e04-9774-909f851ba57a/User/Work")
        .then(res => res.json())
        .then(users => {
            array = users
            for (let i = 0; i < users.length; i++) {
                let div1 = document.createElement('div')
                let div2 = document.createElement('div')
                let from = Date.parse(users[i].from)
                let to = Date.parse(users[i].to)
                let time = (to - from) / 1000 / 60 / 60
                let wageperhour = time / users[i].wage;
                sum += users[i].wage
                document.getElementById("totalwage").innerHTML = sum +",-"
                div2.innerHTML = `<div class="d-flex justify-content-center text-center">
    <table class="table">
        <thead>
        <tr>
            <th scope="col">${users[i].note}</th>
            <th scope="col">(${time}h)</th>
            <th scope="col">${users[i].wage},-</th>
            <th scope="col">${wageperhour}Kč/h</th>
            <th scope="col"><button id="${i}" class="btn btn-danger">Delete</button></th>
        </tr>
        </thead>
    </table>
</div>`
                div2.appendChild(div1)
                container.appendChild(div2)

                let delBtn = document.getElementById(i + "")
                delBtn.addEventListener("click", (e) => {
                    e.preventDefault()
                    del(i)
                })
            }
        })
}

function del(input) {
    fetch("http://159.223.27.219/87ec1114-49ae-4e04-9774-909f851ba57a/User/Work/" + array[input].id, {
        method: "DELETE"
    }).then(res => {
        display()
    })
}