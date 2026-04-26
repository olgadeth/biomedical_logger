let allLogs = JSON.parse(localStorage.getItem('equip_fault_logs')) || [];

function renderLogs(filter = "All") {
    const container = document.getElementById('logDisplayContainer');
    container.innerHTML = "";

    const filtered = filter === "All" ? allLogs : allLogs.filter(l => l.priority === filter);

    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#aaa; margin-top:20px;">No fault logs available</p>`;
        return;
    }

    filtered.reverse().forEach(log => {
        const card = document.createElement('div');
        card.className = `log-card ${log.priority}`;
        card.innerHTML = `
            <h4>${log.name} (${log.bmId})</h4>
            <p><strong>SN:</strong> ${log.sn} | <strong>Dept:</strong> ${log.dept}</p>
            <p><strong>Issue:</strong> ${log.type}</p>
            <p><strong>Status:</strong> ${log.status}</p>
            <p><strong>Tech:</strong> ${log.attendedBy || 'Not assigned'}</p>
            <p><strong>Notes:</strong> ${log.notes || 'N/A'}</p>
            <span class="timestamp">Logged: ${log.timestamp}</span>
            <button class="btn-edit" onclick="openEditModal(${log.id})">✏️ Edit/Update</button>
        `;
        container.appendChild(card);
    });
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderLogs(btn.dataset.filter);
    });
});

// Edit Logic
function openEditModal(id) {
    const log = allLogs.find(l => l.id === id);
    document.getElementById('editId').value = id;
    document.getElementById('editAttendedBy').value = log.attendedBy;
    document.getElementById('editStatus').value = log.status;
    document.getElementById('editNotes').value = log.notes;
    document.getElementById('editModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('editModal').classList.add('hidden');
}

function saveEdit() {
    const id = parseInt(document.getElementById('editId').value);
    const logIndex = allLogs.findIndex(l => l.id === id);
    
    allLogs[logIndex].attendedBy = document.getElementById('editAttendedBy').value;
    allLogs[logIndex].status = document.getElementById('editStatus').value;
    allLogs[logIndex].notes = document.getElementById('editNotes').value;

    localStorage.setItem('equip_fault_logs', JSON.stringify(allLogs));
    closeModal();
    renderLogs();
}

// Clear All
document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm("Are you sure you want to delete ALL logs? This cannot be undone.")) {
        localStorage.removeItem('equip_fault_logs');
        allLogs = [];
        renderLogs();
    }
});

window.onload = () => renderLogs();
