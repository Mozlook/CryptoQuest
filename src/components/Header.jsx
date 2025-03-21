export default function Header({ setIsAboutOpen, setIsIssueFormOpen}){
    return(
        <header>
            <div className="button-container">
                <button onClick={() => setIsAboutOpen(true)} ><i className="fas fa-info-circle"></i> About</button>
                <button onClick={() => setIsIssueFormOpen(true)}><i className="fas fa-bug"></i>Report Issue</button>
                <button><i className="fas fa-cog"></i>PlaceHolder</button>
            </div>
        </header>
    )
}