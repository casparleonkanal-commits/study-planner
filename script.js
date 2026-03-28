t · JS
Copy

// ─── DOM-referenser ───────────────────────────────────────────────────────────
const subjectInput    = document.getElementById("subject");
const assignmentInput = document.getElementById("assignment");
const dueDateInput    = document.getElementById("dueDate");
const filterContent   = document.getElementById("filterBy");
const taskList        = document.getElementById("taskList");
const button          = document.getElementById("createTask");
 
const modal    = document.getElementById("createTaskModal");
const openBtn  = document.getElementById("openCreateTask");
const closeBtn = document.getElementById("closeCreateTask");
const taskModal = document.getElementById("taskModal");
 
// ─── Datamodell ───────────────────────────────────────────────────────────────
// tasks är källan till sanning. DOM:en är bara en spegling av denna array.
let tasks = [];
let tags  = [];
 

function saveTasks() {
  localStorage.setItem("studyplanner_tasks", JSON.stringify(tasks));
}
 
function saveTagsToStorage() {
  localStorage.setItem("studyplanner_tags", JSON.stringify(tags));
}
 
function loadTasks() {
  const stored = localStorage.getItem("studyplanner_tasks");
  tasks = stored ? JSON.parse(stored) : [];
 
  const storedTags = localStorage.getItem("studyplanner_tags");
  tags = storedTags ? JSON.parse(storedTags) : [];
 
  // Återskapa filter-options från sparade taggar
  tags.forEach(tag => addTagToFilter(tag));
 
  renderTasks();
}
 
// ─── Filter-hjälpare ──────────────────────────────────────────────────────────
function addTagToFilter(tag) {
  // Lägg inte till om den redan finns
  const existing = Array.from(filterContent.options).map(o => o.value);
  if (existing.includes(tag)) return;
 
  const option = document.createElement("option");
  option.value = tag;
  option.textContent = tag;
  filterContent.appendChild(option);
}
 
function applyFilter() {
  for (const li of taskList.children) {
    if (filterContent.value === "all" || li.dataset.tag === filterContent.value) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  }
}
 
// ─── SVG-ikon-hjälpare ────────────────────────────────────────────────────────
function createIcons(pathData, className, viewBox) {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", viewBox);
  icon.classList.add(className);
 
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  icon.appendChild(path);
  return icon;
}
 
// ─── Rendera en enskild task-rad från ett task-objekt ─────────────────────────
function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.tag = task.subject;
  li.dataset.id  = task.id;
 
  if (task.completed) li.classList.add("completed");
 
  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.completed;
 
  // Text
  const textSpan = document.createElement("span");
  textSpan.classList.add("task-text");
  textSpan.textContent = `${task.subject}: ${task.assignment} (Due: ${task.dueDate})`;
 
  // Upp/Ner-knappar
  const editButton = document.createElement("button");
  editButton.classList.add("task-edit-button");
  const editButtonIcons = document.createElement("div");
  editButtonIcons.classList.add("task-edit-icons");
 
  editButtonIcons.appendChild(createIcons(
    "M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z",
    "task-up-icon", "0 0 24 24"
  ));
  editButtonIcons.appendChild(createIcons(
    "M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z",
    "task-down-icon", "0 0 24 24"
  ));
  editButton.appendChild(editButtonIcons);
 
  // Radera-knapp
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("task-delete-button");
  deleteButton.appendChild(createIcons(
    "M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0   L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671   l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0   l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671   L310.4,235.083z",
    "task-delete-icon", "0 0 469 469"
  ));
 
  // ── Event listeners ──
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    li.classList.toggle("completed", task.completed);
    saveTasks();
  });
 
  textSpan.addEventListener("click", () => {
    document.getElementById("taskModalTitle").textContent      = task.subject;
    document.getElementById("taskModalAssignment").textContent = task.assignment;
    document.getElementById("taskModalDueDate").textContent    = task.dueDate;
    taskModal.classList.replace("hidden", "show");
  });
 
  editButtonIcons.children[0].addEventListener("click", () => {
    const idx = tasks.findIndex(t => t.id === task.id);
    if (idx <= 0) return;
 
    // Hoppa över dolda tasks vid filtrering
    if (filterContent.value !== "all") {
      let swapIdx = idx - 1;
      while (swapIdx >= 0 && tasks[swapIdx].subject !== filterContent.value) swapIdx--;
      if (swapIdx < 0) return;
      [tasks[idx], tasks[swapIdx]] = [tasks[swapIdx], tasks[idx]];
    } else {
      [tasks[idx], tasks[idx - 1]] = [tasks[idx - 1], tasks[idx]];
    }
    saveTasks();
    renderTasks();
  });
 
  editButtonIcons.children[1].addEventListener("click", () => {
    const idx = tasks.findIndex(t => t.id === task.id);
    if (idx >= tasks.length - 1) return;
 
    if (filterContent.value !== "all") {
      let swapIdx = idx + 1;
      while (swapIdx < tasks.length && tasks[swapIdx].subject !== filterContent.value) swapIdx++;
      if (swapIdx >= tasks.length) return;
      [tasks[idx], tasks[swapIdx]] = [tasks[swapIdx], tasks[idx]];
    } else {
      [tasks[idx], tasks[idx + 1]] = [tasks[idx + 1], tasks[idx]];
    }
    saveTasks();
    renderTasks();
  });
 
  deleteButton.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    renderTasks();
  });
 
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
 
  return li;
}
 
// ─── Rendera hela listan från tasks-arrayen ───────────────────────────────────
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });
  applyFilter();
}
 
// ─── Lägg till ny task ────────────────────────────────────────────────────────
function addTask() {
  if (!subjectInput.value.trim() || !assignmentInput.value.trim() || !dueDateInput.value) {
    alert("Please fill in all fields");
    return;
  }
 
  const subject = subjectInput.value.trim();
 
  // Nytt task-objekt
  const newTask = {
    id:         crypto.randomUUID(),   // unikt id, används av localStorage och up/down
    subject:    subject,
    assignment: assignmentInput.value.trim(),
    dueDate:    dueDateInput.value,
    completed:  false,
  };
 
  tasks.push(newTask);
 
  // Hantera taggar
  const saveAsTagCheckbox = document.getElementById("saveAsTag");
  if (saveAsTagCheckbox.checked && !tags.includes(subject)) {
    tags.push(subject);
    saveTagsToStorage();
    addTagToFilter(subject);
  }
 
  saveTasks();
  renderTasks();
 
  // Stäng och nollställ modal
  modal.classList.replace("show", "hidden");
  subjectInput.value    = "";
  assignmentInput.value = "";
  dueDateInput.value    = "";
}
 
// ─── Modal-hantering ──────────────────────────────────────────────────────────
openBtn.addEventListener("click", () => modal.classList.replace("hidden", "show"));
closeBtn.addEventListener("click", () => modal.classList.replace("show", "hidden"));
 
// Task-modal stängknapp (skapad dynamiskt precis som i originalet)
const closeTaskModalBtn = document.createElement("button");
closeTaskModalBtn.id = "closeTaskModal";
closeTaskModalBtn.appendChild(createIcons(
  "M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0   L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671   l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0   l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671   L310.4,235.083z",
  "task-close-icon", "0 0 469 469"
));
taskModal.appendChild(closeTaskModalBtn);
closeTaskModalBtn.addEventListener("click", () => taskModal.classList.replace("show", "hidden"));
 
// ─── Event listeners ──────────────────────────────────────────────────────────
button.addEventListener("click", addTask);
filterContent.addEventListener("change", applyFilter);
 
// ─── Starta appen ─────────────────────────────────────────────────────────────
loadTasks();