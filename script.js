//Todo, add dates for after this, have it be paused during permis
//Toggle different cope levels so it isnt linear
// make ti so that all the copes are in a linear list so that the going through all of them is easier
// also make it so that the cipe just makes them true up untill a point. 
const permisDates = [[ new Date("October 24, 2024 14:10:00").getTime(), ],[ new Date("October 24, 2024 14:10:00").getTime()]]


//Set the date we're counting down to
const countdownDate = new Date("October 24, 2024 14:10:00").getTime();
let cope = 0;
let dinnerCope       = false;
let breakfastCope    = false;
let lunchCope        = false;
let sleepCope        = false;
let timeAfterHVOCope = false;
let cleaningCope     = false;
let morningCope      = false;
let caffeineCope      = false;


//Function to update the countdown timer
function updateCountdown() {
    //Get the current time
    const now = new Date().getTime();
    koffein = false;
    let temp = 0;


    //FUuck switch
   /* if (cope == 0){
        temp = countSecondsToTarget([[]]);
    }else if (cope == 1){
        temp = countSecondsToTarget([[22,0,5,40]]);
    }else if (cope == 2){
        temp = countSecondsToTarget([[22,0,5,40], [11,0,11, 45 ], [16,0,16, 45]]);
    }else if (cope == 3){
        temp = countSecondsToTarget([[22,0,5,40], [11,0,11, 45 ], [16,0,16, 45], [6,0,6,30]]);
    }else if (cope == 4){
        temp = countSecondsToTarget([[22,0,5,40], [11,0,11, 45 ], [16,0,16, 45], [6,0,6,30], [19,30,22,0]]);
    }else if (cope == 5){
        temp = countSecondsToTarget([[22,0,5,40], [11,0,11, 45 ], [16,0,16, 45], [6,0,6,30], [19,30,22,0]]);
        temp -= subtractSaturday();
    }else if (cope == 6){
        temp = countSecondsToTarget([[22,0,5,40], [11,0,11, 45 ], [16,0,16, 45], [6,0,6,30], [19,30,22,0], [5,40,6,0],  [6,30,8,0]]);
        temp -= subtractSaturday();
    }else if (cope == 7){
        temp = countSecondsToTarget([[22,0,5,40], [11,0,11, 45 ], [16,0,16, 45], [6,0,6,30], [19,30,22,0], [5,40,6,0],  [6,30,8,0], [8,0,11,0]]);
        temp -= subtractSaturday();
    }else if (cope >= 8){
        temp = countSecondsToTarget([[22,0,5,40], [11,0,11, 45 ], [16,0,16, 45], [6,0,6,30], [19,30,22,0], [5,40,6,0],  [6,30,8,0], [8,0,11,0]]);
        temp -= subtractSaturday();
        koffein = true;
    }*/

   let times = setCopeLevel();
    
   temp = countSecondsToTarget(times);
    if (caffeineCope){
        temp = temp/2;
    }
    const distance = temp;
    
    const days    = Math.floor( distance / (60 * 60 * 24));
    const hours   = Math.floor((distance % (60 * 60 * 24)) / (60 * 60)) + days * 24;
    const minutes = Math.floor((distance % (60 * 60)) / ( 60));
    const seconds = Math.floor((distance % (60)));
    
    // Create the formatted string for display
    let timeString = `${hours} timmar, ${minutes} minuter, och ${seconds} sekunder`;

    document.getElementById("timer").innerText = timeString;

    if (distance < 0) {
        document.getElementById("timer").innerHTML = "<h2>Countdown Finished!</h2>";
    }
}

setInterval(updateCountdown, 1000);


function countSecondsToTarget(times) {
    const now = new Date(); // Current time

    let targetDate = new Date(now.getFullYear(), 9, 24, 14, 0, 0); 
    // Month is 0-based (October = 9)

    //If today is past cctober 24th, adjust to next year
    if (now > targetDate) {
        targetDate.setFullYear(now.getFullYear() + 1);
    }

    let totalSeconds = Math.trunc((targetDate - now)/1000); 
    //Total seconds until the target
    
    if (times.length > 0) {       
        //Subtract sleeping seconds from the total
        for (let time of times) {
            if (time.length > 0) {
                totalSeconds = totalSeconds - calculateSleepingSeconds(time[0], time[1], time[2], time[3], targetDate);
            }
        }
    }
    return totalSeconds;
}

function calculateSleepingSeconds(aHour, aMinute, bHour, bMinute, endDate) {
    const now = new Date();

    //Define the sleep start and end times
    let sleepStart = new Date(now);
    sleepStart.setHours(aHour, aMinute, 0, 0);

    let sleepEnd = new Date(now);
    sleepEnd.setHours(bHour, bMinute, 0, 0);

    //If sleep start is later than sleep end, it means they sleep past midnight
    if (sleepStart > sleepEnd) {
        sleepEnd.setDate(sleepEnd.getDate() + 1);
    }

    let sleepingSeconds = 0;
    const totalDays = Math.floor((endDate - now) / (1000 * 60 * 60 * 24)); 
    //Total days until target date


    //Add sleep time for today
    if (now < sleepStart) {
        sleepingSeconds += (sleepEnd - sleepStart) / 1000;
    } else if (now > sleepEnd) {
        //If current time is after sleep time, do nothing
    } else {
        sleepingSeconds += (sleepEnd - now) / 1000; //We're in the sleep period today
    }

    

    //Add sleep time for all the full days between now and the end date
    const sleepDurationPerDay = (sleepEnd - sleepStart) / 1000; //Duration of sleep in seconds
    sleepingSeconds += (totalDays-1) * sleepDurationPerDay;

    
    
    //Add sleep time for the last partial day
    let sleepStartNextDay = new Date(sleepStart);
    sleepStartNextDay.setDate(sleepStartNextDay.getDate() + totalDays);
    let sleepEndNextDay = new Date(sleepEnd);
    sleepEndNextDay.setDate(sleepEndNextDay.getDate() + totalDays);
    if (sleepStartNextDay < endDate) {
        if (now < sleepStartNextDay) {
            sleepingSeconds += (sleepEndNextDay - sleepStartNextDay) / 1000;
        } else if (now > sleepEndNextDay) {
            sleepingSeconds += (endDate - sleepStartNextDay) / 1000;
        } else {
            sleepingSeconds += (endDate - now) / 1000;
        }
    }


    return sleepingSeconds;
}

function subtractSaturday(){
    const now = new Date();
    endDate   = new Date(now.getFullYear(), 9, 24, 14, 0, 0);
    
    
    //Ensure that the end date is after the current date
    if (endDate <= now) {
        return 0; 
        //No time left to find a Saturday
    }

    //Loop through each day from now until the end date
    let currentDate = new Date(now); // Start from 'now'
    
    while (currentDate <= endDate) {
        //Check if the current day is a Saturday 
        if (currentDate.getDay() === 6) {
            if (now.getDay() !== 6) {
                return  9900
            }
            const start = new Date(now);
            start.setHours(16, 45, 0, 0);
            

            if (now < start){
                return 9900
            }

            const targetTime = new Date(now);
            targetTime.setHours(19, 30, 0, 0); 
        
            //Calculate the difference between now and 1930
            const timeDiff = targetTime - now;
        
            if (timeDiff <= 0) {
                return 0;
            }
        
            
        
            return timeDiff/1000
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }
    return 0;

}


function setCopeLevel(){
    copes = [];
     
    if (sleepCope) {
        copes.push([22, 0, 5, 40]);
    }
    if (dinnerCope) {
        copes.push([16, 0, 16, 45]);
    }
    if (breakfastCope) {
        copes.push([6, 0, 6, 30]);
    }
    if (lunchCope) {
        copes.push([11, 0, 11, 45]);
    }
    if (timeAfterHVOCope) {
        copes.push([19, 30, 22, 0]);
    }
    if (cleaningCope) {
        copes.push([5, 40, 6, 0]);
        copes.push([6, 30, 8, 0]);
    }
    if (morningCope) {
        copes.push([8, 0, 11, 0]);
    }
    
    return copes;
}





const strings = [
    "Ta bort timmarna du sover!", "Lunch och middag går ändå så fort!", "Frukosten med!", "Glöm inte tiden efter HVO!", "Glöm inte att vi har kortare lördagar!", "Är städning ens tjänst??", "Morgonen går ändå så fort!", "Koffein får allt att gå snabbare!"
];

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
    
    
    
    
    const currentString = strings[cope];
    createFloatingText(currentString);
    if (cope <8){
        cope++;
    }else if (dinnerCope && breakfastCope && lunchCope && sleepCope && timeAfterHVOCope && cleaningCope && morningCope && caffeineCope){
        createFloatingText("No more cope :(")
    }else{
        dinnerCope       = true;
        breakfastCope    = true;
        lunchCope        = true;
        sleepCope        = true;
        timeAfterHVOCope = true;
        cleaningCope     = true;
        morningCope      = true;
        caffeineCope     = true;
        toggleSwitch(sleepSwitch.id, sleepCope);
        toggleSwitch(dinnerSwitch.id, dinnerCope);
        toggleSwitch(breakfastSwitch.id, breakfastCope);
        toggleSwitch(lunchSwitch.id, lunchCope);
        toggleSwitch(timeAfterHVOSwitch.id, timeAfterHVOCope);
        toggleSwitch(cleaningSwitch.id, cleaningCope);
        toggleSwitch(morningSwitch.id, morningCope);
        toggleSwitch(caffeineSwitch.id, caffeineCope);
    }
    //COPE INCREASES

    if (cope == 1) {
        sleepCope = true;
    } else if (cope == 2) {
        
        dinnerCope = true;
        lunchCope = true;
        
    } else if (cope == 3) {
        breakfastCope = true;
        
    } else if (cope == 4) {
        timeAfterHVOCope = true;
        
    } else if (cope == 6) {
        cleaningCope = true;
        
    } else if (cope == 7) {
        morningCope = true;
        
    }else if (cope == 8) {
        caffeineCope = true;        
    }
    
    console.log(cope)

    copeButton.disabled = false;
    copeButton.textContent = "Cope"

    /*  {
        // Once all strings have been displayed, disable the button
        copeButton.disabled = true;
        copeButton.textContent = "No more cope :(";
    }*/
    
    toggleSwitch(sleepSwitch.id, sleepCope);
    toggleSwitch(dinnerSwitch.id, dinnerCope);
    toggleSwitch(breakfastSwitch.id, breakfastCope);
    toggleSwitch(lunchSwitch.id, lunchCope);
    toggleSwitch(timeAfterHVOSwitch.id, timeAfterHVOCope);
    toggleSwitch(cleaningSwitch.id, cleaningCope);
    toggleSwitch(morningSwitch.id, morningCope);
    toggleSwitch(caffeineSwitch.id, caffeineCope);
});

function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = Math.floor(seconds % 60);
    return `${hours} timmar, ${minutes} minuter, och ${seconds} sekunder`;
}





const lightModeRadio = document.getElementById('value-1');
const darkModeRadio = document.getElementById('value-2');
const hackerModeRadio = document.getElementById('value-3');

//Function to apply the appropriate mode class
/*
function applyMode(mode) {
  document.body.classList.remove('light-mode', 'dark-mode', 'hacker-mode');

  if (mode === 'light') {
    document.body.classList.add('light-mode');
  } else if (mode === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (mode === 'hacker') {
    document.body.classList.add('hacker-mode');
  }
}
  */

window.onload = (event) =>{
    document.documentElement.setAttribute('data-theme', 'dark');
};

lightModeRadio.addEventListener('change', () => {
  if (lightModeRadio.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
});

darkModeRadio.addEventListener('change', () => {
  if (darkModeRadio.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});

hackerModeRadio.addEventListener('change', () => {
  if (hackerModeRadio.checked) {
    document.documentElement.setAttribute('data-theme', 'hacker');
    //applyMode(light)
  }
});


function updateCopeLevel(){
    if (sleepCope) {
        copeLevel = 1;
    }
    if (dinnerCope && lunchCope) {
        copeLevel = 2;
    }
    if (breakfastCope) {
        copeLevel = 3;
    }
    if (timeAfterHVOCope) {
        copeLevel = 4;
    }
    if (cleaningCope) {
        copeLevel = 6;
    }
    if (morningCope) {
        copeLevel = 7;
    }
    if (caffeineCope){
        copeLevel = 8;
    }
    cope=copeLevel
}



const sleepSwitch        = document.getElementById('sleep');
const dinnerSwitch       = document.getElementById('dinner');
const breakfastSwitch    = document.getElementById('breakfast');
const lunchSwitch        = document.getElementById('lunch');
const timeAfterHVOSwitch = document.getElementById('timeAfterHVO');
const cleaningSwitch     = document.getElementById('cleaning');
const morningSwitch      = document.getElementById('morning');
const caffeineSwitch     = document.getElementById('caffeine');

function handleSwitchChange(event) {
    dinnerCope      = dinnerSwitch.checked;
    breakfastCope    = breakfastSwitch.checked;
    lunchCope        = lunchSwitch.checked;
    sleepCope        = sleepSwitch.checked;
    timeAfterHVOCope = timeAfterHVOSwitch.checked;
    cleaningCope     = cleaningSwitch.checked;
    morningCope      = morningSwitch.checked;
    caffeineCope     = caffeineSwitch.checked;
    updateCopeLevel();
    updateCountdown();
}

sleepSwitch.       addEventListener('change', handleSwitchChange);
dinnerSwitch.      addEventListener('change', handleSwitchChange);
breakfastSwitch.   addEventListener('change', handleSwitchChange);
lunchSwitch.       addEventListener('change', handleSwitchChange);
timeAfterHVOSwitch.addEventListener('change', handleSwitchChange);
cleaningSwitch.    addEventListener('change', handleSwitchChange);
morningSwitch.     addEventListener('change', handleSwitchChange);
caffeineSwitch.     addEventListener('change', handleSwitchChange);



function toggleSwitch(switchId, current) {
    const switchElement = document.getElementById(switchId);
    if (switchElement) {
        // Toggle the checked state (if it's checked, uncheck it; if unchecked, check it)
        switchElement.checked = current;

    }
}
