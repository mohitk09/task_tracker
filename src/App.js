import { useState } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import TaskEdit from "./components/TaskEdit";
import "./App.css";
import "./styles.css";
import Amplify, { API } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const [tasks, setTasks] = useState([
    {
      desc: "Learn React",
      id: 1,
      date: "2021-01-03 10:00",
      status: "Complete",
    },
    { desc: "Profit", id: 2, date: "2021-01-05 15:00", status: "Open" },
  ]);

  const [showTaskEdit, setShowTaskEdit] = useState(false);

  const onSaveTask = ({ desc, date }) => {
    console.log("saving tasks");
    setTasks([
      { desc: desc, date: date, id: Date.now(), complete: false },
      ...tasks,
    ]);
    setShowTaskEdit(false);
  };

  const onTglStatus = (task) => {
    console.log("completing task");
    setTasks(
      tasks.map((chkTask) => {
        chkTask.complete =
          task.id === chkTask.id ? !chkTask.complete : chkTask.complete;
        return chkTask;
      })
    );
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div>
          <button
            className="button primary"
            onClick={() => setShowTaskEdit(!showTaskEdit)}
          >
            {!showTaskEdit && "Create new task"}
            {showTaskEdit && "➖"}{" "}
          </button>
        </div>
        {showTaskEdit && <TaskEdit task={{}} onSaveTask={onSaveTask} />}

        <Tasks tasks={tasks} onTglStatus={onTglStatus}></Tasks>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
