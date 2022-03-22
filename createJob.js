window.onload = () => {
    document.getElementById("btncreate").addEventListener("click", () => {
        fetch("http://159.223.27.219/87ec1114-49ae-4e04-9774-909f851ba57a/User/Work", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                note: document.getElementById("note").value,
                from: document.getElementById("from").value,
                to: document.getElementById("to").value
            })
        }).then(res => {
            window.location.href = "index.html"
        })
    })
}