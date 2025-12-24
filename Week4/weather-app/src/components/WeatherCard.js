import React from "react";
import "../styles/MainContainer.css";

function WeatherCard(props) {
  return (
    <div className='forecast-card'>
        <div className='forecast-date'>{props.day}</div>
		<div className='forecast-icon'>
			<img src={`icons/${props.icon}.svg`} alt={props.description} />
		</div>
	    <div className='forecast-temp'>{Math.round(props.high)}° to {Math.round(props.low)}°</div>
    </div>
  );
}

export default WeatherCard;