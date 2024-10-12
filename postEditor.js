let paragraphEnd = true;
let isBlank = true;
let paragraphCount = 0;
let makeUpperNext = false;
let newParagraph;
let isHeadingAdded = false, toAddHeading = true;

const disallowedKeys = [
                            "Tab", "Unidentified", "AudioVolumeMute", "AudioVolumeDown", 
                            "MediaTrackNext", "MediaPlayPause", "MediaTrackPrevious", "AudioVolumeUp", "Alt", "End", 
                            "Delete", "Insert", "Home", "PageUp", "PageDown", "ArrowUp", "ArrowDown", "ArrowLeft", 
                            "ArrowRight", "NumLock", "CapsLock", "ScrollLock", "Escape"
                        ];
const disallowedFkeys = ["F1", "F2","F3","F4","F5","F6","F7","F8","F9","F10","F11", "F12"];


function isKeyAllowed(ev){
    if (
        ev.ctrlKey || ev.key == "CapsLock" || 
        ev.key == "NumLock" || ev.metaKey || 
        disallowedKeys.includes(ev.key) || disallowedFkeys.includes(ev.key)
    )
    {
        return false;
    } else {
        return true;
    }
}

document.getElementById("textHeading").onclick = (e) => {
    toAddHeading = true;
}

document.getElementById("textContainer").onclick = (e) => {
    toAddHeading = false;
}

window.onkeydown = function(ev){
    if (!isKeyAllowed(ev)){
        return;
    }
    
    if (toAddHeading){
        addTextToHeading(ev);
        return;
    }
    
    addTextToWindow(ev);
}

function addTextToHeading(event){
    if (event.key == "Shift"){
        makeUpperNext = true;
        return;
    }

    if (event.key == "Backspace"){
        let str = document.getElementById("textHeading").textContent;
        document.getElementById("textHeading").textContent = str.slice(0, -1);
        return;
    }

    if (makeUpperNext == true){
        event.key = event.key.toUpperCase();
    }

    if (event.key == "Enter"){
        toAddHeading = false;
        return;
    }
    
    document.getElementById("textHeading").textContent += event.key;
}

function addTextToWindow(event)
{
    let currentParagraph = `newParagraph_${paragraphCount}`;

    if (event.key == "Shift"){
        makeUpperNext = true;
        return;
    }

    if (event.key == "Backspace"){
        let str = document.getElementById(currentParagraph).textContent;

        if (str.length < 1){
            paragraphCount -= 1;
        }

        if (str.length < 1 && paragraphCount < 0){
            toAddHeading = true;
        }

        document.getElementById(currentParagraph).textContent = str.slice(0, -1);
        return;
    }

    if (makeUpperNext == true){
        event.key = event.key.toUpperCase();
    }

    if (event.key == "Enter" && !paragraphEnd){
        paragraphEnd = true;
        paragraphCount += 1;
        return;
    } else if (event.key == "Enter"){
        return;
    }

    if (paragraphEnd === true || isBlank){
        const newParagraph = document.createElement("p");
        newParagraph.textContent += event.key;
        newParagraph.id = currentParagraph;
        newParagraph.classList.add("newParagraph");
        const container = document.getElementById("textContainer");
        container.appendChild(newParagraph);
        paragraphEnd = false;
        isBlank = false;
    } else{
        document.getElementById(currentParagraph).textContent += event.key;
    }
}