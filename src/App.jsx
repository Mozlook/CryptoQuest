import { useState } from 'react'
import Header from './components/Header'
import Puzzle from './components/Puzzle'
import SubmitForm from './components/SubmitForm'
function App() {

  return (
      <main className="main">
        <Header />
        <Puzzle />
        <SubmitForm />
      </main>
  )
}

export default App
