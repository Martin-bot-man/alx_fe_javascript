let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Display a random quote from the filtered quotes
async function showRandomQuote() {
    const filteredQuotes = await getFilteredQuotes();
    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    displayQuote(randomQuote);
}

// Display a single quote in the quote display area
function displayQuote(quote) {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = quote ? `<p>${quote.text}</p><p>Category: ${quote.category}</p>` : "<p>No quotes available</p>";
}

// Add a new quote with text and category provided by the user
function addQuote() {
    const text = document.getElementById("newQuoteText").value;
    const category = document.getElementById("newQuoteCategory").value;
    if (!text || !category) return alert("Both text and category are required.");

    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    filterQuotes();
}

// Save the quotes array to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate the category dropdown with unique categories from quotes
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on the selected category and display one of them
async function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory);
    const filteredQuotes = await getFilteredQuotes(selectedCategory);
    displayQuote(filteredQuotes[0]);
}

// Helper function to get quotes based on selected category
async function getFilteredQuotes(category = localStorage.getItem("selectedCategory") || "all") {
    return category === "all" ? quotes : quotes.filter(quote => quote.category === category);
}

// Export the quotes array to a JSON file
function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from a JSON file and update the quotes array and local storage
function importFromJsonFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
        const importedQuotes = JSON.parse(e.target.result);
        quotes = [...quotes, ...importedQuotes];
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
    };
    reader.readAsText(file);
}

// Restore the last selected category from local storage on page load
function restoreLastSelectedCategory() {
    const savedCategory = localStorage.getItem("selectedCategory") || "all";
    document.getElementById("categoryFilter").value = savedCategory;
    filterQuotes();
}

// Simulate syncing data with a server
async function syncWithServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Example API
        const serverQuotes = await response.json();
        
        // Mock conflict resolution: Server data takes precedence
        quotes = [...new Set([...serverQuotes, ...quotes])];
        saveQuotes();
        populateCategories();
        alert("Data synced with server!");
    } catch (error) {
        console.error("Failed to sync with server:", error);
    }
}

// Periodically sync with server every 10 minutes
setInterval(syncWithServer, 10 * 60 * 1000);

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
window.addEventListener("load", () => {
    populateCategories();
    restoreLastSelectedCategory();
});