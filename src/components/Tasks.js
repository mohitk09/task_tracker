import Task from './Task';
function Tasks({ tasks, onTglStatus, images, onChangeImage }) {
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
          />
        </>
      ))}
    </div>
  );
}

export default Tasks;
