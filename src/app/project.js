import { populateStorage } from "./myStorage";
// object that hold each project folder
export const allProject = {};

// project blueprint
export class Project {
  constructor(name) {
    this.name = name;
    this.todolist = [];
  }
}

export function createProject(name) {
  let projectName = name.toUpperCase();
  let project = new Project(projectName);
  return project;
}

export function saveProjectToAllProject(folder, project) {
  if (!folder[project.name]) {
    folder[project.name] = project;
    populateStorage();
    const newFolder = localStorage.getItem("allProjectFolder");
    console.log(JSON.parse(newFolder));
    return true;
  } else {
    return false;
  }
}
