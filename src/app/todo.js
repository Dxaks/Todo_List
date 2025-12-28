import { allProject, createProject, saveProjectToAllProject } from "./project";

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

    }
}

Todo.prototype.isCompleted = false;

export const createTodo = (project, title, description, dueDate, priority) => {

    const todo = new Todo(title, description, dueDate, priority);

    allProject[project].todolist.push(todo)
}

