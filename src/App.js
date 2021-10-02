import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { API } from 'aws-amplify';
import BeatLoader from 'react-spinners/BeatLoader';
import Header from './components/Header';
import Tasks from './components/Tasks';
import TaskEdit from './components/TaskEdit';
import awsconfig from './aws-exports';
import './App.css';
import './styles.css';

/*  All the consoles have been put for demonstration purposes, should be replaced by a logger for a production application */

const getData = async () => {
  try {
    const resp = await API.get('tracker', '/getdetails');
    return resp;
  } catch (error) {
    console.log('Error while fetching data', error);
  }
};

Amplify.configure(awsconfig);

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const [images, setImages] = useState([]);

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const deleteTask = (task) => {
    API.del('tracker', `/getdetails/object/${task.id}/${task.dueDate}`)
      .then(() => {
        const array = tasks.filter((element) => element.id !== task.id);
        setTasks(array);
      })
      .catch((error) => console.log('Error while deleting task', error));
  };

  useEffect(() => {
    setIsLoadingTasks(true);
    getData()
      .then((response) => {
        setTasks(response);
      })
      .finally(() => setIsLoadingTasks(false));
  }, []);

  const [showTaskEdit, setShowTaskEdit] = useState(false);

  const onSaveTask = ({ desc, title }) => {
    console.log('saving tasks');
    const task = {
      desc,
      dueDate: Date.now(),
      id: Date.now(),
      status: false,
      title,
    };
    setTasks([task, ...tasks]);
    setShowTaskEdit(false);
    const myInit = {
      body: task,
    };
    API.post('tracker', '/getdetails', myInit)
      .then((res) => console.log('res', res))
      .catch((err) => console.log('Error while saving task ', err));
  };

  const onTglStatus = (task) => {
    console.log('toggling status of the task', task);

    if (task.status === 'complete') {
      const modifiedTasks = tasks.map((element) => {
        if (element.id === task.id) {
          element.status = 'open';
        }
        return element;
      });
      const myInit = {
        body: task,
      };
      API.post('tracker', '/getdetails', myInit);
      setTasks(modifiedTasks);
    } else {
      const modifiedTasks = tasks.map((element) => {
        if (element.id === task.id) {
          element.status = 'complete';
        }
        return element;
      });
      const myInit = {
        body: task,
      };
      API.post('tracker', '/getdetails', myInit).catch((error) =>
        console.log('Error while updating status', error)
      );
      setTasks(modifiedTasks);
    }
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
          {showTaskEdit && <TaskEdit onSaveTask={onSaveTask} />}

          <Tasks
            tasks={tasks}
            onTglStatus={onTglStatus}
            images={images}
            onChangeImage={onChangeImage}
            deleteTask={deleteTask}
          ></Tasks>
        </div>
      )}
    </div>
  );
}

export default withAuthenticator(App);
