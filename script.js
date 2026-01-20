const addBtn = document.getElementById("addBtn");
const inputBox = document.getElementById("input");
const list = document.getElementById("listContainer");
const Day = document.getElementById("Day");
const Date = document.getElementById("Date");

const todos = [];
function addTask() {
  if (input.value === "") {
    alert("Enter the task");
  } else {
    todos.push({
      task: input.value,
      Date: Date.value,
      Day: Day.value,
      completed: false,
    });
  }
  render();
}

function render() {
  const newList = document.createElement("li");
  todos.forEach((val, index) => {
    newList.className = " newList d-flex gap-2";
    newList.innerHTML = `
   <div class="flex-grow-1 li">${val.task}</div>
   <button onclick = "editTask(${index})" ><i class="bi bi-pencil-square"></i></button>
   <button onclick = "deleteTask(${index})"><i class="bi bi-trash3-fill"></i></button>
   </li>
   `;
    console.log(val.task);
  });
  list.appendChild(newList);

  input.value = "";
  console.log(todos);
}

function deleteTask(index) {
  todos.splice(index, 1);
  if (todos.splice(index, 1)) {
    list.querySelector(".newList").remove();
  }
}

function editTask(index) {
  input.value = todos[index].task;
  if (input.value !== null) {
    todos[index].task = input.value;
    console.log(todos);
  }
}
