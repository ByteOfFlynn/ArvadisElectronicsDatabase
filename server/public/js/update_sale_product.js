let updateSale_ProductForm = document.getElementById('update-sale_product-form-ajax');

updateSale_ProductForm.addEventListener("submit", function (e) {
    e.preventDefault();
   
    let inputSaleID = document.getElementById("input-saleID");
    let inputProductID = document.getElementById("input-productID");
    let inputNewProductID = document.getElementById("input-newproductID");
    
    let saleIDValue = inputSaleID.value;
    let productIDValue = inputProductID.value;
    let newproductIDValue = inputNewProductID.value;
    
    let data = {
        saleID: saleIDValue,
        productID: productIDValue,
        newproductID: newproductIDValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-sale_product-ajax", true);
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

function editSale_Product(saleID, productID) {
    document.getElementById('mainBody').style.display = 'none';
    document.getElementById('updateBody').style.display = 'block';
    // Populate Data
    fetch(`/get-sale_product/${saleID}/${productID}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("updateFormTitle").innerText = `Edit Relationship Between ${data.saleID} and ${data.productID}.`;
            document.getElementById("input-saleID").value = saleID,
            document.getElementById("input-productID").value = productID,
            document.getElementById("input-newproductID").value = data.productID || "";
        })
        .catch(error => console.error('Error fetching sales_products data:', error));
}
