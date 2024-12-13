// even if thre is only one element and the length is 1, it is still an HTML collection
const parentTBody = document.getElementsByTagName("tbody")[0];

// querySelectorAll returns a node list, which does not upate when a new node is created so must use an HTML collection instead
// const deleteButtons = document.querySelectorAll(".product button");

// const deleteButtons = parentTBody.getElementsByTagName("button");
// must convert HTML collection to an array before doing.forEach(), but still does not work because delete buttons are being attached only to the initial buttons and not the new ones
// Array.from(deleteButtons).forEach(button => {
//     button.addEventListener("click", () => {
//         const productTr = button.parentNode.parentNode;
//         productTr.remove();
//     });
// });

// instead use event delegation
parentTBody.addEventListener("click", (e) => {
    // e.target --> <button>Delete</button>
    // e.target.tagName will always return the tag in all caps
    if (e.target.tagName.toLowerCase() === "button") {
        // find the closest <tr> ancestor, which is the <tr> for the product row
        const productTr = e.target.closest('tr');
        productTr.remove();
    }
});

const addNewButton = document.getElementById("button-add-new");
addNewButton.addEventListener("click", (e) => {
    e.preventDefault();

    const productName = document.getElementById("input-product-name").value;
    if (!productName) {
        alert("Product name is required");
        return;
    }
    const productNameTd = document.createElement("td");
    productNameTd.innerText = productName;

    const productCategory = document.getElementById("input-product-category").value;
    if (!productCategory) {
        alert("Product category is required");
        return;
    }
    const productCategoryTd = document.createElement("td");
    productCategoryTd.innerText = productCategory;

    const productPrice = document.getElementById("input-product-price").value;
    if (!productPrice) {
        alert("Product price is required");
        return;
    }
    const productPriceTd = document.createElement("td");
    productPriceTd.innerText = `$${productPrice}`

    const deleteButton = document.createElement("button");
    const deleteButtonTd = document.createElement("td");
    deleteButton.innerText = "Delete";
    deleteButtonTd.appendChild(deleteButton);

    const newProductRow = document.createElement("tr");
    newProductRow.append(productNameTd, productCategoryTd, productPriceTd, deleteButtonTd);
    parentTBody.appendChild(newProductRow);

    document.getElementById("input-product-name").value = ""
    document.getElementById("input-product-category").value = ""
    document.getElementById("input-product-price").value = ""
});
