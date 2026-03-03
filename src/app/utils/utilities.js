import { mySvgs } from "../../assets/svgs/svg";
import { populateStorage } from "../myStorage";
import { allProject } from "../project";

export const clearDiv = (containerToClear) => {
    const container = document.querySelector(containerToClear);
    container.innerHTML = '';
}

export const errorLogger = (div, comment) => {
    const container = document.querySelector(div);

    const firstPara = document.querySelector(`${div} p`);
    if (firstPara) {
        return
    }
    const para = document.createElement('p');
    para.textContent = comment;
    container.appendChild(para);
};

export const cancelButton = (containerSelector, dataAction) => {
    const cancelDiv = document.createElement('div');
    cancelDiv.className = 'cancel';
    cancelDiv.innerHTML = mySvgs.closeMenu;
    cancelDiv.dataset.action = dataAction;
    const div = document.querySelector(containerSelector)
    div.appendChild(cancelDiv);
};

export const setTodoAsCompeleted = (projectName, dataId) => {
    let todofolder = allProject[projectName].todolist;
    const targetTodo = todofolder.find((todo) => {
        return todo.id === dataId
    })
    targetTodo.setAsCompleted();
    populateStorage();
};

export const removeTodo = (projectName, dataId) => {
    let todoFolder = allProject[projectName].todolist;
    const targetTodo = todoFolder.findIndex(todo => todo.id === dataId);
    if(targetTodo !== -1) {
        todoFolder.splice(targetTodo, 1)
        populateStorage()
    }
};


const updater = () => {

    let targetTodo = null;

    const getTodo = (projectName, todoId) => {

        if (!(projectName || todoId)) {
            return
        }
        const todoFolder = allProject[projectName].todolist;
        return targetTodo = todoFolder.find(todo => todo.id === todoId);
    }

    const updateTodo = (title, description, dueDate, priority) => {
        if (!targetTodo) {
            return
        }

        targetTodo.title = title;
        targetTodo.description = description;
        targetTodo.dueDate = dueDate;
        targetTodo.priority = priority;

        populateStorage()
    }

    return {
        getTodo,
        updateTodo
    };
};

export const todoUpdater = updater()
