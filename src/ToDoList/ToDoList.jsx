import { useState } from 'react';
import { ToDo } from '../assets/todo/todo'
import { Button } from '../Button/Button'
import styles from './ToDoList.module.css'

export function ToDoList(props) {
  const [inputText, setInputText] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(props.todos);
  const [isSorted, setIsSorted] = useState(false);

  const onSearchClick = () => {
    setFilteredTodos(props.todos.filter((todo) => {
      return todo.title.includes(inputText)
    }))
  }

  const onSearchInputChange = (event) => {
    setInputText(event.target.value);
  }

  const onSortClick = () => {
    setIsSorted(!isSorted)
  }

  let resultTodos;
  console.log('calc result');

  if (isSorted) {
    resultTodos = [...filteredTodos].sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  } else {
    resultTodos = filteredTodos;
  }

  return <>
    <div className={styles.searchBlock}>
      <input className={styles.searchInput} type="text" onChange={onSearchInputChange} value={inputText} placeholder='Введите задачу' />
      <Button onClick={onSearchClick} className={styles.searchButton}>Поиск</Button>
      <Button onClick={onSortClick} className={isSorted ? styles.buttonSortedActive : styles.buttonSorted}>Отсортировать по алфавиту</Button>
    </div>
    <ul className={styles.list}>
      {resultTodos.map((todo) => {
        return <ToDo key={todo.id}
          todo={todo}
          onDeleteToDo={props.onDeleteToDo}
          onEditToDo={props.onEditToDo}
          isDeleting={props.isDeleting}
          isUpdating={props.isUpdating} />
      })}
    </ul>
  </>
}