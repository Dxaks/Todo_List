import { allProject, Project } from "./app/project";
import { initialRender, renderTextToContentDiv } from "./dom/home";
import { inputSaver, renderProjectList } from "./dom/renderMyProjectList";
import { saveProjectToAllProject } from "./app/project";
import { createProject } from "./app/project";
import { renderTodoList, selected, getFormInput, showFullTodoCard, renderUpdateForm } from "./dom/renderTodoList";
import { createTodo, Todo } from "./app/todo";
import { date } from "./app/date";
import { setTodoAsCompeleted, errorLogger, removeTodo, todoUpdater } from "./app/utils/utilities";
import { renderTodoForm } from "./dom/renderTodoList";
import { renderAllScheduleTodo } from "./dom/scheduledTodo";
import { filterOverDue } from "./dom/renderOverDue";


function rebuildObject() {

    const myStoredObject = localStorage.getItem('allProjectFolder');
    const resumeProject = JSON.parse(myStoredObject);

    for (let projectName in resumeProject) {
        const projectData = resumeProject[projectName];
        const projectInstances = new Project(projectData.name);

        projectData.todolist.forEach(todo => {
           const todoInstances = new Todo(todo.title, todo.description, todo.dueDate, todo.priority);
           projectInstances.todolist.push(todoInstances);
        });
        allProject[projectName] = projectInstances;
    };
};


document.addEventListener('DOMContentLoaded', () => {

    initialRender();

    const storedObject = localStorage.getItem('allProjectFolder');
    if (storedObject) {
        rebuildObject();
    } else {
        saveProjectToAllProject(allProject, createProject('work'));
        saveProjectToAllProject(allProject, createProject('school'));
        saveProjectToAllProject(allProject, createProject('home'));
        }
})


const EventHandlerSetter = () => {

    const navBar = document.querySelector('.navBar');
    const content = document.querySelector('.content');
    const body = document.querySelector('body');
   

    body.addEventListener('click', (e) => {  
        
        const element = e.target;

        const preventDefaultBahavior = element.classList.contains('toggleTodoAsCompleted') 
        || element.classList.contains('updateTodo') || element.classList.contains('formInput');

        if (!preventDefaultBahavior) {
            e.preventDefault()
        }

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

        if (element.classList.contains('deleteTodo')) {
            const projectName = projectTracker.getName();
            const todoId = projectTracker.getId();
            removeTodo(projectName, todoId);
            renderTodoList(selected(projectName));
        }

        if (element.classList.contains('updateBtn')) {
            const projectName = projectTracker.getName();
            const projectId = projectTracker.getId();
            const todoToUpdate = todoUpdater.getTodo(projectName, projectId);
            renderUpdateForm(todoToUpdate);
        }

        if (element.classList.contains('updateTodo')) {
            const formInput = getFormInput('.updateInput');
            let title = formInput[0];
            let description = formInput[1];
            let dueDate = date.setDate(formInput[2]);
            let priority = formInput[3];
            
            todoUpdater.updateTodo(title, description, dueDate, priority);
            renderTodoList(selected(projectTracker.getName()))
        }
    })


    navBar.addEventListener('click', (e) => {
        e.preventDefault();
        const element = e.target;
        
        if (element.closest('.MyProject')) {
            renderProjectList();
        } else if (element.closest('.Scheduled')) {
            renderAllScheduleTodo(allProject);
        } else if (element.closest('.OverDue')) {
            filterOverDue(allProject);
        } 
    });


    content.addEventListener('click', (e) => {
        
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
            const projectName = projectTracker.getName();
            let input = getFormInput('.formInput');
            let title = input[0];
            let description = input[1];
            let dueDate = date.setDate(input[2]);
            let priority = input[3];

            createTodo(projectName, title, description, dueDate, priority);
            renderTodoList(selected(projectName));
        }

        // showing fullDetails of the todo goes here!!!
        if (element.closest('.todoRow')) {
            const projectName = projectTracker.getName();
            const row = element.closest('.todoRow');
            const tableRowId = row.dataset.id;
            showFullTodoCard(projectName, tableRowId);
            projectTracker.updateId(element);
        };
    })

    // set cancel Button
    content.addEventListener('click', (e) => {

        const element = e.target.closest('.cancel');

        if (!element) {
            return
        }

        const elementData = element.dataset.action;
        console.log(elementData)

        if (elementData === 'projectList') {
            renderTextToContentDiv();
        } else if (elementData === 'todoList') {
            renderProjectList();
        }
        else if (elementData === 'todoForm') {
            const projectName = projectTracker.getName();
            renderTodoList(selected(projectName));
        } 

        // this logic is for closing a dialog
        const dialog = element.closest('dialog');
        if (dialog) {
            dialog.close();
            dialog.remove();
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
