let quotes = [
{text:"make hay while the sun shines", category: "Inspiration"},
{text:"You must be the change you wish to see in the word",category:"Inspiration"},
{text:"All men have equal political rights", category:"History"},
{text:"We are all stars ,and we deserve to twinkle",category:"Love"}
]
if (localStorage.getItem("quotes")){
    try{quotes=JSON.parse(localStorage.getItem("quotes"))||[]

    }catch(error){
        console.error("Error loading quotes from localstorage",error)
    }
}
function showRandomQuote(){
    const quotesDisplay = document.getElementById("quoteDisplay");
    const RandomquotesIndex = Math.floor((Math.random() * quotes.length));

   const selectedQuote = quotes[RandomquotesIndex];
   quotesDisplay.innerHTML =`<P>"${selectedQuote.text}"</p>
                             <p>"${selectedQuote.category}"</p>`
//    console.log(selectedQuote);
};
//function to export quote as a JSON file
function exportQuotesAsJSON(){
    const quotesJSON = JSON.stringify(quotes,null,2);
    //create a Blob object with the JSON data
    const blob = new Blob([quotesJSON],{type:"application/json"});
    //create a temporary url link to the blob
    const link = document.createElement("a");
    link.href= URL.createObjectURL(blob);
    link.download = "quotes.json";//set the name to the downloaded file
    link.click();
    //cleaning :Revoke the objectURL after the download
    setTimeout(()=>{URL.revokeObjectURL(link.href)},100)
   

}
//function to create export button
function createExportButton(){
const blobBtn = document.createElement("button");
blobBtn.textContent = "Download quotes as JSON"
blobBtn.onclick=exportQuotesAsJSON;
document.body.appendChild(blobBtn)}

const button = document.getElementById("newQuote")
button.addEventListener("click",showRandomQuote);

//function to create and display the form container and form dynamically
function createFormContainerAndForm(){
    //create form container div with HTML using backticks
    const formContainer = document.createElement("div");
    formContainer.id="formContainer";
    formContainer.innerHTML = ` 
    <h2>Add a New Quote</h2>
    <form id="quoteForm">
      <label for="newQuoteText">Quote: </label>
      <input type="text" id="newQuoteText" placeholder="Enter a new quote" required><br><br>

      <label for="newQuoteCategory">Category: </label>
      <input type="text" id="newQuoteCategory" placeholder="Enter quote category" required><br><br>

      <button type="submit">Add Quote</button>
    </form>
 
    `
    //append the form container to the body
    document.body.appendChild(formContainer);

    //add event listener to handle form submission
    document.getElementById("quoteForm").addEventListener("submit", addQuote);

}
function addQuote(event){
    event.preventDefault()//prevent form from reloading the page

    const newquoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory= document.getElementById("newQuoteCategory").value;

    if (newquoteText===""||newQuoteCategory===""){
        alert("please enter both quote and category")
    }
    //add the new quote to the array
    const newQuote = {text: newquoteText, category: newQuoteCategory}
    quotes.push(newQuote);
    //clear the input fields after adding the quote
    document.getElementById("quoteForm").reset();
    //alert uset and display the new quote
    alert("New quote added successfully!")
    showRandomQuote();//optionally show the new quote after adding
}
function filteringCategoriesHtml(){
    const filterContainer = document.createElement("div");
    filterContainer.innerHTML =`
       <select id="categoryFilter" onchange="filterQuotes()">
          <option value="All" >All Categories</option>
          <option value="Life">Life</option>
          <option value="Inspiration">Inspiration</option>
          <option value="History">History</option>

       </select>   
    
    `
    document.body.appendChild(filterContainer);
}
function filterQuotes(){
    const selectedCategory = document.getElementById("categoryFilter");
    let filteredQuotes = quotes;
    if(selectedCategory!=="All"){
        filteredQuotes= quotes.filter(quote=>quote.category === selectedCategory);
    };
    //clear the display area
    quotesDisplay.innerHTML ="";
filteredQuotes.forEach(quote=>{
    quotesDisplay.innerHTML +=`
    <p>"${quote.text}"</p>
    <p>Category:${quote.category}</p>
    `
})


}
//call the function to create the form container and the form dynamically when the page loads
window.onload =()=>{createFormContainerAndForm();
    createExportButton();
} 