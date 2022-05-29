
let wishCount = document.getElementById('wishCount');
let page = 1;

if(wishCount){
    loadProducts(page)
}

let wishlist
let wishlistStr = localStorage.getItem('wishlist');

if(wishlistStr)
    wishlist = JSON.parse(wishlistStr);
else
    wishlist = []

if(wishCount)
    wishCount.innerText = wishlist.length;


    let loadBtn = document.getElementById('loadBtn');
    if(loadBtn){
        document.getElementById('loadBtn').addEventListener('click', function (e) {
            page++;
            loadProducts(page)
        })
    }

function loadProducts(page) {
    fetch(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`)
        .then(response => response.json())
        .then(data => {

            let itemsBox = document.getElementById('items');
            data.products.forEach(element => {

                let isAdded = wishlist.some(x=>x==element.id);

                let card = `
                <div class="col-md-4">
                <div class="card" style="width: 20rem" data-id="${element.id}">
                    <img src="${element.images[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${element.title} - ${element.price}</h5>
                    <p class="card-text">${element.description}</p>
                      <a href="#" class="btn btn-primary">Add to Bookmark</a>     
                    </div>
                  </div>
                </div>`
                itemsBox.innerHTML+=card;
            })
        }).then(()=>{
            document.querySelectorAll('.btn').forEach(elem=>{
                elem.addEventListener('click',function(e){
                    let id = this.parentNode.parentNode.getAttribute('data-id');     
                        wishlist.push(id);
                                      
                    wishCount.innerText = wishlist.length;
                    localStorage.setItem('wishlist',JSON.stringify(wishlist));
                })
            })
        })

}