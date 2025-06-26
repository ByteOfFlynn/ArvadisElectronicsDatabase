let updateSaleForm = document.getElementById('update-sale-form-ajax');

updateSaleForm.addEventListener("submit", function (e) {
    e.preventDefault();
   
    let inputSale = document.getElementById("input-saleID");
    let inputDate = document.getElementById("input-date");
    let inputcustomerID = document.getElementById("input-customerID");
    let inputemployeeID = document.getElementById("input-employeeID");
    let inputtotalAmount = document.getElementById("input-totalAmount");
    
    let saleIDValue = inputSale.value;
    let dateValue = inputDate.value;
    let customerIDValue = inputcustomerID.value;
    let employeeIDValue = inputemployeeID.value;
    let totalAmountValue = inputtotalAmount.value;
    
    let data = {
        saleID: saleIDValue,
        date: dateValue,
        customerID: customerIDValue,
        employeeID: employeeIDValue,
        totalAmount: totalAmountValue,
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-sale-ajax", true);
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

function editSale(saleID) {
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('updateBody').style.display = 'block';
    // Populate Data
    fetch(`/get-sale/${saleID}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("updateFormTitle").innerText = `Edit Sale ${data.saleID} on ${data.date}.`;
            document.getElementById("input-saleID").value = saleID,
            document.getElementById("input-date").value = new Date(data.date).toISOString().slice(0, 16);
            document.getElementById("input-customerID").value = data.customerID || "";
            document.getElementById("input-employeeID").value = data.employeeID || "";
            document.getElementById("input-totalAmount").value = data.totalAmount || "";
        })
        .catch(error => console.error('Error fetching sale data:', error));
}
