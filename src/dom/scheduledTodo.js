import "../dom/styleSheet/scheduled.css";
import { clearDiv } from "../app/utils/utilities";

// this function render all the schedule todo
export const renderAllScheduleTodo = (projectFolder) => {
  clearDiv(".content");

  const scheduleDiv = document.createElement("div");
  scheduleDiv.className = "scheduleDiv";

  const title = document.createElement("h2");
  title.textContent = "Upcoming Todos";
  scheduleDiv.appendChild(title);

  const listWrapper = document.createElement("ul");
  listWrapper.className = "listWrapper";
  scheduleDiv.appendChild(listWrapper);

  for (const key in projectFolder) {
    const todos = projectFolder[key].todolist;
    if (todos.length === 0) continue;

    const listHeader = document.createElement("li");
    listHeader.className = "listHeader";
    listHeader.textContent = key;

    listWrapper.appendChild(listHeader);
    const header = document.createElement("ol");
    header.className = "header";

    todos.forEach((todo) => {
      for (const field in todo) {
        let status = todo.isCompleted;

        if (field === "title" && status === false) {
          const list = document.createElement("li");
          list.textContent = todo[field];
          header.appendChild(list);
        }
      }
      listHeader.appendChild(header);
    });
  }
  const parentDiv = document.querySelector(".content");
  parentDiv.appendChild(scheduleDiv);
};
