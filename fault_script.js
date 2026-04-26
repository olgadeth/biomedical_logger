// Data object for auto-fill functionality
const equipmentData = {
    "BM001": { name: "Ventilator", sn: "VT-99022", dept: "ICU" },
    "BM002": { name: "Infusion Pump", sn: "IP-11055", dept: "General Ward" },
    "BM003": { name: "ECG Machine", sn: "ECG-8841", dept: "Cardiology" }
};

const faultForm = document.getElementById('faultForm');
const bmIdSelect = document.getElementById('bmId');
const faultTypeSelect = document.getElementById('faultType');
const otherContainer = document.getElementById('otherIssueContainer');
const logList = document.getElementById('logList');
const successMsg = document.getElementById('successMsg');

// 1. Auto-fill logic
bmIdSelect.addEventListener('change', (e) => {
    const id = e.target.value;
    if (equipmentData[id]) {
        document.getElementById('equipName').value = equipmentData[id].name;
        document.getElementById('serialNum').value = equipmentData[id].sn;
        document.getElementById('dept').value = equipmentData[id].dept;
    } else {
        document.getElementById('equipName').value = "";
        document.getElementById('serialNum').value = "";
        document.getElementById('dept').value = "";
    }
});

// 2. Show/Hide "Other" input
faultTypeSelect.addEventListener('change', (e) => {
    if (e.target.value === 'Other') {
        otherContainer.classList.remove('hidden');
    } else {
        otherContainer.classList.add('hidden');
    }
});

// 3. Form Submission
faultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values
    const bmId = bmIdSelect.value;
    const name = document.getElementById('equipName').value;
    const sn = document.getElementById('serialNum').value;
    const dept = document.getElementById('dept').value;
    const faultType = faultTypeSelect.value === 'Other' ? document.getElementById('otherIssue').value : faultTypeSelect.value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const timestamp = new Date().toLocaleString();

    // Create Log Card
    createLogCard(name, sn, dept, faultType, priority, timestamp);

    // Visual Feedback
    successMsg.classList.remove('hidden');
    setTimeout(() => successMsg.classList.add('hidden'), 3000);

    // Reset Form
    faultForm.reset();
    otherContainer.classList.add('hidden');
    document.querySelector('.empty-msg')?.remove();
});

// 4. Function to add card to UI
function createLogCard(name, sn, dept, type, priority, time) {
    const card = document.createElement('div');
    card.className = `log-card ${priority}`;
    
    card.innerHTML = `
        <h4>${name} (${priority})</h4>
        <p><strong>SN:</strong> ${sn} | <strong>Dept:</strong> ${dept}</p>
        <p><strong>Issue:</strong> ${type}</p>
        <p class="timestamp">Logged on: ${time}</p>
    `;

    // Add to top of list
    logList.prepend(card);
}

// Reset button logic to clear read-only fields
document.getElementById('resetBtn').addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById('equipName').value = "";
        document.getElementById('serialNum').value = "";
        document.getElementById('dept').value = "";
        otherContainer.classList.add('hidden');
    }, 10);
});
