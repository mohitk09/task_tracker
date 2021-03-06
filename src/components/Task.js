import ImageLibrary from './ImageLibrary';
import { FaTrash } from 'react-icons/fa';

function Task({ task, onTglStatus, images, onChangeImage, deleteTask }) {
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

        <div className="col-2 left">
          <button
            className="button icon-only clear"
            onClick={() => onTglStatus(task)}
          >
            {task.status === 'complete' ? '✅' : '⬜'}
          </button>
          <FaTrash onClick={() => deleteTask(task)}></FaTrash>
        </div>
        <div className="col-12">
          <p>{task.remarks}</p>
        </div>
      </div>
      <ImageLibrary onChangeImage={onChangeImage} images={images} />
    </div>
  );
}

export default Task;
