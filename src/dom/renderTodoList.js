import { allProject } from "../app/project";
import { cancelButton, clearDiv } from "../app/utils/utilities";
import "../dom/styleSheet/myTodoList.css";

// this function return todo_array for the selected project.
export const selected = (selectedTodo) => {
    for (const project of Object.values(allProject)) {
        if (project.name === selectedTodo.toUpperCase()) {
            return project.todolist;
        }
    }
};

// this function render todo for the selected project.
export const renderTodoList = (todoArray) => {
    clearDiv('.content');
    
    const body = document.querySelector('.content');

    const todoDiv = document.createElement('div');
    todoDiv.className = 'todoDiv';

    const table = document.createElement('table');
    table.className = 'contentTable';

    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    let headData = ['title', 'dueDate', 'priority', 'status'];

    for (let i = 0; i < headData.length; i++) {
        const data = document.createElement('th');
        data.textContent = headData[i].toUpperCase();
        headerRow.appendChild(data);
    };
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    // for the body of the table, we append the todo lists
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    todoArray.forEach(todo => {
        const tableRow = document.createElement('tr');
        tableRow.className = 'todoRow';
        tableRow.dataset.Id = todo.id;

      for (const field of headData) {
        const td = document.createElement('td');
        let value = todo[field];
        value ? td.textContent = value : '';
        tableRow.appendChild(td);
      }    
      tbody.appendChild(tableRow)
    });

    todoDiv.appendChild(table)
    body.appendChild(todoDiv);

    const addTodoButton = document.createElement('button');
    addTodoButton.className = 'addTodo'
    addTodoButton.textContent = 'Add Todo';
    todoDiv.appendChild(addTodoButton);
    
    cancelButton('.content', 'todoList');
};

// form for adding todo list
export const renderTodoForm = () => {

    clearDiv('.content');

    const body = document.querySelector('.content');
    const formDiv = document.createElement('div');
    formDiv.className = 'formDiv';

    const form = document.createElement('form');

    const formData = ['title', 'description', 'dueDate', 'priority'];

    formData.forEach((value) => {
        let label = document.createElement('label');
        label.setAttribute('for', value);
        label.textContent = value.toUpperCase();

        let input = document.createElement('input');
        input.id = value;
        input.className = 'formInput';

        if (value === 'description') {
            input.setAttribute('type', 'textArea');
        } else if (value === 'dueDate') {
            input.setAttribute('type', 'date');
        } else {
            input.setAttribute('type', 'text');
        };
        
        form.appendChild(label);
        form.appendChild(input);

        formDiv.appendChild(form);
        body.appendChild(formDiv)
    });

    const formButton = document.createElement('button')
    formButton.className = 'saveTodo';
    formButton.textContent = 'Add';
    form.appendChild(formButton);
};


// input saver from the form above
export const getFormInput = (selectors) => {
    const formInputs = [];
    const inputs = document.querySelectorAll(selectors);
    for (let i = 0; i < inputs.length; i++) {
        formInputs.push(inputs[i].value)
    }
    return formInputs
}


// show full card Details from the table in a dialog
export const showFullTodoCard = (projectName, dataId) => {
    const targetTodo = allProject[projectName].todolist;
    
    let fullDetails = targetTodo.find((todo) => {
        return (todo.id === dataId);
    })

    const fields = [
        ['Tilte', fullDetails.title],
        ['Tilte', fullDetails.description],
        ['Tilte', fullDetails.dueDate],
        ['Tilte', fullDetails.priority],
        ['Tilte', fullDetails.isCompleted ? 'completed' : 'uncompleted']
    ];

    const todoDialog = document.createElement('dialog');
    todoDialog.className = 'showFullTodo';

    fields.forEach((field) => {

        const para = document.createElement('p');
        
        let label = field[0];
        let value = field[1];

        para.textContent = `${label}: ${value}`;
        todoDialog.appendChild(para)
    })

    const body = document.querySelector('body')
    body.appendChild(todoDialog);

    showTodoDialog()
};

function showTodoDialog() {

    const dialog = document.querySelector('.showFullTodo');

    dialog.showModal();

}

