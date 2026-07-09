
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
document.querySelector('.login-link a').addEventListener('click', function () {
  closePopup('signupPopup');
  openPopup('oginPopup');
});




/* card slider*/
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



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
  

  
//home adds
  const slider = document.getElementById('image-slider');
  let currentIndex = 0;

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slider.children.length;
    updateSlider();
  }

  function updateSlider() {
    const translateValue = -currentIndex * 100;
    slider.style.transform = `translateX(${translateValue}%)`;
  }

  // Automatically change slide every 15 seconds
  setInterval(showNextSlide, 5000);









