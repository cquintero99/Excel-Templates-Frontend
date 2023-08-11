// const productos = [
//     { id: 1, name: "300 templete", precio: "53,00", items: 1 },
//     { id: 2, name: "Supply Planning Excel Template", precio: "32,00", items: 1 },
//     { id: 3, name: "Action Plan Excel Template", precio: "32,00", items: 1 },
//     { id: 4, name: "Clinical Trial Budget Template", precio: "32,00", items: 1 }

// ]


// }



const listaProductos = document.getElementById("listaProductos")
cargarListaProductos()
function cargarListaProductos() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let body = "";
    if (carrito.length >= 1) {
        console.log("hay productos")
        listaProductosIndex()
    .then(response=>response.json())
    .then(productos=>{
        console.log(productos)
        for (let index = 0; index < carrito.length; index++) {
            const productoSeleccionado = productos.find(producto => producto.id === carrito[index].id);
            body += `<div class="row border-top border-bottom p-3">
          <div class="row main2 align-items-center " id="cargarProductos">
              <div class="col-xl-2"><img class="img-fluid" src="../img/macro/product/${productoSeleccionado.titulo}.JPG"></div>
              <div class="col-xl-4">
                  
                  <div class="row">${productoSeleccionado.titulo} </div>
              </div>
              <div class="col-xl-3">
                  <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
              </div>
              <div class="col-xl-3">$USD; ${productoSeleccionado.precioActual}  <span class="close">&#10005;</span></div>
          </div>
        </div>
        
        `
    
        }
        listaProductos.innerHTML = body;
        
    })
    .catch(err=>{
        console.log(err)
    })
        
    }
    
    
}
