import { allProject } from "./project"

export const setAsCompleted = (projectFolder, todoName) => {

    for (const project of Object.values(projectFolder)) {

       console.log(project)

       for (const todo of project.todolist) {
        
        if(todo.title === todoName) {
            todo.isCompleted = true
        }
       }
    }
};


export const showCompletedTodo = (projectFolder) => {

    let completedTodo = []

    for (const project of Object.values(projectFolder)) {
        for (const todo of project.todolist) {
            if(todo.isCompleted === true) {
                completedTodo.push(todo)
            }
        }
    }
    return completedTodo;
};

