import { allProject, createProject, saveToAllProject } from "./project";

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

    if (!allProject[project]) {
        const newProject = createProject(project);
        saveToAllProject(newProject);
    }

    const todo = new Todo(title, description, dueDate, priority);

    allProject[project].todolist.push(todo)

   
}

