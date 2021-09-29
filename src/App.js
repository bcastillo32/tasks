import { useState, useEffect } from 'react';
const API_BASE = 'http://localhost:3001';

function App() {
  const [tasks, setTasks] = useState([]); //all our tasks will be stored here
  const [popupActive, setPopupActive] = useState(false); //new spot for a task will popup
  const [newTask, setNewTask] = useState(''); //input for new task

  useEffect(() => {
    GetTasks();
  }, []);

  const GetTasks = () => {
    fetch(API_BASE + '/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error: ', err));
  };

  return (
    <div className='App'>
      <h1>Hi Brandon 👋🏼</h1>
      <h4>Here are your tasks...</h4>

      <div className='tasks'>
        {tasks.map((task) => (
          <div
            className={'task' + (task.complete ? ' is-complete' : '')}
            key={task._id}
          >
            <div className='checkbox'></div>
            <div className='text'>{task.text}</div>
            <div className='delete-task'>x</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
