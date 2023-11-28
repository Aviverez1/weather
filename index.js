const searchButton = document.querySelector("#Search");
searchButton.addEventListener("click", getData);
const cityForm = document.getElementById('cityForm');
const apiKey = "4ea73603661dc898403ac4feaf3363b2"; // Move apiKey outside setApi function
let apiUrl; // Move apiUrl outside setApi function
let newCityText = 'vienna';

const setApi = (newCityText) => {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${newCityText}`;
    getWeather();
}
async function getWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    let roundTemp = Math.round(data.main.temp);
    let roundWind = Math.round(data.wind.speed);
    let roundMax = Math.round(data.main.temp_max);
    let roundMin = Math.round(data.main.temp_min);
    let roundFeel = Math.round(data.main.feels_like)
    document.querySelector("h1").innerHTML = data.name;
    document.querySelector(".deg").innerHTML = roundTemp + "°";
    document.querySelector(".shortDescription").innerHTML = data.weather[0].main;
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = roundWind + " km/h";
    document.querySelector(".max").innerHTML = roundMax + "°";
    document.querySelector(".min").innerHTML = roundMin + "°";
    document.querySelector(".realFeel").innerHTML = roundFeel + "°";
    setGifFeel(roundFeel);
    setGifWeather(data.weather[0].main);
}
const setGifWeather = (weather) => {
    switch (weather) {
        case "Clouds":
            insertHtmlGif("Clouds");
            break;
        case "Clear":
            insertHtmlGif("Clear");
            break;
        case "Rain":
            insertHtmlGif("Rain");
            break;
        case "Drizzle":
            insertHtmlGif("Drizzle");
            break;
        case "Mist":
            insertHtmlGif("Mist");
            break;
        case "Snow":
            insertHtmlGif("snow");
            break;
        default:
            break;
    }
};
const setGifFeel = (tempFeel) =>{
    let feelGif = "";
    if(tempFeel < 15){
        feelGif = "feelCold";
    }
    else if(tempFeel > 25){
        feelGif = "feelHot";
    }
    else if(tempFeel >= 15){
        feelGif = "feelSun";
    }
    document.querySelector(".feelGif").src = `./images/${feelGif}.gif`;
}
const insertHtmlGif = (theGif) => {
    document.querySelector(".weatherGif").src = `./images/${theGif}.gif`;
}
function getData() {
    newCityText = document.getElementById('newCity').value; 
    cityForm.reset();
    setApi(newCityText);
}
function shrinkAndGrow() {
    const button = document.getElementById("Search");
    button.classList.add("shrinked");
    setTimeout(() => {
        button.classList.remove("shrinked");
    }, 300);
}
setApi(newCityText);
