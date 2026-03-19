document.addEventListener("DOMContentLoaded", function () {

let equipmentData = [];

const departmentSelect = document.getElementById("department");
const equipmentInput = document.getElementById("equipmentSearch");
const suggestionsBox = document.getElementById("suggestions");

// 🔥 LOAD EXCEL FROM GITHUB
fetch("./equipment.xlsx")console.log("Excel loaded:", equipmentData);
   
    .then(res => {
        if (!res.ok) throw new Error("Excel file not found");
        return res.arrayBuffer();
    })
    .then(data => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        let json = XLSX.utils.sheet_to_json(sheet);

        // Clean data
        equipmentData = json.map(item => ({
            Department: item.Department?.toString().trim(),
            Equipment: item.Equipment?.toString().trim()
        }));

        loadDepartments();
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Excel not loading. Check file name/path.");
    });

// 🏥 LOAD DEPARTMENTS
function loadDepartments() {
    const departments = [...new Set(equipmentData.map(i => i.Department))];

    departments.forEach(dep => {
        if (!dep) return;

        const option = document.createElement("option");
        option.value = dep;
        option.textContent = dep;
        departmentSelect.appendChild(option);
    });
}

// 🔍 SEARCH
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
        i.Equipment && i.Equipment.toLowerCase().includes(value)
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

});
