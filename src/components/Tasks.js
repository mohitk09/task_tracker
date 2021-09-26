import Task from "./Task";
function Tasks({ tasks }) {
  return (
    <div className="row">
      <div className="col-12 text-right">
        <button className="button primary">New</button>
      </div>
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
      <div className="col-12"></div>
    </div>
  );
}

export default Tasks;
