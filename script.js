const addBtn = document.getElementById("addBtn");
const inputBox = document.getElementById("input");
const list = document.getElementById("listContainer");
const Day = document.getElementById("Day");
const Date = document.getElementById("Date");
const cancelBtn = document.getElementById("cancelBtn");
const filterByTask = document.getElementById("filterByTask");
const filterByDate = document.getElementById("filterByDate");
const filterByDay = document.getElementById("filterByDay");
const li = document.getElementsByTagName("li");
const p = document.getElementsByTagName("p");

let editedIndex = null;

const todos = [];
function addTask() {
  if (input.value === "") {
    alert("Enter the task");
    return;
  } else if (Date.value === "") {
    alert("Enter the date");
    return;
  }

  if (editedIndex === null) {
    todos.push({
      task: input.value,
      Date: Date.value,
      Day: Day.value,
      completed: false,
    });
  } else {
    todos[editedIndex].task = input.value;
    todos[editedIndex].Day = Day.value;
    todos[editedIndex].Date = Date.value;
    editedIndex = null;
    addBtn.innerText = "Add";
    cancelBtn.classList.add("d-none");
  }
  render();
}

function render(todosList = todos) {
  list.innerHTML = "";
  todosList.forEach((val, index) => {
    const newList = document.createElement("li");
    const icon = document.createElement("i");
    icon.className = val.completed ? "bi bi-check-circle-fill" : "bi bi-circle";
    newList.className =
      " newList d-flex my-2 justify-content-center align-items-center text-wrap gap-2";
    val.completed
      ? (newList.className = "text-decoration-line-through")
      : (newList.className = "text-decoration-none");
    newList.innerHTML = `
    <div class=" flex-wrap flex-grow-1 "><p class="taskText col-8 mt-1 text-truncate">${val.task}</p></div>
    <div class="day">${val.Day}</div>
    <div class= "mx-4 text-nowrap date ">${val.Date}</div>
    <button onclick = "editTask(${index})" ><i class="bi bi-pencil-square"></i></button>
    <button onclick = "deleteTask(${index})"><i class="bi bi-trash3-fill"></i></button>
    </li>
    `;
    newList.appendChild(icon);
    icon.addEventListener("click", function (e) {
      checkBox(index);
    });

    list.appendChild(newList);
    taskText = val.task;
  });
  Day.value = "Monday";
  Date.value = "";
  input.value = "";
  console.log(todos);
}

function deleteTask(index) {
  todos.splice(index, 1);
  render();
}

function editTask(index) {
  cancelBtn.classList.remove("d-none");
  cancelBtn.classList.add("d-inline");
  input.value = todos[index].task;
  Day.value = todos[index].Day;
  Date.value = todos[index].Date;
  editedIndex = index;
  addBtn.innerText = "Update";
}

function checkBox(index) {
  todos[index].completed = !todos[index].completed;

  render();
}

function cancelEditing() {
  cancelBtn.classList.add("d-none");
  addTask();
}

function Filters() {
  let taskValue = filterByTask.value.toLowerCase();
  let dateValue = filterByDate.value;
  let dayValue = filterByDay.value;
  const todoFiltered = todos.filter((todo) => {
    console.log(todo);
    const matchTask =
      taskValue === "" || todo.task.toLowerCase().includes(taskValue);
    const matchDate = dateValue === "" || dateValue === todo.Date;
    console.log("matchDate: ", matchDate);
    const matchDay = dayValue === "default" || dayValue === todo.Day;
    console.log("matchDay: ", matchDay);
    return matchTask && matchDate && matchDay;
  });
  render(todoFiltered);
}
filterByTask.addEventListener("input", Filters);
filterByDate.addEventListener("change", Filters);
filterByDay.addEventListener("change", Filters);

function clearInput() {
  filterByTask.value = "";
  filterByDate.value = "";
  filterByDay.value = "default";
  render();
}
