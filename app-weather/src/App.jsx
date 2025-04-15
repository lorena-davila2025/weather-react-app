import { useEffect } from 'react'
import './App.css'
import DynamicBootstrapForm from './components/DynamicBoostrapForm'
import { useLocalStorage } from 'usehooks-ts'

function App() {
  const [value, setValue, removeValue] = useLocalStorage('weatherData', [])

  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

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
      setValue((prev) => [...prev, data]) },
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
      <div className={'container w-45 m-auto mt-5'}>
        <h1>Weather app</h1>
        <DynamicBootstrapForm
          fields={FIELDS}
          formButtons={BUTTONS}
          buildUrl={(formState) => `${BASE_URL}q=${formState.city}&appid=${import.meta.env.VITE_API_KEY}`}
        />
        <div className={'mt-5'}>
          <h2>Data</h2>
          <p>{JSON.stringify(value)}</p>
        </div>
      </div>
    </>
  )
}

export default App
