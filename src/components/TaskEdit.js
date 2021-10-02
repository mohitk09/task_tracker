import { useState } from 'react';

function TaskEdit({ onSaveTask }) {
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');

  const saveTask = (e) => {
    e.preventDefault();
    onSaveTask({ desc: desc, title: title });
  };
  return (
    <div className="card">
      <h3>Add Task</h3>
      <form>
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          name="desc"
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="text-right">
          <button className="button dark" onClick={saveTask}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEdit;
