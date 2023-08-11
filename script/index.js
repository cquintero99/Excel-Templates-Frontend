
async function listaProductosIndex() {
    const result = await fetch(urlBackend + "producto", {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    });
    return result;
  }
  cargarMacros()
  function cargarMacros() {
    listaProductosIndex()
    .then(response=>response.json())
    .then(data=>{
      let body = ""
      console.log(data)
      data.map((product)=>{
        body += `<div class="col-md-4 mb-4">
        <div class="card card-pricing">
          <div class="card-header bg-success text-center pt-4 pb-5 position-relative">
            <div class="z-index-1 position-relative">
              <h5 class="text-white">EXCEL MACRO'S VISUAL BASIC</h5>
              <h6 class="text-danger text-decoration-line-through"><small>$</small>${product.precioAnterior} USD <small></h6>
           
              <h1 class="text-white mt-2 mb-0">
              $</small>${product.precioActual} USD</h1>

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
          <div class="card-body text-center align-items-center" style="max-height: 200px;">
            <ul class="list-unstyled  mx-auto" >
              <li  >
                <b class="h5">${product.titulo}</b> 
                <hr class="horizontal dark">
              </li>
              
            </ul>
            <a href="./macros/index.html?id=${product.id}&name=${product.titulo}" class="btn bg-success w-100 mt-4 mb-0 text-white">
            see details
            </a>
               
          </div>
        </div>
      </div>`
      })
      document.getElementById("macros").innerHTML = body
    })
    .catch(err=>{
      console.log(err)
    })
  }