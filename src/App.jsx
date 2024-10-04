import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

const App = () => {
    // Load tasks from localStorage (if any)
    const loadTasks = () => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    };

    // Temporary database for tasks
    const [tasks, settasks] = useState(loadTasks());
    const [title, settitle] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const SubmitHandler = (e) => {
        e.preventDefault();
        const task = {
            title: title,
            completed: false,
            id: nanoid(),
        };
        settasks([...tasks, task]);
        settitle("");
    };

    const ToggleHandler = (index) => {
        const copytasks = [...tasks];
        copytasks[index].completed = !copytasks[index].completed;
        settasks(copytasks);
    };

    const DeleteHandler = (index) => {
        if (tasks[index].completed || confirm("Are you sure?")) {
            const copytasks = [...tasks];
            copytasks.splice(index, 1);
            settasks(copytasks);
        } else {
            alert("Task not deleted!");
            return;
        }
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTitle(tasks[index].title); // Set the current task title in the input
    };

    const saveEditedTask = (index) => {
        const copytasks = [...tasks];
        copytasks[index].title = editedTitle;
        settasks(copytasks);
        setEditingIndex(null); // Exit edit mode
    };

    return (
        <div className="border-t-2 w-screen h-screen bg-zinc-800 flex items-center flex-col">
            <div className="mt-[7%] w-[25%] h-[20%] border rounded-3xl flex justify-around items-center">
                <div className="text-yellow-100">
                    <h1 className="text-3xl font-bold">LETS TODO</h1>
                    <p>Keeps doing things</p>
                </div>
                <div className="text-4xl font-extrabold flex justify-center items-center w-[120px] h-[120px] rounded-full bg-orange-600">
                    {tasks.filter((task) => task.completed).length}/{tasks.length}
                </div>
            </div>

            {/* Task input */}
            <form
                onSubmit={SubmitHandler}
                className="w-[25%] relative  flex justify-between px-5 my-[2%]"
            >
                <input
                    placeholder="Write your next task..."
                    className="px-5 py-3 text-yellow-100  outline-none w-[85%] rounded-xl bg-zinc-700"
                    type="text"
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                />
                <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-[50px] h-[50px] rounded-full bg-orange-600">
                    <i className="ri-add-fill"></i>
                </button>
            </form>

            {/* Task List */}
            <ul className="list-none w-[25%]  relative">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <li
                            key={task.id}
                            className="mb-5 flex justify-between items-center border rounded-xl p-5"
                        >
                            <div className="flex  items-center relative">
                                {/* Toggle completion status */}
                                <div
                                    onClick={() => ToggleHandler(index)}
                                    className={`${task.completed
                                        ? "bg-green-400"
                                        : "border border-orange-600"
                                        } mr-4 rounded-full w-[30px] h-[30px] cursor-pointer`}
                                ></div>

                                {/* Show input if editing, otherwise show task title */}
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        className=" w-[70%]   h-8 text-2xl font-extrabold text-yellow-100 bg-zinc-700  rounded-md"
                                    />
                                ) : (
                                    <h1
                                        className={`${task.completed ? "line-through" : ""
                                            } text-2xl font-extrabold text-yellow-100`}
                                    >
                                        {task.title}
                                    </h1>
                                )}
                            </div>
                            <div className="flex gap-3 text-2xl text-yellow-100">
                                {/* Edit and Save Icons */}
                                {editingIndex === index ? (
                                    <i
                                        className="ri-save-line cursor-pointer"
                                        onClick={() => saveEditedTask(index)}
                                    ></i>
                                ) : (
                                    <i
                                        className="ri-file-edit-line cursor-pointer"
                                        onClick={() => startEditing(index)}
                                    ></i>
                                )}

                                {/* Delete Icon */}
                                <i
                                    onClick={() => DeleteHandler(index)}
                                    className="ri-delete-bin-3-line cursor-pointer"
                                ></i>
                            </div>
                        </li>
                    ))
                ) : (
                    <h1 className="mt-5 text-yellow-100 text-2xl font-extrabold text-center">
                        No Task Found
                    </h1>
                )}
            </ul>
        </div>
    );
};

export default App;
