import React from 'react';

const TaskList = ({ tasks, onDelete, onEdit, onToggleComplete }) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} style={{ marginBottom: '10px' }}>
              <strong>{task.title}</strong> — {task.priority}
              <br />
              Due: {new Date(task.dueDate).toLocaleDateString()}
              <br />
              {task.description}
              <br />
              Status: {task.completed ? '✅ Completed' : '❌ Not Completed'}
              <br />
              <button onClick={() => onToggleComplete(task)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
