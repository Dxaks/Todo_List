import "../dom/styleSheet/overDue.css";
import { date } from "../app/date";
import { clearDiv } from "../app/utils/utilities";

// filter the overDue todos for each project before rendering
export const filterOverDue = (folder) => {
  clearDiv(".content");

  for (const project in folder) {
    let todos = folder[project].todolist;
    if (todos.length === 0) continue;
    let header = project;

    const filteredTodo = todos.filter((todo) => {
      return date.checkOverDue(todo.dueDate);
    });
    renderOverDue(filteredTodo, header);
  }
};

// render function that display todo (title, and dueDate for each project);
function renderOverDue(todoArray, projectHeader) {
  const wrapper = document.querySelector(".content");
  const renderDiv = document.createElement("div");
  renderDiv.className = "renderOverDue";
  wrapper.appendChild(renderDiv);

  const todoHeader = document.createElement("h2");
  todoHeader.textContent = projectHeader;
  renderDiv.appendChild(todoHeader);

  todoArray.forEach((todo) => {
    if (!todo) {
      return;
    }

    let para = document.createElement("p");
    let date = document.createElement("span");

    para.textContent = todo.title;
    date.textContent = todo.dueDate;

    para.appendChild(date);
    renderDiv.appendChild(para);
  });
}
