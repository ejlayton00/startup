function login() {
    const nameEl = document.querySelector("#login-username");
    localStorage.setItem("userName", nameEl.value);

    const passwordEl = document.querySelector("#login-password");

    window.location.href = "diceroller.html";

    // TODO: send to websocket
}  

function register() {
    const nameEl = document.querySelector("#signup-username");
    localStorage.setItem("userName", nameEl.value);

    const emailEl = document.querySelector("#signup-email");

    const passwordEl = document.querySelector("#signup-password");

    window.location.href = "diceroller.html";

    // TODO: send to websocket
}

function displayRandomImage() {
    const random = Math.floor(Math.random() * 100);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('random-image').src = `https://picsum.photos/id/${data[0].id}/500/300?grayscale`;
        });
}

displayRandomImage();