

async function listaProductos() {
  const token = localStorage.getItem("token");
  const result = await fetch(urlBackend + "producto/all", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return result;
}
async function productById(id) {
  const token = localStorage.getItem("token");
  const result = await fetch(urlBackend + "producto/" + id + "/id", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return result;
}
async function saveProducto(body) {
  const token = localStorage.getItem("token");
  const result = await fetch(urlBackend + "producto/save", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return result;
}
async function updateProducto(product) {
  const token = localStorage.getItem("token");
  const result = await fetch(
    urlBackend + "producto/" + product.id + "/update",
    {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return result;
}
async function saveArchivoProducto(file) {
  const token = localStorage.getItem("token");
  const result = await fetch(urlBackend + "producto/upload/archivo", {
    method: "POST",
    body: file,
    headers: {
      Authorization: "Bearer " + token,
    },
    cache: "no-store",
  });
  return result;
}
async function deleteProductById(id) {
    const token = localStorage.getItem("token");
    const result = await fetch(urlBackend + "producto/" + id , {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return result;
  }

const dataTable = document.getElementById("dataTable");

//CARGO LA LISTA DE MACROS
async function cargarProductosTabla() {
  activarSpinner();
  //JSON.parse
  listaProductos()
    .then((response) => response.json())
    .then((data) => {
      let body2=""
      data.forEach((product) => {
        
      body2+=`
      <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                  <div class="d-flex flex-column">
                    <span class="mb-2 text-xs p-1">Title: <span class="text-dark font-weight-bold ms-sm-2">${product.titulo}</span></span>
                    <span class="mb-2 text-xs p-1">Description: <span
                        class="text-dark ms-sm-2 font-weight-bold">${product.descripcion}</span></span>

                    <span class="text-xs p-1">Precio Anterior: <span class="badge badge-sm bg-gradient-danger">${product.precioAnterior}</span></span>
                    <span class="text-xs p-1">Precio Actual: <span class="badge badge-sm bg-gradient-success">${product.precioActual}</span></span>
                    <span class="mb-2 text-xs p-1">File: <span
                    class="text-dark ms-sm-2 font-weight-bold">${product.archivo}</span></span>

                  </div>
                  <div class="ms-auto text-end">
                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;" onclick="deleteMacro(${product.id})"><i
                        class="far fa-trash-alt me-2"></i>Delete</a>
                    <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;" onclick="updateMacro(${product.id})" data-bs-toggle="modal"
                    data-bs-target="#modal-edit"><i
                        class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                  </div>
                </li>`
      });
      
      document.getElementById("listProduct").innerHTML=body2
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((final) => {
      desactivarSpinner();
    });
}
//CARGO LOS DATOS DE UNA MACRO EN EL MODAL EDIT
function updateMacro(product) {

  activarSpinner()
  sessionStorage.setItem("edit", product);
  productById(product)
    .then((response) => response.json())
    .then((data) => {
      let tituloInput = document.getElementById("tituloE");
      let descripcionTextarea = document.getElementById("descripcionE");
      let precioAnteriorInput = document.getElementById("precioAnteriorE");
      let precioActualInput = document.getElementById("precioActualE");
      tituloInput.value = data.titulo;
      descripcionTextarea.value = data.descripcion;
      precioActualInput.value = data.precioActual;
      precioAnteriorInput.value = data.precioAnterior;
      desactivarSpinner()
    })
    .catch((err) => {
        desactivarSpinner()
      console.log(err);
    })
    .finally((final) => {});
}
const editButton = document.getElementById("btnEdit");
//ACTUALIZO LA MACRO
// Agregar un listener al botón para manejar el evento de clic
editButton.addEventListener("click", function () {
    activarSpinner()
  let id = sessionStorage.getItem("edit");
  let tituloInput = document.getElementById("tituloE");
  let descripcionTextarea = document.getElementById("descripcionE");
  let precioAnteriorInput = document.getElementById("precioAnteriorE");
  let precioActualInput = document.getElementById("precioActualE");

  const product={
    id,
    titulo:tituloInput.value,
    descripcion:descripcionTextarea.value,
    precioAnterior:precioAnteriorInput.value,
    precioActual:precioActualInput.value
  }
  updateProducto(product)
  .then(response=>{
    if(response.ok){
        cargarProductosTabla()
        desactivarSpinner()
        cerrarModalEdit()
    }else{
        desactivarSpinner()
        console.log(response)
    }
  })
});

//DELETE MACRO
function deleteMacro(id){
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteProductById(id)
            .then(response=>{
                if(response.ok){
                    cargarProductosTabla()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                }else{
                    Swal.fire(
                        'Not Deleted!',
                        'Your file not has been deleted.',
                        'error'
                      )
                }
            })
          
        }
      })
}
function funcionesAdmin() {
  cargarProductosTabla();
}
function cerrarSesion() {
  localStorage.clear();
}
// GUARDO ARCHIVO ZIP Y PRODUCTO DE UNA MACRO
// Asegurarse de que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a los elementos del formulario
  const rememberMeCheckbox = document.getElementById("rememberMe");
  const tituloInput = document.getElementById("titulo");
  const descripcionTextarea = document.getElementById("descripcion");
  const precioAnteriorInput = document.getElementById("precioAnterior");
  const precioActualInput = document.getElementById("precioActual");
  const archivoInput = document.getElementById("archivo"); // Cambiado el ID a "archivo" para que sea único
  const registerButton = document.querySelector(".btn-round");

  // Agregar un listener al botón para manejar el evento de clic
  registerButton.addEventListener("click", function () {
    activarSpinner();
    // Obtener los valores de los elementos del formulario
    const rememberMe = rememberMeCheckbox.checked;
    const titulo = tituloInput.value;
    const descripcion = descripcionTextarea.value;
    const precioAnterior = precioAnteriorInput.value;
    const precioActual = precioActualInput.value;
    const archivo = archivoInput.files[0]; // Obtener el archivo seleccionado

    // Crear un objeto con los datos del formulario
    // Crear un objeto FormData
    const formDataFile = new FormData();

    // Agregar el archivo al objeto FormData con la clave "file"
    formDataFile.append("file", archivo);

    saveArchivoProducto(formDataFile)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const formData = {
          macro: rememberMe,
          titulo: titulo,
          descripcion: descripcion,
          precioAnterior: precioAnterior,
          precioActual: precioActual,
          archivo: data.nombre,
        };
        console.log(formData);
        saveProducto(formData)
          .then((response) => response.json())
          .then((data) => {
            cerrarModal();
            cargarProductosTabla();
          })
          .catch((err) => {
            console.log(err);
            desactivarSpinner();
          })
          .finally((finall) => {
            desactivarSpinner();
          });
      })
      .catch((err) => {
        console.log(err);
        desactivarSpinner();
      });

    // Aquí puedes realizar acciones con los datos, como enviarlos a través de una solicitud Fetch

    // Ejemplo de cómo mostrar los datos en la consola
  });
});

function cerrarModal() {
  var modal = document.getElementById("modal-form");
  var modalBootstrap = bootstrap.Modal.getInstance(modal);
  modalBootstrap.hide();
}
function cerrarModalEdit() {
    var modal = document.getElementById("modal-edit");
    var modalBootstrap = bootstrap.Modal.getInstance(modal);
    modalBootstrap.hide();
  }
  
