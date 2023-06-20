// Network request ---------------------------------
const ApiCode = "84ba17420ff44f2a81a2f715a8d77e9d";
const BaseUrl = `https://crudcrud.com/api/${ApiCode}/products/`;

// Load Data from API ===================================

axios
  .get(BaseUrl)
  .then((res) => {
    console.log("GET::", res.data);
    ShowProducts(res.data);
  })
  .catch((err) => console.error(err));

// ======================================================

let form = document.getElementById("AddProductForm");
let List = document.getElementById("List");
let F_List = document.getElementById("F_List");
let S_List = document.getElementById("S_List");

// ==============================================

// Add product to API event

form.addEventListener("submit", AddProduct);

// Delete Event
List.addEventListener("click", deleteItem);
F_List.addEventListener("click", deleteItem);
S_List.addEventListener("click", deleteItem);

// Add Product funct....

function AddProduct(e) {
  e.preventDefault();

  // get input values
  var productName = document.getElementById("ProdName").value;
  var productPrice = document.getElementById("ProdPrice").value;
  var ProdCategorie = document.getElementById("ProdCategorie").value;
  console.log("productName: ", productName);
  console.log("productPrice: ", productPrice);
  console.log("ProdCategorie: ", ProdCategorie);

  // Sending data to API -----------------------

  axios
    .post(BaseUrl, {
      productName: productName,
      productPrice: productPrice,
      ProdCategorie: ProdCategorie,
    })
    .then((res) => {
      console.log("res::", res);
      GetDataFromAPI();
    })
    .catch((err) => console.error(err));

  // Get Data from API ---------------------------------

  function GetDataFromAPI() {
    axios
      .get(BaseUrl)
      .then((res) => {
        console.log("GET::", res.data);
        ShowAddedProducts(res.data);
      })
      .catch((err) => console.error(err));
  }
}

// Show Product Function ----------------------------------

// ShowAddedProducts ============
function ShowAddedProducts(data) {
  let LastItem = [data[data.length - 1]];
  console.log("Last Index:", LastItem);
  ShowProducts(LastItem);
}

function ShowProducts(data) {
  data.forEach((product) => {
    let li = document.createElement("li");
    li.className = "list-group-item p-2";

    li.appendChild(document.createTextNode(`${product.productPrice} `));
    li.appendChild(document.createTextNode(`${product.productName} `));

    //   create Delete btn =================================

    let deleteBtn = document.createElement("delete");
    deleteBtn.className = "float-end btn bg-danger text-white delete";
    deleteBtn.appendChild(document.createTextNode("Delete"));
    li.appendChild(deleteBtn);

    //   create id btn =================================

    let UID = document.createElement("id");
    UID.className = "float-end btn bg-danger text-white";
    UID.style.display = "none";
    UID.appendChild(document.createTextNode(product._id));
    li.appendChild(UID);

    //   categorie id btn =================================

    let categorie = document.createElement("id");
    categorie.className = "float-end btn bg-danger text-white";
    categorie.style.display = "none";
    categorie.appendChild(document.createTextNode(product.ProdCategorie));
    li.appendChild(categorie);

    //  conditinal filter ===============================
    if (product.ProdCategorie === "Electronics") {
      List.appendChild(li);
    } else if (product.ProdCategorie === "Food") {
      F_List.appendChild(li);
    } else if (product.ProdCategorie === "SkinCare") {
      S_List.appendChild(li);
    }
  });
}

// delete function ===============================
// Delete Item ===============================

function deleteItem(e) {
  if (e.target.classList.contains("delete"))
    if (confirm("Are you sure you want to delete ?"))
      var li = e.target.parentElement;

  //   remove user from API

  axios
    .delete(`${BaseUrl}${li.childNodes[3].innerText}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  console.log(li.childNodes[3].innerText);

  let cate = li.childNodes[4].innerText;

  if (cate === "Electronics") {
    List.removeChild(li);
  } else if (cate === "Food") {
    F_List.removeChild(li);
  } else {
    S_List.removeChild(li);
  }

  //   removing item from local storage

  // localStorage.removeItem(li.childNodes[2].innerText);
}
