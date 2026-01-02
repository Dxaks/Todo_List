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
      for (const field of headData) {
        const td = document.createElement('td');
        let value= todo[field];
        value ? td.textContent = value : '';
        tableRow.appendChild(td);
      }    
      tbody.appendChild(tableRow)
    });

    todoDiv.appendChild(table)
    body.appendChild(todoDiv);

    const addTodoDiv = document.createElement('button');
    addTodoDiv.textContent = 'Add Todo';
    todoDiv.appendChild(addTodoDiv);
    
    cancelButton('.content', 'todoList');
};

const renderTodoForm = () => {

    clearDiv('content');

    const body = document.querySelector('.content');
    const formDiv = document.createElement('div');
    formDiv.className = 'formDiv';

    const form = document.createElement('form');


}