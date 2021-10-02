import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import BeatLoader from 'react-spinners/BeatLoader';

import Header from './components/Header';
import Tasks from './components/Tasks';
import TaskEdit from './components/TaskEdit';
import './App.css';
import './styles.css';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';

const getData = async () => {
  try {
    const resp = await API.get('tracker', '/getdetails');
    return resp;
  } catch (error) {
    console.log('Error', error);
  }
};

Amplify.configure(awsconfig);

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  useEffect(() => {
    setIsLoadingTasks(true);
    getData()
      .then((response) => {
        setTasks(response);
      })
      .finally(() => setIsLoadingTasks(false));
  }, []);

  const [showTaskEdit, setShowTaskEdit] = useState(false);

  const onSaveTask = ({ desc, date }) => {
    console.log('saving tasks');
    setTasks([
      { desc: desc, date: date, id: Date.now(), complete: false },
      ...tasks,
    ]);
    setShowTaskEdit(false);
  };

  const onTglStatus = (task) => {
    console.log('completing task');
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
      {isLoadingTasks ? (
        <>
          <BeatLoader size={20} margin={2} color="#36D7B7" />
          <h3>Fetching Details...</h3>
        </>
      ) : (
        <div className="container">
          <div>
            <button
              className="button primary"
              onClick={() => setShowTaskEdit(!showTaskEdit)}
            >
              {!showTaskEdit && 'Create new task'}
              {showTaskEdit && '➖'}{' '}
            </button>
          </div>
          {showTaskEdit && <TaskEdit task={{}} onSaveTask={onSaveTask} />}

          <Tasks tasks={tasks} onTglStatus={onTglStatus}></Tasks>
        </div>
      )}
    </div>
  );
}

export default withAuthenticator(App);
