const body = document.querySelector('body');
const addButton = document.querySelector('.header__addTask--button');
const input = document.querySelector('.header__addTask--input');
const logosContainer = document.querySelector('.header__logos');
const themeIcon = document.querySelector('.header__logos--theme');
const taskLists = document.querySelector(".tasks__list");
const completeIcon = document.querySelector('.tasks__completed--button');
const taskleft = document.querySelector('.tasks__records--taskLeft');
const clearCompleted = document.querySelector('.tasks__records--clearCompleted');
const displayAll = document.querySelector('.tasks__records--all');
const displayActive = document.querySelector('.tasks__records--active');
const displayCompleted = document.querySelector('.tasks__records--completed');
const taskFilter = document.querySelector('.tasks__records--filter');

let tasks = [];
let idCount = 0;
let newTaskText = '';
let draggedItem = null;

// Functions ...

function resizer() { // Change background according to theme.
  if (themeIcon.id === 'sun') {
    if (window.innerWidth > 600) {
      body.style.backgroundImage = 'url(/images/bg-desktop-dark.jpg)';
    } else {
      body.style.backgroundImage = 'url(/images/bg-mobile-dark.jpg)';
    }
  } else {
    if (window.innerWidth > 600) {
      body.style.backgroundImage = 'url(/images/bg-desktop-light.jpg)';
    } else {
      body.style.backgroundImage = 'url(/images/bg-mobile-light.jpg)';
    }
  }

}

function updateTaskLeft() { //Updates the number of tasks not completed.
  const storeTasks = localStorage.getItem("tasks");
  if (storeTasks) {
    const activeTasks = JSON.parse(storeTasks).filter((taskObject) => taskObject.completed == false);
    taskleft.textContent = `${activeTasks.length} item(s) left`;
  } else {
    taskleft.textContent = '0 item left';
  }
}

function loadAllTasks() { //Load all tasks.
  updateTaskLeft();
  const storeTasks = localStorage.getItem("tasks");
  if (storeTasks) {
    removeAll();
    tasks = JSON.parse(storeTasks)
    idCount = tasks.length;
    tasks.map((taskObject) => createTask(taskObject));
    displayAll.style.color = 'var(--Blue-500)'
    displayActive.style.color = 'var(--record-text)'
    displayCompleted.style.color = 'var(--record-text)'
  } else {
    tasks = [];
    saveTask()
  }
}

function loadCompletedTasks() { //Load only completed tasks.
  const storeTasks = localStorage.getItem("tasks");
  if (storeTasks) {
    const completedTasks = JSON.parse(storeTasks).filter((taskObject) => taskObject.completed == true)

    if (completedTasks) {
      removeAll();
      completedTasks.map((taskObject) => createTask(taskObject));
      displayAll.style.color = 'var(--record-text)'
      displayActive.style.color = 'var(--record-text)'
      displayCompleted.style.color = 'var(--Blue-500)'

    }
  }
}

function loadActiveTasks() { //Load only not completed tasks
  const storeTasks = localStorage.getItem("tasks");
  if (storeTasks) {
    const activeTasks = JSON.parse(storeTasks).filter((taskObject) => taskObject.completed == false);

    if (activeTasks) {
      removeAll()
      activeTasks.map((taskObject) => createTask(taskObject));
      displayAll.style.color = 'var(--record-text)'
      displayActive.style.color = 'var(--Blue-500)'
      displayCompleted.style.color = 'var(--record-text)'
    }

  }
}

function deleteTask(taskObject) { //Delete a task permanently from app.
  const taskIndexToDelete = tasks.findIndex(task => task.id == taskObject.id)
  tasks.splice(taskIndexToDelete, 1)
  removeTask(taskObject);
  saveTask();
  updateTaskLeft();
}

function deleteCompleted() { //Delete all completed tasks permanently from app.
  const storeTasks = localStorage.getItem("tasks");
  if (storeTasks) {
    const completedTasks = JSON.parse(storeTasks).filter((taskObject) => taskObject.completed == true)
    if (completedTasks) {
      completedTasks.map((taskObject) => deleteTask(taskObject));
    }
  }

}

function removeTask(taskObject) { //Remove a task from the UI.
  const list = document.getElementById(taskObject.id);
  if (taskLists.contains(list)) {
    taskLists.removeChild(list);
  }
}

function removeAll() { //Remove all tasks from the UI.
  const storeTasks = localStorage.getItem("tasks");
  if (storeTasks) {
    tasks = JSON.parse(storeTasks)
    tasks.map((taskObject) => removeTask(taskObject));
  }
}

function addTask() { //Add a new task to the app.
  newTaskText = input.value.trim();
  newTaskText = newTaskText.substring(0, 1).toUpperCase() + newTaskText.substring(1);
  if (newTaskText) {
    idCount = idCount + 1
    const newTask = {
      id: idCount,
      text: newTaskText,
      completed: false
    }

    tasks.push(newTask);
    saveTask();
    createTask(newTask)
    input.value = "";
    updateTaskLeft();

  } else {
    alert("Enter a Task!")
  }

}

function saveTask() { //Save tasks to local storage.
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function createTask(taskObject) { //Create a new task on UI.
  const deleteIcon = document.createElement('img');
  deleteIcon.id = "cross";
  deleteIcon.src = "/images/icon-cross.svg"

  const completeIcon = document.createElement('div');
  completeIcon.className = 'tasks__completed--button';
  completeIcon.style.background = 'none'

  const features = document.createElement('div');
  features.className = 'tasks__list--features';

  const list = document.createElement("li");
  const text = document.createElement("p");

  list.className = "tasks__list--item";
  list.id = taskObject.id;
  list.draggable = true;
  text.className = "tasks__list--text";

  text.textContent = taskObject.text;

  features.append(text, deleteIcon)
  list.append(completeIcon, features);
  taskLists.appendChild(list);

  if (taskObject.completed === true) {
    const check = document.createElement('img');
    check.id = 'check';
    check.src = '/images/icon-check.svg'
    completeIcon.appendChild(check);
    completeIcon.style.background = 'radial-gradient(circle farthest-corner at top left, hsl(192, 100%, 67%), hsl(280, 87%, 65%))';
    text.style.textDecoration = 'line-through';
    completeIcon.style.border = 'none';
    text.style.color = 'var(--strike-text)';
  }

  completeIcon.addEventListener('mouseover', () => {
    if (!completeIcon.hasChildNodes()) {
      completeIcon.style.border = '2px solid transparent';
      completeIcon.style.background = 'linear-gradient(var(--input-bg), var(--input-bg)) padding-box, linear-gradient(45deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%)) border-box';
      completeIcon.style.borderRadius = '100%';
    }
  }
  )

  completeIcon.addEventListener('mouseout', () => {
    if (!completeIcon.hasChildNodes()) {
      completeIcon.style.border = '1px solid var(--button-border)';
      completeIcon.style.background = 'none';
      completeIcon.style.borderRadius = '100%';
    }
  }
  )

  completeIcon.addEventListener('click', () => {

    if (!completeIcon.hasChildNodes()) {
      const check = document.createElement('img');
      check.id = 'check';
      check.src = '/images/icon-check.svg'
      completeIcon.style.background = 'radial-gradient(circle farthest-corner at top left, hsl(192, 100%, 67%), hsl(280, 87%, 65%))';
      completeIcon.style.border = 'none'
      text.style.textDecoration = 'line-through'
      text.style.color = 'var(--strike-text)';
      completeIcon.appendChild(check);

      const taskToUpdate = tasks.find(task => task.id == taskObject.id)
      taskToUpdate.completed = true;
      saveTask();
      updateTaskLeft();
      loadAllTasks();
    } else {
      const checkElement = completeIcon.querySelector('#check');
      if (checkElement) {
        completeIcon.removeChild(checkElement);
      } completeIcon.style.background = 'none';
      completeIcon.style.border = '1px solid var(--Purple-300)'
      text.style.textDecoration = 'none';
      text.style.color = 'var(--text)';

      const taskToUpdate = tasks.find(task => task.id == taskObject.id)
      taskToUpdate.completed = false;
      saveTask();
      updateTaskLeft();
      loadAllTasks();
    }
  })

  deleteIcon.addEventListener("click", (e) => {
    if (e.target.id === 'cross') {
      deleteTask(taskObject);
    }
  }
  )
}

function getDragAfterElement(container, y) { //From AI, returns list item to display upward or downward...
  const draggableElements = [...container.querySelectorAll('.tasks__list--item:not([style="display: none;"])')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}


// Event handlings...
loadAllTasks();

window.addEventListener('resize', resizer);

addButton.addEventListener("click", addTask);

//Used AI for this...
taskLists.addEventListener('dragstart', (event) => {
  // Set the dragged element as the current target
  draggedItem = event.target;
  // Add a class to provide visual feedback while dragging
  setTimeout(() => event.target.style.display = "none", 0);
});

taskLists.addEventListener('dragend', (event) => {
  // Reset the display and remove the class
  event.target.style.display = "flex";
  draggedItem = null;
  // Update the local storage with the new order
  const newTasksOrder = Array.from(taskLists.children).map(item => {
    const id = parseInt(item.id);
    return tasks.find(task => task.id === id);
  });
  tasks = newTasksOrder;
  saveTask();
});

taskLists.addEventListener('dragover', (event) => {
  // Prevent default behavior to allow a drop
  event.preventDefault();
  const afterElement = getDragAfterElement(taskLists, event.clientY);
  const currentDraggedItem = document.querySelector('.tasks__list--item[style="display: none;"]');
  if (afterElement == null) {
    if (currentDraggedItem) {
      taskLists.appendChild(currentDraggedItem);
    }
  } else {
    if (currentDraggedItem) {
      taskLists.insertBefore(currentDraggedItem, afterElement);
    }
  }
});

addButton.addEventListener('mousedown', () => {
  const text = input.value
  if (text) {
    const check = document.createElement('img');
    check.id = 'check';
    check.src = '/images/icon-check.svg'
    addButton.style.background = 'radial-gradient(circle farthest-corner at top left, hsl(192, 100%, 67%), hsl(280, 87%, 65%))';
    addButton.style.border = 'none'
    addButton.appendChild(check);
  }
}
)

addButton.addEventListener('mouseup', () => {
  if (addButton.hasChildNodes()) {
    addButton.removeChild(check);
    addButton.style.background = 'none';
  }

}
)

addButton.addEventListener('mouseenter', () => {
  addButton.style.border = '2px solid transparent';
  addButton.style.background = 'linear-gradient(var(--input-bg), var(--input-bg)) padding-box, linear-gradient(45deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%)) border-box';
  addButton.style.borderRadius = '100%';
}
)

addButton.addEventListener('mouseout', () => {
  addButton.style.border = '1px solid var(--button-border)';
  addButton.style.background = 'none';
  addButton.style.borderRadius = '100%';
}
)

clearCompleted.addEventListener('click', () => {
  deleteCompleted();
  loadAllTasks();
}
);

displayAll.addEventListener('click', (e) => {
  if (e.target.className === 'tasks__records--all') {
    removeAll();
    loadAllTasks();
  }
}
)

displayActive.addEventListener('click', (e) => {
  if (e.target.className === 'tasks__records--active') {
    loadActiveTasks()
  }
  taskleft.style.minHeight = '3rem'
}
)

displayCompleted.addEventListener('click', (e) => {
  if (e.target.className === 'tasks__records--completed') {
    loadCompletedTasks()
  }
  taskleft.style.minHeight = '3rem'
}
)

// Theme icon handlers.

themeIcon.addEventListener('click', () => {
  if (themeIcon.id === 'moon') {
    themeIcon.src = '/images/icon-sun.svg'
    themeIcon.id = 'sun';
    body.className = 'dark-theme';
    if (window.innerWidth > 600) {
      body.style.backgroundImage = 'url(/images/bg-desktop-dark.jpg)';
    } else {
      body.style.backgroundImage = 'url(/images/bg-mobile-dark.jpg)';
    }
  } else {
    themeIcon.src = '/images/icon-moon.svg'
    themeIcon.id = 'moon';
    body.className = 'light-theme';

    if (window.innerWidth > 600) {
      body.style.backgroundImage = 'url(/images/bg-desktop-light.jpg)';
    } else {
      body.style.backgroundImage = 'url(/images/bg-mobile-light.jpg)';
    }
  }
})

// Hover effect on 

displayAll.addEventListener('mouseover', () => {
  if (displayAll.style.color !== 'var(--Blue-500)') {
    displayAll.style.color = 'var(--record-hover)'
  }
})
displayAll.addEventListener('mouseout', () => {
  if (displayAll.style.color === 'var(--record-hover)') {
    displayAll.style.color = 'var(--record-text)'
  }
})

displayActive.addEventListener('mouseover', () => {
  if (displayActive.style.color !== 'var(--Blue-500)') {
    displayActive.style.color = 'var(--record-hover)'
  }
})
displayActive.addEventListener('mouseout', () => {
  if (displayActive.style.color === 'var(--record-hover)') {
    displayActive.style.color = 'var(--record-text)'
  }
})

displayCompleted.addEventListener('mouseover', () => {
  if (displayCompleted.style.color !== 'var(--Blue-500)') {
    displayCompleted.style.color = 'var(--record-hover)'
  }
})
displayCompleted.addEventListener('mouseout', () => {
  if (displayCompleted.style.color === 'var(--record-hover)') {
    displayCompleted.style.color = 'var(--record-text)'
  }
})



