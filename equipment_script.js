/**
 * EQUIP - Professional Equipment Library Logic
 * Features: 100-Entry Demo Generator, Triple-Chart Analytics, and CRUD Operations
 */

let assets = JSON.parse(localStorage.getItem('biomed_assets')) || [];

window.onload = () => {
    // If no data exists, generate the 100-entry professional demo
    if (assets.length === 0) {
        generateDemoData();
    }
    refreshUI();
};

// --- 1. DATA GENERATION ENGINE (Demo Mode) ---
function generateDemoData() {
    const devices = [
        { name: "Ventilator", make: "Dräger", model: "Evita V500", spares: "Oxygen Sensor, Battery" },
        { name: "Infusion Pump", make: "B. Braun", model: "Infusomat P", spares: "Drop Sensor, Battery" },
        { name: "ECG Machine", make: "GE Healthcare", model: "MAC 2000", spares: "Lead Wires, Thermal Paper" },
        { name: "Defibrillator", make: "Zoll", model: "R Series", spares: "Pads, Battery Pack" },
        { name: "Patient Monitor", make: "Philips", model: "IntelliVue MX450", spares: "NIBP Cuff, SpO2 Probe" },
        { name: "Syringe Pump", make: "Terumo", model: "TE-331", spares: "Plunger Clamp" },
        { name: "Ultrasound", make: "Siemens", model: "Acuson S2000", spares: "Transducer, Gel" },
        { name: "X-Ray Mobile", make: "Shimadzu", model: "MobileArt Echo", spares: "Collimator Lamp" },
        { name: "Dialysis Machine", make: "Fresenius", model: "5008S", spares: "Blood Pump Module" },
        { name: "Anesthesia Workstation", make: "Mindray", model: "A7", spares: "Bellows, Flow Sensor" }
    ];

    const depts = ["ICU", "Radiology", "Cardiology", "OT", "Emergency", "Lab", "NICU"];
    const engineers = ["Engr. Sarah Chen", "Engr. James Wilson", "Engr. Elena Rodriguez", "Engr. Ahmed Khan", "Engr. Li Wei"];
    const issues = ["Power Supply Fault", "Calibration Drift", "Display Flickering", "Software Freeze", "Battery Backup Failed"];

    for (let i = 1; i <= 100; i++) {
        const randomDev = devices[Math.floor(Math.random() * devices.length)];
        const bmId = `BM${String(i).padStart(3, '0')}`;
        
        // Random dates: Installed within last 5 years
        const installDate = new Date(Date.now() - Math.floor(Math.random() * 157680000000)).toISOString().split('T')[0];
        
        // Varied Health: Service dates range from 0 to 40 days ago
        const daysAgo = Math.floor(Math.random() * 40); 
        const serviceDate = new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

        assets.push({
            id: Date.now() + i, // Unique timestamp ID
            bmId: bmId,
            equipName: randomDev.name,
            make: randomDev.make,
            modelNum: randomDev.model,
            installDate: installDate,
            installedBy: engineers[Math.floor(Math.random() * engineers.length)],
            department: depts[Math.floor(Math.random() * depts.length)],
            serviceDate: serviceDate,
            spares: randomDev.spares,
            manualUrl: "https://example.com/manual.pdf",
            lastIssue: issues[Math.floor(Math.random() * issues.length)]
        });
    }
    localStorage.setItem('biomed_assets', JSON.stringify(assets));
}

// --- 2. CORE UTILITY LOGIC ---
function calculateDowntime(serviceDate) {
    const today = new Date();
    const lastService = new Date(serviceDate);
    const diffTime = today - lastService;
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
}

function getHealthStatus(days) {
    if (days < 5) return { label: 'Good', class: 'badge-good', color: '#28a745' };
    if (days <= 15) return { label: 'Moderate', class: 'badge-moderate', color: '#fd7e14' };
    return { label: 'Critical', class: 'badge-critical', color: '#dc3545' };
}

function refreshUI() {
    renderTable(assets);
    calculateKPIs();
    renderCharts();
}

// --- 3. UI RENDERING ---
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    data.forEach((item, index) => {
        const downtime = calculateDowntime(item.serviceDate);
        const health = getHealthStatus(downtime);
        tbody.innerHTML += `
            <tr>
                <td><strong>${item.bmId}</strong></td>
                <td>${item.equipName}</td>
                <td>${item.make} / ${item.modelNum}</td>
                <td>${item.department}</td>
                <td>${item.installedBy}</td>
                <td>${item.spares}</td>
                <td>${item.serviceDate}</td>
                <td>${downtime} Days</td>
                <td><span class="badge ${health.class}">${health.label}</span></td>
                <td><a href="${item.manualUrl}" target="_blank">📄 View</a></td>
                <td>
                    <button class="action-btn edit" onclick="editAsset(${index})">✏️</button>
                    <button class="action-btn delete" onclick="deleteAsset(${index})" style="color:red">🗑️</button>
                </td>
            </tr>
        `;
    });
}

function calculateKPIs() {
    const total = assets.length;
    let critical = 0, moderate = 0;
    assets.forEach(item => {
        const d = calculateDowntime(item.serviceDate);
        if (d > 15) critical++; else if (d >= 5) moderate++;
    });
    document.getElementById('totalCount').innerText = total;
    document.getElementById('activeCount').innerText = total - (critical + moderate);
    document.getElementById('maintenanceCount').innerText = moderate;
    document.getElementById('criticalCount').innerText = critical;
}

// --- 4. ANALYTICS (Triple Canvas Charts) ---
function renderCharts() {
    drawStatusPie();
    drawDowntimeBars();
    drawDeptChart();
}

function drawStatusPie() {
    const canvas = document.getElementById('statusPieChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let crit = 0, mod = 0, good = 0;

    assets.forEach(a => {
        const d = calculateDowntime(a.serviceDate);
        if (d > 15) crit++; else if (d >= 5) mod++; else good++;
    });

    const data = [good, mod, crit];
    const colors = ['#28a745', '#fd7e14', '#dc3545'];
    let total = assets.length;
    let startAngle = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    data.forEach((val, i) => {
        let slice = (val / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 110, startAngle, startAngle + slice);
        ctx.fillStyle = colors[i];
        ctx.fill();
        startAngle += slice;
    });
}

function drawDowntimeBars() {
    const canvas = document.getElementById('downtimeBarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const topAssets = assets.slice(0, 12);
    const barWidth = 30;
    const spacing = 10;

    topAssets.forEach((item, i) => {
        const d = calculateDowntime(item.serviceDate);
        const h = Math.min(d * 6, 240);
        ctx.fillStyle = getHealthStatus(d).color;
        ctx.fillRect(i * (barWidth + spacing) + 30, 260 - h, barWidth, h);
        
        ctx.fillStyle = '#666';
        ctx.font = '9px Arial';
        ctx.fillText(item.bmId, i * (barWidth + spacing) + 30, 275);
    });
}

function drawDeptChart() {
    const canvas = document.getElementById('deptBarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const depts = ["ICU", "Radiology", "Cardiology", "OT", "Emergency", "Lab", "NICU"];
    const counts = depts.map(d => assets.filter(a => a.department === d).length);
    const max = Math.max(...counts);

    counts.forEach((count, i) => {
        const h = (count / max) * 200;
        ctx.fillStyle = "#4285f4";
        ctx.fillRect(i * 110 + 60, 250 - h, 60, h);
        ctx.fillStyle = "#333";
        ctx.font = "12px Arial";
        ctx.fillText(depts[i], i * 110 + 65, 270);
        ctx.fillText(count, i * 110 + 80, 245 - h);
    });
}

// --- 5. SEARCH & FILTERS ---
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
    if (health) filtered = filtered.filter(a => getHealthStatus(calculateDowntime(a.serviceDate)).label === health);
    renderTable(filtered);
}

// --- 6. MODAL & CRUD ACTIONS ---
function openModal() {
    document.getElementById('equipForm').reset();
    document.getElementById('editIndex').value = '';
    document.getElementById('modalTitle').innerText = 'Register New Asset';
    document.getElementById('equipModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('equipModal').style.display = 'none';
}

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
    document.getElementById('manualUrl').value = item.manualUrl || '';
    
    document.getElementById('editIndex').value = index;
    document.getElementById('modalTitle').innerText = 'Edit Asset Details';
    document.getElementById('equipModal').style.display = 'block';
}

function deleteAsset(index) {
    if (confirm("Delete this asset permanently from the library?")) {
        assets.splice(index, 1);
        localStorage.setItem('biomed_assets', JSON.stringify(assets));
        refreshUI();
    }
}

// Form Submission handling for Add/Edit
const equipForm = document.getElementById('equipForm');
if (equipForm) {
    equipForm.onsubmit = (e) => {
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
    };
}
