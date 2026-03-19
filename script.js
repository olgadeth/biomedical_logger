const form = document.getElementById("logForm");
const logsDiv = document.getElementById("logs");

let logs = JSON.parse(localStorage.getItem("logs")) || [];

function displayLogs() {
    logsDiv.innerHTML = "";
    logs.forEach((log, index) => {
        logsDiv.innerHTML += `
            <div class="log-item">
                <strong>${log.equipment}</strong><br>
                Dept: ${log.department}<br>
                Complaint: ${log.complaint}<br>
                Solved By: ${log.solvedBy}<br>
                Time: ${log.time}
            </div>
        `;
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const log = {
        equipment: document.getElementById("equipment").value,
        department: document.getElementById("department").value,
        reportedBy: document.getElementById("reportedBy").value,
        complaint: document.getElementById("complaint").value,
        attendedBy: document.getElementById("attendedBy").value,
        issue: document.getElementById("issue").value,
        action: document.getElementById("action").value,
        time: document.getElementById("time").value,
        solvedBy: document.getElementById("solvedBy").value
    };

    logs.push(log);
    localStorage.setItem("logs", JSON.stringify(logs));

    form.reset();
    displayLogs();
});

displayLogs();
