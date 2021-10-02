import Task from './Task';

function Tasks({ tasks, onTglStatus, images, onChangeImage, deleteTask }) {
  return (
    <div>
      {tasks.map((task) => (
        <>
          <Task
            task={task}
            key={task.id}
            onTglStatus={onTglStatus}
            images={images}
            onChangeImage={onChangeImage}
            deleteTask={deleteTask}
          />
        </>
      ))}
    </div>
  );
}

export default Tasks;
