function activarSpinner() {
    var spinnerDiv = document.getElementById("spinner");
    spinnerDiv.classList.remove("d-none");
  }
  
  function desactivarSpinner() {
    var spinnerDiv = document.getElementById("spinner");
    spinnerDiv.classList.add("d-none");
  }