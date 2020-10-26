let form = document.querySelector("#task-form");
let taskList = document.querySelector(".collection");
let clearBtn = document.querySelector(".clear-tasks");
let filter = document.querySelector("#filter");
let taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
  // DOM load
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);
  //   remove task and clear all
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);

  //   filter tasks
  filter.addEventListener("keyup", filterTasks);
}
// get task form local storage and add
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    let li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    let link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

//   add task

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("add task");
  } else {
    let li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));
    let link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);

    // store to local storage
    storeToLocalStorage(taskInput.value);

    taskInput.value = "";

    function storeToLocalStorage(task) {
      let tasks;
      if (localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  //   function storeToLocalStorage(task) {
  //     var tasks = [];
  //     if (localStorage.getItem("tasks") != undefined) {
  //       tasks = JSON.parse(localStorage.getItem("tasks"));
  //     }
  //     tasks.push(task);
  //     localStorage.setItem("tasks", JSON.stringify(tasks));
  //   }
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("do you want to delete this item??")) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear all
function clearTasks(e) {
  while (taskList.firstChild) taskList.removeChild(taskList.firstChild);

  clearTasksFromLocalStorage();
}
// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
// search
function filterTasks(e) {
  let text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    let notes = task.firstChild.textContent;
    if (notes.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
