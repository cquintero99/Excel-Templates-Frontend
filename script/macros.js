const urlBackend = "http://localhost:8080/";

async function listaProductosIndex() {
  const result = await fetch(urlBackend + "producto", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return result;
}
// Obtener la URL actual del navegador
var urlActual = window.location.href;

// Crear un objeto URL para analizar la URL
var url = new URL(urlActual);

// Obtener el valor del parámetro "id"
var id = url.searchParams.get("id");
listaMacros();
// Mostrar el valor del id en la consola

const imagenMacro = document.getElementById("imagenMacro");

function listaMacros() {
  if(id!=null){
    listaProductosIndex()
    .then((res) => res.json())
    .then((data) => {
      let body = "";

      data.map((product) => {
        if (product.id == id) {
          console.log(product);
          imagenMacro.innerHTML = `<img class="img-fluid" src="../img/macro/product/${product.titulo}.JPG"
                alt="">`;

          body = `<div class=" text-left">
                <div class="p-md-0 pt-3">
                  <h5 class="font-weight-bolder mb-0 ">${product.titulo}</h5>
                  <p class="text-uppercase text-sm font-weight-bold mb-2">visual basic excel</p>
                </div>
               
               <p class="mb-4 text-justify">${product.descripcion}</p>
               <div class="text-center">
               <h6 class="text-center text-danger text-decoration-line-through"><small>$</small>${product.precioAnterior} USD <small></h6>
          
               <h3 class="text-success  mt-2 mb-0">
             $</small>${product.precioActual} USD</h3>
               <button class="btn btn-success " onclick="agregarCarrito(${product.id})"><span>add cart</span> <i class="ni ni-cart"></i></button>
               </div>
                <button type="button" class="btn btn-facebook btn-simple btn-lg mb-0 pe-3 ps-2">
                  <i class="fab fa-facebook" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-twitter btn-simple btn-lg mb-0 px-2">
                  <i class="fab fa-twitter" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-instagram btn-simple btn-lg mb-0 px-2">
                  <i class="fab fa-instagram text-danger" aria-hidden="true"></i>
                </button>
              </div>`;
        }
      });

      document.getElementById("macro").innerHTML = body;
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
}
function agregarCarrito(id) {
  listaProductosIndex()
      .then(response => response.json())
      .then(productos => {
          console.log(productos)
          const productoSeleccionado = productos.find(producto => producto.id === id);

          if (!productoSeleccionado) {
              console.log('Producto no encontrado.');
              return;
          }
          let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

          const productoYaEnCarrito = carrito.find(producto => producto.id === id);
          if (productoYaEnCarrito) {
              Toastify({
                text: "it's already in the cart.",
                className: "info",
                destination: "../cart/index.html",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
              return;
          }
          
          Toastify({
            text: " was added to your cart",
            className: "info",
            destination: "../cart/index.html",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
          carrito.push(productoSeleccionado);
          localStorage.setItem('carrito', JSON.stringify(carrito));
          items()
      })
      .catch(err => {
          console.log(err)
      })


 
}
function countdown() {
  var now = new Date();
  var endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  );
  var timeLeft = endOfDay - now;

  var hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  var seconds = Math.floor((timeLeft / 1000) % 60);

  document.getElementById("countdown").innerHTML =
    hours + "h : " + minutes + "m : " + seconds + "s";

  setTimeout(countdown, 1000);
}
