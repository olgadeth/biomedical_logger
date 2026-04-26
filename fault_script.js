const equipmentData = {
    "BM001": { name: "Ventilator", sn: "VT-99022", dept: "ICU" },
    "BM002": { name: "Infusion Pump", sn: "IP-11055", dept: "General Ward" },
    "BM003": { name: "ECG Machine", sn: "ECG-8841", dept: "Cardiology" }
};

const faultForm = document.getElementById('faultForm');
const bmIdSelect = document.getElementById('bmId');
const faultTypeSelect = document.getElementById('faultType');
const otherContainer = document.getElementById('otherIssueContainer');

// Auto-fill logic
bmIdSelect.addEventListener('change', (e) => {
    const data = equipmentData[e.target.value];
    document.getElementById('equipName').value = data ? data.name : "";
    document.getElementById('serialNum').value = data ? data.sn : "";
    document.getElementById('dept').value = data ? data.dept : "";
});

// Other issue toggle
faultTypeSelect.addEventListener('change', (e) => {
    otherContainer.classList.toggle('hidden', e.target.value !== 'Other');
});

// Form Submission
faultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const faultData = {
        id: Date.now(),
        bmId: bmIdSelect.value,
        name: document.getElementById('equipName').value,
        sn: document.getElementById('serialNum').value,
        dept: document.getElementById('dept').value,
        reportedBy: document.getElementById('reportedBy').value,
        attendedBy: document.getElementById('attendedBy').value,
        type: faultTypeSelect.value === 'Other' ? document.getElementById('otherIssue').value : faultTypeSelect.value,
        priority: document.querySelector('input[name="priority"]:checked').value,
        status: document.getElementById('currentStatus').value,
        notes: document.getElementById('notes').value,
        timestamp: new Date().toLocaleString()
    };

    saveToLocalStorage(faultData);
    displayRecentCard(faultData);

    const success = document.getElementById('successMsg');
    success.classList.remove('hidden');
    setTimeout(() => success.classList.add('hidden'), 3000);

    faultForm.reset();
});

function saveToLocalStorage(data) {
    let logs = JSON.parse(localStorage.getItem('equip_logs')) || [];
    logs.push(data);
    localStorage.setItem('equip_logs', JSON.stringify(logs));
}

function displayRecentCard(data) {
    const logList = document.getElementById('logList');
    const card = document.createElement('div');
    card.className = `log-card ${data.priority}`;
    card.innerHTML = `
        <h4>${data.name} - ${data.status}</h4>
        <p><strong>By:</strong> ${data.reportedBy} | <strong>Tech:</strong> ${data.attendedBy || 'None'}</p>
        <p class="timestamp">${data.timestamp}</p>
    `;
    logList.prepend(card);
}
// ... existing equipmentData ...

faultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const faultData = {
        id: Date.now(),
        bmId: document.getElementById('bmId').value,
        name: document.getElementById('equipName').value,
        sn: document.getElementById('serialNum').value,
        dept: document.getElementById('dept').value,
        type: document.getElementById('faultType').value === 'Other' ? document.getElementById('otherIssue').value : document.getElementById('faultType').value,
        priority: document.querySelector('input[name="priority"]:checked').value,
        reportedBy: document.getElementById('reportedBy').value,
        attendedBy: document.getElementById('attendedBy').value,
        status: document.getElementById('currentStatus').value,
        notes: document.getElementById('notes').value,
        timestamp: new Date().toLocaleString()
    };

    // Save to LocalStorage
    let existingLogs = JSON.parse(localStorage.getItem('equip_fault_logs')) || [];
    existingLogs.push(faultData);
    localStorage.setItem('equip_fault_logs', JSON.stringify(existingLogs));

    alert("✅ Fault logged successfully!");
    window.location.href = "view_logs.html";
});
