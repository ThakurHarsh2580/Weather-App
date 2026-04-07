const locationInput = document.querySelector("#locationInput");
const searchBtn = document.querySelector("#searchBtn");
const cardContainer = document.querySelector("#card-container");

const searchCityContainer = document.querySelector("#search-city-container");
const resultNotFound = document.querySelector("#result-not-found");
const dataContainer = document.querySelector("#data-container");
const loading = document.querySelector("#loading");

// Data fields-->
const locationName = document.querySelector("#location-name");
const temperature = document.querySelector("#temperature");
const weatherTypeImage = document.querySelector("#weather-type-img");
const weatherType = document.querySelector("#weather-type");
const feelsLike = document.querySelector("#feels-like");
const uvIndex = document.querySelector("#uv-index");
const aqi = document.querySelector("#aqi");
const humidityPercent = document.querySelector("#humidity-percent");
const windSpeed = document.querySelector("#wind-speed");
const precipitationPercent = document.querySelector("#precipitation-percent");

const weatherMapping = {
    "thunder": [1087, 1273, 1276, 1279, 1282],
    "rain": [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246],
    "cloudy": [1003, 1006, 1009, 1030, 1135, 1147],
    "clear": [1000],
    "snow": [1066, 1069, 1072, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1249, 1252, 1255, 1258]
};

const weatherApp = {

    init : function(){
        searchBtn.addEventListener("click", this.isValid.bind(this));
        locationInput.addEventListener("keydown", this.isEnterKey.bind(this));
    },

    isEnterKey : function(e){
        if(e.keyCode === 13){ // Enter Key
            this.isValid();
        }
    },

    isValid : function(){
        let location = locationInput.value.trim().toLowerCase();
        
        if(location.length <= 2 || !/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(location)){
            this.addError();
            return;
        }
        else this.removeError();

        this.getData(location);
    },

    showLoading: function(){
        loading.classList.remove("hidden");
        dataContainer.classList.add("hidden");
        searchCityContainer.classList.add("hidden");
        resultNotFound.classList.add("hidden");
    },

    hideLoading: function(){
        loading.classList.add("hidden");
    },

    addError : function(){
        // result Not Found-->
        dataContainer.classList.add("hidden");
        searchCityContainer.classList.add("hidden");
        resultNotFound.classList.remove("hidden");
    },
    removeError :function(){
        resultNotFound.classList.add("hidden");
    },

    getUvCategory : function(uvValue){
        let category;
        let textColor;

        switch (true) {
            case (uvValue <= 2):
                category = "Low";
                textColor = "#065F46"; // Green
                break;
            case (uvValue <= 5):
                category = "Moderate";
                textColor = "#f1c40f"; // Yellow
                break;
            case (uvValue <= 7):
                category = "High";
                textColor = "#e67e22"; // Orange
                break;
            case (uvValue <= 10):
                category = "Very High";
                textColor = "#e74c3c"; // Red
                break;
            case (uvValue >= 11):
                category = "Extreme";
                textColor = "#9b59b6"; // Violet
                break;
            default:
                category = "Unknown";
                textColor = "#ffffff";
        }

        return {category, textColor};
    },

    getAQICategory : function(pm25){
        let category;
        let color;

        switch (true) {
            case (pm25 <= 12.0):
                category = "Good";
                color = "#065F46"; // Green
                break;
            case (pm25 <= 35.4):
                category = "Moderate";
                color = "#f1c40f"; // Yellow
                break;
            case (pm25 <= 55.4):
                category = "Sensitive";
                color = "#e67e22"; // Orange
                break;
            case (pm25 <= 150.4):
                category = "Unhealthy";
                color = "#e74c3c"; // Red
                break;
            case (pm25 <= 250.4):
                category = "Very Unhealthy";
                color = "#8e44ad"; // Purple
                break;
            case (pm25 > 250.4):
                category = "Hazardous";
                color = "#7d3c98"; // Maroon
                break;
            default:
                category = "Unknown";
                color = "#ffffff";
        }

        return { category, color };
    },

    getTheme : function(code){
        for (let theme in weatherMapping) {
            if (weatherMapping[theme].includes(code)) return theme;
        }
        return "default"; 
    },

    applyWeatherImg : function(weatherType){
        switch(weatherType){
            case "thunder":
                weatherTypeImage.src = "./assets/thunderstorm.svg";
                break;
            case "rain":
                weatherTypeImage.src = "./assets/rain.svg";
                break;
            case "cloudy":
                weatherTypeImage.src = "./assets/clouds.svg";
                break;
            case "clear":
                weatherTypeImage.src = "./assets/clear.svg";
                break;
            case "snow":
                weatherTypeImage.src = "./assets/snow.svg";
                break;
            default:
                weatherTypeImage.src = "./assets/atmosphere.svg";

        }
    }, 

    getData : function(location){
        this.showLoading();

        fetch(`https://api.weatherapi.com/v1/current.json?key=775655a88c464b188f2114424260604&q=${location}&aqi=yes`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.hideLoading();
            console.log(data);
            // Check if API returned error
            if(data.error){
                this.addError();
                return;
            }
            else this.removeError();
            console.log(data.location.name);
            this.updateData(data);
            
        })
        .catch((error) => {
            console.log(error);
            this.addError();
        });
        
    },

    updateData : function(data){
        locationInput.value = "";
        
        locationName.textContent = data.location.name;
        temperature.textContent = Math.round(data.current.temp_c);
        feelsLike.textContent = `Feels like ${Math.round(data.current.feelslike_c)}°C`;
        weatherType.textContent = data.current.condition.text;

        humidityPercent.textContent = `${data.current.humidity}%`;
        windSpeed.textContent = `${data.current.wind_kph} km/h`;
        precipitationPercent.textContent = `${data.current.cloud}%`;

        searchCityContainer.classList.add("hidden");
        dataContainer.classList.remove("hidden");

        const uvinfo = this.getUvCategory(data.current.uv);
        uvIndex.innerHTML = `UV Index : <span class="font-semibold" style="color:${uvinfo.textColor}">${uvinfo.category}</span>`;
    
        const aqiInfo = this.getAQICategory(data.current.air_quality.pm2_5);
        aqi.innerHTML = `Air Quality : <span class="font-semibold" style="color:${aqiInfo.color}">${aqiInfo.category}</span>`;

        const getTheme = this.getTheme(data.current.condition.code);
        this.applyWeatherImg(getTheme);
    },

};

weatherApp.init();