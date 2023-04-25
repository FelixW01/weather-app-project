var searchBtn = $('#searchBtn');
var infoCity = $('#info-city');
var infoTmp = $('#info-tmp');
var infoWind = $('#info-wind');
var infoHmd = $('#info-humid');
var forecast = $('#forecastCards');
var searchInput = document.querySelector('#cityName');
var form = $('#searchForm');
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
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=d20404bf94b627d60e0102bffa537c06`;
    fetch(forecastWeatherUrl)
    .then(function(response) {
        console.log(response.status + "<<<<forecast");
        return response.json()
    })
    .then(function(data) {
        for (var i = 1; i < data.list.length; i=i + 8) {
            var divEl = document.createElement("div");
            var imgEl = document.createElement('img');
            var h3El = document.createElement('h3');
            var pEl = document.createElement('p');
            var pEl2 = document.createElement('p');
            var pEl3 = document.createElement('p');
            h3El.textContent = data.list[i].dt_txt;
            imgEl.setAttribute('src', 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png')
            pEl.textContent = 'Temp: ' + data.list[i].main.temp + "°F";
            pEl2.textContent = 'Wind: ' + data.list[i].wind.speed + "mph";
            pEl3.textContent = 'Humidity: ' + data.list[i].main.humidity;
            forecast.append(divEl)
            divEl.append(h3El)
            divEl.append(imgEl)
            divEl.append(pEl)
            divEl.append(pEl2)
            divEl.append(pEl3)
        }
        console.log(data)
    })
}

function passData(data) {
    infoCity.text(data.name);
    infoTmp.text('Temperature: ' + data.main.temp + '°F');
    infoWind.text('Wind: ' + data.wind.speed + 'mph')
    infoHmd.text('Humidity: '+ data.main.humidity);
}

searchBtn.on('click', function(event) {
    event.preventDefault();
    cityName = searchInput.value.trim();
    console.log(cityName);
    getApi(cityName);
    getForecastApi(cityName);
    createButtons();
    //gets current, future conditions of the city thru weathermap api
    //use localStorage to create n append buttons as history
});

function createButtons() {
    let historyStorage = localStorage.getItem('cityHistory');
    const cityHistory = JSON.parse(historyStorage);
    console.log(historyStorage)
    console.log(cityHistory)
    for (let i = 0; i < cityHistory.length; i++) {
    var historyButton = document.createElement('button');
    historyButton.setAttribute('id', 'historyBtn');
    historyButton.classList.add('searchButton', 'btn', 'btn-primary');
    historyButton.textContent = cityHistory[i];
    form.append(historyButton);
    }
    localStorage.setItem('cityHistory', JSON.stringify(cityName));
}

//probably another event listener on the search history that links
//to the createCards function.
