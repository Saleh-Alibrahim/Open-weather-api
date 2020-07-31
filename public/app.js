/* Global Variables */
const localhost = 'http://localhost:5000';
const openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
const openWeatherApiKey = 'ca637ed5ccc3fe37d3c21ecfef1a297c';
const feelings = document.getElementById('feelings');
const zip = document.getElementById('zip');
const errorMessage = document.getElementById('error-message');
const entryHolder = document.getElementById('entryHolder');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();




document.getElementById('generate').addEventListener('click', async function (e) {

    try {


        // Prevent the default of submit action
        e.preventDefault();

        // Get The feelings and zip code
        feelingsValue = feelings.value;
        zipValue = zip.value;

        // If either is empty show error
        if (!feelingsValue || !zipValue) {
            showErrorMessage('Please fill all the fields');
            return;
        }
        else {
            hideErrorMessage();
        }

        // Call the open weather api
        let temperature = await getOpenWeatherApiData();

        // Api call field
        if (!temperature) { return; }

        // Store all the fields to one object
        let projectData = {
            date: newDate,
            feelings: feelingsValue,
            zip: zipValue,
            temperature: temperature
        };

        let serverResponse = await postDataToServer(projectData);


        // Check if the server successed if so show the result to client  
        if (serverResponse.success) {
            entryHolder.children[0].innerHTML = `date = ${projectData.date}`;
            entryHolder.children[1].innerHTML = `temp = ${projectData.temperature}`;
            entryHolder.children[2].innerHTML = `content = ${projectData.feelings}`;
        }

    }
    catch (error) {
        console.log(error);
    }


});

async function getOpenWeatherApiData() {
    // Call the open weather api
    let openWeatherResponse = await fetch(`${openWeatherUrl}?zip=${zipValue}&appid=${openWeatherApiKey}&units=imperial`);

    // Convert the result to json
    let jsonOpenWeatherResponse = await openWeatherResponse.json();

    // Show error message if wrong zip number 
    if (jsonOpenWeatherResponse.cod != 200) {
        showErrorMessage(jsonOpenWeatherResponse.message);
        return;
    }
    else {
        hideErrorMessage();
    }

    // Get the temperature from the response
    return jsonOpenWeatherResponse.main.temp;
}

async function postDataToServer(projectData) {
    // Call the server
    let ServerResponse = await fetch('/', {
        method: 'POST',
        body: JSON.stringify(projectData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Convert the server response to json
    let JsonServerResponse = await ServerResponse.json();

    return JsonServerResponse;
}




function showErrorMessage(msg) {
    errorMessage.innerHTML = msg;
    if (!errorMessage.classList.contains('show-message')) {
        errorMessage.classList.add('show-message');
    }
}
function hideErrorMessage() {
    if (errorMessage.classList.contains('show-message')) {
        errorMessage.classList.remove('show-message');
    }
}