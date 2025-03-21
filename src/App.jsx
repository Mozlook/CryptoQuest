import { useState } from 'react'
import Header from './components/Header'
import Puzzle from './components/Puzzle'
import SubmitForm from './components/SubmitForm'
import Footer from './components/Footer'
import About from './components/About'
import IssueForm from './components/IssueForm'
function App() {

  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isIssueFormOpen, setIsIssueFormOpen] = useState(false)

  return (
      <main className="main">
        <Header setIsAboutOpen={setIsAboutOpen} 
                setIsIssueFormOpen={setIsIssueFormOpen} />
        <Puzzle />
        <SubmitForm />
        <Footer />
        {isAboutOpen && <About setIsAboutOpen={setIsAboutOpen} />}
        {isIssueFormOpen && <IssueForm setIsIssueFormOpen={setIsIssueFormOpen} />}
      </main>
  )
}

export default App
