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
Todo.prototype.id = crypto.randomUUID().substring(0, 8)

export const createTodo = (project, title, description, dueDate, priority) => {
    const todo = new Todo(title, description, dueDate, priority);
    allProject[project].todolist.push(todo)
};

export const test = 'can you see me';

createTodo('WORK', 'myProject', 'School Project', '12-09-2024', 'high');



