let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

displayCart();

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<h2>Your Cart is Empty</h2>";
        cartTotal.innerHTML = "Total : ₹0";
        return;

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.title}">

            <div class="cart-details">

                <h3>${item.title}</h3>

                <p class="cart-price">₹${item.price}</p>

                <div class="quantity-box">

                    <button onclick="decreaseQuantity(${item.id})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">+</button>

                </div>

                <button class="remove-btn" onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    cartTotal.innerHTML = `Total : ₹${total.toFixed(2)}`;

    localStorage.setItem("cart", JSON.stringify(cart));

}

function increaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    item.quantity++;

    displayCart();

}

function decreaseQuantity(id) {

    const item = cart.find(product => product.id === id);

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeItem(id);
        return;

    }

    displayCart();

}

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    displayCart();

}

document.getElementById("checkoutBtn").addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    alert("🎉 Order Placed Successfully!");

    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    displayCart();

});
function updateCartCount() {

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

}

updateCartCount();