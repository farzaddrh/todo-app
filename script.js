import uniqid from "uniqid";

const container = document.querySelector(".container");
const todoInp = document.getElementById("todo");
const listEl = document.querySelector(".todo-list");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const btnAll = document.querySelector(".btn-all");
const btnActive = document.querySelector(".btn-active");
const btnCompleted = document.querySelector(".btn-completed");
const btnClear = document.querySelector(".btn-clear");
const lefItems = document.querySelector(".left-items");
const btns = document.querySelectorAll(".btn");
const mobileFilter = document.querySelector(".mobile-fliter");

let todos = [
    { id: uniqid(), todo: "Complete online JavaScript course", done: false },
    { id: uniqid(), todo: "10 minutes meditation", done: false },
    { id: uniqid(), todo: "Read for 1 hour", done: true },
];

sun.addEventListener("click", function () {
    container.classList.remove("dark");
});

moon.addEventListener("click", function () {
    container.classList.add("dark");
});
btns.forEach((btn) => {
    btn.addEventListener("click", function () {
        btns.forEach((bt) => bt.classList.remove("active"));
        this.classList.add("active");
    });
});

const itemsleft = function (arr) {
    const filteredarr = arr.filter((item) => item.done === false);
    lefItems.textContent = `${filteredarr.length} items left`;
};
const showTodos = function (arr) {
    arr.forEach((tdo) => {
        const html = `<li class="todo-item" data-id=${
            tdo.id
        } ><div class="cross"></div><input type="checkbox" name="check1" ${
            tdo.done ? "checked" : ""
        } class="check-item" id=${tdo.id}><label class="label"
        for=${tdo.id}>${tdo.todo}</label></li>`;
        listEl.insertAdjacentHTML("beforeend", html);
    });
};

getLocalStorage() ? showTodos(getLocalStorage()) : showTodos(todos);
getLocalStorage() ? itemsleft(getLocalStorage()) : itemsleft(todos);

todoInp.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let todos = getLocalStorage();
        const todovalu = todoInp.value;
        if (!todovalu) return;
        const newTodo = { todo: todovalu, id: uniqid(), done: false };
        todos.push(newTodo);
        setLocalStorage(todos);
        showTodos([newTodo]);
        this.value = "";
        itemsleft(todos);
    }
});

listEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("cross")) {
        let todos = getLocalStorage();
        const id = e.target.closest(".todo-item").dataset.id;
        const index = todos.findIndex((tdo) => tdo.id === id);
        todos.splice(index, 1);
        listEl.innerHTML = "";
        showTodos(todos);
        itemsleft(todos);
        setLocalStorage(todos);
    }
    if (e.target.classList.contains("label")) {
        let todos = getLocalStorage();
        const id = e.target.closest(".todo-item").dataset.id;
        const clickedItem = todos.find((tdo) => tdo.id === id);
        clickedItem.done = !clickedItem.done;
        setLocalStorage(todos);
      
    }
});
const showAll = function () {
    const todos = getLocalStorage();
    listEl.innerHTML = "";
    showTodos(todos);
    itemsleft(todos);
};

btnAll.addEventListener("click", showAll);

const filterTodos = function () {
    const todos = getLocalStorage();
    const filteredTodo =
        this === btnActive || this === mobileFilter.querySelector(".btn-active")
            ? todos.filter((todo) => todo.done === false)
            : todos.filter((todo) => todo.done === true);
    listEl.innerHTML = "";
    showTodos(filteredTodo);
    itemsleft(filteredTodo);
};

btnActive.addEventListener("click", filterTodos);
btnCompleted.addEventListener("click", filterTodos);
const clearCompleted = function () {
    let todos = getLocalStorage();
    const activeTodos = todos.filter((tdo) => tdo.done === false);

    setLocalStorage(activeTodos);

    listEl.innerHTML = "";
    showTodos(activeTodos);
    itemsleft(activeTodos);
};
btnClear.addEventListener("click", clearCompleted);

mobileFilter.querySelector(".btn-all").addEventListener("click", showAll);
mobileFilter
    .querySelector(".btn-active")
    .addEventListener("click", filterTodos);
mobileFilter
    .querySelector(".btn-completed")
    .addEventListener("click", filterTodos);

function setLocalStorage(todos) {
    sessionStorage.setItem("todos", JSON.stringify(todos));
}
getLocalStorage() ? getLocalStorage() : setLocalStorage(todos);
function getLocalStorage() {
    return JSON.parse(sessionStorage.getItem("todos"));
}
