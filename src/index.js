import { allProject } from "./app/project";
import { initialRender, renderTextToContentDiv } from "./dom/home";
import { inputSaver, renderProjectList } from "./dom/renderMyProjectList";
import { saveProjectToAllProject } from "./app/project";
import { createProject } from "./app/project";
import { errorLogger } from "./app/utils/utilities";
import { renderTodoList, selected, getFormInput, showFullTodoCard } from "./dom/renderTodoList";
import {createTodo, test} from "./app/todo";
import { setTodoAsCompeleted } from "./app/utils/utilities";
import { renderTodoForm } from "./dom/renderTodoList";


const EventHandlerSetter = () => {

    document.addEventListener('DOMContentLoaded', initialRender);
    const navBar = document.querySelector('.navBar');
    const content = document.querySelector('.content');
    const body = document.querySelector('body');
   

    body.addEventListener('click', (e) => {
        
        const element = e.target;

         if (element.classList.contains('toggleTodoAsCompleted')) {
            
            if (element.checked) {
               
                const projectName = projectTracker.getName();
                
                const todoId = projectTracker.getId();
               
                setTodoAsCompeleted(projectName, todoId)
                renderTodoList(selected(projectName))
            } else if (!element.checked) {
                const projectName = projectTracker.getName();
                
                const todoId = projectTracker.getId();
               
                setTodoAsCompeleted(projectName, todoId)
                renderTodoList(selected(projectName))

            }
        }
    })


    navBar.addEventListener('click', (e) => {
        e.preventDefault();
        const element = e.target;
        
        if (element.closest('.MyProject')) {
            renderProjectList();
        }
    });


    content.addEventListener('click', (e) => {
        // e.preventDefault();
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
            const row = element.closest('.todoRow');
            const tableRowId = row.dataset.id;
            console.log(tableRowId);

            showFullTodoCard(projectName, tableRowId);
            projectTracker.updateId(element)
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
    let projectId = null;
    return {
        updateId(element) {
            if(element.closest('.todoRow')) {
                const row = element.closest('.todoRow');
                projectId = row.dataset.id;
            }
        },
        getId() {
            return projectId;
        },
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
