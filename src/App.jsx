import React from 'react'
import Scoops from './components/Scoops'
import Toppings from './components/Toppings'
import Form from './components/Form'

const App = () => {
  return (
    <div className='d-flex flex-column gap-5 px-3 py-5 min-vh-100 text-light bg-dark'>
      <Scoops/>
      <Toppings/>
      <Form/>
    </div>
  )
}

export default App