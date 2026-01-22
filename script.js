const addBtn = document.getElementById("addBtn");
const inputBox = document.getElementById("input");
const list = document.getElementById("listContainer");
const Day = document.getElementById("Day");
const Date = document.getElementById("Date");
let editedIndex = null;
let checked = null;
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
  }
  render();
}

function render() {
  list.innerHTML = "";
  todos.forEach((val, index) => {
    const newList = document.createElement("li");
    const icon = document.createElement("i");
    icon.className = val.completed ? "bi bi-check-circle-fill" : "bi bi-circle";
    newList.className =
      " newList d-flex justify-content-center align-items-center text-wrap gap-2";
    newList.innerHTML = `
    <div class=" flex-wrap flex-grow-1 ">${val.task}</div>
    <div>${val.Day}</div>
    <div class= "mx-4">${val.Date}</div>
    <button onclick = "editTask(${index})" ><i class="bi bi-pencil-square"></i></button>
    <button onclick = "deleteTask(${index})"><i class="bi bi-trash3-fill"></i></button>
    </li>
    `;
    newList.appendChild(icon);
    icon.addEventListener("click", function (e) {
      checkBox(index);
    });
    list.appendChild(newList);
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
