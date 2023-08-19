
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
document.addEventListener("DOMContentLoaded", function () {

  // Obtener referencias a los elementos del formulario
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login");

  // Agregar un listener al botón para manejar el evento de envío del formulario
  loginButton.addEventListener("click", function (event) {
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

          window.location.href = "admin/index.html"
          //alert("Bien")
        } else {
          alert("contraseña incorrecta")
        }
      })
      .catch(err => {
        console.log(err)
        desactivarSpinner()
      })
      .finally(final => {
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
function agregarCarrito300() {

  const product = {
    id:0,
    titulo: "300 Excel Template",
    descripcion: "300 Excel Template",
    precioActual: "35.99",
    precioAnterior: "49.00"
  }

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const productoYaEnCarrito = carrito.find(producto => producto.id === product.id);
  if (productoYaEnCarrito) {
    Toastify({
      text: "it's already in the cart.",
      className: "info",
      destination: "./cart/index.html",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
    return;
  }
  Toastify({
    text: " was added to your cart",
    className: "info",
    destination: "./cart/index.html",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();
  carrito.push(product);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  console.log('Producto agregado al carrito:', product);


}

// document.addEventListener('DOMContentLoaded', function () {
//   var video = document.getElementById('banner-video');

//   // Comprobar si el dispositivo es iOS
//   var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

//   // Reproducir automáticamente el video si no es un dispositivo iOS
//   if (!isIOS) {
//     video.play();
//   }

//   // Mostrar la imagen de vista previa y permitir la reproducción en clic para dispositivos iOS
//   video.addEventListener('click', function () {
//     if (isIOS) {
//       video.play();
//     }
//   });
// });

const templete = document.getElementById("templete")

templete.addEventListener("click", () => {
  setTimeout(() => {

    window.location.href = "#list-product"
  }, 500)
})




