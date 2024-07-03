var selectedRow = null;

document.getElementById("add_to_list").addEventListener("click", onFormSubmit);

function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["description"] = document.getElementById("description").value;
    formData["quantity"] = document.getElementById("quantity").value;
    formData["pu"] = document.getElementById("pu").value;
    formData["total"] = formData["quantity"] * formData["pu"];
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("itemList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.description;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.quantity;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.pu;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.total;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a href="#" onClick="onEdit(this)">Edit</a>
                    <a href="#" onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("description").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("pu").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("description").value = selectedRow.cells[0].textContent;
    document.getElementById("quantity").value = selectedRow.cells[1].textContent;
    document.getElementById("pu").value = selectedRow.cells[2].textContent;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.description;
    selectedRow.cells[1].innerHTML = formData.quantity;
    selectedRow.cells[2].innerHTML = formData.pu;
    selectedRow.cells[3].innerHTML = formData.total;
}

function onDelete(td) {
    if (confirm('Are you sure you want to delete this record?')) {
        var row = td.parentElement.parentElement;
        document.getElementById("itemList").deleteRow(row.rowIndex);
        resetForm();
    }
}