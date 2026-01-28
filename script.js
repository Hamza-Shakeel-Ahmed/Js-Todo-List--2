const addBtn = document.getElementById("addBtn");
const inputBox = document.getElementById("input");
const list = document.getElementById("listContainer");
const Day = document.getElementById("Day");
const Date = document.getElementById("Date");
const cancelBtn = document.getElementById("cancelBtn");
const filterByTask = document.getElementById("filterByTask");
const filterByDate = document.getElementById("filterByDate");
const li = document.getElementsByTagName("li");
const p = document.getElementsByTagName("p");
const dateInput = document.getElementsByClassName("date");

let taskText = null;
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

function render() {
  list.innerHTML = "";
  todos.forEach((val, index) => {
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
    <div>${val.Day}</div>
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

function FilterByTask() {
  filterByTask.addEventListener("input", (e) => {
    let inputValue = e.target.value;

    for (let i = 0; i < p.length; i++) {
      if (!p[i].innerHTML.includes(inputValue)) {
        li[i].style.display = "none";
      } else {
        li[i].style.display = "flex";
      }
    }
  });
}
function FilterByDate() {
  filterByDate.addEventListener("input", (e) => {
    let inputValue = e.target.value;

    for (let i = 0; i < dateInput.length; i++) {
      if (
        !dateInput[i].innerHTML.includes(inputValue) &&
        !p[i].innerHTML.includes(FilterByTask.value)
      ) {
        li[i].style.display = "none";
      } else if (
        p[i].innerHTML.includes(FilterByTask.value) &&
        !dateInput[i].innerHTML.includes(inputValue)
      ) {
        li[i].style.display = "flex";
      } else if (dateInput[i].innerHTML.includes(inputValue)) {
        li[i].style.display = "flex";
      }
    }
  });
}
