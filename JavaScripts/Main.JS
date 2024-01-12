function performSearch() {
    var searchTerm = document.getElementById("searchInput").value;
    window.location.href = "Search.html?search=" + searchTerm
    goToLink("Search.html?search=" + searchTerm);
}

function goToLink(searchName) {
    window.location.href = searchName;
}

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

function showMenu() {
    var menuContainer = document.getElementById("menuContainer");
    menuContainer.style.display = "block";
}

function closeMenu() {
    var menuContainer = document.getElementById("menuContainer");
    menuContainer.style.display = "none";
}