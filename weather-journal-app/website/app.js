/* Global Variables */
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = `&appid=89a77ea5f2169f4a67c5164133d2ea8d`;
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=89a77ea5f2169f4a67c5164133d2ea8d

// Create a new date instance dynamically with JS
let d = new Date();
var newDate = d.getDate()+' / '+ (d.getMonth()+1)+' / '+ d.getFullYear()+' ( dd / mm / yyyy )';

// Listen for a click to the generate botton
const gen = document.querySelector('#generate');
gen.addEventListener('click', genBotClicked);

// The callback function
function genBotClicked (event) {
    event.preventDefault()
    const newZip = document.querySelector('#zip').value;
    const newFeelings = document.querySelector('#feelings').value;
    if (!newZip) {
        window.alert('Please enter a valid ZIP');
    }else {
        // Perform API call
        getWeatherInfo(baseURL, newZip, apiKey)
        
        // After successful request completed
        .then( function(newData) {
        // Perform POST request
        postNewData('/all', {
            date: newDate,
            temp: Math.round(newData.main.temp),
            content: newFeelings
            });
        })
        .then (function() {
            updateUserInterface();
        })
    }
};

// Main function to get weather informations live.
const getWeatherInfo = async (baseURL, newZip, apiKey) => { // baseURL, zipValue, regKey
    const requestFirst = await fetch (baseURL+newZip+apiKey);
    try {
        const newData = await requestFirst.json();
        return newData;
    }catch (error) {
        console.log('error', error);
    }
};

// POST
const postNewData = async (url ='', newData = {} ) => {
    console.log(newData);
    const requestSecond = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newData)
    });
    try {
        const finalData = await requestSecond.json();
        console.log(finalData);
        return finalData;
    }catch (error) {console.log('error', error);}
};

// Update UI
const updateUserInterface = async () => {
    const finalRequest = await fetch ('/all');
    try {
        const output = await finalRequest.json();
        console.log(output);
        document.getElementById('date').innerHTML = `Date: ${output.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${output.temp}°F == ${Math.round(5/9*(output.temp-32))}°C`;
        document.getElementById('content').innerHTML = `People Feel: ${output.content}`;
    }catch(error){
        console.log('error', error);
    }
};