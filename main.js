let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
// get total
function getTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value
        total.innerHTML = result
        total.style.background = "blue"
        total.style.color = "white"
    } else {
        total.innerHTML = ""
        total.style.background = "wheat"
        total.style.color = "black"
    }
}

// create product
let dataPro
let mood = "create"
let tmp
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}
submit.addEventListener("click", () => {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != "" && price.value != "") {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro)
                }
            } else {
                dataPro.push(newPro)
            }
        } else {
            dataPro[tmp] = newPro
            mood = "create"
            submit.innerHTML = "Create"
            count.style.display = "block"
        }
        clearInputsData()
    }

    localStorage.setItem("product", JSON.stringify(dataPro))

    showData()
})
// clear inputs after added
function clearInputsData() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""
}
// read && add data to table on the page
function showData() {
    let table = ""
    for (let i = 0; i < dataPro.length; i++) {
        table += `       <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick ="deleteThisOne(${i})" id="delete">Delete</button></td>
                    </tr> 
                    
                    `
    }
    document.getElementById("tbody").innerHTML = table
    let btnDeleteAll = document.getElementById("deleteAll")
    if (dataPro.length > 0) {
        btnDeleteAll.innerHTML = `<button onclick ="deleteAll()"> Delete All(${dataPro.length}) </button>`
    } else {
        btnDeleteAll.innerHTML = ""
    }
}
showData()
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
//delete item
function deleteThisOne(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
//update data
function updateData(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display = "none"
    category.value = dataPro[i].category
    submit.innerHTML = "Update"
    mood = "Update"
    tmp = i
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
// search
let searchMood = "title"
function getSearchMood(id) {
    let search = document.getElementById("search")
    if (id === "searchTitle") {
        searchMood = "title"
    } else {
        searchMood = "category"
    }
    search.placeholder = "Search By " + searchMood
    search.focus()
    search.value = ""
    showData()
}

function searchData(value) {
    let table = ""
    if (searchMood == "title") {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                     <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick ="deleteThisOne(${i})" id="delete">Delete</button></td>
                     </tr> 
                    
                       `
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                     <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick ="deleteThisOne(${i})" id="delete">Delete</button></td>
                     </tr> 
                    
                       `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table
}
// clean data
