import { ToDo } from '../assets/todo/todo'
import styles from './ToDoList.module.css'

export function ToDoList(props) {

  return <ul className={styles.list}>
    {props.todos.map((todo) => {
      return <ToDo key={todo.id} todo={todo} onDeleteToDo={props.onDeleteToDo} />
    })}

  </ul>
}