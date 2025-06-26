let updateCustomerForm = document.getElementById('update-customer-form-ajax');


updateCustomerForm.addEventListener("submit", function (e) {
    e.preventDefault();
   
    let inputCustomer = document.getElementById("input-customerID");
    let inputName = document.getElementById("input-name");
    let inputEmail = document.getElementById("input-email");
    let inputContactNumber = document.getElementById("input-contactNumber");
    let inputAddress = document.getElementById("input-address");
    
    let customerIDValue = inputCustomer.value;
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let contactNumberValue = inputContactNumber.value;
    let addressValue = inputAddress.value;
    
    let data = {
        customerID: customerIDValue,
        name: nameValue,
        email: emailValue,
        contactNumber: contactNumberValue,
        address: addressValue,
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-customer-ajax", true);
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

function editCustomer(customerID) {
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('updateBody').style.display = 'block';
    // Populate Data
    fetch(`/get-customer/${customerID}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("updateFormTitle").innerText = `Edit ${data.customerID} - ${data.name}'s Information!`;
            document.getElementById("input-customerID").value = customerID,
            document.getElementById("input-name").value = data.name || "";
            document.getElementById("input-email").value = data.email || "";
            document.getElementById("input-contactNumber").value = data.contactNumber || "";
            document.getElementById("input-address").value = data.address || "";
        })
        .catch(error => console.error('Error fetching customer data:', error));
}

