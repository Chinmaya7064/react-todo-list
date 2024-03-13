import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  

  const handleEdit = (e, id)=>{ 
    let t = todos.filter(item=>item.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }

  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return ( 
    <>
      <Navbar />
      <div className="container md:container md:mx-auto my-9 rounded-xl p-5 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-lg">DayMap - Manage your Todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-2">
          <h2 className="tex-lg font-bold text-center">Add a Todo</h2>
          <input
            placeholder="Type here"
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-5 py-1 border-2 border-black"
          />
          <button
            onClick={handleAdd}  disabled={todo.length <= 3}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 p-2 py-1 text-sm font-bold text-black rounded-md"
          >
            Save
          </button>
        </div>
        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <div className="h-[1px] bg-black opacity-30 w-[90%] mx-auto my-2"></div>
        <h2 className="text-lg font-bold text-center">Your ToDos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="text-center my-5">No Todos to Display</div>}

          {todos.map((item) => {
            return ( (showFinished || !item.isCompleted) &&
              <div
                key={item.id}
                className="todo flex my-3 justify-between"
              >
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    checked={item.isCompleted}
                    type="checkbox"
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e)=>handleEdit(e, item.id)}
                    className="bg-yellow-600 hover:bg-yellow-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <RiEdit2Fill />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-yellow-600 hover:bg-yellow-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
