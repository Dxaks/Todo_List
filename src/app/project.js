// object that hold each project folder
export const allProject = {};

// project blueprint
class Project {
    constructor(name) {
        this.name = name
        this.todolist = [];
    }
};

export function createProject(name) {
    let projectName = name.toUpperCase();
    let project = new Project(projectName);
    return project;
} 

export function saveProjectToAllProject(folder, project) {
    if(!folder[project.name]) {
        folder[project.name] = project;
        return true
    } else{
        return false;
    }
    
}

saveProjectToAllProject(allProject, createProject('work'));
saveProjectToAllProject(allProject, createProject('school'));
saveProjectToAllProject(allProject, createProject('home'));



