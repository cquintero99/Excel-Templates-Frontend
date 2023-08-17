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

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", function () {
        const formFields = document.querySelectorAll(".form-control");

        let isValid = true;

        formFields.forEach(function (field) {
            if (!field.value) {
                isValid = false;
                field.classList.add("is-invalid");
            } else {
                field.classList.remove("is-invalid");
            }
        });

        if (isValid) {
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
        }
    });
});

summary()
function summary() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let precioTotal = 0;
    let body = "";
    listaProductosIndex()
        .then((response) => response.json())
        .then((productos) => {

            console.log(productos);
            if (carrito.length > 0) {
                for (let index = 0; index < carrito.length; index++) {
                    if (carrito[index].id == 0) {
                        precioTotal += Number(35.99);
                        body += `<li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
<div class="d-flex flex-column">
  <h6 class="mb-1 text-dark font-weight-bold text-sm">300 Excel Template</h6>
  <span class="text-xs">#MS-4150</span>
</div>
<div class="d-flex align-items-center text-sm">
  $35.99 
  <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i class="fa fa-file-excel-o text-lg me-1"></i> </button>
</div>
</li>`;
                    } else {
                        const productoSeleccionado = productos.find(
                            (producto) => producto.id === carrito[index].id
                        );
                        body += `<li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
<div class="d-flex flex-column">
  <h6 class="mb-1 text-dark font-weight-bold text-sm">${productoSeleccionado.titulo}</h6>
  <span class="text-xs">#MS-415${productoSeleccionado.id}</span>
</div>
<div class="d-flex align-items-center text-sm">
  $${productoSeleccionado.precioActual} 
  <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i class="fa fa-file-excel-o text-lg me-1"></i> </button>
</div>
</li>`;
                        precioTotal += Number(productoSeleccionado.precioActual);
                    }
                }
                document.getElementById("summary").innerHTML = body;
                document.getElementById("total").innerHTML = `<p>TOTAL: </p>
                <h5 class="text-end">$ ${precioTotal.toFixed(2)} USD</h5>`

            }
        })
        .catch((err) => {
            console.log(err);
        });
}
