import React, { useEffect, useState } from 'react'
import'./Weather.css'
import axios from 'axios'

function WeatherCard({weather,title}) {
  return (
    <div className='weather-card'>
      <h1>{title}</h1>
      <p>{weather}</p>
    </div>
  )  
}

function Search({handleCity}) {
  const [city, setCity] = useState('');
  const doSearch = () => {
    if(city) {
      handleCity(city);
    }
  }
  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
      <div className='searchContainer'>
        <input type="text"  placeholder='Enter city name' onChange={(e) => setCity(e.target.value)} />
        <button type='submit' onClick={doSearch}>Search</button>
      </div>      
    </div>
  )
}
function Weather() {
  
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [condition, setCondition] = useState('');
  const [windspeed, setWindspeed] = useState('');
  const [isLoading,setIsloading] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const URL = 'https://api.weatherapi.com/v1/current.json'
  const querParams = {
    Key : '7d8b0d54ece74d28bbf155359252806',
    q : city
  }

  useEffect(() => {
    setIsloading(true)
    if(city) {      
      axios
      .get(URL, {params: querParams })
      .then((response) => {          
          setTemperature(`${response.data.current.temp_c}°C`)
          setHumidity(`${response.data.current.humidity}%`)
          setCondition(response.data.current.condition.text)
          setWindspeed(`${response.data.current.wind_kph} kph`)
          setShowCard(true);
      })        
      .catch((e) => alert('Failed to fetch weather data'))
      .finally(setIsloading(false))
    }    
  },[city]);
  
  const handleCity = (city) => {
    console.log(city);
   setCity(city); 
  }
  return (
    <>
      <Search handleCity={handleCity} />      
        <p style={{marginLeft: 0, marginRight: 0}}>Loading data...</p>      
        {
        showCard && (
          <div className='weather-cards'>
            <WeatherCard weather={temperature} title='Temperature' />
            <WeatherCard weather={humidity} title='Humidity' />
            <WeatherCard weather={condition} title='Condition' />
            <WeatherCard weather={windspeed} title='Wind Speed' />
          </div>
        )       
      }     
    </>    
  )
}

export default Weather
