export const setPriority = (priorityChoice) => {

    let priorityList = [
        'less-important',
        'important',
        'urgent'
    ];

    return priorityList.find(priority => priority === priorityChoice)
    
}

export const changePriority = (projectFolder, todoTitle, choice) => {

    for (const project of Object.values(projectFolder)) {
        for (const todo of project.todolist) {
            if (todo.title === todoTitle) {
                todo.priority = setPriority(choice)
            }
        }
    }
};


