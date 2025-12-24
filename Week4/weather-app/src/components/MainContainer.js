import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css"; // Import the CSS file for MainContainer
import WeatherCard from "./WeatherCard";

function MainContainer(props) {

  function formatDate(daysFromNow = 0) {
    let output = "";
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }

  /*
  STEP 1: IMPORTANT NOTICE!

  Before you start, ensure that both App.js and SideContainer.js are complete. The reason is MainContainer 
  is dependent on the city selected in SideContainer and managed in App.js. You need the data to flow from 
  App.js to MainContainer for the selected city before making an API call to fetch weather data.
  */
  
  /*
  STEP 2: Manage Weather Data with State.
  
  Just like how we managed city data in App.js, we need a mechanism to manage the weather data 
  for the selected city in this component. Use the 'useState' hook to create a state variable 
  (e.g., 'weather') and its corresponding setter function (e.g., 'setWeather'). The initial state can be 
  null or an empty object.
  */
  const [weather, setWeather] = useState(null);
  
  
  /*
  STEP 3: Fetch Weather Data When City Changes.
  
  Whenever the selected city (passed as a prop) changes, you should make an API call to fetch the 
  new weather data. For this, use the 'useEffect' hook.

  The 'useEffect' hook lets you perform side effects (like fetching data) in functional components. 
  Set the dependency array of the 'useEffect' to watch for changes in the city prop. When it changes, 
  make the API call.

  After fetching the data, use the 'setWeather' function from the 'useState' hook to set the weather data 
  in your state.
  */
  useEffect(() => {
    if (props.selectedCity) {
      const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&units=imperial&appid=${props.apiKey}`;
      const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&units=imperial&appid=${props.apiKey}`;
      const aqiApi = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&appid=${props.apiKey}`;

      Promise.all([
        fetch(currentWeatherApi).then(res => res.json()),
        fetch(forecastApi).then(res => res.json()),
        fetch(aqiApi).then(res => res.json()),
      ]).then(([currentData, forecastData, aqiData]) => {
        const dailyTemps = {};
        forecastData.list.forEach(item => {
          const date = new Date(item.dt * 1000);
          const dayStr = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase() + " " + date.getDate();
          if (!dailyTemps[dayStr]) {
            dailyTemps[dayStr] = {
              day: dayStr,
              high: item.main.temp_max,
              low: item.main.temp_min,
              icon: item.weather[0].icon,
            };
          } else {
            if (item.main.temp_max > dailyTemps[dayStr].high) {
              dailyTemps[dayStr].high = item.main.temp_max;
            }
            if (item.main.temp_min < dailyTemps[dayStr].low) {
              dailyTemps[dayStr].low = item.main.temp_min;
            }
          }
        });
        
        const fiveDayForecast = Object.values(dailyTemps).slice(1, 6);
        
        setWeather({
          current: currentData,
          forecast: fiveDayForecast,
          aqi: aqiData.list[0].main.aqi,
        });
      });
    }
  }, [props.selectedCity]);
  
  
  return (
    <div id="main-container">
      <div id="weather-container">
        {/* 
        STEP 4: Display Weather Data.
        
        With the fetched weather data stored in state, use conditional rendering (perhaps the ternary operator) 
        to display it here. Make sure to check if the 'weather' state has data before trying to access its 
        properties to avoid runtime errors. 

        Break down the data object and figure out what you want to display (e.g., temperature, weather description).
        This is a good section to play around with React components! Create your own - a good example could be a WeatherCard
        component that takes in props, and displays data for each day of the week.
        */}
        {weather ? (
          <>
          <div className='current-weather'>
				    <div className='date-location'>
					    <div className='date'>{formatDate()}</div>
					    <div className='location'>Weather for {props.selectedCity.fullName}</div>
				    </div>
				    <div className="current-weather-show">
					    <div className="current-weather-details">
						    <div className='condition'>{weather.current.weather[0].main.toLowerCase()}</div>
						    <div className='temp'>{Math.round(weather.current.main.temp)}°</div>
						    <div className="aqi">AQI: {weather.aqi}</div>
					    </div>
					    <div className="current-weather-icon">
						    <img src={`icons/${weather.current.weather[0].icon}.svg`} alt={weather.current.weather[0].description} />
					    </div>
					</div>
				</div>
        
        <div className='forecast'>
          {weather.forecast.map((day, index) => {
            return (
              <WeatherCard 
                key={index}
                day={day.day}
                icon={day.icon}
                high={day.high}
                low={day.low}
                description={day.description}
              />
            );
          })}
        </div>
        </>
      ) : (
        <div className="select-city-message">Select a city to get started !!</div>
      )}
      </div>
    </div>
  );
}


export default MainContainer;

