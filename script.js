if (localStorage.getItem("isLoggedIn") !== "true") {

    window.location.href = "auth.html";

}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {

    let input = document.getElementById("taskInput");
    let task = input.value.trim();
    let priority = document.getElementById("priority").value;

    if(task === ""){
        alert("Please write something first!");
        return;
    }

    tasks.push({
    text: task,
    priority: priority,
    completed: false
});

    saveTasks();

    displayTasks();
    
    updateCounter();
    
    input.value = "";
}

function displayTasks(){

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    for(let i = 0; i < tasks.length; i++){

        let li = document.createElement("li");

       if(tasks[i].completed){
         li.classList.add("completed");
} 

        li.textContent = "✅ " + tasks[i].text;
    
        if(tasks[i].priority==="High"){
    li.style.borderLeft="6px solid red";
}

if(tasks[i].priority==="Medium"){
    li.style.borderLeft="6px solid orange";
}

if(tasks[i].priority==="Low"){
    li.style.borderLeft="6px solid green";
}

li.onclick = function () {

    li.classList.toggle("completed");

    tasks[i].completed = li.classList.contains("completed");

    saveTasks();

    updateProgress();

}
        let deleteBtn = document.createElement("button");

deleteBtn.textContent = "❌";

deleteBtn.onclick = function (event) {

    event.stopPropagation();

    li.style.transform = "translateX(300px)";
    li.style.opacity = "0";

    setTimeout(function(){

        tasks.splice(i,1);

        saveTasks();

        displayTasks();

        updateCounter();

    },300);

};
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);

    }

}

document.getElementById("taskInput").addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        addTask();
    }

});
let themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function(){

    document.body.classList.toggle("dark");

}
function updateCounter(){
    let total = document.querySelectorAll("#taskList li").length;

    document.getElementById("taskCounter").textContent =
        total + (total === 1 ? " Task" : " Tasks");
}
function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
function filterTasks(type){

    let tasks=document.querySelectorAll("#taskList li");

    tasks.forEach(function(task){

        if(type==="all"){
            task.style.display="flex";
        }

        else if(type==="active"){
            if(task.classList.contains("completed")){
                task.style.display="none";
            }else{
                task.style.display="flex";
            }
        }

        else if(type==="completed"){
            if(task.classList.contains("completed")){
                task.style.display="flex";
            }else{
                task.style.display="none";
            }
        }

    });

}
document.getElementById("searchTask").addEventListener("keyup", searchTasks);

function searchTasks(){

    let value = document.getElementById("searchTask").value.toLowerCase();

    let items = document.querySelectorAll("#taskList li");

    items.forEach(function(item){

        if(item.textContent.toLowerCase().includes(value)){
            item.style.display="flex";
        }
        else{
            item.style.display="none";
        }

    });

}
document.getElementById("logoutBtn").onclick = function () {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "auth.html";

};
displayTasks();
updateCounter();

function updateProgress(){

    let total = tasks.length;

    let completed = document.querySelectorAll(".completed").length;

    let percent = 0;

    if(total > 0){

        percent = Math.round((completed / total) * 100);

    }

    document.getElementById("progressFill").style.width = percent + "%";

    document.getElementById("progressText").textContent = percent + "%";

}
function clearCompleted(){

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    displayTasks();

    updateCounter();

    updateProgress();

}