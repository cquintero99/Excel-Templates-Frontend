function seeProducts(){
    let body=""
    for (let i = 0; i < 24; i++) {
        body+=`<div class="col justify-content-center text-center">
        <div class="card mt-3 " style="width: 18rem;">
            <img class="card-img-top" src="./img/plantilla.png" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk
                    of the card's content.</p>
                <a href="#" class="btn bg-success text-white">Add to cart</a>
            </div>
        </div>
    </div>`
        
    }
    document.getElementById("products").innerHTML=body
}