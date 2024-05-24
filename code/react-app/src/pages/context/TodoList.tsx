import { ListItem } from "./ListItem";
import { ToDoItem } from "./ToDoItem";
import './index.css'

export function TodoList() {
	return <div>
		<h2>todoList</h2>
        <div className="todo_list_content">

            <ListItem/>
            <ToDoItem/>
        </div>
	</div>
}