const API_KEY = '&APPID=07091f71950fdfeb3cc3c6ffd8a79857';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const UNIT_METRIC = '&units=metric';
const UNIT_IMPERIAL = '&units=imperial';

class App {
  constructor() {
    this.onJSONReady = this.onJSONReady.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    this.onFound = this.onFound.bind(this);
    this.toF = this.toF.bind(this);
    this.toC = this.toC.bind(this);

    this.currentTemp = 0;

    const searchButton = document.querySelector('form');
    searchButton.addEventListener('keyp', this.toF);

    const farenheitButton = document.querySelector('#toF');
    farenheitButton.addEventListener('click', this.toF);

    const celciusButton = document.querySelector('#toC');
    celciusButton.addEventListener('click', this.toC);
  }

  toC() {
    const textInput = document.querySelector('#search-text');
    const query = encodeURIComponent(textInput.value);
    const URL_FETCH = BASE_URL + query + UNIT_METRIC + API_KEY;

    fetch(URL_FETCH)
      .then(this.onResponse)
      .then(this.onJSONReady);
  }

  toF() {
    const textInput = document.querySelector('#search-text');
    const query = encodeURIComponent(textInput.value);
    const URL_FETCH = BASE_URL + query + UNIT_IMPERIAL + API_KEY;

    fetch(URL_FETCH)
      .then(this.onResponse)
      .then(this.onJSONReady);
  }

  onResponse(response){
    return response.json();
  }

  onJSONReady(json) {
    const messageBox = document.querySelector("#message");
    const weatherBox = document.querySelector('#weather-box');

    if (!json.main) {
      this.onNotFound(messageBox, weatherBox);
      return;
    }

    this.onFound(json, messageBox, weatherBox);
  }

  onNotFound(messageBox, weatherMain) {
    messageBox.classList.remove('hidden');
    weatherMain.classList.add('hidden');

    messageBox.style.fontSize = '30px';
  }

  onFound(json, messageBox, weatherMain) {
    messageBox.classList.add('hidden');
    weatherMain.classList.remove('hidden');

    this.setDescription(json);
    this.setCityName(json);
    this.setTemp(json);
    this.setIcon(json);
    this.setPressure(json);
    this.setHumidity(json);
  }

  setCityName(json) {
    const city = document.querySelector('#city-name');
    const country = json.sys.country;
    city.innerHTML = json.name + ', ' + country;
  }

  setDescription(json) {
    const description = document.querySelector('#description');
    const result = json.weather[0].description;
    description.textContent =
    "Description: " + result.charAt(0).toUpperCase() + result.slice(1);
  }

  setTemp(json) {
    const temp = document.querySelector("#current-temp");
    temp.innerHTML = '';
    temp.innerHTML = Math.floor(json.main.temp) + '&#186';
  }


  setIcon(json) {
    const filename = json.weather[0].icon;
    const iconBox = document.querySelector("#weather-icon");
    iconBox.src = 'http://openweathermap.org/img/wn/' + filename + '@2x.png'
  }

  setPressure(json) {
    const windSpeed = document.querySelector("#pressure");
    windSpeed.innerHTML =
    "Atmospheric pressure: " + json.main.pressure + " hPa";
  }

  setHumidity(json) {
    const humidity = document.querySelector('#humidity');
    humidity.innerHTML = "Humidity: " + json.main.humidity + " %";
  }

}
