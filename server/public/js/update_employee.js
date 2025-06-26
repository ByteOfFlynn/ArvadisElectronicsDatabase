let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

updateEmployeeForm.addEventListener("submit", function (e) {
    e.preventDefault();
   
    let inputEmployee = document.getElementById("input-employeeID");
    let inputName = document.getElementById("input-name");
    let inputRole = document.getElementById("input-role");
    let inputcompanyEmail = document.getElementById("input-companyEmail");
    
    let employeeIDValue = inputEmployee.value;
    let nameValue = inputName.value;
    let RoleValue = inputRole.value;
    let companyEmailValue = inputcompanyEmail.value;
    
    let data = {
        employeeID: employeeIDValue,
        name: nameValue,
        role: RoleValue,
        companyEmail: companyEmailValue,
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the update.");
        }
    }
    xhttp.send(JSON.stringify(data));
});

function editEmployee(employeeID) {
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('updateBody').style.display = 'block';
    // Populate Data
    fetch(`/get-employee/${employeeID}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("updateFormTitle").innerText = `Edit ${data.employeeID} - ${data.name}'s Information!`;
            document.getElementById("input-employeeID").value = employeeID,
            document.getElementById("input-name").value = data.name || "";
            document.getElementById("input-role").value = data.role || "";
            document.getElementById("input-companyEmail").value = data.companyEmail || "";
        })
        .catch(error => console.error('Error fetching employee data:', error));
}
