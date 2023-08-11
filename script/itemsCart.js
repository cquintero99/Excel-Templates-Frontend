items()

function items(){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if(carrito.length>0){
        document.getElementById("items").innerHTML=`<span class="position-absolute rounded-circle bg-danger text-white "
        style="width: 20px; height: 20px; line-height: 20px; text-align: center;">
      ${carrito.length}
  </span>`
    }
}