function randomSentence() {
    let sentence = ["Don't forget to call the boss...", "Order food for tomorrow's sahur...", "Find places for next holiday trip..."];
    let pick = Math.floor(Math.random() * 3);
    return sentence[pick];
}



function appendLi(value, index) {
    let insideLi;
    if (index === 0) {
        insideLi = `
        <div class="flex-base">
            <p>${value}</p>
            <div class="icon">
                <div class="correct-icon">
                    <i class="fas fa-check"></i>
                </div>
                <div class="delete-icon">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        </div>`
    } else if (index === 1) {
        insideLi = `
        <div class="flex-base">
            <p><del>${value}</del></p>
            <div class="icon">
                <div class="delete-icon">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        </div>`
    }


    let li = document.createElement('li');
    li.innerHTML = insideLi;

    if (index === 0) {
        document.querySelector("ul.collection-a").appendChild(li);
        li.className = "active";

    } else if (index === 1) {
        document.querySelector("ul.collection-b").appendChild(li);
        li.className = "active";
    }
}

document.querySelector(".task-input").setAttribute("placeholder", randomSentence());

let tasks;
let finishedTasks;

function check() {
    if (localStorage.getItem("task") !== null) {
        tasks = JSON.parse(localStorage.getItem("task"));
    } else {
        tasks = [];
    }

    if (localStorage.getItem("finished") !== null) {
        finishedTasks = JSON.parse(localStorage.getItem("finished"));
    } else {
        finishedTasks = [];
    }

    document.querySelector(".card-finished .line").style.display = "none";
    if (tasks.length === 0 && finishedTasks.length === 0) {
        document.querySelector(".card-bottom").style.display = "none";
        document.querySelector(".card-finished").style.display = "none";
        document.querySelector(".card-middle").style.display = "block";
        document.querySelector(".card-middle").classList += " active";
    } else if (finishedTasks.length === 0) {
        const printTasks = tasks.forEach(task => {
            return appendLi(task, 0);
        })
    } else if (tasks.length === 0) {
        const printFinishedTasks = finishedTasks.forEach(task => {
            return appendLi(task, 1);
        })
    } else {
        const printTasks = tasks.forEach(task => {
            return appendLi(task, 0);
        })
        const printFinishedTasks = finishedTasks.forEach(task => {
            return appendLi(task, 1);
        })
        document.querySelector(".card-finished .line").style.display = "block";

    }
}

function reCheck() {
    if (localStorage.getItem("task") !== null) {
        tasks = JSON.parse(localStorage.getItem("task"));
    } else {
        tasks = [];
    }

    if (localStorage.getItem("finished") !== null) {
        finishedTasks = JSON.parse(localStorage.getItem("finished"));
    } else {
        finishedTasks = [];
    }

    document.querySelector(".card-finished .line").style.display = "none";

    if (tasks.length !== 0 && finishedTasks.length !== 0) {
        document.querySelector(".card-finished .line").style.display = "block";
    } else if (tasks.length === 0 && finishedTasks.length === 0) {
        setTimeout(function () {
            document.querySelector(".card-bottom").style.display = "none";
            document.querySelector(".card-finished").style.display = "none";
            document.querySelector(".card-middle").style.display = "block";
        }, 1000)
    }
}

window.addEventListener("DOMContentLoaded", check());


document.querySelector(".btn").addEventListener('click', function (e) {
    e.preventDefault();

    if (document.querySelector('.task-input').value !== "") {
        document.querySelector(".card-bottom").style.display = "block";
        document.querySelector(".card-middle").style.display = "none";

        if (localStorage.getItem("task") === null) {
            tasks.push(document.querySelector('.task-input').value);
            appendLi(document.querySelector('.task-input').value, 0);
            document.querySelector('.task-input').value = null;
            localStorage.setItem("task", JSON.stringify(tasks));
            document.querySelector(".task-input").style.background = "#f3f3f3";
            document.querySelector(".task-input").setAttribute("placeholder", randomSentence());
            reCheck();
        } else {
            if ((JSON.parse(localStorage.getItem("task"))).includes(document.querySelector('.task-input').value)) {
                document.querySelector('.task-input').value = null;
                document.querySelector(".task-input").style.background = "yellow";
                document.querySelector(".task-input").setAttribute("placeholder", "SAME INPUT FOUND...");
            } else {
                tasks.push(document.querySelector('.task-input').value);
                appendLi(document.querySelector('.task-input').value, 0);
                document.querySelector('.task-input').value = null;
                localStorage.setItem("task", JSON.stringify(tasks));
                document.querySelector(".task-input").style.background = "#f3f3f3";
                document.querySelector(".task-input").setAttribute("placeholder", randomSentence());
                reCheck();
            }
        }
    }
})

document.querySelector(".card").addEventListener('click', function (e) {
    if (e.target.className === "delete-icon") {
        const name = e.target.parentElement.parentElement.parentElement.parentElement.className;

        if (name === "collection-a") {
            let task = e.target.parentElement.parentElement.children[0].innerHTML;
            e.target.parentElement.parentElement.parentElement.className = "not-active";
            setTimeout(function () {
                e.target.parentElement.parentElement.parentElement.remove()
            }, 1000);
            const tasks = (JSON.parse(localStorage.getItem("task")).filter(x => {
                return x !== task
            }));

            localStorage.setItem("task", JSON.stringify(tasks));
            reCheck();
        } else {
            let task = e.target.parentElement.parentElement.children[0].children[0].innerHTML;
            e.target.parentElement.parentElement.parentElement.className = "not-active";
            setTimeout(function () {
                e.target.parentElement.parentElement.parentElement.remove()
            }, 1000);
            const tasks = (JSON.parse(localStorage.getItem("finished")).filter(x => {
                return x !== task
            }));

            localStorage.setItem("finished", JSON.stringify(tasks));
            reCheck();
        }
    } else if (e.target.className === "correct-icon") {
        document.querySelector(".card-finished").style.display = "block";
        const task = e.target.parentElement.parentElement.children[0].innerHTML;
        e.target.parentElement.parentElement.parentElement.className = "done";
        setTimeout(function () {
            e.target.parentElement.parentElement.parentElement.remove()
        }, 1000);

        const tasks = (JSON.parse(localStorage.getItem("task")).filter(x => {
            return x !== task
        }));

        localStorage.setItem("task", JSON.stringify(tasks));

        appendLi(task, 1);

        if (localStorage.getItem("finished") === null) {
            finishedTasks.push(task);
            localStorage.setItem("finished", JSON.stringify(finishedTasks));
            reCheck();
        } else {
            let finished = JSON.parse(localStorage.getItem("finished"));
            finished.push(task);
            localStorage.setItem("finished", JSON.stringify(finished));
            reCheck();
        }
    }
})