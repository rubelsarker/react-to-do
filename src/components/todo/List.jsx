import Item from "./Item"

function List({ todos, onToggleTodo, onDeleteTodo }) {
    return (
        <ul id="todo-list">
            {todos.map(todo => (
                <Item 
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggleTodo}
                    onDelete={onDeleteTodo}
                />
            ))}
        </ul>
    )
}

export default List