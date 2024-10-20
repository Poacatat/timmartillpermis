//TODO, add dates for after this, have it be paused during permis
//Toggle different cope levels so it isnt linear
// make ti so that all the copes are in a linear list so that the going through all of them is easier
// also make it so that the cipe just makes them true up untill a point. 
//TODO make a better permanent thing for the cope levels so theyre always chilling togeher

const permisDates = [[ new Date("October 24, 2024 14:10:00").getTime(), ],[ new Date("October 24, 2024 14:10:00").getTime()]]

import { updateCountdown } from "./secondCounter.js";
//import {setup} from "./digitalRain.js";


//Set the date we're counting down to
const countdownDate = new Date("October 24, 2024 14:10:00").getTime();
let cope = 0;
let copes = {
    dinner: false,
    breakfast: false,
    lunch: false,
    sleep: false,
    timeAfterHVO: false,
    cleaning: false,
    morning: false,
    caffeine: false
  };
  


//Function to update the countdown timer
setInterval(() => {
    updateCountdown(copes); // Decrease or update the value
}, 1000);

const strings = [
    "Ta bort timmarna du sover!",
    "Lunch och middag går ändå så fort!",
    "Frukosten med!",
    "Glöm inte tiden efter HVO!",
    "Glöm inte att vi har kortare lördagar!",
    "Är städning ens tjänst??",
    "Morgonen går ändå så fort!",
    "Koffein får allt att gå snabbare!"
];

//TODO put this in seperate file
function createFloatingText(text) {
    const textDiv = document.createElement("div");
    textDiv.classList.add("floating-text");
    textDiv.textContent = text;

    //Generate a random Y position between 0% and 80% of the container's height
    const randomYPosition = Math.random() * 80;  // Y position between 0% and 80%

    //Set the Y-axis position using inline style (this will make the text float at different vertical positions)
    textDiv.style.top = `${randomYPosition}%`;

    textContainer.appendChild(textDiv);

    //Remove the text div after the animation is finished
    textDiv.addEventListener("animationend", () => {
        textContainer.removeChild(textDiv); 
    });
}


//Get references to the DOM elements
const copeButton = document.getElementById("cope-button");

const textContainer = document.getElementById("floating-text-container");

copeButton.addEventListener("click", () => {
   // setup();
    const currentString = strings[cope];
    createFloatingText(currentString);
    //TODO just add no more cope to string list
    if (cope <8){
        cope++;
         //COPE INCREASES
    }else if (Object.values(copes).every(copeState => copeState)) {
        createFloatingText("No more cope :(");
    } else {
        // Automatically enable all copes if not all are enabled
        Object.keys(copes).forEach(copeKey => {
            copes[copeKey] = true;
        });

        // Toggle switches to reflect changes in the copes object
        Object.keys(copes).forEach(copeKey => {
            toggleSwitch(`${copeKey}Switch`, copes[copeKey]);
        });
        Object.keys(copes).forEach(copeKey => {
            toggleButton(`${copeKey}Button`, copes[copeKey])
        })
    }
   

    if (cope === 1) {
        copes.sleep = true;
    } else if (cope === 2) {
        copes.dinner = true;
        copes.lunch = true;
    } else if (cope === 3) {
        copes.breakfast = true;
    } else if (cope === 4) {
        copes.timeAfterHVO = true;
    } else if (cope === 6) {
        copes.cleaning = true;
    } else if (cope === 7) {
        copes.morning = true;
    } else if (cope === 8) {
        copes.caffeine = true;
    }
    

    copeButton.disabled = false;
    copeButton.textContent = "Cope"

    /*  {
        // Once all strings have been displayed, disable the button
        copeButton.disabled = true;
        copeButton.textContent = "No more cope :(";
    }*/
    
    //Toggle switches according to the updated cope object
    Object.keys(copes).forEach(copeKey => {
        toggleSwitch(`${copeKey}Switch`, copes[copeKey]);
    });
    Object.keys(copes).forEach(copeKey => {
        toggleButton(`${copeKey}Button`, copes[copeKey]);
    });
});


function updateCopeLevel(){
    cope = 0;
    console.log(copes.sleep)
    if (copes.sleep) {
        cope = 1;
    } else if (copes.dinner && copes.lunch) {
        cope = 2;
    } else if (copes.breakfast) {
        cope = 3;
    } else if (copes.timeAfterHVO) {
        cope = 4;
    } else if (copes.cleaning) {
        cope = 6;
    } else if (copes.morning) {
        cope = 7;
    } else if (copes.caffeine) {
        cope = 8;
    }
    Object.keys(copes).forEach(copeKey => {
        toggleButton(`${copeKey}Button`, copes[copeKey]);
    });
    Object.keys(copes).forEach(copeKey => {
        toggleSwitch(`${copeKey}Switch`, copes[copeKey]);
    });
}



const switches = {
    sleep:        document.getElementById('sleepSwitch'),
    dinner:       document.getElementById('dinnerSwitch'),
    breakfast:    document.getElementById('breakfastSwitch'),
    lunch:        document.getElementById('lunchSwitch'),
    timeAfterHVO: document.getElementById('timeAfterHVOSwitch'),
    cleaning:     document.getElementById('cleaningSwitch'),
    morning:      document.getElementById('morningSwitch'),
    caffeine:     document.getElementById('caffeineSwitch')
  };


function handleSwitchChange() {
    Object.keys(switches).forEach(copeKey => {
        copes[copeKey] = switches[copeKey].checked;
    });

    updateCopeLevel();
    updateCountdown(copes);
}


Object.keys(switches).forEach(copeKey => {
    switches[copeKey].addEventListener('change', handleSwitchChange);
});



function toggleSwitch(switchId, current) {
    const switchElement = document.getElementById(switchId);
    if (switchElement != null) {
        switchElement.checked = current;
    }
}




const copeButtons = {
    sleep:        document.getElementById('sleepButton'),
    dinner:       document.getElementById('dinnerButton'),
    breakfast:    document.getElementById('breakfastButton'),
    lunch:        document.getElementById('lunchButton'),
    timeAfterHVO: document.getElementById('timeAfterHVOButton'),
    cleaning:     document.getElementById('cleaningButton'),
    morning:      document.getElementById('morningButton'),
    caffeine:     document.getElementById('caffeineButton')
};

Object.keys(copeButtons).forEach(copeKey => {
    copeButtons[copeKey].addEventListener("click", (event) => { setCopeLevelsButton(event) });
});

//TODO mimimize window

function setCopeLevelsButton(event) {

    const elementId = event.srcElement.id;

    document.getElementById(elementId).innerText = document.getElementById(elementId).innerText == "false" ? "true" : "false";

    Object.keys(copeButtons).forEach(copeKey => {
        copes[copeKey] = copeButtons[copeKey].innerText == 'true';
    });
    
    updateCopeLevel();

    updateCountdown(copes);
}

function toggleButton(buttonId, current) {
    const switchElement = document.getElementById(buttonId);
    if (switchElement != null) {
        switchElement.innerText = current? "true" : "false"
    }
}