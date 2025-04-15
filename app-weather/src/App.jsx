import { useEffect, useState } from 'react'
import './App.css'
import DynamicBootstrapForm from './components/DynamicBoostrapForm'
import { useLocalStorage } from 'usehooks-ts'

function App() {
  const [value, setValue, removeValue] = useLocalStorage('weatherData', {})
  const [message, setMessage] = useState('')
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
  const difKelvin = 273.15 // Conversion factor from Kelvin to Celsius

  const FIELDS = [{
    name: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Lima'
  }]

  const BUTTONS = {
    submitText: 'Buscar',
    successCallback: (data) => {
      removeValue()
      setValue(data)
    },
    errorCallback: (err) => {
      console.log('❌', err)
      setMessage('No weather data available. Please try again later.')
    },
    resetCallback : removeValue
  }

  useEffect(() => {

    return () => {
      console.log('Cleaning up')
      removeValue()
    }
  }, [])

  return (
    <>
      <div className={'container w-45 mt-5'}>
        <h1>Weather app</h1>
        <DynamicBootstrapForm
          fields={FIELDS}
          formButtons={BUTTONS}
          buildUrl={(formState) => `${BASE_URL}q=${formState.city}&appid=${import.meta.env.VITE_API_KEY}`}
        />
        <div className={'mt-5'}>
          {
            value?.name ?
              <div>
                <h2>{value.name}, {value.sys.country}</h2>
                <p>Current temperature is {Math.floor(value.main.temp - difKelvin)}ºC</p>
                <p>Current metheorological condition is: {value.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}
                  alt={value.weather[0].description}
                />
              </div>
              :<p>{message}</p>
          }
        </div>
      </div>
    </>
  )
}

export default App
