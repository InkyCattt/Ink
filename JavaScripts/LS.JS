function goToLink(searchName) {
    window.location.href = searchName;
}

function getQueryType() {
    // Get the URL parameter "search"
    var urlParams = new URLSearchParams(window.location.search);
    var type = urlParams.get('type');
    
    // Check if searchQuery is null or undefined, and replace it with an empty string
    return type ? type : '';
}

// Change the title of the webpage
var type = getQueryType();
document.title = type ? type + " - Ink" : "Ink";

// Alternatively, you can use JavaScript to handle the click event and navigate to the desired URL.
var logoLink = document.querySelector('.logo');
logoLink.addEventListener('click', function() {
    // Replace 'your-desired-url' with the actual URL you want to navigate to
    goToLink("Home.html");
});

if(type == 'Signup') {
    showSignupForm();
} else {
    showLoginForm();
}

function showSignupForm() {
    var formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = `
        <h2>Sign Up</h2>
        <input class="form-input" type="text" placeholder="Inkmail-(example~inkmail.net)" required>
        <input class="form-input" type="password" placeholder="Password-(example1234)" required>
        <button class="form-button" type="submit">Signup</button>
        <p>Already have an account?</p>
        <button class="form-button" onclick="goToLink('LS.html?type=Login')">Login</button>
    `;
}

function showLoginForm() {
    var formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = `
        <h2>Login</h2>
        <input class="form-input" type="text" placeholder="Inkmail-(example~inkmail.net)" required>
        <input class="form-input" type="password" placeholder="Password-(example1234)" required>
        <button class="form-button" type="submit">Login</button>
        <p>Don't have an account?</p>
        <button class="form-button" onclick="goToLink('LS.html?type=Signup')">Sign up</button>
    `;
}

var loginForm = document.querySelector('.form-container');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = new FormData(loginForm);

    fetch('http://localhost:2700/process.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Login successful, perform desired actions (e.g., redirect)
            alert(data.message);
            // Add your redirection logic here
        } else {
            // Login failed, display an error message
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});