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

