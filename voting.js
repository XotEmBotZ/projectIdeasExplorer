// const jsonUrl = 'http://127.0.0.1:8000';

// async function fetchData() {
//     try {
//         const response = await fetch(jsonUrl);
//         const dataa = await response.text();
//         localStorage.setItem("dataRaw", dataa)
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }


if (!localStorage.getItem("numberOfVoters")){
    localStorage.setItem("numberOfVoters",0)
}


// fetchData();
let data = votingData

let iCount = 0
let problemTitle = document.getElementById("problemTitle")
let problemID = document.getElementById("problemId")
let problemTechnology = document.getElementById("problemTechnologyBucket")
let problemCatagory = document.getElementById("problemCategory")
let problemOrganization = document.getElementById("problemOrganization")
let problemDescription = document.getElementById("problemDescription")
let ytLink = document.getElementById("ytLink")
let datasetLink = document.getElementById("datasetLink")
let counter = document.getElementById("counter")
let totalCounts = document.getElementById("totalCounts")
let acceptance = document.getElementById("acceptance")
let suggestions = document.getElementById("suggestions")
let selectedViewer=document.getElementById("selected")
var uxObj = {}
let submitionCount=document.getElementById("submitionCount")
if (!localStorage.getItem("votedList")) {
    localStorage.setItem("votedList", JSON.stringify([]))
}

let votedList = JSON.parse(localStorage.getItem("votedList"))
votedList = new Set(votedList)

let voteYesBtn = document.getElementById("yes")
voteYesBtn.addEventListener("click", event => {
    voters=localStorage.setItem("numberOfVoters",localStorage.getItem("numberOfVoters")+1)
    if (!localStorage.getItem("votingData")){
        localStorage.setItem("votingData",JSON.stringify({}))
    }
    let votingData=JSON.parse(localStorage.getItem("votingData"))
    for (vote in uxObj){
        if (!votingData[vote]){
            votingData[vote]=0
        }
        if (uxObj[vote].acceptance){
            console.log("Updated",uxObj[vote].acceptance)
            votingData[vote]+=parseInt(uxObj[vote].acceptance)
        }
    }
    uxObj={}
    localStorage.setItem("uxObj",JSON.stringify({}))
    localStorage.setItem("votingData",JSON.stringify(votingData))
})

let voteNoBtn = document.getElementById("no")
voteNoBtn.addEventListener('click', event => {
    votedList.delete(problemID.innerText)   
    localStorage.setItem("votedList", JSON.stringify(Array.from(votedList)))
    update(iCount)
})
if (localStorage.getItem('uxObj')) {
    uxObj = JSON.parse(localStorage.getItem('uxObj'))
}

let saveUxObj = () => { localStorage.setItem('uxObj', JSON.stringify(uxObj)) }

acceptance.addEventListener('change', (event) => { uxObj[keys[iCount]].acceptance = acceptance.value; saveUxObj() })
suggestions.addEventListener('change', (event) => { uxObj[keys[iCount]].suggestions = suggestions.value; saveUxObj() })

totalCounts.innerText = Object.keys(data).length

let updateCounter = (index) => counter.innerText = index + 1

let keys = Object.keys(data);

let update = (index, id = null) => {
    if (index < 0) {
        iCount = 0
        index = 0
    }
    if (id) {
        problemObject = data[id]
        problemID.innerText = id
        iCount = keys.indexOf(id)
        updateCounter(keys.indexOf(id))
    } else {
        // console.log(data[index])
        problemObject = data[keys[index]]
        problemID.innerText = keys[index]
    }

    problemTitle.innerText = problemObject.title
    problemTechnology.innerText = problemObject.domainBucket
    problemCatagory.innerText = problemObject.category
    problemOrganization.innerText = problemObject.organization
    problemDescription.innerText = problemObject.description
    datasetLink.innerText = problemObject.datasetLink
    ytLink.innerText = problemObject.youtubeLink
    submitionCount.innerText=problemObject.submisions
    acceptance.value = null
    suggestions.value = null
    if (uxObj[keys[index]]) {
        acceptance.value = uxObj[keys[index]].acceptance
        suggestions.value = uxObj[keys[index]].suggestions
        console.log("Updated")
    } else {
        uxObj[keys[index]] = { "acceptance": null, "suggestions": null }
    }
    if (votedList.has(problemID.innerText)){
        selectedViewer.classList.remove("dNone")
    }else{
        selectedViewer.classList.add("dNone")
    }
    updateCounter(index)
}

let nextFunc = (event) => { iCount += 1; update(iCount) }
let prevFunc = (event) => { iCount -= 1; update(iCount) }

let prevBtn = document.getElementById("prev")
let nextBtn = document.getElementById("next")

prevBtn.addEventListener("click", prevFunc)
nextBtn.addEventListener("click", nextFunc)

// console.log(Object.keys(data[0]))
update(0)

let searchInput = document.getElementById("search")
searchInput.addEventListener("change", event => {
    if (data[searchInput.value]) {
        update(0, searchInput.value)
    }
})

