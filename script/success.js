function getURLParameters() {
    const params = {};
    const paramString = window.location.search.substring(1); // Remove the '?' from the search string
    if (paramString) {
        const paramPairs = paramString.split('&');
        for (const pair of paramPairs) {
            const [key, value] = pair.split('=');
            params[key] = value;
        }
    }
    return params;
}

const urlParams = getURLParameters();

async function succesPay(){
    const result=await fetch(urlBackend+"paypal/"+urlParams.paymentId+"/"+urlParams.PayerID+"/"+urlParams.token,{
        method:'GET',
        headers:{
            "Content-type":"application/json"
        }
    })
    return result
}
validarOrden()
function validarOrden(){
    succesPay()
    .then(response=>response.json())
    .then(data=>{
        if(data==true){
           cargarListaProductos()
        }else{
            alert("no found")
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

function cargarListaProductos() {
    activarSpinner()
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
                        <div class="col-xl-2"><img class="img-fluid" src="../../img/macro/product/300 Excel Template.JPG"></div>
                        <div class="col-xl-4">
                            
                            <div class="row"> 300 Excel Template </div>
                        </div>
                        
                        <div class="col-xl-3">$USD; 35.99  <span class="close" onclick="eliminarProductoCarrito(0)">&#10005;</span></div>
                        <div class="col-xl-3">
                      <i class="fa fa-cloud-download" aria-hidden="true"></i><span> Download</span>
                      </div>
                    </div>
                  </div>
                  
                  `;
                        } else {
                            const productoSeleccionado = productos.find(
                                (producto) => producto.id === carrito[index].id
                            );
                            console.log(productoSeleccionado)
                            precioTotal += Number(productoSeleccionado.precioActual);
                            body += `<div class="row border-top border-bottom p-3">
                  <div class="row main2 align-items-center " id="cargarProductos">
                      <div class="col-xl-2"><img class="img-fluid" src="../../img/macro/product/${productoSeleccionado.titulo}.JPG"></div>
                      <div class="col-xl-4">
                          
                          <div class="row">${productoSeleccionado.titulo} </div>
                      </div>
                      
                      <div class="col-xl-3">$USD; ${productoSeleccionado.precioActual}  <span class="close" onclick="eliminarProductoCarrito(${productoSeleccionado.id})">&#10005;</span></div>
                      <div class="col-xl-3" >
                   
                      <i class="fa fa-cloud-download" aria-hidden="true" type="button"  onclick="downloadFile(${productoSeleccionado.id})"><span> Download</span></i>
                    
                      </div>
                  </div>
                </div>
                
                `;
                        }
                    }

                    listaProductos.innerHTML = body;
                    
                }
            })
            .catch((err) => {
                console.log(err);
                desactivarSpinner()
            })
            .finally(final=>{
                desactivarSpinner()
            })
            
    } else {
        listaProductos.innerHTML = `<h3 class="text-center text-uppercase">empty </h3>`;
    }
}


function downloadFile(archivo){
    console.log(archivo)

}