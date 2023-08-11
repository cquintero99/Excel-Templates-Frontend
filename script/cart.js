const productos = [
    { id: 1, name: "300 templete", precio: "53,00", items: 1 },
    { id: 2, name: "Supply Planning Excel Template", precio: "32,00", items: 1 },
    { id: 3, name: "Action Plan Excel Template", precio: "32,00", items: 1 },
    { id: 4, name: "Clinical Trial Budget Template", precio: "32,00", items: 1 }
  
  ]

  
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
  