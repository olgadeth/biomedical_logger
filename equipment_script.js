/**
 * EQUIP - Professional Data Generation & Logic
 */

let assets = JSON.parse(localStorage.getItem('biomed_assets')) || [];

window.onload = () => {
    if (assets.length === 0) {
        generateDemoData();
    }
    refreshUI();
};

// --- DATA GENERATION ENGINE ---
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
    const contracts = ["AMC (Full)", "CMC (Comprehensive)", "Warranty", "On-Call Service"];
    const issues = ["Power Supply Fault", "Calibration Drift", "Display Flickering", "Software Freeze", "Battery Backup Failed", "Bumper Damaged"];

    for (let i = 1; i <= 100; i++) {
        const randomDev = devices[Math.floor(Math.random() * devices.length)];
        const bmId = `BM${String(i).padStart(3, '0')}`;
        
        // Random dates logic: Install in last 5 years, Service in last 45 days (to create varied health)
        const installDate = new Date(Date.now() - Math.floor(Math.random() * 157680000000)).toISOString().split('T')[0];
        
        // Randomly set service date to create Green, Orange, and Red statuses
        const daysAgo = Math.floor(Math.random() * 40); // 0 to 40 days ago
        const serviceDate = new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

        assets.push({
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
            contract: contracts[Math.floor(Math.random() * contracts.length)],
            lastIssue: issues[Math.floor(Math.random() * issues.length)]
        });
    }
    localStorage.setItem('biomed_assets', JSON.stringify(assets));
}

// --- CORE LOGIC ---
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

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
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
                    <button onclick="editAsset(${index})">✏️</button>
                    <button onclick="deleteAsset(${index})" style="color:red">🗑️</button>
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

// --- CANVAS CHARTING (No Libraries) ---
function renderCharts() {
    drawStatusPie();
    drawDowntimeBars();
}

function drawStatusPie() {
    const canvas = document.getElementById('statusPieChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let critical = 0, moderate = 0, good = 0;

    assets.forEach(item => {
        const d = calculateDowntime(item.serviceDate);
        if (d > 15) critical++; else if (d >= 5) moderate++; else good++;
    });

    const data = [good, moderate, critical];
    const colors = ['#28a745', '#fd7e14', '#dc3545'];
    let total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    data.forEach((val, i) => {
        let sliceAngle = (val / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 120, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        startAngle += sliceAngle;
    });
}

function drawDowntimeBars() {
    const canvas = document.getElementById('downtimeBarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const topAssets = assets.slice(0, 15);
    const barWidth = 25;
    const spacing = 10;

    topAssets.forEach((item, i) => {
        const d = calculateDowntime(item.serviceDate);
        const h = Math.min(d * 10, 250);
        ctx.fillStyle = getHealthStatus(d).color;
        ctx.fillRect(i * (barWidth + spacing) + 30, 280 - h, barWidth, h);
        
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.fillText(item.bmId, i * (barWidth + spacing) + 30, 295);
    });
}

// Filters & Search
function handleSearch() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    const filtered = assets.filter(a => a.bmId.toLowerCase().includes(query) || a.equipName.toLowerCase().includes(query));
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
