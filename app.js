let previousScrollPos = 0;
let currentTheme = 0;

window.onscroll = (ev) => {
    let widthOfStatus = document.documentElement.scrollTop / (document.body.clientHeight - window.innerHeight) * 100;
    widthOfStatus =  widthOfStatus ? widthOfStatus : 0;
    document.getElementById("scrollStatus").animate(
        {
            width: widthOfStatus + 'vw'
        }, {duration: 100, fill: 'forwards'}
    )
}

const handleScroll = function() {
    window.addEventListener('scroll', function() {
    const currentScrollPos = window.scrollY;

    let widthOfStatus = document.documentElement.scrollTop / (document.body.clientHeight - window.innerHeight) * 100;
    widthOfStatus =  widthOfStatus ? widthOfStatus : 0;
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
        document.documentElement.style.setProperty('--arr-color', 'rgba(0, 0, 0, 0.08)');
        document.documentElement.style.setProperty('--lg-color', 'rgba(0, 0, 0, 0.05)');
        document.documentElement.style.setProperty('--button-color', 'rgba(236, 236, 236, 0.6)');
        document.documentElement.style.setProperty('--extra-color', '#aaaaaa');
        document.getElementById("dark").style.display = "none";
        currentTheme = 1;

        // Save the mode to local storage.
        localStorage.setItem('themeMode', 'Light');
    }
    else if (currentTheme === 1){
        document.documentElement.style.setProperty('--bg-color', '#121212');
        document.documentElement.style.setProperty('--color', 'bisque');
        document.documentElement.style.setProperty('--arr-color', 'rgba(255, 228, 196, 0.05)');
        document.documentElement.style.setProperty('--lg-color', 'rgba(128, 128, 128, 0.02)');
        document.documentElement.style.setProperty('--button-color', 'rgba(36, 36, 36, 0.6)');
        document.documentElement.style.setProperty('--extra-color', '#313131');
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

setDefaultTheme();