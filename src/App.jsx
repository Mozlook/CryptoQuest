import React, { Suspense, lazy, useState } from "react";
import Header from './components/Header'
import Puzzle from './components/puzzles/Puzzle1'
import SubmitForm from './components/SubmitForm'
import Footer from './components/Footer'
import About from './components/About'
import IssueForm from './components/IssueForm'

const DynamicComponent = ({ puzzleId }) => {
  const Component = lazy(() =>
    import(/* @vite-ignore */`./components/puzzles/Puzzle${puzzleId}.jsx`).catch(() => ({
      default: () => <div>Nie znaleziono komponentu</div>,
    }))
  );

  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <Component />
    </Suspense>
  );
}

function App() {

  const [puzzleId, setPuzzleId] = useState(1);
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isIssueFormOpen, setIsIssueFormOpen] = useState(false)

  return (
      <main className="main">
        <Header setIsAboutOpen={setIsAboutOpen} 
                setIsIssueFormOpen={setIsIssueFormOpen} />
        <DynamicComponent puzzleId={puzzleId}/>
        <SubmitForm />
        <Footer />
        {isAboutOpen && <About setIsAboutOpen={setIsAboutOpen} />}
        {isIssueFormOpen && <IssueForm setIsIssueFormOpen={setIsIssueFormOpen} />}
      </main>
  )
}

export default App
