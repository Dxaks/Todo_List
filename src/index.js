import { allProject } from "./app/project";
import { initialRender } from "./dom/home";
import { inputSaver, renderProjectList } from "./dom/renderMyProjectList";
import { saveProjectToAllProject } from "./app/project";
import { createProject } from "./app/project";
import { errorLogger } from "./app/utils/utilities";



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

        if (element.closest('.addSvgDiv')) {
            const dialog = document.querySelector('dialog');
            dialog.showModal();   
        } else if (element.closest('.cancel')) {
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
    })
}

EventHandlerSetter()






// createTodo('SHOP', 'my_shop', 'my today_cal', setDate.addDueDate('23-11-2013', '17:40:00'), setPriority('urgent'));


