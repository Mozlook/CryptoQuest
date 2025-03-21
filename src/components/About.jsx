import "./About.css"

export default function About({setIsAboutOpen}){
    return (
        <div className="overlay" onClick={() => setIsAboutOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>About CryptoQuest</h2>
            <div>
                
                <p>CryptoQuest is an exciting code-breaking and deciphering game where your goal is to crack codes based on the clues provided on the screen to advance to the next level. You can tackle the puzzles solo or team up with friends for a collaborative experience. The first three puzzles are designed to ease you into the game and show you the ropes, but after that, the difficulty ramps up – are you ready for the challenge?</p>
                <button onClick={() => setIsAboutOpen(false)}>
                Close
                </button>
            </div>
          </div>
        </div>
        )
}