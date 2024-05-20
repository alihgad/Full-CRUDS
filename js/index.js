var productName = document.getElementById("productName"),
    productPrice = document.getElementById("productPrice"),
    productCategory = document.getElementById("productCategory"),
    productDesc = document.getElementById("productDesc"),
    productsList = [];





async function getData() {
    fetch('https://api-cruds-git-master-alihgads-projects.vercel.app/items')
        .then(response => response.json())
        .then(json => {
            productsList = json.result
            console.log(json);
            ubdateTable(productsList)
        }).catch(err => console.log(err))


};
getData()





async function api(method, body) {
    fetch('https://api-cruds-git-master-alihgads-projects.vercel.app/items', {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => { 
            console.log(json) 
            getData()
        }
    ).catch(err => console.log(err));
        ;
}



async function addProduct() {
    if (nameValidate() && priceValidate() ) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDesc.value
        }



        api("POST", product)
        getData()
        clear()
    } else {
        alert("check product info")
    }
}

function clear() {
    productName.value = ""
    productPrice.value = ""
    productCategory.value = ""
    productDesc.value = ""
    productName.classList.remove("is-valid")
    productPrice.classList.remove("is-valid")
    productCategory.classList.remove("is-valid")
    productDesc.classList.remove("is-valid")
}


function ubdateTable(list) {
    var cartona = ""
    for (let i = 0; i < list?.length; i++) {
        cartona += `<tr>
    <td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].description}</td>
    <td><button class="btn btn-warning" onclick="editProduct(${i})">Update</button></td>
    <td><button class="btn btn-danger" onclick="deletProduct(${i})" >Delete</button></td>
  </tr>`
    }
    document.getElementById("tbody").innerHTML = cartona
}

function deletProduct(index) {
    let id = productsList[index].id
    api("DELETE", { id })
}

let updateId 
function editProduct(index) {
    productName.value = productsList[index].name
    productPrice.value = productsList[index].price
    productCategory.value = productsList[index].category
    productDesc.value = productsList[index].description
    
    updateId = productsList[index].id
    document.getElementById("addBtn").classList.replace("d-block", "d-none")
    document.getElementById("ubdateBtn").classList.replace("d-none", "d-block")
}


function updateProduct() {
    if (nameValidate() && priceValidate() ) {

        document.getElementById("addBtn").classList.replace("d-none", "d-block")
        document.getElementById("ubdateBtn").classList.replace("d-block", "d-none")
        let product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDesc.value,
            id: updateId
        }
        console.log(product);
        api('PUT',product)
        clear()
    
    }
}


function search(letter) {
    var founded = []
    for (let i = 0; i < productsList.length; i++) {
        if (productsList[i].name.toLowerCase().includes(letter.toLowerCase())) {
            founded.push(productsList[i])
        } else {
            continue
        }
    }
    if (founded.length) {
        ubdateTable(founded)
    } else {
        document.getElementById("tbody").innerHTML = `<tr><td colspan="7" class="text-center h1 text-danger">Not found</td></tr>`
    }


}



function nameValidate() {
    var regx = /^[A-Z].{3,15}$/

    if (regx.test(productName.value)) {
        productName.classList.replace("is-invalid", "is-valid")
        document.getElementById("nameHelper").classList.replace("d-block", "d-none")
        return true

    } else {
        productName.classList.add("is-invalid")
        document.getElementById("nameHelper").classList.replace("d-none", "d-block")
        return false

    }
}



function priceValidate() {
    if (/^([1-9][0-9]{3,4}|100000)$/.test(productPrice.value)) {
        productPrice.classList.replace("is-invalid", "is-valid")
        document.getElementById("priceHelper").classList.replace("d-block", "d-none")
        return true
    } else {
        productPrice.classList.add("is-invalid")
        document.getElementById("priceHelper").classList.replace("d-none", "d-block")
        return false

    }
}












