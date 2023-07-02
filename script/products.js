function seeProducts(){
    let body=""
    for (let i = 0; i < 24; i++) {
        body+=`<div class="col-sm-6 col-md-4 col-lg-3 mx-1">
        <div class="card mt-3 " style="width: 18rem;">
            <img class="card-img-top" src="./img/plantilla.png" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk
                    of the card's content.</p>
                    <span class="badge rounded-pill bg-light text-dark">Premium</span>
        <h1 class="font-weight-bold mt-2">
          <small>$</small>4.99
        </h1>
                <a href="#" class="btn bg-success text-white">Add to cart</a>

                <button type="button" class="btn btn-block bg-info mb-3" data-bs-toggle="modal" data-bs-target="#modal-notification">Information</button>
                
            </div>
        </div>
    </div>`
        
    }
    document.getElementById("products").innerHTML=body
}
/*
<div class="col-md-4 mb-4">
    <div class="card card-pricing">
      <div class="card-header bg-gradient-dark text-center pt-4 pb-5 position-relative">
        <div class="z-index-1 position-relative">
          <h5 class="text-white">Company</h5>
          <h1 class="text-white mt-2 mb-0">
            <small>$</small>779</h1>
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
        <a href="javascript:;" class="btn bg-gradient-dark w-100 mt-4 mb-0">
          Get started
        </a>
      </div>
    </div>
*/