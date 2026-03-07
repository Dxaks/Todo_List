export const setPriority = () => {
  let priorityList = ["less-important", "important", "urgent"];

  const priorityOption = () => {
    return priorityList;
  };

  return {
    priorityOption,
  };
};

export const priorityList = setPriority();

export const changePriority = (projectFolder, todoTitle, choice) => {
  for (const project of Object.values(projectFolder)) {
    for (const todo of project.todolist) {
      if (todo.title === todoTitle) {
        todo.priority = setPriority(choice);
      }
    }
  }
};
