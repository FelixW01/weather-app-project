var searchBtn = $('#searchBtn');
var infoCity = $('#info-city');
var infoTmp = $('#info-tmp');
var infoWind = $('#info-wind');
var infoHmd = $('#info-humid');
var forecast = $('#forecastCards');
var searchInput = document.querySelector('#cityName');
var form = $('#searchForm');
var historyDiv = $('#historyDiv');
var infoImg = $('#infoImg');
var cityName;
var currentWeatherUrl;

//gets info from weathermap api currentweather
function getApi(city) {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=d20404bf94b627d60e0102bffa537c06`
    fetch(currentWeatherUrl)
     .then(function (response) {
        return response.json();
     })
     .then(function(data) {
        passData(data);
        console.log(data)
     });
}
//gets info from weathermap api forecast
function getForecastApi(city) {
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=d20404bf94b627d60e0102bffa537c06`;
    forecast.html("");
    fetch(forecastWeatherUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        //creates the forecast cards
        for (var i = 1; i < data.list.length; i=i + 8) {
            var divEl = document.createElement("div");
            var imgEl = document.createElement('img');
            var h3El = document.createElement('h3');
            var pEl = document.createElement('p');
            var pEl2 = document.createElement('p');
            var pEl3 = document.createElement('p');
            h3El.textContent = dayjs(data.list[i].dt_txt).format('MM/DD/YYYY');
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
//passes the data for the currentforecast
function passData(data) {
    infoCity.text(data.name + " " + dayjs.unix(data.dt).format('MM/DD/YYYY'));
    // infoImg.setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png')
    infoTmp.text('Temperature: ' + data.main.temp + '°F');
    infoWind.text('Wind: ' + data.wind.speed + 'mph')
    infoHmd.text('Humidity: '+ data.main.humidity);
}

//search button event listener and runs the functions
searchBtn.on('click', function(event) {
    event.preventDefault();
    cityName = searchInput.value.trim();
    getApi(cityName);
    getForecastApi(cityName);
    createButtons();
});


//sets info to localstorage
function createButtons() {

   let cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];

    cityHistory.push(searchInput.value);
    localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
    
    displayButtons();
}

// gets info from localstorage and creating forecast cards
function displayButtons() {
    let cityHistory = JSON.parse(localStorage.getItem('cityHistory'));

    historyDiv.html("");
    if(cityHistory) {
        for (let i = 0; i < cityHistory.length; i++) {
            var historyButton = document.createElement('button');
            historyButton.setAttribute('id', 'historyBtn');
            historyButton.classList.add('searchButton', 'btn', 'btn-secondary');
            historyButton.addEventListener('click', function(){
                getApi(cityHistory[i]);
                getForecastApi(cityHistory[i]);
            });

            historyButton.textContent = cityHistory[i];
            historyDiv.append(historyButton);
            };
    }
}

//calling the function so data persists
displayButtons()
