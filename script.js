const subjectInput = document.getElementById("subject");
const assignmentInput = document.getElementById("assignment");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const button = document.querySelector("button");
const tags = [];

button.addEventListener("click", addTask);

function createIcons(pathData, className, viewBox) {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", viewBox);
  icon.classList.add(className);

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);

  icon.appendChild(path);
  return icon;
}

function addTask(){
  if (confirm(`Do you want to save this subject: ${subjectInput.value} as a tag?`)) {
    const tag = subjectInput.value.trim();
     
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  };


  const li = document.createElement("li");
  li.classList.add("task-item");
  li.appendChild(tag);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  const textSpan = document.createElement("span");
  textSpan.textContent = `${subjectInput.value}: ${assignmentInput.value} (Due: ${dueDateInput.value})`;
  textSpan.classList.add("task-text");

  const editButton = document.createElement("button");
  editButton.classList.add("task-edit-button");
  const editButtonIcons = document.createElement("div");
  editButton.appendChild(editButtonIcons);
  editButtonIcons.classList.add("task-edit-icons");


  editButtonIcons.appendChild(createIcons(
    "M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L...",
    "task-up-icon",
    "0 0 24 24"
  ));

  editButtonIcons.appendChild(createIcons(
    "M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z",
    "task-down-icon",
    "0 0 24 24"
  ));

  

  
  



  const deleteButton = document.createElement("button");
  deleteButton.classList.add("task-delete-button");

  deleteButton.appendChild(createIcons(
    "M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0   L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671   l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0   l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671   L310.4,235.083z",
    "task-delete-icon",
    "0 0 469 469"
  ));

  
  

  
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
  });


  editButtonIcons.children[0].addEventListener("click", () => {
    const index = Array.from(taskList.children).indexOf(li);
      if  (index > 0) {
        taskList.insertBefore(li, taskList.children[index - 1]);
      }
    });
  
  editButtonIcons.children[1].addEventListener("click", () => {
    const index = Array.from(taskList.children).indexOf(li);
      if  (index < taskList.children.length - 1) {
        taskList.insertBefore(li, taskList.children[index + 2]);
      }
    });

  deleteButton.addEventListener("click", () => {
    taskList.removeChild(li);
  });
  


  taskList.appendChild(li);
  

  subjectInput.value = "";
  assignmentInput.value = "";
  dueDateInput.value = "";
};
