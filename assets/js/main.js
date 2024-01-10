document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");

    // Überprüfen, ob es bereits gespeicherte ToDos gibt
    const storedTodos = localStorage.getItem("todos");
    const todos = storedTodos ? JSON.parse(storedTodos) : [];

    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-item");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.done;
            checkbox.addEventListener("change", () => toggleDone(index));

            const todoText = document.createElement("span");
            todoText.textContent = todo.text;
            todoText.classList.toggle("completed", todo.done);

            const deleteBtn = document.createElement("span");
            deleteBtn.textContent = "❌";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => deleteTodo(index));

            todoItem.appendChild(checkbox);
            todoItem.appendChild(todoText);
            todoItem.appendChild(deleteBtn);

            todoList.appendChild(todoItem);
        });
        // Nach jedem Rendern die ToDo-Liste im localStorage aktualisieren
        saveToLocalStorage();
    }

    function addTodo() {
        const text = taskInput.value.trim();
        if (text !== "") {
            todos.push({ text: text, done: false });
            taskInput.value = "";
            renderTodos();
        }
    }

    function toggleDone(index) {
        todos[index].done = !todos[index].done;
        renderTodos();
    }

    function deleteTodo(index) {
        if (todos[index].done || confirm("Bist du sicher? ... zuerst als erledigt markieren, dann löschen!")) {
            if (!todos[index].done) {
                // alert("Du musst zuerst die Aufgabe als erledigt markieren, um sie zu löschen.");
            } else {
                todos.splice(index, 1);
                renderTodos();
            }
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    addBtn.addEventListener("click", addTodo);
    
    // Hinzufügen einer Aufgabe bei Drücken der Enter-Taste
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    renderTodos();
});
