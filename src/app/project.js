// each project folder
export const allProject = {};

// project blueprint
class Project {
    constructor(name) {
        this.name = name
        this.todolist = [];
    }
};

// function to create a new project
export const createProject = (name) => {
    return new Project(name);
}

// function to save the newly created project in allproject
export const saveToAllProject = (project) => {
    allProject[project.name] = project;
}


const work = createProject('Work');
saveToAllProject(work);



