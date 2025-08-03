import { useState } from "react"
import Todo from "./components/todo/Todo"
import Food from "./components/food/Food"
import { APP_CONFIG } from "./config/env.js"

function App() {
    const [currentView, setCurrentView] = useState(APP_CONFIG.CURRENT_VIEW)

    return (
        <div className="app">
            <nav className="app-nav">
                <div className="nav-container">
                    <h1 className="app-title">My App</h1>
                    <div className="nav-tabs">
                        <button 
                            className={`nav-tab ${currentView === "todo" ? "active" : ""}`}
                            onClick={() => setCurrentView("todo")}
                        >
                            📝 Todo
                        </button>
                        <button 
                            className={`nav-tab ${currentView === "food" ? "active" : ""}`}
                            onClick={() => setCurrentView("food")}
                        >
                            🍽️ Food Recipes
                        </button>
                    </div>
                </div>
            </nav>

            <main className="app-main">
                {currentView === "todo" ? <Todo /> : <Food />}
            </main>
        </div>
    )
}

export default App
