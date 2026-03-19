const equipmentData = [
    [
    {
        "Department": "Cardiology",
        "Equipment": "ECG Machine"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Holter Monitor"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Event Recorder"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Stress Test (TMT) System"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Defibrillator (Manual)"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Defibrillator (AED)"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Cardiac Monitor"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Pacemaker (Temporary)"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Pacemaker Programmer"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Echocardiography Machine"
    },
    {
        "Department": "Cardiology",
        "Equipment": "Doppler Ultrasound (Cardiac"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Ventilator (Adult)"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Ventilator (Pediatric)"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Ventilator (Transport)"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Multiparameter Monitor"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Infusion Pump"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Syringe Pump"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Suction Apparatus (Portable)"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Suction Apparatus (Wall Mounted)"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Oxygen Concentrator"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Humidifier"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "CPAP Machine"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "BiPAP Machine"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Crash Cart Monitor"
    },
    {
        "Department": "Icu / critical care",
        "Equipment": "Capnograph"
    },
    {
        "Department": "General ward",
        "Equipment": "BP Apparatus (Manual)"
    },
    {
        "Department": "General ward",
        "Equipment": "BP Apparatus (Digital)"
    },
    {
        "Department": "General ward",
        "Equipment": "Pulse Oximeter"
    },
    {
        "Department": "General ward",
        "Equipment": "Thermometer (Digital)"
    },
    {
        "Department": "General ward",
        "Equipment": "Thermometer (Infrared)"
    },
    {
        "Department": "General ward",
        "Equipment": "Nebulizer"
    },
    {
        "Department": "General ward",
        "Equipment": "Glucometer"
    },
    {
        "Department": "General ward",
        "Equipment": "Weighing Scale (Adult)"
    },
    {
        "Department": "General ward",
        "Equipment": "Weighing Scale (Infant"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Hematology Analyzer (3-part)"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Hematology Analyzer (5-part)"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Biochemistry Analyzer (Semi-auto)"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Biochemistry Analyzer (Fully-auto)"
    },
    {
        "Department": "Laboratory",
        "Equipment": "ABG Analyzer"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Electrolyte Analyzer"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Coagulation Analyzer"
    },
    {
        "Department": "Laboratory",
        "Equipment": "ELISA Reader"
    },
    {
        "Department": "Laboratory",
        "Equipment": "ELISA Washer"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Centrifuge (Tabletop)"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Centrifuge (High-speed)"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Blood Bank Refrigerator"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Plasma Freezer"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Incubator (Lab)"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Microscope (Binocular)"
    },
    {
        "Department": "Laboratory",
        "Equipment": "Microscope (Fluorescence)"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "X-Ray Machine (Fixed)"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "X-Ray Machine (Portable)"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "Digital Radiography (DR) System"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "Computed Radiography (CR) System"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "CT Scanner"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "MRI Scanner"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "Ultrasound Machine"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "Doppler Ultrasound"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "Mammography Unit"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "C-Arm"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "OPG Machine"
    },
    {
        "Department": "Radiology / imaging",
        "Equipment": "Fluoroscopy Unit"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "OT Table (Manual)"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "OT Table (Electric)"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "OT Light (Single Dome)"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "OT Light (Double Dome)"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "Anesthesia Machine"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "Electrosurgical Unit (ESU)"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "Surgical Suction"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "Patient Warmer"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "Defibrillator"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "Laparoscopy Tower"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "Endoscopy System"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "Surgical Drill"
    },
    {
        "Department": "Operation theatre (ot)",
        "Equipment": "Surgical Microscope"
    },
    {
        "Department": "Neurology",
        "Equipment": "EEG Machine"
    },
    {
        "Department": "Neurology",
        "Equipment": "EMG Machine"
    },
    {
        "Department": "Neurology",
        "Equipment": "Nerve Conduction System"
    },
    {
        "Department": "Ophthalmology",
        "Equipment": "Slit Lamp"
    },
    {
        "Department": "Ophthalmology",
        "Equipment": "Fundus Camera"
    },
    {
        "Department": "Ophthalmology",
        "Equipment": "Auto Refractometer"
    },
    {
        "Department": "Ophthalmology",
        "Equipment": "Keratometer"
    },
    {
        "Department": "Ophthalmology",
        "Equipment": "Tonometer"
    },
    {
        "Department": "Ophthalmology",
        "Equipment": "Visual Field Analyzer"
    },
    {
        "Department": "Ent",
        "Equipment": "Audiometer"
    },
    {
        "Department": "Ent",
        "Equipment": "Tympanometer"
    },
    {
        "Department": "Ent",
        "Equipment": "ENT Endoscope"
    },
    {
        "Department": "Ent",
        "Equipment": "Suction Unit (ENT)"
    },
    {
        "Department": "Cssd",
        "Equipment": "Autoclave (Vertical)"
    },
    {
        "Department": "Cssd",
        "Equipment": "Autoclave (Horizontal)"
    },
    {
        "Department": "Cssd",
        "Equipment": "ETO Sterilizer"
    },
    {
        "Department": "Cssd",
        "Equipment": "Plasma Sterilizer"
    },
    {
        "Department": "Cssd",
        "Equipment": "Washer Disinfector"
    },
    {
        "Department": "Cssd",
        "Equipment": "Ultrasonic Cleaner"
    },
    {
        "Department": "Dialysis",
        "Equipment": "Hemodialysis Machine"
    },
    {
        "Department": "Dialysis",
        "Equipment": "Dialyzer Reprocessing Unit"
    },
    {
        "Department": "Dialysis",
        "Equipment": "RO Water System"
    },
    {
        "Department": "Physiotherapy / rehab",
        "Equipment": "TENS Unit"
    },
    {
        "Department": "Physiotherapy / rehab",
        "Equipment": "Ultrasound Therapy Unit"
    },
    {
        "Department": "Physiotherapy / rehab",
        "Equipment": "Traction Unit"
    },
    {
        "Department": "Physiotherapy / rehab",
        "Equipment": "Laser Therapy Unit"
    },
    {
        "Department": "Physiotherapy / rehab",
        "Equipment": "CPM Machine"
    },
    {
        "Department": "Advanced / specialty",
        "Equipment": "PCR Machine"
    },
    {
        "Department": "Advanced / specialty",
        "Equipment": "Flow Cytometer"
    },
    {
        "Department": "Advanced / specialty",
        "Equipment": "Cryostat"
    },
    {
        "Department": "Advanced / specialty",
        "Equipment": "Spectrophotometer"
    },
    {
        "Department": "Advanced / specialty",
        "Equipment": "Gas Chromatograph"
    },
    {
        "Department": "Support equipment ",
        "Equipment": "Hospital Bed (Electric)"
    },
    {
        "Department": "Support equipment ",
        "Equipment": "Hospital Bed (Manual)"
    },
    {
        "Department": "Support equipment ",
        "Equipment": "ICU Bed"
    },
    {
        "Department": "Support equipment ",
        "Equipment": "Wheelchair"
    },
    {
        "Department": "Support equipment ",
        "Equipment": "Stretcher"
    },
    {
        "Department": "Support equipment ",
        "Equipment": "Crash Cart"
    },
    {
        "Department": "Support equipment ",
        "Equipment": "IV Stand"
    },
    {
        "Department": "Support equipment ",
        "Equipment": "Bedside Locker"
            ];
const form = document.getElementById("logForm");
const logsDiv = document.getElementById("logs");

let logs = JSON.parse(localStorage.getItem("logs")) || [];

function loadDepartments() {
    const departments = [...new Set(equipmentData.map(i => i.Department))];

    const departmentSelect = document.getElementById("department");

    departments.forEach(dep => {
        const option = document.createElement("option");
        option.value = dep;
        option.textContent = dep;
        departmentSelect.appendChild(option);
    });
}

loadDepartments();

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
    const equipmentInput = document.getElementById("equipmentSearch");
const suggestionsBox = document.getElementById("suggestions");
const departmentSelect = document.getElementById("department");

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
