const productContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

let allProducts = [];

async function loadProducts() {

    try {

        const response = await fetch("https://fakestoreapi.com/products");

        allProducts = await response.json();

        displayProducts(allProducts);

    } catch (error) {

        productContainer.innerHTML = "<h2>Unable to load products.</h2>";

    }

}

function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}">

            <h3>${product.title}</h3>

            <p>$${product.price}</p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

        </div>

        `;

    });

}

searchInput.addEventListener("keyup", () => {

    const search = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(product => {

        return product.title.toLowerCase().includes(search);

    });

    displayProducts(filtered);

});

function addToCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = allProducts.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

alert("Product added to cart!");

}

loadProducts();
function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

}

updateCartCount();