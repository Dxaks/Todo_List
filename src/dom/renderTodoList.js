import "../dom/styleSheet/myTodoList.css";
import { allProject } from "../app/project";
import { cancelButton, clearDiv } from "../app/utils/utilities";
import { priorityList } from "../app/priority";

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
  clearDiv(".content");

  const body = document.querySelector(".content");

  const todoDiv = document.createElement("div");
  todoDiv.className = "todoDiv";

  const table = document.createElement("table");
  table.className = "contentTable";

  const tableHeader = document.createElement("thead");
  const headerRow = document.createElement("tr");

  let headData = ["Title", "Due Date", "Priority", "Status"];

  for (let i = 0; i < headData.length; i++) {
    const data = document.createElement("th");
    data.textContent = headData[i].toUpperCase();
    headerRow.appendChild(data);
  }
  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);

  // for the body of the table, we append the todo lists
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  todoArray.forEach((todo) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "todoRow";
    tableRow.dataset.id = todo.id;

    for (const field in todo) {
      const td = document.createElement("td");

      if (field === "id" || field === "description") continue;

      if (field === "isCompleted" && todo[field] === true) {
        td.textContent = "Completed";
        td.style.backgroundColor = "green";
      } else if (field === "isCompleted" && todo[field] === false) {
        td.textContent = "";
      } else {
        td.textContent = todo[field];
      }
      tableRow.appendChild(td);
    }
    tbody.appendChild(tableRow);
  });

  todoDiv.appendChild(table);
  body.appendChild(todoDiv);

  const addTodoButton = document.createElement("button");
  addTodoButton.className = "addTodo";
  addTodoButton.textContent = "Add Todo";
  todoDiv.appendChild(addTodoButton);

  cancelButton(".content", "todoList");
};

// Creating form for adding todo list or updating the exiting todo
export const renderTodoForm = () => {
  clearDiv(".content");

  const body = document.querySelector(".content");
  const formDiv = document.createElement("div");
  formDiv.className = "formDiv";

  const form = document.createElement("form");
  form.className = "todoForm";

  const formData = ["title", "description", "dueDate"];

  formData.forEach((value) => {
    let label = document.createElement("label");
    label.setAttribute("for", value);
    label.textContent = value.toUpperCase();

    let input = document.createElement("input");
    input.id = value;
    input.className = "formInput";
    input.required = true;

    if (value === "description") {
      input.setAttribute("type", "textArea");
    } else if (value === "dueDate") {
      input.setAttribute("type", "date");
    } else {
      input.setAttribute("type", "text");
    }

    form.appendChild(label);
    form.appendChild(input);

    formDiv.appendChild(form);
    body.appendChild(formDiv);
  });

  // append priority options to the form
  const ListOptions = priorityList.priorityOption();
  const select = document.createElement("select");
  select.className = "formInput";
  select.id = "priority";

  const selectLabel = document.createElement("label");
  selectLabel.setAttribute("for", "priority");
  selectLabel.textContent = "Choice Priority";
  form.appendChild(selectLabel);

  ListOptions.forEach((option) => {
    const selectData = document.createElement("option");
    selectData.value = option;
    selectData.textContent = option.toLocaleUpperCase();
    select.appendChild(selectData);
  });

  form.appendChild(select);

  const formButton = document.createElement("button");
  formButton.className = "saveTodo";
  formButton.textContent = "Add";
  formButton.setAttribute("type", "submit");
  form.appendChild(formButton);

  cancelButton(".todoForm", "todoForm");
};

// input saver from the form above
export const getFormInput = (selectors) => {
  const formInputs = [];
  const inputs = document.querySelectorAll(selectors);
  for (let i = 0; i < inputs.length; i++) {
    formInputs.push(inputs[i].value);
  }
  return formInputs;
};

// show full card Details from the table in a dialog
export const showFullTodoCard = (projectName, dataId) => {
  const targetTodo = allProject[projectName].todolist;
  console.log(targetTodo);
  let fullDetails = targetTodo.find((todo) => {
    console.log(todo.id);
    return todo.id === dataId;
  });
  console.log(fullDetails);
  const fields = [
    ["Tilte", fullDetails.title],
    ["Description", fullDetails.description],
    ["Due Date", fullDetails.dueDate],
    ["Priority", fullDetails.priority],
    ["Status", fullDetails.isCompleted ? "completed" : "uncompleted"],
  ];

  const todoDialog = document.createElement("dialog");
  todoDialog.className = "showFullTodo";
  const todoWrapper = document.createElement("div");
  todoWrapper.className = "todoWrapper";

  fields.forEach((field) => {
    const para = document.createElement("p");

    let label = field[0];
    let value = field[1];

    para.textContent = `${label}: ${value}`;
    todoWrapper.appendChild(para);
  });

  const checkBoxLabel = document.createElement("label");
  checkBoxLabel.setAttribute("for", "checkAsCompleted");
  checkBoxLabel.textContent = "Complete";
  todoWrapper.appendChild(checkBoxLabel);

  const checkBox = document.createElement("input");
  checkBox.id = "checkAsCompleted";
  checkBox.className = "toggleTodoAsCompleted";
  checkBox.setAttribute("type", "checkbox");
  todoWrapper.appendChild(checkBox);
  const dialogWrapper = document.querySelector(".content");
  dialogWrapper.appendChild(todoDialog);

  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteTodo";
  deleteButton.textContent = "delete";
  todoWrapper.appendChild(deleteButton);

  const updateButton = document.createElement("button");
  updateButton.className = "updateBtn";
  updateButton.textContent = "edit";
  todoWrapper.appendChild(updateButton);

  showTodoDialog(todoWrapper);

  cancelButton(".todoWrapper", "closeFullShow");
};

function showTodoDialog(div) {
  const dialog = document.querySelector(".showFullTodo");
  dialog.innerHTML = "";
  dialog.appendChild(div);
  dialog.showModal();
}

// form for updating todo

export const renderUpdateForm = (todo) => {
  clearDiv(".content");

  const parentDiv = document.createElement("div");
  parentDiv.className = "formUpdateWrapper";

  const form = document.createElement("form");
  form.className = "todoUpdateForm";

  const inputIdAndLabel = ["title", "description", "dueDate", "priority"];

  inputIdAndLabel.forEach((field) => {
    let label = document.createElement("label");
    label.setAttribute("for", field);
    label.textContent = field;

    let input = document.createElement("input");
    input.setAttribute("id", field);
    input.className = "updateInput";

    if (field === "title") {
      input.setAttribute("type", "text");
      input.value = todo.title;
    } else if (field === "description") {
      input.setAttribute("type", "textArea");
      input.value = todo.description;
    } else if (field === "dueDate") {
      input.setAttribute("type", "date");
      const date = todo.dueDate;
      let [day, month, year] = date.split("/");
      input.value = `${year}-${month}-${day}`;
    }

    form.appendChild(label);
    form.appendChild(input);

    if (field === "priority") {
      let select = document.createElement("select");
      select.className = "updateInput";
      const options = priorityList.priorityOption();

      options.forEach((option) => {
        const choice = document.createElement("option");
        choice.textContent = option.toLocaleLowerCase();
        choice.value = option;
        select.appendChild(choice);
      });
      input.replaceWith(select);
    }
  });
  const save = document.createElement("button");
  save.className = "updateTodo";
  save.textContent = "save changes";
  form.appendChild(save);

  parentDiv.appendChild(form);
  const content = document.querySelector(".content");
  content.appendChild(parentDiv);
};
