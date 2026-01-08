import { allProject } from "./app/project";
import { initialRender, renderTextToContentDiv } from "./dom/home";
import { inputSaver, renderProjectList } from "./dom/renderMyProjectList";
import { saveProjectToAllProject } from "./app/project";
import { createProject } from "./app/project";
import { errorLogger } from "./app/utils/utilities";
import { renderTodoList, selected, getFormInput, showFullTodoCard } from "./dom/renderTodoList";
import {createTodo, test} from "./app/todo";
import { cancelButton } from "./app/utils/utilities";
import { renderTodoForm } from "./dom/renderTodoList";


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
            projectTracker.update(element);
        }

        if (element.classList.contains('addTodo')) {
            renderTodoForm();
        }

        // creating todolist goes here!!!!
        if (element.classList.contains('saveTodo')) {
            const input = getFormInput('.formInput');
            const projectName = projectTracker.getName();
            createTodo(projectName, input[0], input[1], input[2], input[3]);
            renderTodoList(selected(projectName));
        }

        // showing fullDetails of the todo goes here!!!

        if (element.closest('.todoRow')) {
            const projectName = projectTracker.getName();
            const tableRowId = element.dataset.Id;
            showFullTodoCard(projectName, tableRowId)
        };
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


function getProject() {

    let projectName = null;

    return {
        update(element) {
            if (element.classList.contains('projectList')) {
                projectName = element.textContent;
                return true;
            } else {return false}
        },
        getName() {
            return projectName;
        }
    }
}

 const projectTracker = getProject();
