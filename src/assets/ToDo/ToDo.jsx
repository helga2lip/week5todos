import { useState } from 'react';
import { Button } from '../../Button/Button'
import styles from './ToDo.module.css'

export function ToDo(props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);


  const editToDo = () => {
    const newTodoTitle = prompt('Отредактируйте задачу', '')

    fetch(`http://localhost:3005/todos/${props.todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: props.todo.id,
        title: newTodoTitle,
      }),
    })
      .then(() => {
        props.onDeleteToDo();
      })
      .finally(() => setIsUpdating(false));
  }

  const deleteToDo = () => {
    setIsDeleting(true);

    fetch(`http://localhost:3005/todos/${props.todo.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        props.onDeleteToDo();
      })
      .finally(() => setIsDeleting(false));
  }

  return <li className={styles.listItem}>
    <div className={styles.todoText}>{props.todo.title}</div>
    <Button onClick={editToDo} disabled={isUpdating}>Редактировать</Button>
    <Button onClick={deleteToDo} disabled={isDeleting}>Удалить</Button>
  </li>
}