import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);


  // GET TASKS
  const getTasks = async () => {

    try {

      setLoading(true);

      const response = await api.get("/tasks");

      setTasks(response.data.data || []);

    } catch (error) {

      if (error.response?.status === 401) {

        localStorage.removeItem("token");

        navigate("/");
      }

      alert(
        error.response?.data?.message ||
        error.message
      );

    } finally {

      setLoading(false);
    }
  };


  // CREATE TASK
  const createTask = async () => {

    try {

      if (!title.trim()) {
        return alert("Title is required");
      }

      await api.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      await getTasks();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };


  // UPDATE TASK
  const updateTask = async (id, completed) => {

    try {

      await api.patch(`/tasks/${id}`, {
        completed: !completed,
      });

      await getTasks();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };


  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await api.delete(`/tasks/${id}`);

      await getTasks();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };


  // FETCH TASKS ON PAGE LOAD
  useEffect(() => {

    getTasks();

  }, []);


  return (
    <div style={{ padding: "20px" }}>

      <h1>Dashboard</h1>

      {/* CREATE TASK */}

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
        }}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
        }}
      />

      <button
        onClick={createTask}
        style={{
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Create Task
      </button>

      <hr />


      {/* TASK LIST */}

      {
        loading ? (

          <p>Loading...</p>

        ) : tasks.length === 0 ? (

          <p>No tasks found</p>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >

              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p>
                Status:
                {
                  task.completed
                    ? " Completed"
                    : " Pending"
                }
              </p>

              {/* UPDATE TASK */}

              <button
                onClick={() =>
                  updateTask(
                    task._id,
                    task.completed
                  )
                }
                style={{
                  marginRight: "10px",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                Toggle Status
              </button>


              {/* DELETE TASK */}

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
                style={{
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>

            </div>
          ))
        )
      }

    </div>
  );
}

export default Dashboard;