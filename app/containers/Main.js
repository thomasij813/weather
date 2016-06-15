import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import WEATHER_UTILS from '../utils/weatherUtils';
import getData from '../utils/getData';

import Menu from '../components/Menu.js'
import WeatherDisplay from '../components/WeatherDisplay.js'


export default class Main extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     search: '',
     location: '',
     weather: {},
     isLoaded: false,
   }
  }

  getForecastData(e) {
    if (e) e.preventDefault()
    if (!this.state.search) return false

    this.setState({
      isLoaded: false
    })

    let weeklyUrl = WEATHER_UTILS.buildWeatherUrl(this.state.search, 'weekly' )
    let currUrl = WEATHER_UTILS.buildWeatherUrl(this.state.search, 'current' )
    let weather = {}
    let location = ''

    getData(weeklyUrl).then((data) => {
      data = JSON.parse(data)
      let weatherData = WEATHER_UTILS.parseForecast(data)
      weather = {
        today: weatherData.shift(),
        week: weatherData
      }
      location = data.city.name
    }).then(() => {
      getData(currUrl).then((data) => {
        data = JSON.parse(data)
        weather.today.currentTemp = Math.round(data.main.temp)
        this.setState({
          weather: weather,
          isLoaded: true,
          location: location
        })
      }).catch((err) => {
        console.warn(`Error: ${err}`)
      })
    }).catch((err) => {
      console.warn(`Error: ${err}`)
    })


  }

  getCurrentLocation(e) {
    e.preventDefault()
    getData('http://ipinfo.io/json')
      .then(data => {
        data = JSON.parse(data)
        let location = `${data.city}, ${data.region}`
        this.setState({
          search: location
        }, () => {
          this.getForecastData()
        })
      }).catch(err => {
        console.warn(err)
      })
  }

  handleLocationChange(location) {
    this.setState({
      search: location
    })
  }

  render() {
    let weatherView = this.state.isLoaded ? <WeatherDisplay location={this.state.location} weather={this.state.weather} key="1" /> : undefined
    return (
      <div className="wrapper">
        <Menu
          getCurrentLocation={this.getCurrentLocation.bind(this)}
          updateLocation={this.handleLocationChange.bind(this)}
          submitData={this.getForecastData.bind(this)}
         />
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={25}>
          {weatherView}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
