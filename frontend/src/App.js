import './App.css';
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddOrUpdateTask = async (taskData) => {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
      setEditingTask(null);
    } else {
      await createTask({ ...taskData, completed: false });
    }
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleToggleComplete = async (task) => {
    await updateTask(task._id, { ...task, completed: !task.completed });
    loadTasks();
  };

  const cancelEdit = () => setEditingTask(null);

  return (
    <div className="App">
      <h1>🗓️ Task Scheduler</h1>
      <TaskForm onSubmit={handleAddOrUpdateTask} editingTask={editingTask} cancelEdit={cancelEdit} />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default App;
