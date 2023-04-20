var searchBtn = $('#searchBtn');
var infoCity = $('#info-city');
var infoTmp = $('#info-tmp');
var infoWind = $('#info-wind');
var infoHmd = $('#info-humid');
var searchInput = document.querySelector('#cityName');
var cityName;
var currentWeatherUrl;

function getApi(city) {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=d20404bf94b627d60e0102bffa537c06`
    fetch(currentWeatherUrl)
     .then(function (response) {
        console.log(response.status);
        return response.json();
     })
     .then(function(data) {
        console.log(data);
        console.log(data.name);
        passData(data);
     });
}
function getForecastApi(city) {
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d20404bf94b627d60e0102bffa537c06`;
    fetch(forecastWeatherUrl)
    .then(function(response) {
        console.log(response.status + "<<<<forecast");
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        console.log(data.list[1])
        // get the array of the days u need
        //function card
    })
}

function passData(data) {
    infoCity.text(data.name);
    infoTmp.text('Temperature: ' + data.main.temp + 'F');
    infoWind.text('Wind: ' + data.wind.speed + 'MPH')
    infoHmd.text('Humidity: '+ data.main.humidity);
}

searchBtn.on('click', function(event) {
    event.preventDefault();
    cityName = searchInput.value.trim();
    console.log(cityName);
    console.log("Searched");
    getApi(cityName);
    getForecastApi(cityName);
    //gets current, future conditions of the city thru weathermap api
    //use localStorage to create n append buttons as history
});

function createCards() {
    //change info-card content
    //make the 5-day-forecast cards and parse the info from the api
}

//probably another event listener on the search history that links
//to the createCards function.
