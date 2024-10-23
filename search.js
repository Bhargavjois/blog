document.getElementById("search_button").addEventListener("click", (event)=>{
    const query = document.getElementById("search_input").value;
    if (query){
        window.location.href = `/index.html?search=${query}`;
    }
})

document.getElementById("search_button_mbl").addEventListener("click", (event)=>{
    const query = document.getElementById("search_input_mbl").value;
    if (query){
        window.location.href = `/index.html?search=${query}`;
    }
})

document.getElementById("search_input").addEventListener("keydown", (event)=>{
    if (event.key == "Enter"){
        const query = document.getElementById("search_input").value;
        if (query){
            window.location.href = `/index.html?search=${query}`;
        }
    }
})

document.body.addEventListener("keydown", (event) => {
    if (event.key == "/"){
        event.preventDefault();
        const query = document.getElementById("search_input");
        query.focus();
    }
})