import './App.css'
import DynamicBootstrapForm from './components/DynamicBoostrapForm'

function App() {


  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const FIELDS = {
    city: {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter city name',
    },
    submit: {
      type: 'submit',
      text: 'Buscar',
      handler: (e) => handleSubmit(e),
    }
  }

  return (
    <>
      <div className="container">
        <h1>Weather app</h1>
        {/* <DynamicBootstrapForm fields={FIELDS} /> */}
      </div>
    </>
  )
}

export default App
