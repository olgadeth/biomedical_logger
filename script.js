const equipmentData = [
    { "Department": "Cardiology", "Equipment": "ECG Machine" },
    { "Department": "Cardiology", "Equipment": "Holter Monitor" },
    { "Department": "Cardiology", "Equipment": "Event Recorder" },
    { "Department": "Cardiology", "Equipment": "Stress Test (TMT) System" },
    { "Department": "Cardiology", "Equipment": "Defibrillator (Manual)" },
    { "Department": "Cardiology", "Equipment": "Defibrillator (AED)" },
    { "Department": "Cardiology", "Equipment": "Cardiac Monitor" },
    { "Department": "Cardiology", "Equipment": "Pacemaker (Temporary)" },
    { "Department": "Cardiology", "Equipment": "Pacemaker Programmer" },
    { "Department": "Cardiology", "Equipment": "Echocardiography Machine" },
    { "Department": "Cardiology", "Equipment": "Doppler Ultrasound (Cardiac)" },

    { "Department": "ICU / Critical Care", "Equipment": "Ventilator (Adult)" },
    { "Department": "ICU / Critical Care", "Equipment": "Ventilator (Pediatric)" },
    { "Department": "ICU / Critical Care", "Equipment": "Multiparameter Monitor" },
    { "Department": "ICU / Critical Care", "Equipment": "Infusion Pump" },

    { "Department": "General Ward", "Equipment": "BP Apparatus (Manual)" },
    { "Department": "General Ward", "Equipment": "Pulse Oximeter" },

    { "Department": "Laboratory", "Equipment": "Hematology Analyzer (3-part)" },
    { "Department": "Laboratory", "Equipment": "Biochemistry Analyzer (Semi-auto)" },

    { "Department": "Radiology", "Equipment": "X-Ray Machine (Fixed)" },
    { "Department": "Radiology", "Equipment": "CT Scanner" },

    { "Department": "Operation Theatre", "Equipment": "OT Table (Manual)" },
    { "Department": "Operation Theatre", "Equipment": "Anesthesia Machine" },

    { "Department": "Support Equipment", "Equipment": "Hospital Bed (Electric)" },
    { "Department": "Support Equipment", "Equipment": "Wheelchair" }
];

const form = document.getElementById("logForm");
const logsDiv = document.getElementById("logs");
const equipmentInput = document.getElementById("equipmentSearch");
const suggestionsBox = document.getElementById("suggestions");
const departmentSelect = document.getElementById("department");

let logs = JSON.parse(localStorage.getItem("logs")) || [];

function loadDepartments() {
    const departments = [...new Set(equipmentData.map(i => i.Department))];

    departments.forEach(dep => {
        const option = document.createElement("option");
        option.value = dep;
        option.textContent = dep;
        departmentSelect.appendChild(option);
    });
}

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

// ✅ Autocomplete (OUTSIDE submit)
equipmentInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const dept = departmentSelect.value;

    suggestionsBox.innerHTML = "";
    if (!value) return;

    let filtered = equipmentData;

    if (dept) {
        filtered = filtered.filter(i => i.Department === dept);
    }

    filtered = filtered.filter(i =>
        i.Equipment.toLowerCase().includes(value)
    );

    filtered.slice(0, 10).forEach(i => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.innerText = i.Equipment;

        div.onclick = function () {
            equipmentInput.value = i.Equipment;
            suggestionsBox.innerHTML = "";
        };

        suggestionsBox.appendChild(div);
    });
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const log = {
        equipment: equipmentInput.value,
        department: departmentSelect.value,
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

loadDepartments();
displayLogs();
