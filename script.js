var searchBtn = $('#searchBtn');
var infoCity = $('#info-city');
var infoTmp = $('#info-tmp');
var infoWind = $('#info-wind');
var infoHmd = $('#info-humid');
var searchInput = document.querySelector('#cityName');
var cityName;
var currentWeatherUrl;
var forecastWeatherUrl;

function getApi(city) {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=d20404bf94b627d60e0102bffa537c06`;
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
// `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d20404bf94b627d60e0102bffa537c06`

function getForecastApi(city) {
    var forecastWeatherUrl = `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=imperial&cnt=5&appid=d20404bf94b627d60e0102bffa537c06`;
    fetch(forecastWeatherUrl)
    .then(function(response) {
        console.log(response.status + "<<<<forecast");
        return response.json()
    })
    .then(function(data) {
        console.log(data + "<<<<<<<<<<<<<<<Forecast Data")
        // console.log(data.list[0]);
        // console.log(data.list[0].main.temp);
        // console.log(data.list[0].wind.speed);
        // console.log(data.list[0].main.humidity);
        // console.log(data.list[8]);
        // console.log(data.list[16]);
        // console.log(data.list[24]);
        // console.log(data.list[32]);
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
    for (let i = 0; i < data.list.length; i + 8) {
        console.log(data.list[i] + "<<<<<<<<<<<")
    }
    
    //change info-card content
    //make the 5-day-forecast cards and parse the info from the api
}

//probably another event listener on the search history that links
//to the createCards function.
