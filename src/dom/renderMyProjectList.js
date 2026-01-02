import "../dom/styleSheet/myProjectList.css";
import { allProject } from "../app/project";
import { cancelButton, clearDiv } from "../app/utils/utilities";
import { mySvgs } from "../assets/svgs/svg";


export const renderProjectList = () => {

    clearDiv('.content');

    const projectDiv = document.createElement('div');
    projectDiv.className = 'projectDiv';

    const addSvgDiv = document.createElement('div');
    addSvgDiv.className = 'addSvgDiv';
    addSvgDiv.innerHTML = mySvgs.addIcon;
    projectDiv.appendChild(addSvgDiv);
    
    const projectListDiv = document.createElement('div');
    projectListDiv.className = 'projectListDiv';
    
    const projectHeader = document.createElement('ul');
    projectHeader.className = 'projectHeader'
    
    for (const list of Object.values(allProject)) {
        const project = document.createElement('li')
        project.className = 'projectList';
        project.textContent = list.name;
        projectHeader.appendChild(project);
    }

    projectListDiv.appendChild(projectHeader);
    projectDiv.appendChild(projectListDiv);
    const content = document.querySelector('.content')
    content.appendChild(projectDiv);

//    **************** dialog container ************** //

    const dialog = document.createElement('dialog');
    const projectForm = document.createElement('form');
    projectForm.setAttribute('method', 'dialog');

    const inputContainer = document.createElement('div')
    inputContainer.className = 'inputContainer';

    const label = document.createElement('label');
    label.setAttribute('for', 'inputField');
    const input = document.createElement('input');
    input.setAttribute('id', 'inputField');
    input.setAttribute('type', 'text');
    const inputButton = document.createElement('button');
    inputButton.className = 'saveButton'
    inputButton.textContent = 'save';
    const cancel = document.createElement('div')
    cancel.className = 'cancelDialog';
    cancel.innerHTML = mySvgs.closeMenu;

    inputContainer.appendChild(label); 
    inputContainer.appendChild(input);
    inputContainer.appendChild(inputButton);

    projectForm.appendChild(inputContainer);
    projectForm.appendChild(cancel);

    dialog.appendChild(projectForm);
    projectListDiv.appendChild(dialog);

    cancelButton('.content', 'projectList');
}


export const inputSaver = () => {
        const input = document.getElementById('inputField');
        const inputValue = input.value;
       return inputValue;
}

