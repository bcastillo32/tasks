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

  const completeTask = async (id) => {
    const data = await fetch(API_BASE + '/task/complete/' + id).then((res) =>
      res.json()
    );

    setTasks((tasks) =>
      tasks.map((task) => {
        if (task._id === data._id) {
          task.complete = data.complete;
        }

        return task;
      })
    );
  };

  const addTask = async () => {
    const data = await fetch(API_BASE + '/task/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: newTask
      })
    }).then((res) => res.json());

    setTasks([...tasks, data]);

    setPopupActive(false);
    setNewTask('');
  };

  const deleteTask = async (id) => {
    const data = await fetch(API_BASE + '/task/delete/' + id, {
      method: 'DELETE'
    }).then((res) => res.json());

    setTasks((tasks) => tasks.filter((task) => task._id !== data._id));
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
            onClick={() => completeTask(task._id)}
          >
            <div className='checkbox'></div>
            <div className='text'>{task.text}</div>
            <div className='delete-task' onClick={() => deleteTask(task._id)}>
              x
            </div>
          </div>
        ))}
      </div>
      <div className='addPopup' onClick={() => setPopupActive(true)}>
        ✏️
      </div>

      {popupActive ? (
        <div className='popup'>
          <div className='closePopup' onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className='content'>
            <h3>Add Task</h3>
            <input
              type='text'
              className='add-task-input'
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
            />
            <div className='button' onClick={addTask}>
              +
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
