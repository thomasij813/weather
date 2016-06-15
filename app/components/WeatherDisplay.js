import React from 'react'

const WeatherDisplay = (props) => {
  return (
    <div className="weather-display">
      <Location>{props.location}</Location>
      <Today weather={props.weather.today} />
      <Forecast weather={props.weather.week}/>
    </div>
  )
}

const Location = (props) => {
  return (
    <div className="location">
      <h1>{props.children}</h1>
    </div>
  )
}

const Today = (props) => {
  return (
    <div className="today">
      <TodayWeather>{props.weather.icon}</TodayWeather>
      <TodayTemp>{props.weather}</TodayTemp>
    </div>
  )
}

const TodayTemp = (props) => {
  return (
    <div className="temp">
      <span className="current">{props.children.currentTemp + String.fromCharCode(176)}</span>
      <span className="high">{props.children.maxTemp + String.fromCharCode(176)}</span>
      <span className="low">{props.children.minTemp + String.fromCharCode(176)}</span>
    </div>
  )
}

const TodayWeather = (props) => {
  return (
    <div className="weather">
      <WeatherIcon>{props.children}</WeatherIcon>
    </div>
  )
}

const WeatherIcon = (props) => {
  return <i className={props.children}></i>
}

const Forecast = (props) => {
  let dates = props.weather.map((date, index) => {
    return <Day key={index}>{date}</Day>
  })
  return (
    <div className="forecast">
      {dates}
    </div>
  )
}

const Day = (props) => {
  return (
    <div className="day">
      <WeatherIcon>{props.children.icon}</WeatherIcon>
      <span className="day-name">{props.children.displayDate}</span>
      <span className="temp">{props.children.minTemp}</span>
      <span className="temp">{props.children.maxTemp}</span>
    </div>
  )
}

export default WeatherDisplay;
