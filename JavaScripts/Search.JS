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
    
    if (!query) {
        console.log('No search query provided.');
        return;
    }

    try {
        const results = await fetchData(query);
        console.log(results);
        displayResults(results);
    } catch (error) {
        console.error('Error performing search:', error);
    }
}

// Function to fetch data from Wikipedia API
async function fetchData(query) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.query.search || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}

// Function to display search results
function displayResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(page => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<h3>${page.title}</h3><p>${page.snippet}</p>`;
            resultsDiv.appendChild(resultItem);
        });
    }
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