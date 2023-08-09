const urlBackend = "http://localhost:8080/"

async function listaProductos() {
    const token=localStorage.getItem("token")
    const result = await fetch(urlBackend + "producto/all", {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token

        }
    })
    return result;
}
async function saveProducto(body) {
    const token = localStorage.getItem("token")
    const result = await fetch(urlBackend + "producto/save", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    return result;
}
async function saveArchivoProducto(file) {
    const token = localStorage.getItem("token")
    const result = await fetch(urlBackend + "producto/upload/archivo", {
        method: 'POST',
        body: file,
        headers: {
            "Authorization": "Bearer " + token
        },
        cache: 'no-store'
    })
    return result;
}

const dataTable = document.getElementById("dataTable")

async function cargarProductosTabla() {
    activarSpinner()
    //JSON.parse
    listaProductos()
        .then(response => response.json())
        .then(data => {
            let body = ""
            data.forEach(product => {
                body += `<tr>
        <td>
          <div class="d-flex px-2 py-1">
            <div>
              <img src="#" class="avatar avatar-sm me-3" alt="user1">
            </div>
            <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm">${product.titulo}</h6>
            </div>
          </div>
        </td>
        <td>
          <p class="text-xs font-weight-bold mb-0">${product.descripcion}</p>
        </td>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-gradient-danger">${product.precioAnterior}</span>
        </td>
        <td class="align-middle text-center">
        <span class="badge badge-sm bg-gradient-success">${product.precioActual}</span>
        </td>
        <td class="align-middle">
          <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
            Edit
          </a>
        </td>
      </tr>`
            });
            dataTable.innerHTML = body;
        })
        .catch(err => {
            console.log(err)
        })
        .finally(final=>{
            desactivarSpinner()
        })


}

function funcionesAdmin() {
    cargarProductosTabla()
}
function cerrarSesion() {
    localStorage.clear()
}
// Asegurarse de que el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {

    // Obtener referencias a los elementos del formulario
    const rememberMeCheckbox = document.getElementById("rememberMe");
    const tituloInput = document.getElementById("titulo");
    const descripcionTextarea = document.getElementById("descripcion");
    const precioAnteriorInput = document.getElementById("precioAnterior");
    const precioActualInput = document.getElementById("precioActual");
    const archivoInput = document.getElementById("archivo");  // Cambiado el ID a "archivo" para que sea único
    const registerButton = document.querySelector(".btn-round");

    // Agregar un listener al botón para manejar el evento de clic
    registerButton.addEventListener("click", function () {
        activarSpinner()
        // Obtener los valores de los elementos del formulario
        const rememberMe = rememberMeCheckbox.checked;
        const titulo = tituloInput.value;
        const descripcion = descripcionTextarea.value;
        const precioAnterior = precioAnteriorInput.value;
        const precioActual = precioActualInput.value;
        const archivo = archivoInput.files[0];  // Obtener el archivo seleccionado
       
        // Crear un objeto con los datos del formulario
        // Crear un objeto FormData
        const formDataFile = new FormData();

        

        // Agregar el archivo al objeto FormData con la clave "file"
        formDataFile.append("file", archivo);

        saveArchivoProducto(formDataFile)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const formData = {
                    macro: rememberMe,
                    titulo: titulo,
                    descripcion: descripcion,
                    precioAnterior: precioAnterior,
                    precioActual: precioActual,
                    archivo: data.nombre
                };
                console.log(formData);
                saveProducto(formData)
                    .then(response => response.json())
                    .then(data => {
                        cerrarModal()
                        cargarProductosTabla()

                    })
                    .catch(err => {
                        console.log(err)
                        desactivarSpinner()
                    })
                    .finally(finall=>{
                        desactivarSpinner()
                    })
            })
            .catch(err => {
                console.log(err)
                desactivarSpinner()
            })


        // Aquí puedes realizar acciones con los datos, como enviarlos a través de una solicitud Fetch

        // Ejemplo de cómo mostrar los datos en la consola

    });
});




  function cerrarModal() {
    var modal = document.getElementById("modal-form");
    var modalBootstrap = bootstrap.Modal.getInstance(modal);
    modalBootstrap.hide();
  }