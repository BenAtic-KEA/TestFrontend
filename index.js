import { renderTemplate, setActive, showPage } from './utils.js'
import {allCandidates, setupCandidateHandlers} from './js-for-pages/allCandidates.js'
import { candidates, editCandidateHandler } from './js-for-pages/editCandidate.js'

function renderMenuItems(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id
  renderTemplate(id) //This setups the HTML for the page
  switch (id) {
    //Here you can execute JavaScript for the selected page
    case 'page-all-candidates': {
      allCandidates()
      setupCandidateHandlers()
      break
    }
    case 'page-edit-candidate': {
      candidates()
      editCandidateHandler()
      break
    }
  }
}

document.getElementById('menu').onclick = renderMenuItems
showPage('page-all-candidates') //Set the default page to render
