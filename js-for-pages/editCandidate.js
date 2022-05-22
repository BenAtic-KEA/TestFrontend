import { SERVER_URL } from "../settings.js"
import { makeOptions } from "../fetchUtils.js"
import { encode } from "../utils.js"

const URL = SERVER_URL + "candidates"
let candidate = {}
export function editCandidateHandler(){
    document.getElementById("candidate-selector").onchange = candidateInfo
}

export function candidates(){
    const options = makeOptions("GET",false)
    fetch(URL)
    .then(res => res.json())
    .then(data => {
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
        editCandidateForm(candidate)
    })

}

function editCandidateForm(candidate){
    const idRow = `
        <input class="form-control" value="${encode(candidate.id)} "readonly>`
        
        const nameRow = `
        <input class="form-control" placeholder="${encode(candidate.name)}" >`
        
        document.getElementById("candidate-id").innerHTML = idRow
        document.getElementById("candidate-name").innerHTML = nameRow
}
