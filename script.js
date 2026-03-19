document.addEventListener("DOMContentLoaded", function () {

let equipmentData = [];

const upload = document.getElementById("uploadExcel");
const departmentSelect = document.getElementById("department");
const equipmentInput = document.getElementById("equipmentSearch");
const suggestionsBox = document.getElementById("suggestions");

// 📂 READ EXCEL
upload.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        let json = XLSX.utils.sheet_to_json(sheet);

        // 🔥 CLEAN DATA (important fix)
        equipmentData = json.map(item => ({
            Department: item.Department?.toString().trim(),
            Equipment: item.Equipment?.toString().trim()
        }));

        console.log("Loaded Data:", equipmentData); // debug

        loadDepartments();
    };

    reader.readAsArrayBuffer(file);
});

// 🏥 LOAD DEPARTMENTS
function loadDepartments() {

    const departments = [...new Set(
        equipmentData.map(item => item.Department)
    )];

    departmentSelect.innerHTML = '<option value="">Select Department</option>';

    departments.forEach(dep => {
        if (!dep) return;

        const option = document.createElement("option");
        option.value = dep;
        option.textContent = dep;
        departmentSelect.appendChild(option);
    });
}

// 🔍 SEARCH EQUIPMENT
equipmentInput.addEventListener("input", function () {

    const value = this.value.toLowerCase();
    const selectedDept = departmentSelect.value;

    suggestionsBox.innerHTML = "";

    if (!value || equipmentData.length === 0) return;

    let filtered = equipmentData;

    if (selectedDept) {
        filtered = filtered.filter(item => item.Department === selectedDept);
    }

    filtered = filtered.filter(item =>
        item.Equipment && item.Equipment.toLowerCase().includes(value)
    );

    filtered.slice(0, 10).forEach(item => {

        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.innerText = item.Equipment;

        div.onclick = function () {
            equipmentInput.value = item.Equipment;
            suggestionsBox.innerHTML = "";
        };

        suggestionsBox.appendChild(div);
    });
});

});
