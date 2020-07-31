/* Global Variables */
const localhost = 'http://localhost:5000';
const openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
const openWeatherApiKey = 'ca637ed5ccc3fe37d3c21ecfef1a297c';
const feelings = document.getElementById('feelings');
const zip = document.getElementById('zip');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();




document.getElementById('generate').addEventListener('click', async function (e) {

    // Prevent the default of submit action
    e.preventDefault();

    // Get The feelings and zip code
    feelingsValue = feelings.textContent;
    zipValue = zip.textContent;

    // If either is empty show error
    if (!feelingsValue || !zipValue) {
        showErrorMessage();
        return;
    }
    else {
        hideErrorMessage();
    }
    // Call the open weather api
    const response = await fetch(`${openWeatherUrl}?zip=${zipValue}&appid=${openWeatherApiKey}&units=imperial`);

    // Convert the result to json
    const jsonRes = response.json();


});

function showErrorMessage() {

}
function hideErrorMessage() {

}