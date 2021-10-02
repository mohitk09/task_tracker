function Task({ task, onTglStatus }) {
  return (
    <div className="card text-left" key={task.id}>
      <div className="row">
        <div className="col-12" style={{ textAlign: 'center' }}>
          <h4>{task.title}</h4>
        </div>
        <div className="col-10">
          <h5>{task.desc}</h5>
          <div className="task-meta">
            <img
              src="https://icongr.am/feather/calendar.svg?size=12&color=b5b5b5"
              alt="calendar"
            />
            {task.dueDate}
          </div>
        </div>

        <div className="col-2 is-center">
          <button
            className="button icon-only clear"
            onClick={() => onTglStatus(task)}
          >
            {task.status === 'complete' ? '✅' : '⬜'}
          </button>
        </div>
        <div className="col-12">
          <p>{task.remarks}</p>
        </div>
      </div>
    </div>
  );
}

export default Task;
