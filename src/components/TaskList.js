import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../App";
import { Pulsar } from "@uiball/loaders";
import axios from "axios";
import {FaHeart} from "react-icons/fa"


const TaskList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTask] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  //obtener tareas*get tasks
  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  //datos input * input form
  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //funcion crear task * post task
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("La tarea no puede estar vacia", {
        position: "top-center",
        theme: "colored",
      });
    }
    setIsLoading(true);
    try {
      await axios.post(`${URL}/api/tasks/`, formData);
      setFormData({ ...formData, name: "" });
      toast.success("La tarea se añadio correctamente", {
        position: "top-center",
        theme: "colored",
      });
      setIsLoading(false);
      getTasks();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
      });
      console.log(error);
      setIsLoading(false);
    }
  };

  //funcion borrar tarea * DELETE task

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      toast.success(`Se elimino correctamente la tarea`, {
        position: "top-center",
        theme: "colored",
      });
      getTasks();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
      });

      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
      });
      console.log(error);
    }
  };
  //
    useEffect (() => {
      const cTask = tasks.filter((task) => {
        return task.completed === true
      })
      setCompletedTask(cTask)
    },[tasks])

  // obtener una sola tarea * get a single task

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: task.completed });
    setTaskID(task._id);
    setIsEditing(true);
  };

  // actualizar tarea * update task

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("La tarea no puede estar vacia", {
        position: "top-center",
        theme: "colored",
      });
    }
    setIsLoading(true);
    try {
      await axios.put(`${URL}/api/tasks/${taskID}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      toast.success("La tarea se edito correctamente", {
        position: "top-center",
        theme: "colored",
      });
      setIsLoading(false);
      getTasks();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
      });
      console.log(error);
      setIsLoading(false);
    }
  };

  //Completar tarea * complete task to true
  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: false,
    };
    setIsLoading(true);
    if (task.completed) {
      newFormData.completed = false;
    } else {
      newFormData.completed = true;
    }

    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      toast.success("El estado de la tarea cambio", {
        position: "top-center",
        theme: "colored",
      });
      setIsLoading(false);
      getTasks();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
      });
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="--flex-center">
          <Pulsar size={45} speed={2} color="black" />
        </div>
      ) : (
        <>
          <h2>ToDo List</h2>
          <TaskForm
            name={name}
            handleInputChange={handleInputChange}
            createTask={createTask}
            isEditing={isEditing}
            updateTask={updateTask}
          />
          {tasks.length > 0 && (
            <div className="--flex-between --pb">
            <p>
              <b>Total Tareas: </b>{tasks.length}
            </p>
            <p>
              <b>Tareas Completadas: </b>{completedTasks.length}
            </p>
          </div>
          )}

          
          <hr />
          {!isLoading && tasks.length === 0 ? (
            <p className="--py">
              No hay tareas en la base de datos, agrega una!
            </p>
          ) : (
            <>
              {tasks.map((task, index) => {
                return (
                  <Task
                    key={task._id}
                    task={task}
                    index={index}
                    deleteTask={deleteTask}
                    getSingleTask={getSingleTask}
                    setToComplete={setToComplete}
                  />
                );
              })}
            </>
          )}
        </>
      )}
      <hr/>
      <span>
    Made with <FaHeart color="red" /> by <a href="https://www.linkedin.com/in/victordanielmun/" target="_blank">Victordanielmun</a>
</span>
    </>
  );
};

export default TaskList;
