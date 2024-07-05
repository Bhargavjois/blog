let date = new Date();
let year = date.getFullYear();
let month = date.getMonth(); // Months are zero-indexed
let day = date.getDate();
let timeHrs = date.getHours();
let timeMins = date.getMinutes();
let timeSuffix = " AM";

if (timeHrs > 12){
    timeHrs -= 12;
    timeSuffix = " PM"
}

const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Pad month and day with leading zeros if necessary for consistent formatting
day = day.toString().padStart(2, "0");
timeHrs = timeHrs.toString().padStart(2, "0");
timeMins = timeMins.toString().padStart(2, "0");

let formattedDate = day + " " + monthArr[month] + " " + year + ", " + timeHrs + ":" + timeMins + timeSuffix;

document.getElementById("post_date").innerText = formattedDate;

async function addPost(postData) {
    const url = 'https://blog-backend-0w7q.onrender.com/add-post'; // Replace with your actual URL
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: postData
    });

    if (!response.ok) {
        throw new Error(`Error adding post: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Post added successfully!', data);
    alert("Post added successfully!");
    window.location.reload(false);
    // Handle the success response (e.g., display a success message)
}

function getPostTags(){
    const tagsObject = document.getElementById("tags").children;
    let tagsArray = [];

    if (tagsObject.length > 0){

        let tagsList = [...tagsObject];

        tagsList.forEach(tag => {
            tagsArray.push(tag.innerText.replace(/X$/, ""))
        });
    } else {
        alert("Please enter atleast 1 tag.");
    }
    return tagsArray;
}

let data = {};
let modData = {};
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener('click', () => {
    editor.save().then( savedData => {
        const title = document.getElementById("title").innerText;
        let author =  document.getElementById("post_auth").innerText;
        author = author != "" ? author : "Bhargav V";
        if (title != ""){
            modData.tags = getPostTags();
            if (modData.tags.length < 1){
                return;
            }
            modData.title = title;
            modData.data = savedData;
            modData.author = author;
            modData.createDate = formattedDate;
            data = JSON.stringify(modData, null, 4);
            if (data){
                addPost(data);
            }
        } else{
            alert("Please enter a title!");
        }
    })
})

// Get the tags and input elements from the DOM 
const tags = document.getElementById('tags'); 
const input = document.getElementById('input-tag'); 

function handleTagInput(){
    
    // Prevent the default action of the keypress 
    // event (submitting the form) 
    event.preventDefault();
    
    // Create a new list item element for the tag 
    const tag = document.createElement('li'); 
  
    // Get the trimmed value of the input element 
    const tagContent = input.value.trim(); 
  
    // If the trimmed value is not an empty string 
    if (tagContent !== '') { 
  
        // Set the text content of the tag to  
        // the trimmed value 
        tag.innerText = tagContent; 

        // Add a delete button to the tag 
        tag.innerHTML += '<button class="delete-button">X</button>'; 
          
        // Append the tag to the tags list 
        tags.appendChild(tag); 
          
        // Clear the input element's value 
        input.value = ''; 
    } 
}

// Add an event listener for keyup on the input element 
input.addEventListener('input', function (event) { 

    // Check if the key pressed is 'Enter' 
    if (event.data === ',' || event.data === ' ' || event.data === '.') { 
        handleTagInput();
    } 
});

// Add an event listener for keydown on the input element 
input.addEventListener('keydown', function (event) { 

    // Check if the key pressed is 'Enter' 
    if (event.key === 'Enter') { 
        handleTagInput();
    } 
}); 

// Add an event listener for click on the tags list 
tags.addEventListener('click', function (event) { 

    // If the clicked element has the class 'delete-button' 
    if (event.target.classList.contains('delete-button')) { 
      
        // Remove the parent element (the tag) 
        event.target.parentNode.remove(); 
    } 
}); 

// Disable enter on title field.
document.getElementById("title").addEventListener("keydown", (ev) => {
    if (ev.key == "Enter"){
        ev.preventDefault();
    }
})
