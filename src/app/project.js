// each project folder
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
    if(!folder[project.name] ) {
        folder[project.name] = project;
        return true
    } else{
        return false;
    }
    
}

saveProjectToAllProject(allProject, createProject('work'));


console.log(allProject)
// export function saveProjectToAllProject(project) {

//     let myProject = createProject(project);

//     allProject[myProject.name] = myProject;
// }

// console.log(saveProjectToAllProject("Work"));

// // function to create a new project
// export const createProject = (name) => {
//     return new Project(name);
// }

// // function to save the newly created project in allproject
// export const saveToAllProject = (project) => {
//     allProject[project.name] = project;
// }


// const work = createProject('Work');
// saveToAllProject(work);

