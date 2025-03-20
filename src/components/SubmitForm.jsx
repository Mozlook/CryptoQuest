export default  function SubmitForm(){
    return(
        <div className="form-container">
            <h3>Submit Your Answer:</h3>
            <form>
                <input type="text" id="kod" name="kod" placeholder="Type code here..." />
                <button>Submit</button>
            </form>
        </div>
    )
}