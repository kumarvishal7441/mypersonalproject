const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.wether-info');
const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt =document.querySelector('.condition-txt')
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.wether-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');

const forecastItemsContainer = document.querySelector('.forecat-items-container')


// api key of openweather api
const apiKey ='892b7ae5a3c39d1bf11972807a47b38e'


// add event listener on search button and get data
searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != ''){
updateWeatherInfo(cityInput.value);
cityInput.value = '';
cityInput.blur();
}
})

cityInput.addEventListener('keydown', (e) =>{
    if(e.key =='enter'&&
      cityInput.value.trim() != ''  
    ){
    updateWeatherInfo(cityInput.value);
cityInput.value = '';
cityInput.blur(); 
    }
})

// fetching api key 

async function getFetchData(endPoint, city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);

    return response.json()
}

// return image on condition of weather
function getWeatherIcon(id){
    if (id<=232) return 'thunderstorm.svg'
    if (id<=321) return 'drizzle.svg'
    if (id<=531) return 'rain.svg'
    if (id<=622) return 'snow.svg'
    if (id<=781) return 'atmosphere.svg'
    if (id<=800) return 'clear.svg'
    else return 'clouds.svg'
}

function getCurrentDate (){
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-gb',options)
}

async function updateWeatherInfo(city){
const weatherData =await getFetchData('weather', city);

if (weatherData.cod != 200){
    showDisplaySection(notFoundSection);
    return
}

const {
    name: country,
    main: {temp, humidity},
    weather: [{id, main}],
    wind : {speed }
} = weatherData;

countryTxt.textContent = country;
tempTxt.textContent = Math.round(temp) + '°C';
conditionTxt.textContent = main;

humidityValueTxt.textContent = humidity + '%';
windValueTxt.textContent = speed + ' m/s';
weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;
currentDateTxt.src = getCurrentDate();

await updateForecastsInfo(city)

showDisplaySection(weatherInfoSection);
console.log(weatherData)

}
// get and update next five days data 

async function updateForecastsInfo(city){
    const forecastsData = await getFetchData('forecast', city)
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0];

    forecastItemsContainer.innerHTML = ''

    forecastsData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)){
            updateForecastItems(forecastWeather)
            console.log(forecastWeather)
        }

    })
    console.log(todayDate)
}

function updateForecastItems(weatherData){

    console.log(weatherData)
    const {
        dt_txt: date,
        weather: [{id}],
        main: {temp}
    }= weatherData;

    const dateTaken = new Date(date);
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }
    const dateResult = dateTaken.toLocaleDateString('en-us', dateOption)

    const forecastItem =`
     <div class="forecast-item">
          <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
          <img src="assets/weather/${getWeatherIcon(id)}" class="forecast-item-img">
          <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
     </div>
        `
        forecastItemsContainer.insertAdjacentHTML('beforeend',forecastItem)
}

function showDisplaySection(section){
    [weatherInfoSection, searchCitySection, notFoundSection]
    .forEach(section => section.style.display ='none')

    section.style.display = 'flex'

}