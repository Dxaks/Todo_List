import { createTodo } from "./app/todo";
import { setDate } from "./app/date";
import { setPriority } from "./app/priority";
import { setAsCompleted } from "./app/completedTodo";
import { allProject } from "./app/project";
import { showCompletedTodo } from "./app/completedTodo";
import { changePriority } from "./app/priority";
import { initialRender } from "./dom/home";

initialRender();

createTodo('Business', 'my_shop', 'my today_cal', setDate.addDueDate('23-11-2013', '17:40:00'), setPriority('urgent'));
