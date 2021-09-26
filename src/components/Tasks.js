import Task from "./Task";
function Tasks({ tasks, onTglStatus }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task task={task} key={task.id} onTglStatus={onTglStatus} />
      ))}
    </div>
  );
}

export default Tasks;
