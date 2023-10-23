class Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;

  constructor(
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: Rating
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
    this.rating = new Rating(rating.rate, rating.count);
  }
}
class Rating {
  rate: number;
  count: number;
  constructor(rate: number, count: number) {
    this.rate = rate;
    this.count = count;
  }
}

function fetchData(category: string) {
  const apiUrl = category === 'home' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((json: Product[]) => {
      const categoryItems = json;
      console.log(categoryItems);
      displayProducts(categoryItems, category);
    });
}

function fetchAndSortByPrice(category: string, sort: string) {
  const apiUrl = category === 'home' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((json: Product[]) => {
      const categoryItems = json;
      console.log(categoryItems);
      if (sort === 'low-high') {
        categoryItems.sort((a, b) => a.price - b.price);
      } else if (sort === 'high-low') {
        categoryItems.sort((a, b) => b.price - a.price);
      }
      displayProducts(categoryItems, category);
    });
}

function fetchAndSortByRating(category: string, sort: string) {
  const apiUrl = category === 'home' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((json: Product[]) => {
      const categoryItems = json;
      console.log(categoryItems);
      if (sort === 'high-low') {
        categoryItems.sort((a, b) => b.rating.rate - a.rating.rate);
      } else if (sort === 'low-high') {
        categoryItems.sort((a, b) => a.rating.rate - b.rating.rate);
      }
      displayProducts(categoryItems, category);
    });
}

function fetchAndFilterByRating(category: string, filter: number) {
  const apiUrl = category === 'home' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((json: Product[]) => {
      const categoryItems = json.filter((item) => item.rating.rate > filter);
      displayProducts(categoryItems, category);
    });
}

let singleCard: string;
let topCarousel: string;
let categoryHeading: string
function displayProducts(products: Product[], category:string) {
  if(category=='home'){
    topCarousel=`
    <div id="carouselExampleIndicators" class="carousel slide mb-2" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="https://sslimages.shoppersstop.com/sys-master/root/hed/h71/30648821383198/Shoppers-Stop-Selects-Web-life-_-stop_120823.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="https://sslimages.shoppersstop.com/sys-master/root/hd6/hda/30648822300702/Shoppers-Stop-Selects-Web-fratini-_-bandeya-mens_120823.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="https://sslimages.shoppersstop.com/sys-master/root/h5f/h32/30440577925150/And--carousel-Web_mega%20sale_2023.jpg"
           alt="Third slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    `
    let topContainer = document.querySelector("#topContainer") as HTMLElement;
    topContainer.innerHTML=topCarousel;
  }

  let Heading = `
  <h1 class="category_name pl-5 pb-2 text-align-center">${category}</h1>
  <h4 class="d-inline"> Sort by:</h3>
  <button class="btn btn-warning" id="sortByPriceLow">Low to High price</button>
  <button class="btn btn-warning" id="sortByPriceHigh">High to Low price</button>
  <button class="btn btn-warning " id="sortByRatingLow">Low to High rating</button>
  <button class="btn btn-warning" id="sortByRatingHigh">High to Low rating</button>
  <br>
  <h4 class="d-inline"> Filter by:</h3>
  <button class="btn btn-warning" id="filterBy4">&gt; 4<i class="bi bi-star"></i></button>
  <button class="btn btn-warning" id="filterBy3">&gt; 3<i class="bi bi-star"></i></button>
  <button class="btn btn-warning " id="filterBy2">&gt; 2<i class="bi bi-star"></i></button>
  
`;

  let topContainer = document.querySelector("#topContainer") as HTMLElement;
  if (topContainer) {
    topContainer.innerHTML+=Heading;
    const sortPriceLow = document.querySelector( "#sortByPriceLow") as HTMLElement;
      sortPriceLow.addEventListener("click", (e) => {
        let container = document.querySelector("#container") as HTMLElement;
        topContainer.innerHTML="";
        container.innerHTML = "";
        fetchAndSortByPrice(category,"low-high");
        console.log("low-high price");
      });
      const sortPriceHigh = document.querySelector( "#sortByPriceHigh") as HTMLElement;
      sortPriceHigh.addEventListener("click", (e) => {
        let container = document.querySelector("#container") as HTMLElement;
        topContainer.innerHTML="";
        container.innerHTML = "";
        fetchAndSortByPrice(category,"high-low");
        console.log("high-low price");
      });
      const sortRatingLow = document.querySelector( "#sortByRatingLow") as HTMLElement;
      sortRatingLow.addEventListener("click", (e) => {
        let container = document.querySelector("#container") as HTMLElement;
        topContainer.innerHTML="";
        container.innerHTML = "";
        fetchAndSortByRating(category,"low-high");
        console.log("low-high rating");
      });
      const sortRatingHigh = document.querySelector( "#sortByRatingHigh") as HTMLElement;
      sortRatingHigh.addEventListener("click", (e) => {
        let container = document.querySelector("#container") as HTMLElement;
        topContainer.innerHTML="";
        container.innerHTML = "";
        fetchAndSortByRating(category,"high-low");
        console.log("high-low rating");
      });
      const filterRating4 = document.querySelector( "#filterBy4") as HTMLElement;
      filterRating4.addEventListener("click", (e) => {
        let container = document.querySelector("#container") as HTMLElement;
        topContainer.innerHTML="";
        container.innerHTML = "";
        fetchAndFilterByRating(category,4);
        console.log("4 filter rating");
      });
      const filterRating3 = document.querySelector( "#filterBy3") as HTMLElement;
      filterRating3.addEventListener("click", (e) => {
        let container = document.querySelector("#container") as HTMLElement;
        topContainer.innerHTML="";
        container.innerHTML = "";
        fetchAndFilterByRating(category,3);
        console.log("3 filter rating");
      });
      const filterRating2 = document.querySelector( "#filterBy2") as HTMLElement;
      filterRating2.addEventListener("click", (e) => {
        let container = document.querySelector("#container") as HTMLElement;
        topContainer.innerHTML="";
        container.innerHTML = "";
        fetchAndFilterByRating(category,2);
        console.log("2 filter rating");
      });


  }

  products.forEach((element) => {
    singleCard = `
        <div class="product-card d-flex flex-column bg-white" style="width:15rem; height:27rem; padding:10px;">
            <img src="${element.image}" width="100%" style="height:200px;">
            <h4 id="pdtitle" style="font-size:15px;">${element.title.slice(0,40)}${element.title.length > 40 ? "..." : ""}</h4>
            <div class="d-flex flex-column justify-content:space-between sm">
                <p>Price: ${element.price} Dollars<br>
                Rating: ${element.rating.rate}<br>(${element.rating.count} ratings)</p>
                <button class="btn btn-primary p-1 mb-1 text-white" id="button${
                  element.id
                }">View product</button>
                <button class="btn btn-warning p-1" id="cartbtn${element.id}">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font 
                Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License 
                - https://fontawesome.com/license (Commercial License) Copyright 2023 
                Fonticons, Inc. --><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 
                32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 
                28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-
                34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128
                464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                  Add to Cart</button>
            </div>
        </div>`;
    let forEachCard = document.createElement("div") as HTMLDivElement;
    let container = document.querySelector("#container");
    forEachCard.classList.add("border");
    if (container) {
      forEachCard.innerHTML = singleCard;
      container.append(forEachCard);
      const viewprod = document.querySelector( `#button${element.id}`) as HTMLElement;
      viewprod.addEventListener("click", (e) => {
        console.log(`product ${element.id} clicked`);
        let container = document.querySelector("#container") as HTMLElement;
        container.innerHTML = "";
        prodDesc(element.id);
      });

      const addprod = document.querySelector( `#cartbtn${element.id}`) as HTMLElement;
      addprod.addEventListener("click", (e) => {
         addToCart(element);
        console.log(`Product ${element.id} added to cart`);
      });
    }
  });
}

function prodDesc(idx: number) {
  let topContainer = document.querySelector("#topContainer") as HTMLElement;
  topContainer.innerHTML = "";
  fetch(`https://fakestoreapi.com/products/${idx}`)
    .then((res) => res.json())
    .then((product: Product) => {
      let productHTML = `
      <div class="row d-flex align-items-center justify-content-center">
    <div class="col-sm-11">
      <div class="card m-5">
        <div class="row card-body">
          <img class="col-sm-4" src="${product.image}" width="10vw" height="300vh" alt="sans" />
          <div class="col-sm-8">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Rating: ${product.rating.rate} (${product.rating.count} ratings)</p>
            <p class="card-text">Price: ${product.price} Dollars</p>
            <p class="card-text">Description: ${product.description}</p>
            <button class="btn btn-warning" id="cartbtn${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License 
                - https://fontawesome.com/license (Commercial License) Copyright 2023 
                Fonticons, Inc. --><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 
                32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 
                28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-
                34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128
                 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

      let container = document.querySelector("#container") as HTMLElement;
      container.innerHTML = productHTML;

      const addprod = document.querySelector(
        `#cartbtn${product.id}`
      ) as HTMLElement;
      addprod.addEventListener("click", (e) => {
        addToCart(product);
        console.log(`Product ${product.id} added to cart`);
      });
    })
    .catch((err) => console.log(err));
}


fetchData("home");
const homeOption = document.querySelector("#home") as HTMLElement;
homeOption.addEventListener("click", (e) => {
  let container = document.querySelector("#container") as HTMLElement;
  container.innerHTML = "";
  fetchData("home");
  container.innerHTML = "";
});

const electronicOption = document.querySelector("#electronics") as HTMLElement;
electronicOption.addEventListener("click", (e) => {
  let container = document.querySelector("#container") as HTMLElement;
  container.innerHTML = "";
  let topContainer = document.querySelector("#topContainer") as HTMLElement;
  topContainer.innerHTML = "";
  fetchData("electronics");
  container.innerHTML = "";
});

const jeweleryOption = document.querySelector("#jewelery") as HTMLElement;
jeweleryOption.addEventListener("click", (e) => {
  let container = document.querySelector("#container") as HTMLElement;
  container.innerHTML = "";
  let topContainer = document.querySelector("#topContainer") as HTMLElement;
  topContainer.innerHTML = "";
  fetchData("jewelery");
  container.innerHTML = "";
});

const menOption = document.querySelector("#mencloths") as HTMLElement;
menOption.addEventListener("click", (e) => {
  let container = document.querySelector("#container") as HTMLElement;
  container.innerHTML = "";
  let topContainer = document.querySelector("#topContainer") as HTMLElement;
  topContainer.innerHTML = "";
  fetchData("men's clothing");
  container.innerHTML = "";
});

const womenOption = document.querySelector("#womencloths") as HTMLElement;
womenOption.addEventListener("click", (e) => {
  let container = document.querySelector("#container") as HTMLElement;
  container.innerHTML = "";
  let topContainer = document.querySelector("#topContainer") as HTMLElement;
  topContainer.innerHTML = "";
  fetchData("women's clothing");
  container.innerHTML = "";
});







function addToCart(product: Product) {
  let x = localStorage.getItem("cart") || "[]";
  let cart = JSON.parse(x);
  const existingProduct = cart.find((item: { id: number; }) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
  console.log(cart);
}

async function getProductById(productId: number): Promise<Product> {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product: Product = await response.json();
    return product;
}

var countofButtons = 0;
var count = 0;
var cartCount = document.createElement("sup");
cartCount.className = "bg-white text-secondary mx-2 py-1 px-2 rounded";

function getCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let count = 0;
  cart.forEach(function (c: { quantity: number; }) {
    count += c.quantity;
  });
  return count;
}
cartCount.textContent = getCartCount() + "";

async function displayCart(){
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartContainer = document.createElement("div");
    cartContainer.style.maxWidth = "600px";
    cartContainer.className = "d-flex flex-wrap justify-content-center align-items-center  mx-auto";
    cartContainer.classList.add("cart-container");
    let tot_price=0;
    console.log(tot_price);
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const productData: Product = await getProductById(item.id);
      const { title, image, price } = productData;
      const  quantity  = item.quantity;
      tot_price += price*quantity;
      console.log(title,price,quantity,tot_price);
      const cartItem = document.createElement("div");
      cartItem.className = "d-flex d-inline bg-white m-2 p-2";
      cartItem.classList.add("cart-item");
      const productImg = document.createElement("img");
      productImg.src = image;
      productImg.style.width = "25vw";
      productImg.style.height = "25vh";
      productImg.alt = `Product image of ${title}`;
      productImg.className = "mx-5"
      cartItem.appendChild(productImg);
      const productInfo = document.createElement("div");
      productInfo.classList.add("cart-item-info");
      const productName = document.createElement("h5");
      productName.classList.add("cart-item-product-name");
      productName.textContent = title;
      productInfo.appendChild(productName);
      const productPrice = document.createElement("div");
      productPrice.classList.add("cart-item-price");
      productPrice.textContent = `Price: $${price}`;
      productInfo.appendChild(productPrice);
      const quantityContainer = document.createElement("div");
      quantityContainer.classList.add("cart-item-quantity-container");
      const quantityLabel = document.createElement("span");
      quantityLabel.textContent = "Quantity:";
      quantityContainer.appendChild(quantityLabel);
      const decreaseBtn = document.createElement("button");
      decreaseBtn.className = "mx-2 quantity-btn rounded"
      decreaseBtn.textContent = "-";
      decreaseBtn.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
          localStorage.setItem("cart", JSON.stringify(cart));
          quantityEl.textContent = item.quantity + "";
          cartCount.textContent = getCartCount() + "";
        }
        if(item.quantity==1){
          const updatedCart = cart.filter((cartItem: { id: any; }) => cartItem.id !== item.id);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      });
      quantityContainer.appendChild(decreaseBtn);
      const quantityEl = document.createElement("span");
      quantityEl.classList.add("cart-item-quantity");
      quantityEl.textContent = quantity.toString();
      quantityContainer.appendChild(quantityEl);
      const increaseBtn = document.createElement("button");
      increaseBtn.className = " mx-2 rounded quantity-btn "
      increaseBtn.textContent = "+";
      increaseBtn.addEventListener("click", () => {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        quantityEl.textContent = item.quantity + "";
        cartCount.textContent = getCartCount() + "";
      });
      quantityContainer.appendChild(increaseBtn);
      productInfo.appendChild(quantityContainer);
      cartItem.appendChild(productInfo);
      cartContainer.appendChild(cartItem);
    }
    const label = document.createElement("p");
    label.className='font-weight-bold';
    label.textContent = "Total Price: $ "+tot_price;
    const checkout = document.createElement("button");
    checkout.textContent = "Checkout";
    checkout.className = "btn btn-danger ms-5";
    checkout.addEventListener("click", () => {
      localStorage.removeItem('cart');
      let container=document.querySelector('#container') as HTMLElement;
      container.innerHTML="";
      container.innerHTML=`
      <p class="font-weight-bold">Checkout Successful</p>
      `;
    });
    cartContainer.append(label);
    cartContainer.append(checkout);
    const container = document.getElementById("container");
    container?.appendChild(cartContainer);
  }

const cartOption = document.querySelector("#cart") as HTMLElement
cartOption.addEventListener("click", (e) =>{
    let container=document.querySelector('#container') as HTMLElement;
    container.innerHTML="";
    let topContainer = document.querySelector("#topContainer") as HTMLElement;
    topContainer.innerHTML = "";
    displayCart();
})
