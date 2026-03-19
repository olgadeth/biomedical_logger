const form = document.getElementById("logForm");
const logsDiv = document.getElementById("logs");

const equipmentInput = document.getElementById("equipmentSearch");
const suggestionsBox = document.getElementById("suggestions");

// 🔥 ADD YOUR FULL LIST HERE (you can expand later)
const equipmentList = [
    "ECG Machine",
    "Ventilator",
    "Defibrillator",
    "Infusion Pump",
    "Syringe Pump",
    "MRI Scanner",
    "CT Scanner",
    "X-Ray Machine",
    "Ultrasound Machine",
    "ABG Analyzer",
    "OT Table",
    "Anesthesia Machine",
    "Patient Monitor",
    "Oxygen Concentrator",
    "Dialysis Machine"
];

// 🔍 SEARCH FUNCTION
equipmentInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (!value) return;

    const filtered = equipmentList.filter(item =>
        item.toLowerCase().includes(value)
    );

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.innerText = item;

        div.addEventListener("click", function () {
            equipmentInput.value = item;
            suggestionsBox.innerHTML = "";
        });

        suggestionsBox.appendChild(div);
    });
});

// 📦 LOAD SAVED LOGS
let logs = JSON.parse(localStorage.getItem("logs")) || [];

function displayLogs() {
    logsDiv.innerHTML = "";
    logs.forEach(log => {
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

// 💾 SAVE FORM
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const log = {
        equipment: equipmentInput.value,
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
    suggestionsBox.innerHTML = "";
    displayLogs();
});

displayLogs();
