
/*  LOGIN AND SIGNUP WORK  */



document.querySelector('.login-label').addEventListener('click', function () {
  document.getElementById('loginPopup').style.display = 'block';
});


function openPopup(popupId) {
  document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = 'none';
}

document.querySelector('.login-label').addEventListener('click', function () {
  openPopup('loginPopup');
});

document.querySelector('.signup-link a').addEventListener('click', function () {
  closePopup('loginPopup');
  openPopup('signupPopup');
});





/* add to cart*/
const cartSymbol = document.querySelector('.cart-symbol');
const sidebar = document.querySelector('.sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartdetailsContainer = document.getElementById('.cart-item-details');
const totalPriceElement = document.getElementById('total-price');
const closeCartBtn = document.querySelector('.close-cart-btn');
const addToCartSections = document.querySelectorAll('.add-to-cart-section');
const cart = [];

cartSymbol.addEventListener('click', () => {
  sidebar.classList.toggle('open');

  // Toggle visibility of Add to Cart sections when opening/closing the cart
  addToCartSections.forEach(section => {
    section.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
  });

  // Adjust the right value based on the condition
  const currentRightValue = parseInt(getComputedStyle(sidebar).right);
  if (currentRightValue < 0) {
    sidebar.style.right = "0";
  } else {
    sidebar.style.right = "-350px";
  }
});

function addToCart(name, image, price) {
  const product = {
    name: name,
    image: image,
    price: price,
    quantity: 1
  };

  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.name === name);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push(product);
  }
 
  updateCartDisplay();
}


function updateCartDisplay() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <p>${item.name}</p>
          <p>&#8377;${item.price.toFixed(2)} </p>
          <p>Quantity: 
          <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
          ${item.quantity}
          <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
          </p>
          <button class="remove-from-cart-btn" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);

      total += item.price * item.quantity;
  });

  const cartCountElement = document.getElementById('cart-count');
   cartCountElement.textContent = cart.reduce((count, item) => count + item.quantity, 0).toString();

  totalPriceElement.textContent = `Total:  ${total.toFixed(2)} Rs`;
}

function decreaseQuantity(index) {
// Decrease the quantity of the item at the specified index
if (cart[index].quantity > 1) {
    cart[index].quantity--;
    // Update the cart display
    updateCartDisplay();
}
}

function increaseQuantity(index) {
// Increase the quantity of the item at the specified index
cart[index].quantity++;
// Update the cart display
updateCartDisplay();
}

function removeFromCart(index) {
  // Remove the item at the specified index from the cart array
  cart.splice(index, 1);
  // Update the cart display
  updateCartDisplay();
}

function closeCart() {
  sidebar.classList.remove('open');

  // Adjust the right value based on the condition
  const currentRightValue = parseInt(getComputedStyle(sidebar).right);
  if (currentRightValue < 0) {
    sidebar.style.right = "0";
  } else {
    sidebar.style.right = "-550px";
  }
}
