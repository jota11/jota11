// enjoy this amazing javascript code!!

setInterval(() => {
    let date_Now = new Date();
    let hour = date_Now.getHours();
    let hourF;
    let minute = date_Now.getMinutes();
    let minuteF;
    let second = date_Now.getSeconds();
    
    if (minute <= 9) { minuteF = "0" + minute; } else { minuteF = minute; }
    if (hour <= 9) { hourF = "0" + hour; } else { hourF = hour; }
    let currentTime = hourF + ":" + minuteF;

    // console.log("Date: " + date_Now);
    console.log("time now: " + hourF + ":" + minuteF + ":" + second);
    document.getElementById("clock").innerText = currentTime;
}, 1000);


//global
let desktopArea = document.getElementById("desktop");
let mainArea = document.getElementById("main-area");
let taskbar = document.getElementById("taskbar");
let itissafenow = document.getElementById("itissafenowtoturnoffyourcomputer");
let itissafenowText = document.getElementById("itissafenowtoturnoffyourcomputer-text");
// buttons
let taskbarStartButton = document.getElementById("taskbar-start-button");
let taskbarRepositoriesButton = document.getElementById("taskbar-repositories-button");
let taskbarTrashButton = document.getElementById("taskbar-trash-button");
let trashButton = document.getElementById("btn_trash");
let repositoriesButton = document.getElementById("btn_repositories");
let closeButtonRepo = document.getElementById("btn_repositories_close");
let minimizeButtonRepo = document.getElementById("btn_repositories_minimize");
let shutdownButton = document.getElementById("btn-shut-down");

//windows
let startMenu = document.getElementById("start-menu");
let repositoriesWindow = document.getElementById("repos-window");

taskbarStartButton.onclick = () => hideStuff(startMenu);
startMenu.onclick = () => hideStuff();
trashButton.onclick = () => hideStuff();

repositoriesButton.onclick = () => {
    hideStuff(repositoriesWindow);
    hideStuff(taskbarRepositoriesButton);
}

// repo
minimizeButtonRepo.onclick = () => {
    hideStuff(repositoriesWindow);
}
taskbarRepositoriesButton.onclick = () => {
    hideStuff(repositoriesWindow);
}
closeButtonRepo.onclick = () => {
    hideStuff(repositoriesWindow);
    hideStuff(taskbarRepositoriesButton);
}

shutdownButton.onclick = () => shuteverythingdown();

function hideStuff(s) {
    s.classList.toggle("hide");
}

let repository;
let repositories = [];

const shuteverythingdown = () => {
    setTimeout(() => {
        taskbar.remove();
        startMenu.remove();
        repositoriesWindow.remove();
    }, "1000");
    setTimeout(() => {
        mainArea.remove();
    }, "1100");
    setTimeout(() => {
        itissafenow.style.opacity = "1";
    }, "1500");
    setTimeout(() => {
        itissafenowText.style.opacity = "1";
        desktopArea.remove();
    }, "3500");
}

// catching the repos of my github account
const LOLss = fetch("https://api.github.com/users/jota11/repos")
    .then(res => { if (res.status == 200) return res.json(); })
    .then(data => {
        for (i = 0; i < data.length; i++) {
            if (data[i].fork == false) {
                repository = {};
                repository["name"] = data[i].name;
                repository["url"] = data[i].html_url;
                repositories.push(repository);
            }
        }
        repositories.forEach(element => {
            // console.log(element.name + " " + element.url);
            let link = document.createElement("a");
            link.textContent = element.name
            link.href = element.url
            link.target = "_blank";
            document.getElementById("repositories").appendChild(link);
        });
    })
    .catch(err => console.error("Error getting branches! " + err));