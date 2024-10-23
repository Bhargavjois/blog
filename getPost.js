function getURLQueryString(){

    // Define your URL with a query string
    const url = window.location.href;

    // Split the URL at the question mark
    const parts = url.split("?");

    // Assuming there's data after the question mark (safer approach to check first)
    if (parts.length > 1) {
    const queryString = parts[1];
    return queryString;
    } else {
    return "Error";
    }
}

async function getPosts() {
    try {
      const url = `https://blogbackend-production-5dc1.up.railway.app/post/${getURLQueryString()}`; // Replace with your actual API endpoint
      const response = await fetch(url);
      const data = await response.json();
      if (response.status != 200){

        // Save the mode to local storage.
        localStorage.setItem('errMsg', data.disp_msg);
      } else {

        // Save the mode to local storage.
        localStorage.setItem('errMsg', "");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
}

getPosts();  // Call the function to fetch posts