// const productos = [
//     { id: 1, name: "300 templete", precio: "53,00", items: 1 },
//     { id: 2, name: "Supply Planning Excel Template", precio: "32,00", items: 1 },
//     { id: 3, name: "Action Plan Excel Template", precio: "32,00", items: 1 },
//     { id: 4, name: "Clinical Trial Budget Template", precio: "32,00", items: 1 }

// ]

// }

const listaProductos = document.getElementById("listaProductos");
cargarListaProductos();
var numeroItems = document.getElementById("numeroItems");

function cargarListaProductos() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let body = "";
    if (carrito.length >= 1) {
        console.log("hay productos");
        let precioTotal = 0;
        listaProductosIndex()
            .then((response) => response.json())
            .then((productos) => {
                console.log(productos);
                if (carrito.length > 0) {
                    for (let index = 0; index < carrito.length; index++) {
                        if (carrito[index].id == 0) {
                            precioTotal += Number(35.99);
                            body += `<div class="row border-top border-bottom p-3" id="phones">
                    <div class="row main2 align-items-center " id="cargarProductos">
                        <div class="col-xl-2"><img class="img-fluid" src="../img/macro/product/300 Excel Template.JPG"></div>
                        <div class="col-xl-4">
                            
                            <div class="row"> 300 Excel Template </div>
                        </div>
                        <div class="col-xl-3">
                            <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                        </div>
                        <div class="col-xl-3">$USD; 35.99  <span class="close" onclick="eliminarProductoCarrito(0)">&#10005;</span></div>
                    </div>
                  </div>
                  
                  `;
                        } else {
                            const productoSeleccionado = productos.find(
                                (producto) => producto.id === carrito[index].id
                            );
                            precioTotal += Number(productoSeleccionado.precioActual);
                            body += `<div class="row border-top border-bottom p-3">
                  <div class="row main2 align-items-center " id="cargarProductos">
                      <div class="col-xl-2"><img class="img-fluid" src="../img/macro/product/${productoSeleccionado.titulo}.JPG"></div>
                      <div class="col-xl-4">
                          
                          <div class="row">${productoSeleccionado.titulo} </div>
                      </div>
                      <div class="col-xl-3">
                          <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                      </div>
                      <div class="col-xl-3">$USD; ${productoSeleccionado.precioActual}  <span class="close" onclick="eliminarProductoCarrito(${productoSeleccionado.id})">&#10005;</span></div>
                  </div>
                </div>
                
                `;
                        }
                    }

                    listaProductos.innerHTML = body;
                    numeroItems.innerHTML = `
                    <div class="col" style="padding-left:0;">ITEMS : <small  class="h6">${carrito.length
                        }</small></div>
                        <div class="col text-right" >$ <small class="h6" id="total2">${precioTotal.toFixed(
                            2
                        )} USD</small></div>
                   `;
                    document.getElementById("total").innerHTML = `
                    <div class="col h6">TOTAL PRICE</div>
                        <div class="col text-right"  >
                        <small class="h5" >$ ${precioTotal.toFixed(2)} USD</small>
                         </div>`;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        listaProductos.innerHTML = `<h3 class="text-center text-uppercase">empty cart</h3>`;
    }
}

function eliminarProductoCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoIndex = carrito.findIndex((producto) => producto.id === id);
    if (productoIndex === -1) {
        console.log("Producto no encontrado en el carrito.");
        return;
    }

    carrito.splice(productoIndex, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarListaProductos();
    items();
    Toastify({
        text: "remove  from cart.",
        className: "info",
        style: {
            background: "linear-gradient(to right, #ff0000, #ff9999)",
        },
    }).showToast();
}


async function payPaypal(order) {
    const resul = await fetch(urlBackend + "pay", {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            "Content-type": "application/json"
        }
    })
    return resul;
}
const checkout = document.getElementById("checkout")
checkout.addEventListener("click", () => {
    activarSpinner()
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let precioTotal = 0;
    listaProductosIndex()
        .then((response) => response.json())
        .then((productos) => {
            console.log(productos);
            if (carrito.length > 0) {
                for (let index = 0; index < carrito.length; index++) {
                    if (carrito[index].id == 0) {
                        precioTotal += Number(35.99);

                    } else {
                        const productoSeleccionado = productos.find(
                            (producto) => producto.id === carrito[index].id
                        );
                        precioTotal += Number(productoSeleccionado.precioActual);

                    }
                }
                console.log(precioTotal)
                const order = {
                    price:precioTotal.toFixed(2),
                    currency:"USD",
                    method:"paypal",
                    intent:"sale",
                    description:"excel specialit order price"
                }
                payPaypal(order)
                .then(response=>response.text())
                .then(data=>{
                    desactivarSpinner()
                    console.log(data)
                    window.location.href=data
                })
                .catch(err=>{
                    console.log(err)
                    desactivarSpinner()
                })


            }
        })
        .catch((err) => {
            desactivarSpinner()
            console.log(err);
        });

})
