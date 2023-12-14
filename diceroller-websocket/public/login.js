async function login() {
    const username = document.querySelector("#login-username")?.value;
    const password = document.querySelector("#login-password")?.value;

    const response = await fetch(`/api/auth/login`, {
        method: 'post',
        body: JSON.stringify({ username: username, password: password}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem("userName", username);
        window.location.href = "diceroller.html";
    } else {
        const body = await response.json();
        console.log("Error: " + body.msg);
    }
}  

async function register() {    
    const username = document.querySelector("#signup-username")?.value;
    const password = document.querySelector("#signup-password")?.value;

    const response = await fetch(`/api/auth/create`, {
        method: 'post',
        body: JSON.stringify({ username: username, password: password}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem("userName", username);
        window.location.href = "diceroller.html";
    } else {
        const body = await response.json();
        console.log("Error: " + body.msg);
    }
}

function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

async function getUser(username) {
    const response = await fetch(`/api/user/${username}`);
    if (response.status === 200) {
        return response.json();
    }
    return null;
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