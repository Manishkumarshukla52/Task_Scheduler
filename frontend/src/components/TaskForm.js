import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editingTask, cancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: editingTask.dueDate?.slice(0, 10),
        priority: editingTask.priority,
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Edit Task' : 'Create Task'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        value={formData.title}
        onChange={handleChange}
      />
      <br />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <input
        type="date"
        name="dueDate"
        required
        value={formData.dueDate}
        onChange={handleChange}
      />
      <br />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <br />
      <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
      {editingTask && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
