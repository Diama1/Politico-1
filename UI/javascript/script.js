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
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("run-office");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
