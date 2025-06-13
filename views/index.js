const formCreate = document.querySelector(".form-create");
const formEdit = document.querySelector(".form-edit");
const tasksLists = document.querySelector(".tasks-list");
let statusAlert = document.querySelector(".successful-message");
let createTaskDiv = document.querySelector(".create-task");
let selectTaskDiv = document.querySelector(".select-task");
let editTaskDiv = document.querySelector(".edit-task");
let createButon = document.querySelector(".create");
let editButon = document.querySelector(".edit");
let url = "http://localhost:8000/tasks/";

function statusAlertBox(test) {
  statusAlert.classList.add("aaa");
  let spanText = document.querySelector(".successful-message span");

  spanText.textContent = test;

  setTimeout(() => {
    statusAlert.classList.remove("aaa");
  }, 4000);
}

async function getTasks() {
  tasksLists.innerHTML = "";
  const data = await fetch(url);
  const parsedData = await data.json();
  for (let i of parsedData) {
    const { id, title, description } = i;
    let li = document.createElement("li");
    li.textContent = `${id}- ${title}`;
    tasksLists.appendChild(li);
  }
  selectTaskOfList();
}

async function addTask(event) {
  event.preventDefault();
  const formdata = new FormData(formCreate);
  let Title = formdata.get("title");
  let Description = formdata.get("description");

  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: Title, description: Description }),
  });
  console.log(data);
  formCreate.reset();
  statusAlertBox("Task added successfuly");
  getTasks();
}

async function editTask(event, id) {
  event.preventDefault();
  const formdata = new FormData(formEdit);
  let Title = formdata.get("title");
  let Description = formdata.get("description");

  const data = await fetch(url + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: Title, description: Description }),
  });
  console.log(data);
  formEdit.reset();
  getTasks();
  statusAlertBox("Task edited successfuly");
  showTaskList();
}

async function deleteTask(id) {
  const result = await fetch(url + id, {
    method: "DELETE",
  });
  console.log("deleted");
  console.log(result);
  getTasks();
  formEdit.reset();
  statusAlertBox("Task deleted successfully");
  showTaskList();
}

formCreate.addEventListener("submit", addTask);
getTasks();

let selectId;
function selectTaskOfList() {
  const li = document.querySelectorAll("li");
  li.forEach((i) => {
    i.addEventListener("click", (e) => {
      selectId = e.target.textContent.split("-", 1).toString();
      getSingleTask(selectId);
    });
  });
}

async function getSingleTask(id) {
  editTaskDiv.style.display = "block";
  selectTaskDiv.style.display = "none";
  console.log("My new id:", id);
  const data = await fetch(url + id);
  let parsedData = await data.json();
  let input = formEdit.getElementsByTagName("input")[0];
  let textarea = formEdit.getElementsByTagName("textarea")[0];

  input.value = parsedData[0].title;
  textarea.value = parsedData[0].description;
}

async function editOrDeleteTask(event) {
  event.preventDefault();
  let submitter = event.submitter.value;
  console.log(submitter);
  switch (submitter) {
    case "update-task":
      await editTask(event, selectId);
      break;
    case "delete-task":
      deleteTask(selectId);
      break;
  }
}
formEdit.addEventListener("submit", editOrDeleteTask);

let showCreateTask = () => {
  createTaskDiv.style.display = "block";
  selectTaskDiv.style.display = "none";
  editTaskDiv.style.display = "none";
};
let showTaskList = () => {
  createTaskDiv.style.display = "none";
  selectTaskDiv.style.display = "block";
  editTaskDiv.style.display = "none";
};
createButon.addEventListener("click", showCreateTask);

editButon.addEventListener("click", showTaskList);
