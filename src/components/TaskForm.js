

const TaskForm = ({createTask, name, handleInputChange, isEditing, updateTask}) => {
  
  return (
      <div>
          <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
            <input 
            type="text" 
            placeholder="Añadir una tarea" 
            name="name" 
            value={name} 
            onChange={handleInputChange}
            />
            <button type="submit">
              {isEditing? "Editar" : "Añadir"}
            </button>
          </form>
          </div>
    )
  }
  
  export default TaskForm