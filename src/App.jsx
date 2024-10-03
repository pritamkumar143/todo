import React, { useState } from 'react';


const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: true },
    { id: 3, name: 'Task 3', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  // Handle adding a new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const task = {
      id: tasks.length + 1,
      name: newTask,
      completed: false,
    };

    setTasks([...tasks, task]); // Add the new task to the tasks array
    setNewTask(''); // Clear the input field after adding the task
  };

  // Handle deleting a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Remove task by filtering
  };

  return (
    <div className="border-t-2 w-screen h-screen bg-zinc-800 flex items-center flex-col">
      <div className="mt-[7%] w-[90%] md:w-[50%] lg:w-[25%] h-[20%] border rounded-3xl flex justify-around items-center">
        <div className="text-yellow-100">
          <h1 className="text-3xl font-bold">LETS TODO</h1>
          <p>Keeps doing things</p>
        </div>
        <div className="text-4xl p-6 font-extrabold flex  justify-center items-center w-[120px] h-[120px] rounded-full bg-orange-600">
          {tasks.length} Task
          {/* <h1>Task</h1> */}
        </div>
      </div>

      {/* Task Input */}
      <form onSubmit={addTask} className="w-[90%] md:w-[50%] lg:w-[25%] flex justify-between px-5 my-[2%]">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // Update the input value
          placeholder="Write your next task..."
          className="px-5 py-3 text-yellow-100 outline-none w-[80%] md:w-[85%] rounded-xl bg-zinc-700"
          type="text"
        />
        <button
          type="submit"
          className="outline-none text-4xl font-extrabold flex justify-center items-center w-[50px] h-[50px] rounded-full bg-orange-600"
        >
          <i className="ri-add-fill"></i>
        </button>
      </form>

      {/* Task List */}
      <ul className="list-none w-[90%] md:w-[50%] lg:w-[25%]">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-5 flex justify-between items-center border rounded-xl p-5"
          >
            <div className="flex items-center">
              <div
                className={`mr-4 rounded-full w-[30px] h-[30px] ${task.completed ? 'bg-green-400' : 'border border-orange-600'
                  }`}
              ></div>
              <h1
                className={`text-2xl font-extrabold text-yellow-100 ${task.completed ? 'line-through' : ''
                  }`}
              >
                {task.name}
              </h1>
            </div>
            <div className="flex gap-3 text-2xl text-yellow-100">
              {/* Edit and Delete Icons */}
              <i className="ri-file-edit-line"></i>
              <i
                className="ri-delete-bin-3-line cursor-pointer"
              onClick={() => deleteTask(task.id)} // Delete task on click
              ></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
