const formCreate = document.querySelector(".form-create");
const tasksLists = document.querySelector(".tasks-list");
let url = "http://localhost:8000/tasks/";

async function getTasks() {
  tasksLists.innerHTML = "";
  const data = await fetch(url);
  const parsedData = await data.json();
  for (let i of parsedData) {
    const { id, title, description } = i;
    let li = document.createElement("li");
    li.textContent = `${id}- ${title} || ${description}`;
    tasksLists.appendChild(li);
  }
  eo();
}

async function addTaskForm(event) {
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
  getTasks();
}

formCreate.addEventListener("submit", addTaskForm);
getTasks();

function eo() {
  const li = document.querySelectorAll("li");
  li.forEach((i) => {
    i.addEventListener("click", (e) => {
      console.log(e.target.textContent.slice(0, 2));
    });
  });
}
