const deleteCompletedBtn = document.getElementById("deleteCompletedTasks");
const addTaskBtn = document.getElementById("addTaskBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const taskInputContainer = document.getElementById("taskInputContainer");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Array para armazenar as tarefas
const tasks = [];

// Variável para controlar a edição de tarefas
let editingTaskIndex = null;

// Função para atualizar a lista de tarefas no DOM
function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        // ...
        taskCard.classList.add("task-card");
        if (task.completed) {
            taskCard.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.classList.add("task-checkbox"); // Adiciona a classe "task-checkbox"
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            updateTaskList();
        });

        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.value = task.text;
        taskInput.classList.add("task-input"); // Adiciona a classe "task-input"

        const editButton = document.createElement("span");
        editButton.innerHTML = "&#9998;";
        editButton.classList.add("edit-button"); // Adiciona a classe "edit-button"
        editButton.addEventListener("click", () => {
            taskInput.value = task.text;
            editingTaskIndex = index;
            taskInput.focus();
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Deletar";
        deleteButton.classList.add("delete-button"); // Adiciona a classe "delete-button"
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            updateTaskList();
        });
        // ...


        taskInput.addEventListener("blur", () => {
            if (editingTaskIndex !== null) {
                tasks[editingTaskIndex].text = taskInput.value;
                editingTaskIndex = null;
                updateTaskList();
            }
        });

        taskCard.appendChild(checkbox);
        taskCard.appendChild(taskInput);
        taskCard.appendChild(deleteButton);
        taskList.appendChild(taskCard);
    });
}

// Função para adicionar uma nova tarefa
function addTask(text, completed = false) {
    tasks.unshift({ text, completed });
    updateTaskList();
}

addTaskBtn.addEventListener("click", () => {
    taskInput.value = "";
    editingTaskIndex = null;
    taskInputContainer.style.display = "block";
    taskInput.focus();
});

saveTaskBtn.addEventListener("click", () => {
    const text = taskInput.value;
    if (text.trim() !== "") {
        if (editingTaskIndex !== null) {
            tasks[editingTaskIndex].text = text;
            editingTaskIndex = null;
        } else {
            addTask(text);
        }
        taskInputContainer.style.display = "none";
        taskInput.value = "";
        updateTaskList();
    }
});

cancelTaskBtn.addEventListener("click", () => {
    taskInputContainer.style.display = "none";
    taskInput.value = "";
});

deleteCompletedBtn.addEventListener("click", () => {
    tasks.forEach((task, index) => {
        if (task.completed) {
            tasks.splice(index, 1);
        }
    });
    updateTaskList();
});

// Inicializa a lista de tarefas
updateTaskList();