import { SERVER_URL } from "../settings.js"
import { makeOptions } from "../fetchUtils.js"
import { encode } from "../utils.js"

const URL = SERVER_URL + "candidates"
let candidates = []
let currentSortDir = "desc"
export function setupCandidateHandlers(){
    document.getElementById("party-header").onclick = ()=> partySortTable(0)
}

export function allCandidates(){
    candidates = []
const options = makeOptions("GET",false,false)
    
    fetch(URL,makeOptions)
    .then(res => res.json())
    .then(data => {
        
        candidateList(data)
        console.log(candidates)
        const row = data.map(candidate =>
        createTableBody(data)
        )})

}

export function partySortTable(n){
    if(currentSortDir === "desc"){
        let filteredList = candidates.sort((a,b) => a.partyResponse.name > b.partyResponse.name ? 1: a.partyResponse.name < b.partyResponse.name ? -1: 0)
        createTableBody(filteredList) 
        currentSortDir = "asc"
    } else if (currentSortDir === "asc") {
        let filteredList = candidates.sort((a,b) => a.partyResponse.name < b.partyResponse.name ? 1: a.partyResponse.name > b.partyResponse.name ? -1: 0)
        createTableBody(filteredList) 
        currentSortDir = "desc"
    }
}

function createTableBody(data){
    const row = data.map(candidate => `
        <tr>
            <td scope="row">${encode(candidate.id)}</td>
            <td>${encode(candidate.name)}</td>
            <td>${encode(candidate.partyResponse.name)}</td>
            <td>${encode(candidate.partyResponse.letter)}</td>
        </tr>
        `).join("")
        document.getElementById("table-body-candidate").innerHTML = row
    }


function candidateList(data){
    for (let i = 0; i< data.length; i++){
        candidates.push(data[i])
    }
}
