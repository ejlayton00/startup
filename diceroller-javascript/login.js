function login() {
    const nameEl = document.querySelector("#login-username");
    localStorage.setItem("userName", nameEl.value);

    const passwordEl = document.querySelector("#login-password");

    window.location.href = "index.html";

    // TODO: send to websocket
}  

function register() {
    const nameEl = document.querySelector("#signup-username");
    localStorage.setItem("userName", nameEl.value);

    const emailEl = document.querySelector("#signup-email");

    const passwordEl = document.querySelector("#signup-password");

    window.location.href = "index.html";

    // TODO: send to websocket
}