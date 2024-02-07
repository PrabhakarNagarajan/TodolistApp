import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setnewtitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updateTodoArr));
    setnewtitle("");
    setNewDescription("");
  };
  const handleDeleteTodos = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleDeleteCompletedTodo = (index) => {
    let reduceCompletedTodo = [...completedTodos];
    reduceCompletedTodo.splice(index, 1);
    // localStorage.setItem("completedTodos", JSON.stringify(reduceCompletedTodo));
    setCompletedTodos(reduceCompletedTodo);
  };

  const handleCompleteTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodos(index);
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    let finishedTodo = JSON.parse(localStorage.getItem("completedTodos"));

    if (savedTodos) {
      setTodos(savedTodos);
    }

    if (finishedTodo) {
      setCompletedTodos(finishedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              placeholder="What's is the task title"
              value={newTitle}
              onChange={(e) => setnewtitle(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              placeholder="What's is the task description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              className="primaryBtn"
              onClick={handleAddTodo}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        {isCompleteScreen === false &&
          allTodos.map((item, index) => {
            return (
              <div className="todo-list" key={index}>
                <div className="todo-list-item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      title="Delete"
                      onClick={() => handleDeleteTodos(index)}
                    />
                    <BsCheckLg
                      className="check-icon"
                      title="Complete"
                      onClick={() => handleCompleteTodo(index)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        {isCompleteScreen === true &&
          completedTodos.map((item, index) => {
            return (
              <div className="todo-list" key={index}>
                <div className="todo-list-item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <small>{item.completedOn}</small>
                  </p>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      title="Delete"
                      onClick={() => handleDeleteCompletedTodo(index)}
                    />
                    {/* <BsCheckLg
                      className="check-icon"
                      title="Complete"
                      onClick={() => handleCompleteTodo(index)}
                    /> */}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
