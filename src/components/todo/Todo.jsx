import { useState } from "react"
import List from "./List"
import Form from "./Form"
import Filter from "./Filter"

function Todo() {
    const [todos, setTodos] = useState([
        { id: 1, text: "Buy groceries", completed: true, createdAt: Date.now() - 86400000 },
        { id: 2, text: "Walk the dog", completed: false, createdAt: Date.now() - 43200000 },
        { id: 3, text: "Read a book", completed: false, createdAt: Date.now() }
    ])
    const [filter, setFilter] = useState("all")
    const [sortBy, setSortBy] = useState("newest")

    const addTodo = (text) => {
        if (text.trim()) {
            const newTodo = {
                id: Date.now(),
                text: text.trim(),
                completed: false,
                createdAt: Date.now()
            }
            setTodos([...todos, newTodo])
        }
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
        // Reset sort to "newest" when switching to Active or Completed tabs
        if (newFilter !== "all" && (sortBy === "completed" || sortBy === "active")) {
            setSortBy("newest")
        }
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.completed
        if (filter === "completed") return todo.completed
        return true
    })

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return b.createdAt - a.createdAt
            case "oldest":
                return a.createdAt - b.createdAt
            case "alphabetical":
                return a.text.localeCompare(b.text)
            case "completed":
                // Put completed items first (true comes before false)
                return b.completed - a.completed
            case "active":
                // Put active items first (false comes before true)
                return a.completed - b.completed
            default:
                return 0
        }
    })

    const showSortControls = true
    const isEmpty = sortedTodos.length === 0

    return (
        <> 
            <div className="todo-container">
                <h1>
                    <span>📝</span>
                    To-Do App
                </h1>

                <Form onAddTodo={addTodo} />
                <Filter currentFilter={filter} onFilterChange={handleFilterChange} />
                
                {showSortControls && (
                    <div className="sort-controls">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select 
                            id="sort-select" 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="alphabetical">Alphabetical</option>
                            {filter === "all" && (
                                <>
                                    <option value="completed">Completed First</option>
                                    <option value="active">Active First</option>
                                </>
                            )}
                        </select>
                    </div>
                )}

                {isEmpty ? (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3>No todos found</h3>
                        <p>
                            {filter === "all" && "Start by adding a new task above!"}
                            {filter === "active" && "No active tasks. Great job!"}
                            {filter === "completed" && "No completed tasks yet. Keep going!"}
                        </p>
                    </div>
                ) : (
                    <List 
                        todos={sortedTodos} 
                        onToggleTodo={toggleTodo} 
                        onDeleteTodo={deleteTodo} 
                    />
                )}
            </div>
        </>
    )
}

export default Todo
