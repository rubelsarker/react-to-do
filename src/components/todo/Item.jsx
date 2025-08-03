function Item({ todo, onToggle, onDelete }) {
    return (
        <li className={todo.completed ? "completed" : ""}>
            <div className="todo-item">
                <span 
                    className="check" 
                    onClick={() => onToggle(todo.id)}
                >
                    {todo.completed ? "✅" : "⭕"}
                    
                </span>
                <span className="task-text">{todo.text}</span>
            </div>
            <button 
                className="delete-btn" 
                onClick={() => onDelete(todo.id)}
            >
                ✖
            </button>
        </li>
    )
}

export default Item