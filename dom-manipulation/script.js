
let quotes = [
{text:"The best way to predict the future is to invent it",category: "inspiration"},
{text:"Life is what happens when you are busy making other plans",category:"life"},
{text:"Make hay while the sun shines",category:"preparation"}
]
function showRandomQuote(){
    const randomQuoteIndex = Math.floor(Math.random()*quotes.length);
    // quotes = quotes[randomQuote]
    const quoteDisplay = document.getElementById('quoteDisplay');
    const selectedQuote = quotes[randomQuoteIndex];
    quoteDisplay.innerHTML = `
    <p>"${selectedQuote.text}"</p>
    <P><strong>Category:</strong>${selectedQuote.category}</P>`;
    // quoteDisplay.TextContent = `"${quotes.text}"-"${quotes.category}"`
};
//function to create a form for adding new quotes
function createAddQuoteForm(){
    const formContainer = document.createElement("div");
    //create form elements
    const formHTML = `
    <h2>Add a New Quote</h2>
    <form id = "quoteForm">
        <label for="quoteText">Quote :</label>
        <input type="text" id="quoteText" required><br><br>

        <label for= "quoteCategory">Category :</label>
        <input type="text" id="quoteCategory" required><br><br>

        <button type= "submit">Add Quote</button>
    </form>`;
    formContainer.innerHTML = formHTML;
    document.body.appendChild((formContainer));

//handle form submission
const form = document.getElementById("quoteForm");
form.addEventListener("submit",(e)=>{
    e.preventDefault();// prevent page reload
    const newQuoteText = document.getElementById("quoteText").value;
    const newQuoteCategory = document.getElementById("quoteCategory").value;
       //add new quote to the array
       const newQuotation = {text:newQuoteText, category:newQuoteCategory};
       quotes.push(newQuotation);
    

    //clear the form
    form.reset();
    //optionally display confirmation
    alert('New quote added successfully!');
    //Display the newly added quote
    showRandomQuote();
})

}
//Initialize the page with a random quote and the form
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
createAddQuoteForm();
showRandomQuote();//display an initial random quote when the page loads 
