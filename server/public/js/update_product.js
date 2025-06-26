let updateProductForm = document.getElementById('update-product-form-ajax');

updateProductForm.addEventListener("submit", function (e) {
    e.preventDefault();
   
    let inputProduct = document.getElementById("input-productID");
    let inputName = document.getElementById("input-name");
    let inputType = document.getElementById("input-type");
    let inputPrice = document.getElementById("input-price");
    let inputDescription = document.getElementById("input-description");
    let inputquantityAvailable = document.getElementById("input-quantityAvailable");
    
    let productIDValue = inputProduct.value;
    let nameValue = inputName.value;
    let typeValue = inputType.value;
    let priceValue = inputPrice.value;
    let descriptionValue = inputDescription.value;
    let quantityAvailableValue = inputquantityAvailable.value;
    
    let data = {
        productID: productIDValue,
        name: nameValue,
        type: typeValue,
        price: priceValue,
        description: descriptionValue,
        quantityAvailable: quantityAvailableValue,
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-product-ajax", true);
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

function editProduct(productID) {
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('updateBody').style.display = 'block';
    // Populate Data
    fetch(`/get-product/${productID}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("updateFormTitle").innerText = `Edit Information for ${data.productID} - ${data.name}.`;
            document.getElementById("input-productID").value = productID,
            document.getElementById("input-name").value = data.name || "";
            document.getElementById("input-type").value = data.type || "";
            document.getElementById("input-price").value = data.price || "";
            document.getElementById("input-description").value = data.description || "";
            document.getElementById("input-quantityAvailable").value = data.quantityAvailable || "";
        })
        .catch(error => console.error('Error fetching product data:', error));
}
