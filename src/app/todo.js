import { populateStorage } from "./myStorage";
import { allProject } from "./project";

export class Todo {
  constructor(title, description, dueDate, priority, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = false;
    this.id = id || crypto.randomUUID().substring(0, 8);
  }

  setAsCompleted() {
    if (this.isCompleted === false) {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }
  }
}

export const createTodo = (project, title, description, dueDate, priority) => {
  let projectName = project.trim();

  if (title && description && dueDate) {
    const todo = new Todo(title, description, dueDate, priority);
    allProject[projectName].todolist.push(todo);
    populateStorage();
  }
};
