function setDefaultMainTheme(){

    const savedMode = localStorage.getItem('themeMode');
    
    if (savedMode == "Light"){
        document.documentElement.style.setProperty('--bg-color', '#cccccc');
        document.documentElement.style.setProperty('--color', '#121212');
        document.documentElement.style.setProperty('--arr-color', 'rgba(0, 0, 0, 0.08)');
        document.documentElement.style.setProperty('--lg-color', 'rgba(0, 0, 0, 0.05)');
        document.documentElement.style.setProperty('--button-color', 'rgba(236, 236, 236, 0.6)');
        document.documentElement.style.setProperty('--extra-color', '#aaaaaa');
    } else{
        document.documentElement.style.setProperty('--bg-color', '#121212');
        document.documentElement.style.setProperty('--color', 'bisque');
        document.documentElement.style.setProperty('--arr-color', 'rgba(255, 228, 196, 0.05)');
        document.documentElement.style.setProperty('--lg-color', 'rgba(128, 128, 128, 0.02)');
        document.documentElement.style.setProperty('--button-color', 'rgba(36, 36, 36, 0.6)');
        document.documentElement.style.setProperty('--extra-color', '#313131');
    }
}

function setDefaultPostTheme(){

    const savedMode = localStorage.getItem('themeMode');
    
    if (savedMode == "Light"){
        document.documentElement.style.setProperty('--bg-color', '#cccccc');
        document.documentElement.style.setProperty('--color', '#121212');
        document.documentElement.style.setProperty('--extra-color', '#aaaaaa');
        document.documentElement.style.setProperty('--lg-color', 'rgba(0, 0, 0, 0.05)');
    } else{
        document.documentElement.style.setProperty('--bg-color', '#121212');
        document.documentElement.style.setProperty('--color', 'bisque');
        document.documentElement.style.setProperty('--extra-color', '#313131');
        document.documentElement.style.setProperty('--lg-color', 'rgba(128, 128, 128, 0.02)');
    }
}

function setDefaultTheme(){
    if (document.documentElement.getAttribute('data-page') == 'main'){
        setDefaultMainTheme();
    }
    else if (document.documentElement.getAttribute('data-page') == 'post'){
        setDefaultPostTheme();
    }
}

setDefaultTheme();