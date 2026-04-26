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

// 1. Auto-fill fields
bmIdSelect.addEventListener('change', (e) => {
    const data = equipmentData[e.target.value];
    document.getElementById('equipName').value = data ? data.name : "";
    document.getElementById('serialNum').value = data ? data.sn : "";
    document.getElementById('dept').value = data ? data.dept : "";
});

// 2. Toggle "Other" input
faultTypeSelect.addEventListener('change', (e) => {
    otherContainer.classList.toggle('hidden', e.target.value !== 'Other');
});

// 3. Form Submission & Local Storage
faultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const priority = document.querySelector('input[name="priority"]:checked').value;
    const faultData = {
        name: document.getElementById('equipName').value,
        sn: document.getElementById('serialNum').value,
        dept: document.getElementById('dept').value,
        reportedBy: document.getElementById('reportedBy').value,
        type: faultTypeSelect.value === 'Other' ? document.getElementById('otherIssue').value : faultTypeSelect.value,
        priority: priority,
        time: new Date().toLocaleString()
    };

    // Save to LocalStorage (Permanent storage in browser)
    saveLogLocally(faultData);

    // Update UI
    addCardToUI(faultData);
    
    // Feedback
    successMsg.classList.remove('hidden');
    setTimeout(() => successMsg.classList.add('hidden'), 3000);

    faultForm.reset();
    otherContainer.classList.add('hidden');
    document.querySelector('.empty-msg')?.remove();
});

function saveLogLocally(data) {
    let history = JSON.parse(localStorage.getItem('faultHistory')) || [];
    history.push(data);
    localStorage.setItem('faultHistory', JSON.stringify(history));
}

function addCardToUI(data) {
    const card = document.createElement('div');
    card.className = `log-card ${data.priority}`;
    card.innerHTML = `
        <h4>${data.name} <small>(${data.priority})</small></h4>
        <p><strong>Issue:</strong> ${data.type}</p>
        <p><strong>By:</strong> ${data.reportedBy} | <strong>Dept:</strong> ${data.dept}</p>
        <div class="meta">
            <span>SN: ${data.sn}</span>
            <span>${data.time}</span>
        </div>
    `;
    logList.prepend(card);
}

// Reset button also clears readonly fields
document.getElementById('resetBtn').addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById('equipName').value = "";
        document.getElementById('serialNum').value = "";
        document.getElementById('dept').value = "";
    }, 10);
});
