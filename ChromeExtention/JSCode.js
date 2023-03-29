let myLinks = []
let oldLinks = []
let inputBTN = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const delEL = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))



if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

tabBtn.addEventListener("click", function(){

    //Grab URL of current tab!
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks) )
        render(myLinks)
    })


    myLinks.push(tabs[0].url)
    localStorage.setItem("myLinks",JSON.stringify(myLinks))
    render(myLinks)


    console.log(tabs[0].url)
    alert(tabs[0].url)
})



// Rendering the Links in the UL
function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}


inputBTN.addEventListener("click", function () {
    myLinks.push(inputEl.value)
    inputEl.value =""
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})



// Deleting the Links

delEL.addEventListener("dblclick", function() {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

