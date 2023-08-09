const urlBackend = "http://localhost:8080/"
async function login(data) {
    const result = await fetch(urlBackend + 'user/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json ',
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store'
        },
        cache: 'no-store'
    })

    return result;
}
// Asegurarse de que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {

    // Obtener referencias a los elementos del formulario
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login");

    // Agregar un listener al botón para manejar el evento de envío del formulario
    loginButton.addEventListener("click", function(event) {
        event.preventDefault();  // Evitar el comportamiento por defecto del formulario
      activarSpinner()
        // Obtener los valores de los campos de entrada
        const email = emailInput.value;
        const password = passwordInput.value;

        // Crear un objeto con los datos del formulario
        const usuario = {
            email: email,
            password: password
        };
        console.log(usuario)
        // Aquí puedes realizar acciones con los datos, como enviarlos a través de una solicitud Fetch

        // Ejemplo de cómo mostrar los datos en la consola
        login(usuario)
        .then(response => response)
        .then(JWT => {
            
            if (JWT.status === 200 && JWT.headers.has('Authorization')) {
                const bearerToken = JWT.headers.get('Authorization');
                const token = bearerToken.replace('Bearer ', '');





                localStorage.setItem('token', token);
                localStorage.setItem("data", JSON.stringify(parseJwt(token)))

               window.location.href="admin/index.html"
              //alert("Bien")
            } else {
                alert("contraseña incorrecta")
            }
        })
        .catch(err=>{
          console.log(err)
          desactivarSpinner()
        })
        .finally(final=>{
          desactivarSpinner()
        })
    });
});


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function countdown() {
  var now = new Date();
  var endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  var timeLeft = endOfDay - now;

  var hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  var seconds = Math.floor((timeLeft / 1000) % 60);

  document.getElementById('countdown').innerHTML = hours + 'h : ' + minutes + 'm : ' + seconds + 's';

  setTimeout(countdown, 1000);
}

const productos = [
  { id: 1, name: "300 templete", precio: "53,00", items: 1 },
  { id: 2, name: "Supply Planning Excel Template", precio: "32,00", items: 1 },
  { id: 3, name: "Action Plan Excel Template", precio: "32,00", items: 1 },
  { id: 4, name: "Clinical Trial Budget Template", precio: "32,00", items: 1 }

]
// const carrito=document.getElementById("card")
// function obtenerNumeroProductosEnCarrito() {
//   const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//   return carrito.length;
// }
// numberProductos()
// function numberProductos(){
//   let n=obtenerNumeroProductosEnCarrito()
//   carrito.innerHTML=`<a href="./cart/index.html" type="button" class="btn btn-link  mx-2" >
//   <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor"
//       class="bi bi-cart-fill logos" viewBox="0 0 16 16">
//       <path
//           d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
//   </svg>
//   <span
//       class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
//       ${n}
//   </span>
// </a>`

// }

function agregarCarrito(id) {
  const productoSeleccionado = productos.find(producto => producto.id === id);

  if (!productoSeleccionado) {
    console.log('Producto no encontrado.');
    return;
  }

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const productoYaEnCarrito = carrito.find(producto => producto.id === id);
  if (productoYaEnCarrito) {
    console.log('Este producto ya está en el carrito.');
    return;
  }

  carrito.push(productoSeleccionado);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  console.log('Producto agregado al carrito:', productoSeleccionado);
}

const listaProductos = document.getElementById("listaProductos")
cargarListaProductos()
function cargarListaProductos() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let body = "";

  for (let index = 0; index < carrito.length; index++) {
    const productoSeleccionado = productos.find(producto => producto.id === carrito[index].id);
    body += `<div class="row border-top border-bottom">
    <div class="row main2 align-items-center " id="cargarProductos">
        <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/1GrakTl.jpg"></div>
        <div class="col">
            <div class="row text-muted">ID :${productoSeleccionado.id}</div>
            <div class="row">${productoSeleccionado.name} </div>
        </div>
        <div class="col">
            <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
        </div>
        <div class="col">$USD; ${productoSeleccionado.precio}  <span class="close">&#10005;</span></div>
    </div>
  </div>
  
  `

  }
  if(carrito.length>=1){
    
  listaProductos.innerHTML = body;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('banner-video');

  // Comprobar si el dispositivo es iOS
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Reproducir automáticamente el video si no es un dispositivo iOS
  if (!isIOS) {
    video.play();
  }

  // Mostrar la imagen de vista previa y permitir la reproducción en clic para dispositivos iOS
  video.addEventListener('click', function () {
    if (isIOS) {
      video.play();
    }
  });
});

const templete = document.getElementById("templete")

templete.addEventListener("click", () => {
  setTimeout(() => {

    window.location.href = "#list-product"
  }, 500)
})
function seeProducts() {
  let body = ""
  for (let i = 0; i < 24; i++) {
    body += `<div class="col-md-4 mb-4">
        <div class="card card-pricing">
          <div class="card-header bg-success text-center pt-4 pb-5 position-relative">
            <div class="z-index-1 position-relative">
              <h5 class="text-white">Template</h5>
              <h1 class="text-white mt-2 mb-0">
                <small>$</small>4.99</h1>
              <h6 class="text-white">per year</h6>
            </div>
          </div>
          <div class="position-relative mt-n5" style="height: 50px;">
            <div class="position-absolute w-100">
                <svg class="waves waves-sm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 40" preserveAspectRatio="none" shape-rendering="auto">
                  <defs>
                    <path id="card-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                  </defs>
                  <g class="moving-waves">
                    <use xlink:href="#card-wave" x="48" y="-1" fill="rgba(255,255,255,0.30"></use>
                    <use xlink:href="#card-wave" x="48" y="3" fill="rgba(255,255,255,0.35)"></use>
                    <use xlink:href="#card-wave" x="48" y="5" fill="rgba(255,255,255,0.25)"></use>
                    <use xlink:href="#card-wave" x="48" y="8" fill="rgba(255,255,255,0.20)"></use>
                    <use xlink:href="#card-wave" x="48" y="13" fill="rgba(255,255,255,0.15)"></use>
                    <use xlink:href="#card-wave" x="48" y="16" fill="rgba(255,255,255,0.99)"></use>
                  </g>
                </svg>
              </div>
          </div>
          <div class="card-body text-center">
            <ul class="list-unstyled max-width-200 mx-auto">
              <li>
                <b>10</b> Projects
                <hr class="horizontal dark">
              </li>
              <li>
                <b>1</b> Team Members
                <hr class="horizontal dark">
              </li>
              <li>
                <b>5</b> Personal Contacts
                <hr class="horizontal dark">
              </li>
              <li>
                <b>500</b> Messages
              </li>
            </ul>
            <a href="javascript:;" class="btn bg-success w-100 mt-4 mb-0 text-white">
              Get started
            </a>
               
          </div>
        </div>
      </div>`

  }
  document.getElementById("products").innerHTML = body
}



