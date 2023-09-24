const jsonUrl = './problemStatements.json';

async function fetchData() {
    try {
        const response = await fetch(jsonUrl);
        const dataa = await response.text();
        localStorage.setItem("data", dataa)
    } catch (error) {
        console.error('Error:', error);
    }
}


fetchData();
data = JSON.parse(localStorage.getItem("data"))

let iCount = 0
let problemTitle = document.getElementById("problemTitle")
let problemID = document.getElementById("problemId")
let problemTechnology = document.getElementById("problemTechnologyBucket")
let problemCatagory = document.getElementById("problemCategory")
let problemOrganization = document.getElementById("problemOrganization")
let problemDepartment = document.getElementById("problemDepartment")
let problemDescription = document.getElementById("problemDescription")
let counter = document.getElementById("counter")
let totalCounts = document.getElementById("totalCounts")
let acceptance = document.getElementById("acceptance")
let suggestions = document.getElementById("suggestions")
var uxObj = {}

if (localStorage.getItem('uxObj')) {
    uxObj = JSON.parse(localStorage.getItem('uxObj'))
}

let saveUxObj = () => { localStorage.setItem('uxObj', JSON.stringify(uxObj)) }

acceptance.addEventListener('change', (event) => { uxObj[iCount].acceptance = acceptance.value; saveUxObj() })
suggestions.addEventListener('change', (event) => { uxObj[iCount].suggestions = suggestions.value; saveUxObj() })

totalCounts.innerText = Object.keys(data).length

let updateCounter = (index) => counter.innerText = index + 1

let update = (index) => {
    if (index < 0) {
        iCount = 0
        index = 0
    }
    // console.log(data[index])
    problemObject = data[index]

    problemID.innerText = problemObject.ID
    problemTitle.innerText = problemObject.Title
    problemTechnology.innerText = problemObject["Technology Bucket"]
    problemCatagory.innerText = problemObject.Category
    problemOrganization.innerText = problemObject["Problem Creater's Organization"]
    problemDepartment.innerText = problemObject["Problem Creater's Department"]
    problemDescription.innerText = problemObject["Description"]

    acceptance.value = null
    suggestions.value = null
    if (uxObj[index]) {
        acceptance.value = uxObj[index].acceptance
        suggestions.value = uxObj[index].suggestions
        console.log("Updated")
    } else {
        uxObj[index] = { "acceptance": null, "suggestions": null }
    }
    updateCounter(index)
}

let nextFunc = (event) => { iCount += 1; update(iCount) }
let prevFunc = (event) => { iCount -= 1; update(iCount) }

let prevBtn = document.getElementById("prev")
let nextBtn = document.getElementById("next")

prevBtn.addEventListener("click", prevFunc)
nextBtn.addEventListener("click", nextFunc)

console.log(Object.keys(data[0]))
update(0)
console.log(data, prevBtn, nextBtn, problemCatagory, problemDepartment, problemID, problemOrganization, problemTechnology, problemTitle, counter, totalCounts)