let assets = JSON.parse(localStorage.getItem('biomed_assets')) || [];

// 1. Initial Load
window.onload = () => {
    refreshUI();
};

function refreshUI() {
    renderTable(assets);
    calculateKPIs();
    renderCharts();
}

// 2. Downtime Logic
function calculateDowntime(serviceDate) {
    const today = new Date();
    const lastService = new Date(serviceDate);
    const diffTime = Math.abs(today - lastService);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function getHealthStatus(days) {
    if (days < 5) return { label: 'Good', class: 'badge-good' };
    if (days <= 15) return { label: 'Moderate', class: 'badge-moderate' };
    return { label: 'Critical', class: 'badge-critical' };
}

// 3. Render Table
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    data.forEach((item, index) => {
        const downtime = calculateDowntime(item.serviceDate);
        const health = getHealthStatus(downtime);

        const row = `
            <tr>
                <td><strong>${item.bmId}</strong></td>
                <td>${item.equipName}</td>
                <td>${item.make} / ${item.modelNum}</td>
                <td>${item.department}</td>
                <td>${item.installedBy || 'N/A'}</td>
                <td>${item.spares || 'None'}</td>
                <td>${item.serviceDate}</td>
                <td>${downtime} Days</td>
                <td><span class="badge ${health.class}">${health.label}</span></td>
                <td>${item.manualUrl ? `<a href="${item.manualUrl}" target="_blank">📄 View</a>` : '—'}</td>
                <td>
                    <button onclick="editAsset(${index})" style="background:none; border:none; cursor:pointer;">✏️</button>
                    <button onclick="deleteAsset(${index})" style="background:none; border:none; cursor:pointer; color:red;">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// 4. Modal Controls
function openModal() {
    document.getElementById('equipForm').reset();
    document.getElementById('editIndex').value = '';
    document.getElementById('modalTitle').innerText = 'Register New Asset';
    document.getElementById('equipModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('equipModal').style.display = 'none';
}

// 5. CRUD Operations
document.getElementById('equipForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const assetData = {
        bmId: document.getElementById('bmId').value,
        equipName: document.getElementById('equipName').value,
        make: document.getElementById('make').value,
        modelNum: document.getElementById('modelNum').value,
        installDate: document.getElementById('installDate').value,
        installedBy: document.getElementById('installedBy').value,
        department: document.getElementById('department').value,
        serviceDate: document.getElementById('serviceDate').value,
        spares: document.getElementById('spares').value,
        manualUrl: document.getElementById('manualUrl').value
    };

    const editIndex = document.getElementById('editIndex').value;
    if (editIndex !== '') {
        assets[editIndex] = assetData;
    } else {
        assets.push(assetData);
    }

    localStorage.setItem('biomed_assets', JSON.stringify(assets));
    closeModal();
    refreshUI();
});

function editAsset(index) {
    const item = assets[index];
    document.getElementById('bmId').value = item.bmId;
    document.getElementById('equipName').value = item.equipName;
    document.getElementById('make').value = item.make;
    document.getElementById('modelNum').value = item.modelNum;
    document.getElementById('installDate').value = item.installDate;
    document.getElementById('installedBy').value = item.installedBy;
    document.getElementById('department').value = item.department;
    document.getElementById('serviceDate').value = item.serviceDate;
    document.getElementById('spares').value = item.spares;
    document.getElementById('manualUrl').value = item.manualUrl;
    
    document.getElementById('editIndex').value = index;
    document.getElementById('modalTitle').innerText = 'Edit Asset Details';
    document.getElementById('equipModal').style.display = 'block';
}

function deleteAsset(index) {
    if (confirm("Delete this asset permanently?")) {
        assets.splice(index, 1);
        localStorage.setItem('biomed_assets', JSON.stringify(assets));
        refreshUI();
    }
}

// 6. Analytics & KPIs
function calculateKPIs() {
    const total = assets.length;
    let critical = 0;
    let moderate = 0;

    assets.forEach(item => {
        const d = calculateDowntime(item.serviceDate);
        if (d > 15) critical++;
        else if (d >= 5) moderate++;
    });

    document.getElementById('totalCount').innerText = total;
    document.getElementById('activeCount').innerText = total - (critical + moderate);
    document.getElementById('maintenanceCount').innerText = moderate;
    document.getElementById('criticalCount').innerText = critical;
}

function renderCharts() {
    const barContainer = document.getElementById('downtimeBars');
    barContainer.innerHTML = '';
    
    // Simple bar chart logic: take first 10 items
    assets.slice(0, 10).forEach(item => {
        const d = calculateDowntime(item.serviceDate);
        const h = Math.min(d * 5, 140); // Scaling
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${h}px`;
        bar.setAttribute('data-val', `${d}d`);
        barContainer.appendChild(bar);
    });
}

// 7. Filters & Search
function handleSearch() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    const filtered = assets.filter(a => 
        a.bmId.toLowerCase().includes(query) || 
        a.equipName.toLowerCase().includes(query)
    );
    renderTable(filtered);
}

function applyFilters() {
    const dept = document.getElementById('deptFilter').value;
    const health = document.getElementById('healthFilter').value;

    let filtered = assets;

    if (dept) filtered = filtered.filter(a => a.department === dept);
    if (health) filtered = filtered.filter(a => {
        const d = calculateDowntime(a.serviceDate);
        return getHealthStatus(d).label === health;
    });

    renderTable(filtered);
}
