import { SERVER_URL } from "../settings.js"
import { makeOptions } from "../fetchUtils.js"
import { encode, showPage } from "../utils.js"

const URL = SERVER_URL + "candidates"
let currentCandidate = {}

export function editCandidateHandler(){
    document.getElementById("candidate-selector").onchange = candidateInfo
    document.getElementById("edit-candidate-btn").onclick = editCandidate
    document.getElementById("delete-candidate-btn").onclick = deleteCandidate
}

export function candidates(){
    const options = makeOptions("GET",false)
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        currentCandidate.id = data[0].id
        const row = data.map(candidate => `
        <option value="${encode(candidate.id)}">${encode(candidate.name)} - ${encode(candidate.partyResponse.name)} - ${encode(candidate.partyResponse.letter)}
        `).join("")
        document.getElementById("candidate-selector").innerHTML = row
        editCandidateForm(data[0])
    })
}

function candidateInfo(evt){
    evt.preventDefault()
    let value = document.getElementById("candidate-selector").value
    fetch(URL + "/" + value)
    .then(res => res.json())
    .then(candidate => {
        currentCandidate.id = candidate.id
        currentCandidate.name = candidate.name
        currentCandidate.partyid = candidate.partyResponse.id
        console.log(currentCandidate)
        editCandidateForm(candidate)
    })

}

function editCandidateForm(candidate){
    const idRow = `
        <input id="input-id" class="form-control" value="${encode(candidate.id)} "readonly>`
        
        const nameRow = `
        <input id="input-name" class="form-control" placeholder="${encode(candidate.name)}" >`
        
        document.getElementById("candidate-id").innerHTML = idRow
        document.getElementById("candidate-name").innerHTML = nameRow
}

function editCandidate(){
    currentCandidate.name = document.getElementById("input-name").value
    const options = makeOptions("PUT",currentCandidate)
    console.log(currentCandidate)
    fetch(URL + "/" + currentCandidate.id,options)
    .then(res => res.json())
    location.reload()

}

function deleteCandidate(){
    const options = makeOptions("DELETE")
    fetch(URL + "/" + currentCandidate.id,options)
    .then(res => res.json())
location.reload()
}
