document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title || !description) {
        alert("Please fill in all fields.");
        return;
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status: "Pending"
    };

    tasks.push(newTask);
    saveTasks();
    this.reset();
    loadTasks();
});

function loadTasks() {
    const taskTable = document.getElementById("taskTable");
    taskTable.innerHTML = "";

    tasks.forEach((task) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>
                <button class="update" onclick="updateTask(${task.id})">Update</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        taskTable.appendChild(row);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(id) {
    const newStatus = prompt("Enter new status (Pending, In Progress, Completed):");
    if (["Pending", "In Progress", "Completed"].includes(newStatus)) {
        tasks = tasks.map((task) => 
            task.id === id ? { ...task, status: newStatus } : task
        );
        saveTasks();
        loadTasks();
    } else {
        alert("Invalid status!");
    }
}

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    loadTasks();
}
