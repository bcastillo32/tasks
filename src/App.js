function App() {
  return (
    <div className='App'>
      <h1>Hi Brandon 👋🏼</h1>
      <h4>Here are your tasks...</h4>

      <div className='tasks'>
        <div className='task'>
          <div className='checkbox'></div>
          <div className='text'>Get eggs</div>
          <div className='delete-task'>x</div>
        </div>
        <div className='task is-complete'>
          <div className='checkbox'></div>
          <div className='text'>Do laundry</div>
          <div className='delete-task'>x</div>
        </div>
      </div>
    </div>
  );
}

export default App;
