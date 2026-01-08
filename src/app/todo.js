import { allProject, createProject, saveProjectToAllProject } from "./project";

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this. Id= crypto.randomUUID().substring(0, 8)
        this.isCompleted = false
    }
}


export const createTodo = (project, title, description, dueDate, priority) => {
    let projectName = project.trim();
    const todo = new Todo(title, description, dueDate, priority);
    allProject[projectName].todolist.push(todo)
};


createTodo('WORK ', 'myProject', 'School Project', '12-09-2024', 'high');



