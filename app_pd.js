
let previousScrollPos = 0;
let currentTheme = 0;

const handleScroll = function() {
    window.addEventListener('scroll', function() {
    const currentScrollPos = window.scrollY;

    const widthOfStatus = document.documentElement.scrollTop / (document.body.clientHeight - window.innerHeight) * 100;
    document.getElementById("scrollStatus").animate(
        {
            width: widthOfStatus + 'vw'
        }, {duration: 100, fill: 'forwards'}
    )

    if (currentScrollPos < 250){
        showHideTopButton(0);
    }
    if (currentScrollPos < 100){
        document.getElementById("dark_light").animate(
            {
                right: 2 + 'em'
            }, {duration: 500, fill: 'forwards'}
        )
        document.getElementById("dark_light").style.pointerEvents = "auto";

    } else {
        document.getElementById("dark_light").animate(
            {
                right: -5 + 'em'
            }, {duration: 500, fill: 'forwards'}
        )
        document.getElementById("dark_light").style.pointerEvents = "none";
    }

    if (previousScrollPos > currentScrollPos) {
        if (document.documentElement.scrollTop > 200 && previousScrollPos - currentScrollPos > 1){
            showHideTopButton(1);
        }
    } else if (previousScrollPos < currentScrollPos) {
        if (Math.ceil(currentScrollPos) >= document.documentElement.scrollHeight - (window.innerHeight + 200)){
            showHideTopButton(1);
        }

        else if (previousScrollPos - currentScrollPos < -1){
            showHideTopButton(0);
        }
    }

    previousScrollPos = currentScrollPos;
    });
};

handleScroll();

function showHideTopButton(pos){
    if ((document.getElementById("top").style.display == "block" || document.getElementById("top").style.display == "") 
            && pos === 0){
        document.getElementById("top").animate(
            {
                right: -5 + 'em'
            }, {duration: 500, fill: 'forwards'}
        )
        document.getElementById("top").style.pointerEvents = "none";
    }
    else if ((document.getElementById("top").style.display == "none" || document.getElementById("top").style.display == "")
                 && pos === 1){
        document.getElementById("top").animate(
            {
                right: 2 + 'em'
            }, {duration: 500, fill: 'forwards'}
        )
        document.getElementById("top").style.pointerEvents = "auto";
    }
}

function toggleTheme(){

    if (currentTheme === 0){
        document.documentElement.style.setProperty('--bg-color', '#cccccc');
        document.documentElement.style.setProperty('--color', '#121212');
        document.documentElement.style.setProperty('--extra-color', '#aaaaaa');
        document.documentElement.style.setProperty('--lg-color', 'rgba(0, 0, 0, 0.05)');
        document.getElementById("dark").style.display = "none";
        currentTheme = 1;

        // Save the mode to local storage.
        localStorage.setItem('themeMode', 'Light');
    }
    else if (currentTheme === 1){
        document.documentElement.style.setProperty('--bg-color', '#121212');
        document.documentElement.style.setProperty('--color', 'bisque');
        document.documentElement.style.setProperty('--extra-color', '#313131');
        document.documentElement.style.setProperty('--lg-color', 'rgba(128, 128, 128, 0.02)');
        document.getElementById("dark").style.display = "block";
        currentTheme = 0;

        // Save the mode to local storage.
        localStorage.setItem('themeMode', 'Dark');
    }
}

function scrollToTop(){
    document.body.scrollIntoView({behavior: "smooth"});
}

function setDefaultTheme(){

    const savedMode = localStorage.getItem('themeMode');
    
    if (savedMode == "Light"){
        document.getElementById("dark").style.display = "none";
        currentTheme = 1;
    } else{
        document.getElementById("dark").style.display = "block";
        currentTheme = 0;
    }
}

function generateRandomEmoji() {
    const emojis = [
      "😀", "😁", "😉", "😊", "🙂", "😍", "🥰", "🤩", "😎", "🤠"
    ];
  
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  }
  
  const randomEmoji = generateRandomEmoji();
  document.getElementById("emoji").innerText = randomEmoji;


function addNewCommentCard(comment){
    const commentContainer = document.getElementById("cmt_cont");

    let cardDiv = document.createElement("p");
    cardDiv.setAttribute("class", "cmt_card");

    let nameH3 = document.createElement("h3");
    nameH3.setAttribute("class", "user_id");
    nameH3.textContent = `${generateRandomEmoji()} ${comment.comment.name}`;

    let nameP = document.createElement("p");
    nameP.setAttribute("class", "comment");
    nameP.textContent = `↪ ${comment.comment.comment}`;

    cardDiv.appendChild(nameH3);
    cardDiv.appendChild(nameP);
    commentContainer.prepend(cardDiv);

    document.getElementById("cmt_name").value = "";
    document.getElementById("cmt_cmt").value = "";

    submitButton.disabled = false;
}


const submitButton = document.getElementById("sub_btn");
submitButton.addEventListener("click", (ev) => {

    submitButton.disabled = true;

    let commentData = {};
    let receivedComment = {};
    let JSONComment;

    const name = document.getElementById("cmt_name").value;
    const comment = document.getElementById("cmt_cmt").value;
    const postId = receivedData.id;
    console.log(name, comment);

    if (!name || !comment ){
        submitButton.disabled = false;
        return;
    }
    
    commentData = {
        name: name,
        comment: comment,
        postid: postId,
    };

    addComment(commentData);
});

const addComment = async (commentData) => {
    
    try {
        const url = `https://blog-backend-0w7q.onrender.com/add-comment`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData, null, 4),
        });
        const data = await response.json();
        if (response.status != 200){
            return data.disp_msg;
        } else {
            receivedComment = data;
            addNewCommentCard(receivedComment);
            return "";
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        return "500";
    }
}

setDefaultTheme();