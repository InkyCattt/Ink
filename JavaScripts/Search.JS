function getSearchQuery() {
    // Get the URL parameter "search"
    var urlParams = new URLSearchParams(window.location.search);
    var searchQuery = urlParams.get('search');
    
    // Check if searchQuery is null or undefined, and replace it with an empty string
    return searchQuery ? searchQuery : '';
}

// Change the title of the webpage
var searchQuery = getSearchQuery();
document.title = searchQuery ? searchQuery + " - Ink" : "Ink";

search();

// Function to perform a basic search
async function search() {
    const query = getSearchQuery();
    const results = '';
    console.log(results);
    displayResults(results, query);
}

// Function to display search results
function displayResults(results, query) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if(!query) {
        const errorBox = document.createElement('div');
        errorBox.classList.add('error-box');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'No search provided.';
        errorBox.appendChild(errorMessage);
        resultsDiv.appendChild(errorBox);
    } else {
        const normalizedQuery = query;

        if (normalizedQuery.includes('calculator') || isMathExpression(normalizedQuery)) {
            // Display calculator with buttons and display bar
            const calculatorBox = document.createElement('div');
            calculatorBox.classList.add('calculator-box');

            // Calculator display bar
            const displayBar = document.createElement('div');
            displayBar.classList.add('calculator-display-bar');
            calculatorBox.appendChild(displayBar);

            if(isMathExpression(normalizedQuery)) {
                displayBar.textContent = query;
            }

            // Define button labels     
            const buttonLabels = [
                ' ', 'x!', '(', ')', '%', 'CE',
                'sin', 'ln', '7', '8', '9', '/',
                'cos', 'log', '4', '5', '6', '*',
                'tan', '√', '1', '2', '3', '-',
                'Ans', 'π', '0', '.', '=', '+',
            ];      

            // Create buttons dynamically
            buttonLabels.forEach(label => {
                const button = document.createElement('div');
                button.classList.add('calculator-button');
                button.textContent = label;
                button.addEventListener('click', () => onButtonClick(label));
                calculatorBox.appendChild(button);
            });

            resultsDiv.appendChild(calculatorBox);
        } else if (results.length === 0) {
            const errorBox = document.createElement('div');
            errorBox.classList.add('error-box');
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'No results found.';
            errorBox.appendChild(errorMessage);
            resultsDiv.appendChild(errorBox);
        } else {
            // Display regular search results
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<h3>${results}`;
            resultsDiv.appendChild(resultItem);
        }
    }
}

// Function to handle calculator button click
function onButtonClick(label) {
    if (label === 'sin' || label === 'cos' || label === 'log' || label === 'tan' || label === '√' || label === 'ln') {
        label = label += '(';
    } else if (label === 'x!') {
        label = '!'
    }
    const displayBar = document.querySelector('.calculator-display-bar');
    var currentExpression = displayBar.textContent;

    if (displayBar.textContent.includes('Result:') || displayBar.textContent.includes('Invalid Expression')) {
        currentExpression = '';
        displayBar.textContent = '';
    }

    if (label === '=') {
        try {
            const result = calculateTrig(currentExpression);
            displayBar.textContent = `Result: ${result}`;
        } catch (error) {
            // Handle invalid expressions
            displayBar.textContent = 'Invalid Expression';
        }
    } else if (label === 'CE') {
        // Clear the input and display bar
        currentExpression = '';
        displayBar.textContent = '';
    } else {
        // Update the input and display bar with the pressed button
        displayBar.textContent = displayBar.textContent += label;
    }
}

// Function to check if the query is a math expression
function isMathExpression(query) {
    // Use a regular expression to check if the query contains math-related characters
    const mathRegex = /\d*([+\-*/=^()%]|sin\(\)|cos\(\)|tan\(\)|√\(\)|ln\(\)|log\(\)|π)/g;  
    return mathRegex.test(query);
}

// Function to calculate trigonometric and other special functions
function calculateTrig(expression) {
    // Replace trigonometric and special functions with their calculated values
    expression = expression.replace(/sin\(/g, 'Math.sin(')
                           .replace(/cos\(/g, 'Math.cos(')
                           .replace(/tan\(/g, 'Math.tan(')
                           .replace(/√\(/g, 'Math.sqrt(')
                           .replace(/ln\(/g, 'Math.log(')
                           .replace(/log\(/g, 'Math.log10(')
                           .replace(/π/g, 'Math.PI');

    return eval(expression);
}

// Attach the search function to the "Enter" key press event
document.getElementById('searchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        search();
    }
});

function goToLink(searchName) {
    window.location.href = searchName;
}

function performSearch() {
    var searchTerm = document.getElementById("searchInput").value;
    window.location.href = "Search.html?search=" + searchTerm
    goToLink("Search.html?search=" + searchTerm);
}

// Alternatively, you can use JavaScript to handle the click event and navigate to the desired URL.
var logoLink = document.querySelector('.logo');
logoLink.addEventListener('click', function() {
    // Replace 'your-desired-url' with the actual URL you want to navigate to
    goToLink("Home.html");
});

// Get the search input element
var searchInput = document.getElementById('searchInput');

// Add event listener for 'keydown' event
searchInput.addEventListener('keydown', function(event) {
    // Check if the key pressed is Enter (key code 13)
    if (event.keyCode === 13) {
        // Call the performSearch function
        performSearch();
    }
});