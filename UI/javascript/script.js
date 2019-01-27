/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function showMenu() {
  document.getElementById("menu").classList.toggle("show");
}
function showProfile() {
  document.getElementById("menu-profile").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('#dropdown-btn')) {
    document.getElementById("menu-profile").classList.remove("show");
  }
}


function confirmDeleteParty(){
  if (confirm('Are you sure you want to delete this party?')) {
    // Save it!
} else {
    // Do nothing!
}
}
function confirmDeleteOffice(){
  if (confirm('Are you sure you want to delete this office?')) {
    // Save it!
} else {
    // Do nothing!
}
}



// Get the modal
var modal_office = document.getElementById('runOffice');
var modal_candidates = document.getElementById('officeCandidates');
var modal_vote = document.getElementById('modal-vote');

// Get the button that opens the modal
var btn_office = document.getElementById("run-office");
var btn_candidate = document.getElementById("show-candidates");
var btn_vote = document.getElementById("vote");

// Get the <span> element that closes the modal
var close_office = document.getElementById("close-office");
var close_candidate = document.getElementById("close-candidates");
var close_vote = document.getElementById("close-vote");

// When the user clicks the button, open the modal_office 
btn_office.onclick = function() {
  modal_office.style.display = "block";
}
btn_candidate.onclick = function() {
  modal_candidates.style.display = "block";
}
btn_vote.onclick = function() {
  modal_vote.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close_office.onclick = function() {
  modal_office.style.display = "none";
}
close_candidate.onclick = function() {
  modal_candidates.style.display = "none";
}
close_vote.onclick = function() {
  modal_vote.style.display = "none";
}

// When the user clicks anywhere outside of the modal close it
window.onclick = function(event) {
  if (event.target == modal_office  ) {
    modal_office.style.display = "none";
  }
  if (event.target ==  modal_candidates) {
    modal_candidates.style.display = "none";
  }
  if (event.target ==  modal_vote) {
    modal_vote.style.display = "none";
  }
}
