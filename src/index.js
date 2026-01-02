import { allProject } from "./app/project";
import { initialRender, renderTextToContentDiv } from "./dom/home";
import { inputSaver, renderProjectList } from "./dom/renderMyProjectList";
import { saveProjectToAllProject } from "./app/project";
import { createProject } from "./app/project";
import { errorLogger } from "./app/utils/utilities";
import { renderTodoList, selected } from "./dom/renderTodoList";
import {test} from "./app/todo";
import { cancelButton } from "./app/utils/utilities";


const EventHandlerSetter = () => {

    document.addEventListener('DOMContentLoaded', initialRender);
    const navBar = document.querySelector('.navBar');
    const content = document.querySelector('.content');
   
    navBar.addEventListener('click', (e) => {
        e.preventDefault();
        const element = e.target;
        
        if (element.closest('.MyProject')) {
            renderProjectList();
        }
    });


    content.addEventListener('click', (e) => {
        e.preventDefault();
        const element = e.target;
        const elementContent = e.target.textContent;
       
        if (element.closest('.addSvgDiv')) {
            const dialog = document.querySelector('dialog');
            dialog.showModal();   
        } else if (element.closest('.cancelDialog')) {
            const dialog = document.querySelector('dialog');
            dialog.close();
        }

        if (element.classList.contains('saveButton')) {
            if (saveProjectToAllProject(allProject, createProject(inputSaver()))) {
                const closeDialog = document.querySelector('Dialog')
                closeDialog.close();
                renderProjectList();
            } else {
                errorLogger('form', 'project already exist')
            }
        }

        if (element.closest('.projectList')) {
            renderTodoList(selected(elementContent));
        }
    })

    // set cancel Button
    content.addEventListener('click', (e) => {
        const element = e.target.closest('.cancel');

        if (!element) {
            return
        }

        const elementData = element.dataset.action;

        if (elementData === 'projectList') {
            renderTextToContentDiv();
        } else if (elementData === 'todoList') {
            renderProjectList();
        }
    })
}

EventHandlerSetter()




