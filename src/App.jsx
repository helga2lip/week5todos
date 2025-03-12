import { ToDoList } from './ToDoList/ToDoList'
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { Button } from './Button/Button';

export function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [refreshToDos, setRefreshToDos] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch('http://localhost:3005/todos')
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        setTodos(loadedToDos);
      })
      .finally(() => setIsLoading(false));
  }, [refreshToDos]);

  const addToDo = () => {
    setIsCreating(true);
    fetch('http://localhost:3005/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: Date.now(),
        title: inputText,
      }),
    })
      .then(() => {
        setRefreshToDos(!refreshToDos)
        setInputText('')
      })
      .finally(() => setIsCreating(false));
  }

  const editToDo = (id) => {
    const newTodoTitle = prompt('Отредактируйте задачу', '')

    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: id,
        title: newTodoTitle,
      }),
    })
      .then(() => {
        setRefreshToDos(!refreshToDos);
      })
      .finally(() => setIsUpdating(false));
  }

  const deleteToDo = (id) => {
    setIsDeleting(true);

    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setRefreshToDos(!refreshToDos);
      })
      .finally(() => setIsDeleting(false));
  }

  const onAddInputChange = (event) => {
    setInputText(event.target.value);
  }

  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <input className={styles.addInput} type="text" onChange={onAddInputChange} value={inputText} placeholder='Добавьте задачу' />
          <Button onClick={addToDo} disabled={isCreating} className={styles.addButton}>Добавить</Button>
        </header>
        {isLoading
          ? <div className='loader'>Loading...</div>
          : <ToDoList todos={todos} onDeleteToDo={deleteToDo} onEditToDo={editToDo} isDeleting={isDeleting} isUpdating={isUpdating} />
        }
      </div>
    </div>
  )
}
