function deleteSale_Product(saleID, productID) {
    let data = {
        saleID: saleID,
        productID: productID
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-sale_product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(saleID, productID);
            window.location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}
  
function deleteRow(saleID, productID){
    let info = '${saleID}-${productID}';
    let row = document.querySelector(`tr[data-value='${info}']`);
    if (row) {
        row.parentNode.removeChild(row);
    }
        }