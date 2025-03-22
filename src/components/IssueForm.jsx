import "../Styles/IssueForm.css"
export default function IssueForm({setIsIssueFormOpen}){
    return(
        <div className="overlay" onClick={() => setIsIssueFormOpen(false)}>
        <div className="issue-form-container" onClick={(e) => e.stopPropagation()}>
            <p>Report an Issue</p>
            <form>
                <label>Name or number of puzzle</label>
                <input type="text" id="puzzle_name" name="puzzle_name" placeholder="Cezar cipher" />
                <label>Describe the issue</label>
                <textarea rows="10" cols="50" id="issue_description" name="issue_description" placeholder="Describe your issue here..."/>
                <div className="buttons-container">
                    <button className="submit-issue">
                        Submit
                    </button>
                    <button className="cancel" onClick={() => setIsIssueFormOpen(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}