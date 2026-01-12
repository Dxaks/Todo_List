import { mySvgs } from "../../assets/svgs/svg";
import { renderTextToContentDiv } from "../../dom/home";
import { renderProjectList } from "../../dom/renderMyProjectList";
import { allProject } from "../project";

export const clearDiv = (containerToClear) => {
    const container = document.querySelector(containerToClear);
    container.innerHTML = '';
}

export const errorLogger = (div, comment) => {
    const container = document.querySelector(div);
    const para = document.createElement('p');
    para.textContent = '';
    para.textContent = comment;
    container.appendChild(para)
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
};

