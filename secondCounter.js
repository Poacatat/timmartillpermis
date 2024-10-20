export function updateCountdown(copes) {
    //Get the current time
    const now = new Date().getTime();
    let temp = 0;

    let times = setCopeLevel(copes);
    
    temp = countSecondsToTarget(times);
    if (copes.caffeine){
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



export function countSecondsToTarget(times) {
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

export function calculateSleepingSeconds(aHour, aMinute, bHour, bMinute, endDate) {
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

function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = Math.floor(seconds % 60);
    return `${hours} timmar, ${minutes} minuter, och ${seconds} sekunder`;
}


function setCopeLevel(copes){
    let copeTimes = [];
     
    if (copes.sleep) {
        copeTimes.push([22, 0, 5, 40]);
    }
    if (copes.dinner) {
        copeTimes.push([16, 0, 16, 45]);
    }
    if (copes.breakfast) {
        copeTimes.push([6, 0, 6, 30]);
    }
    if (copes.lunch) {
        copeTimes.push([11, 0, 11, 45]);
    }
    if (copes.timeAfterHVO) {
        copeTimes.push([19, 30, 22, 0]);
    }
    if (copes.cleaning) {
        copeTimes.push([5, 40, 6, 0]);
        copeTimes.push([6, 30, 8, 0]);
    }
    if (copes.morning) {
        copeTimes.push([8, 0, 11, 0]);
    }
    
    
    return copeTimes;
}