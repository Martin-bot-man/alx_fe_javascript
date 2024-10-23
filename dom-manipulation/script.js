
let quotes = [
{text:"The best way to predict the future is to invent it",category: "inspiration"},
{text:"Life is what happens when you are busy making other plans",category:"life"},
{text:"Make hay while the sun shines",category:"preparation"}
]
if(localStorage.getItem("quotes")){
    quotes=JSON.parse(localStorage.getItem("quotes"));
}
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

//function to export quots as a JSON file
function exportQuotesAsJSON(){
    const quotesJSON = JSON.stringify(quotes,null ,2);//convert quotes array  to jsom format

    //create a Blob object with the json data
    const blob = new Blob([quotesJSON],{type:"application/json"})
    //create a temporary url link to the blob
    const link = document.createElement('a');
    link.href =URL.createObjectURL(blob);
    link.download ='quotes.json';//set the name of the downloaded file
    //programmatically click the link to trigger the download
    link.click();
    //cleaning:Revoke the objectURL after the download
  setTimeout(URL.revokeObjectURL(link.href),100)  ;
}
//add eventlisteners to the buttons
document.createElement("button")
button.id="btnA"
button.textContent ="Export quotes";//set button quotes

button.body.appendChild("button")
document.getElementById("btnA").addEventListener("click",exportQuotesAsJSON)

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
    localStorage.setItem("quotes",JSON.stringify(quotes));

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
