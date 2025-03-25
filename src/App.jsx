import React, { Suspense, lazy, useState, useMemo } from "react";
import Header from './components/Header'
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

  const [puzzleId, setPuzzleId] = useState(3);
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isIssueFormOpen, setIsIssueFormOpen] = useState(false)

  const memoizedPuzzle = useMemo(() => <DynamicComponent puzzleId={puzzleId} />, [puzzleId]);

  return (
      <main className="main">
        <Header setIsAboutOpen={setIsAboutOpen} 
                setIsIssueFormOpen={setIsIssueFormOpen}
                setPuzzleId={setPuzzleId} />
        {memoizedPuzzle}
        <SubmitForm />
        <Footer />
        {isAboutOpen && <About setIsAboutOpen={setIsAboutOpen} />}
        {isIssueFormOpen && <IssueForm setIsIssueFormOpen={setIsIssueFormOpen} />}
      </main>
  )
}

export default App
