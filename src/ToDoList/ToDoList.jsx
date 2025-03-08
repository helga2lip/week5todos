import { useState } from 'react';
import { ToDo } from '../assets/todo/todo'
import { Button } from '../Button/Button'
import styles from './ToDoList.module.css'

export function ToDoList(props) {
  const [inputText, setInputText] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(props.todos);

  const onSearchClick = () => {
    setFilteredTodos(props.todos.filter((todo) => {
      return todo.title.includes(inputText)
    }))
  }

  const onSearchInputChange = (event) => {
    setInputText(event.target.value);
  }

  return <>
    <div className={styles.searchBlock}>
      <input className={styles.searchInput} type="text" onChange={onSearchInputChange} value={inputText} />
      <Button onClick={onSearchClick}>Поиск</Button>
    </div>
    <ul className={styles.list}>
      {filteredTodos.map((todo) => {
        return <ToDo key={todo.id} todo={todo} onDeleteToDo={props.onDeleteToDo} />
      })}
    </ul>
  </>
}