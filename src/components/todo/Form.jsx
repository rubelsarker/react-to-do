import { useState } from "react"

function Form({ onAddTodo }) {
    const [inputValue, setInputValue] = useState("")
    const [showWarning, setShowWarning] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (inputValue.trim()) {
            onAddTodo(inputValue)
            setInputValue("")
            setShowWarning(false)
        } else {
            setShowWarning(true)
            // Hide warning after 3 seconds
            setTimeout(() => setShowWarning(false), 3000)
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="input-group">
                <input 
                    type="text" 
                    placeholder="Enter a new task" 
                    id="todo-input"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        if (showWarning) setShowWarning(false)
                    }}
                />
                <button type="submit" id="add-button">Add</button>
            </form>
            {showWarning && (
                <div className="warning-message">
                    ⚠️ Please enter a task before adding!
                </div>
            )}
        </div>
    )
}

export default Form