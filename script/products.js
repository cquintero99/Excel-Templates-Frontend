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


document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('banner-video');

  // Comprobar si el dispositivo es iOS
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Reproducir automáticamente el video si no es un dispositivo iOS
  if (!isIOS) {
      video.play();
  }

  // Mostrar la imagen de vista previa y permitir la reproducción en clic para dispositivos iOS
  video.addEventListener('click', function () {
      if (isIOS) {
          video.play();
      }
  });
});

const templete= document.getElementById("templete")

templete.addEventListener("click",()=>{
  setTimeout(()=>{
    
  window.location.href="#list-product"
  },500)
})
function seeProducts(){
    let body=""
    for (let i = 0; i < 24; i++) {
        body+=`<div class="col-md-4 mb-4">
        <div class="card card-pricing">
          <div class="card-header bg-success text-center pt-4 pb-5 position-relative">
            <div class="z-index-1 position-relative">
              <h5 class="text-white">Template</h5>
              <h1 class="text-white mt-2 mb-0">
                <small>$</small>4.99</h1>
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
            <a href="javascript:;" class="btn bg-success w-100 mt-4 mb-0 text-white">
              Get started
            </a>
               
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