const apiKey = "dd765118ad97c60afab13d3f2b9362d2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox =document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const image = document.querySelector(".weather-icon");
const weatherss= document.querySelector(".con");
const datee = document.querySelector(".date");
const dayy = document.querySelector(".day");
const timee = document.querySelector(".time");
const form = document.querySelector("form");
 
function dateAndTday(timezoneOffSet){
  //get current time in UTC 
const date = new Date(); // now
const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
//add the city's timezone offset
const cityTime =  new Date(utcTime + timezoneOffSet * 1000);

// get the date in DD-MM-YY
let day = cityTime.getDate();
let month = cityTime.getMonth() + 1;
let year = cityTime.getFullYear();
datee.innerHTML = `${day}-${month}-${year}`; // date

//get the day of the week
const daysofWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
dayy.innerHTML = daysofWeek[cityTime.getDay()];

//get the time
timee.innerHTML = cityTime.toLocaleString("en-US", {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
}); 
}

async function checkWeather(city){
const response = await fetch(apiUrl + city +  `&appid=${apiKey}`);

if(response.status == 404){
document.querySelector(".error").style.display = "block";
document.querySelector(".weather-container").style.display = "none";
}else{
  var data = await response.json();

document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + "%";

const utcTimes = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
const citytime = new Date(utcTimes + data.timezone * 1000);
const cityHour = citytime.getHours();

const isNight = cityHour >=20 || cityHour < 8;
let weathers = data.weather[0].main;

if(weathers == "Clouds"){
image.src = isNight ? "images/cloud-night.webp": "images/clouds.png";
}else if(weathers == "Clear"){
  image.src = isNight ? "images/clear-night.webp": "images/clear.png";
}else if(weathers == "Drizzle"){
  image.src = "images/drizzle.png";
}else if(weathers == "Mist"){
  image.src = "images/Mist.png";
}else if(weathers == "Rain"){
  image.src = isNight ? "images/rain-night.webp ": "images/rain.png"
}

if(weathers == "Clouds"){
weatherss.innerHTML = "Clouds";
}else if(weathers == "Clear"){
  weatherss.innerHTML = "Clear";
}else if(weathers == "Drizzle"){
  weatherss.innerHTML = "Drizzle";
}else if(weathers== "Mist"){
 weatherss.innerHTML = "Mist";
}else if(weathers == "Rain"){
  weatherss.innerHTML = "Rain";
}

document.querySelector(".weather-container").style.display = "block";
dateAndTday(data.timezone);
document.querySelector(".error").style.display = "none";
}
}

// press enter to get the city weather
form.addEventListener("submit", function(e){
  e.preventDefault(); //prevent refreshing
  checkWeather(searchBox.value)
})
// searchBtn.addEventListener("click", () => {
// checkWeather(searchBox.value)
// })
