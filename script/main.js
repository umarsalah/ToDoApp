const formBlock = document.getElementById("addForm");
const btn = document.getElementById("addTaskButton");
let inputName = document.getElementById("task_name");
let inputDate = document.getElementById("due_time");
let inputDetail = document.getElementById("task_details");
const cancel = document.getElementById("cancel");
const add = document.getElementById("add");
let finished = document.getElementById("doneCount");
let unfinished = document.getElementById("unDoneCount");
const tasks = document.getElementById("tasksDiv");

let finishedTasks = 0;
let unfinishedTasks = 0;
finished.textContent = `${finishedTasks}`;
unfinished.textContent = `${unfinishedTasks}`;
// clicking on add task button will open the add task form .
btn.onclick = function() {
    formBlock.style.display = "block";
};
// clicking on cancel button will close the add task form .
cancel.onclick = function(e) {
    formBlock.style.display = "none";
    e.preventDefault();
};
// clicking on add button will Add task to the localStorage 
add.addEventListener('click', (e) => {
    e.preventDefault();
    const taskObj = {
        taskName: inputName.value,
        taskDate: inputDate.value,
        taskDetails: inputDetail.value
    };
    unfinishedTasks += 1;
    unfinished.textContent = `${unfinishedTasks}`;
    taskObj.taskName && seTasks(taskObj)
    formBlock.style.display = "none";
});

//clicking anywhere outside of the form block will close it
window.onclick = function(event) {
    if (event.target == formBlock) {
        formBlock.style.display = "none";
    }
};

const createTaskView = (arr = []) => {

    const newTask = document.createElement('div')
    clearTaskDom()
    newTask.innerHTML =
        arr.map(({
                taskName,
                taskDate,
                taskDetails
            }, index) =>
            `
    <div class="task">
    <section class="left">
      <input
        type="checkbox"
        id="check"
        class="check checkbox-effect checkbox-effect-4"
        onclick="checkDone(${index})"
      />
      <section class="task_data">
        <label for="task_name" id="task_name" class="task-name"
          >${taskName}</label
        >
        <label for="due_date" id="due_date" class="due-date"
          >${taskDate}</label
        >
      </section>
    </section>
    <section class="right">
      <button id="edit_task" class="btn edit-btn" onclick="editTask(${index})" >
        <i class="task-icon far fa-edit"></i>
      </button>
      <button id="delete_task" class="btn delete-btn" onclick="deleteTask(${index})">
        <i class="task-icon fas fa-trash" ></i>
      </button>
    </section>
  </div>`)

    tasks.appendChild(newTask)

}

// Clicking on checkBox for the task will increment the Finished tasks and decrement the unfinished
const checkDone = (index) => {
    if (unfinishedTasks === 0) {
        return;
    }
    finishedTasks += 1;
    unfinishedTasks -= 1;
    finished.textContent = `${finishedTasks}`;
    unfinished.textContent = `${unfinishedTasks}`;
}


const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const seTasks = (obj) => {
    const newArr = [...getTasks(), obj]
    localStorage.setItem("tasks", JSON.stringify(newArr));
    createTaskView(newArr)
}
const deleteTask = (index) => {
    const data = getTasks();
    const filteredData = data.filter((obj, i) => i !== index);
    localStorage.setItem("tasks", JSON.stringify(filteredData));
    if (unfinishedTasks === 0) {
        return;
    }
    unfinishedTasks -= 1;
    unfinished.textContent = `${unfinishedTasks}`;
    createTaskView(filteredData);
}
const editTask = (index) => {
    const data = getTasks();
    const filteredData = data.filter((obj, i) => i === index);
    console.log(filteredData)
    formBlock.style.display = "block";
    inputName.value = `${filteredData[0].taskName}`;
    inputDate.value = `${filteredData[0].taskDate}`;
    inputDetail.value = `${filteredData[0].taskDetails}`;
    deleteTask(index);
}

const clearTaskDom = () => {
    while (tasks.firstChild) tasks.removeChild(tasks.firstChild);
}


createTaskView(getTasks())