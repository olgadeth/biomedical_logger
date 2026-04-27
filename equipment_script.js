let library = JSON.parse(localStorage.getItem('biomed_library')) || [];

const listContainer = document.getElementById('equipmentList');
const addModal = document.getElementById('addModal');
const detailsModal = document.getElementById('detailsModal');
const issueModal = document.getElementById('issueModal');

// 1. Render List
function renderLibrary(filterStatus = "All", searchTerm = "") {
    listContainer.innerHTML = "";
    
    const filtered = library.filter(item => {
        const matchesStatus = filterStatus === "All" || item.status.includes(filterStatus);
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.bmId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `<p style="text-align:center; color:#aaa; margin-top:20px;">No equipment found.</p>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'equip-card';
        card.innerHTML = `
            <span class="status-tag status-${item.status.replace(/\s/g, '')}">${item.status}</span>
            <h3>${item.name}</h3>
            <p><strong>ID:</strong> ${item.bmId} | <strong>Model:</strong> ${item.modelNum}</p>
            <p><strong>Dept:</strong> ${item.dept}</p>
            <div class="card-btns">
                <button class="btn-small view-btn" onclick="showDetails('${item.bmId}')">View Details</button>
                <button class="btn-small issue-btn" onclick="openIssueModal('${item.bmId}')">Add Issue</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// 2. Add Equipment
document.getElementById('addEquipForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const bmId = document.getElementById('bmId').value;

    if (library.find(item => item.bmId === bmId)) {
        alert("This BM ID already exists!");
        return;
    }

    const newAsset = {
        bmId: bmId,
        name: document.getElementById('equipName').value,
        modelNum: document.getElementById('modelNum').value,
        make: document.getElementById('make').value,
        dept: document.getElementById('dept').value,
        installDate: document.getElementById('installDate').value,
        status: document.getElementById('status').value,
        history: [{
            date: document.getElementById('installDate').value,
            type: 'Installed',
            desc: `Equipment installed in ${document.getElementById('dept').value}`
        }]
    };

    library.push(newAsset);
    save();
    closeModal('addModal');
    renderLibrary();
});

// 3. Timeline & Details
function showDetails(bmId) {
    const item = library.find(i => i.bmId === bmId);
    const content = document.getElementById('detailsContent');
    
    let historyHtml = item.history.sort((a,b) => new Date(b.date) - new Date(a.date)).map(h => `
        <div class="timeline-item">
            <div class="timeline-date">${h.date}</div>
            <div class="timeline-type">${h.type}</div>
            <div class="timeline-desc">${h.desc}</div>
        </div>
    `).join('');

    content.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>BM ID:</strong> ${item.bmId}</p>
        <p><strong>Manufacturer:</strong> ${item.make}</p>
        <p><strong>Status:</strong> ${item.status}</p>
        <p><strong>Installed:</strong> ${item.installDate}</p>
        <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
        <h3>Lifecycle Timeline</h3>
        <div class="timeline">${historyHtml}</div>
    `;
    detailsModal.classList.remove('hidden');
}

// 4. Add Issue
function openIssueModal(bmId) {
    document.getElementById('issueTargetId').value = bmId;
    issueModal.classList.remove('hidden');
}

document.getElementById('issueForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const bmId = document.getElementById('issueTargetId').value;
    const itemIndex = library.findIndex(i => i.bmId === bmId);

    const newEntry = {
        date: document.getElementById('issueDate').value,
        type: document.getElementById('issueType').value,
        desc: document.getElementById('issueDesc').value
    };

    library[itemIndex].history.push(newEntry);
    
    // Update status automatically if it's a fault
    if(newEntry.type === 'Fault') library[itemIndex].status = 'Under Maintenance';
    
    save();
    closeModal('issueModal');
    renderLibrary();
    alert("History updated!");
});

// Helpers
function save() { localStorage.setItem('biomed_library', JSON.stringify(library)); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
document.getElementById('showAddFormBtn').onclick = () => addModal.classList.remove('hidden');

// Search & Filter Listeners
function filterEquipment() {
    const term = document.getElementById('librarySearch').value;
    const activeTab = document.querySelector('.filter-tab.active').dataset.status;
    renderLibrary(activeTab, term);
}

document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.filter-tab.active').classList.remove('active');
        tab.classList.add('active');
        filterEquipment();
    });
});

window.onload = () => renderLibrary();
