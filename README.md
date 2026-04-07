# 🌦️ Weather App

Just a simple weather app I built while learning JavaScript and working with APIs. It shows real-time weather data for any city you search.

---

## What it does

* Search weather by city name
* Shows temperature, feels like, and condition
* Displays humidity, wind speed, and rain
* Shows UV Index and Air Quality with color indicators
* Changes weather icon based on conditions
* Handles invalid searches (no crashes 😄)
* Includes a loading spinner while fetching data

---

## Built with

* HTML
* Tailwind CSS
* Vanilla JavaScript
* WeatherAPI

---

## How to run it

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. Open the folder

3. Run `index.html` in your browser

That’s it.

---

## API setup

This app uses WeatherAPI.

Replace the API key in `script.js` with yours:

```js
fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${location}&aqi=yes`)
```

You can get a free key here: [https://www.weatherapi.com/](https://www.weatherapi.com/)

---

## Folder structure

```
weather-app/
│
├── index.html
├── script.js
├── output.css
│
├── assets/
├── graphics/
```

---

## Things I might add later

* Auto-detect location
* 7-day forecast
* Better animations
* Dynamic backgrounds based on weather

---

## About

Made this as a practice project to get better at DOM manipulation and working with APIs.

---

If you like it, feel free to use it or improve it 👍
