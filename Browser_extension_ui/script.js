





document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Login email sent successfully.') {
            window.location.href = 'wishlist.html';
        }
    })
    .catch(error => console.error('Error:', error));
});

// Rest of the script.js code for handling password criteria and toggle


// Signup Page Password Criteria Display
document.getElementById('password').addEventListener('focus', function () {
    document.getElementById('password-criteria').style.display = 'block';
});

document.getElementById('password').addEventListener('blur', function () {
    document.getElementById('password-criteria').style.display = 'none';
});

document.getElementById('password').addEventListener('input', function () {
    const password = document.getElementById('password').value;
    document.querySelector('.length').style.color = password.length >= 4 ? 'green' : 'darkgrey';
    document.querySelector('.lowercase').style.color = /[a-z]/.test(password) ? 'green' : 'darkgrey';
    document.querySelector('.uppercase').style.color = /[A-Z]/.test(password) ? 'green' : 'darkgrey';
    document.querySelector('.number').style.color = /\d/.test(password) ? 'green' : 'darkgrey';
    document.querySelector('.special').style.color = /[@$!%*?&]/.test(password) ? 'green' : 'darkgrey';
});

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.src = type === 'password' ? 'eye.png' : 'eyeslash.png';
});

document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const lengthCriteria = password.length >= 4;
    const lowercaseCriteria = /[a-z]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const specialCriteria = /[@$!%*?&]/.test(password);
    const allCriteriaMet = lengthCriteria && lowercaseCriteria && uppercaseCriteria && numberCriteria && specialCriteria;

    if (allCriteriaMet) {
        alert(`Username: ${username}\nPassword: ${password}`);
        document.getElementById('signup-box').style.display = 'none';
        document.getElementById('login-box').style.display = 'block';
    } else {
        alert('Please ensure your password meets all the criteria.');
    }
});

// Toggle between Signup and Login Pages
document.getElementById('show-login').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('signup-box').style.display = 'none';
    document.getElementById('login-box').style.display = 'block';
});

document.getElementById('show-signup').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('signup-box').style.display = 'block';
});

// Login Page Password Toggle
document.getElementById('toggleLoginPassword').addEventListener('click', function () {
    const passwordField = document.getElementById('login-password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.src = type === 'password' ? 'eyeslash.png' : 'eye.png';
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    alert(`Login successful\nUsername: ${username}\nPassword: ${password}`);
    window.location.href = 'wishlist.html';
    // Example: Switch to wishlist.html after signup/login
    
});



