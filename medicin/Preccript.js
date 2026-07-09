/* add to cart*/
const cartSymbol = document.querySelector('.cart-symbol');
const sidebar = document.querySelector('.sidebar');
const cartItemsContainer = document.getElementById('cart-items');
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

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <p>${item.name}</p>
      <p>${item.price.toFixed(2)} Rs</p>
      <p>Quantity: ${item.quantity}</p>
    `;
    cartItemsContainer.appendChild(cartItem);

    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = `Total:  ${total.toFixed(2)} Rs`;
}

function closeCart() {
  sidebar.classList.remove('open');

  // Adjust the right value based on the condition
  const currentRightValue = parseInt(getComputedStyle(sidebar).right);
  if (currentRightValue < 0) {
    sidebar.style.right = "20";
  } else {
    sidebar.style.right = "-350px";
  }
}

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
  
  //
  document.getElementById('upload-prescription').addEventListener('change', function() {
    var fileInput = this;
    var imagePreviewDiv = document.getElementById('image-preview');
    var errorMessageDiv = document.getElementById('error-message');

   // imagePreviewDiv.innerHTML = ''; // Clear existing previews
    errorMessageDiv.innerHTML = ''; // Clear existing error message

    if (fileInput.files && fileInput.files.length > 0) {
        for (var i = 0; i < fileInput.files.length; i++) {
            var reader = new FileReader();
            var previewContainer = document.createElement('div');
            var previewImage = document.createElement('img');
            var deleteButton = document.createElement('button');

            previewContainer.className = 'preview-container';
            previewImage.className = 'preview-image';
            deleteButton.className = 'delete-button';

            reader.onload = function(e) {
                previewImage.src = e.target.result;
            };

            if (fileInput.files[i].type.match('image.*')) {
                reader.readAsDataURL(fileInput.files[i]);
                deleteButton.innerText = 'X';
                deleteButton.onclick = function() {
                    previewContainer.remove();
                };

                previewContainer.appendChild(previewImage);
                previewContainer.appendChild(deleteButton);
                imagePreviewDiv.appendChild(previewContainer);
            } else {
                errorMessageDiv.innerHTML = 'Only PNG and JPG images are allowed.';
                // Clear the file input to prevent the upload of invalid files
                fileInput.value = '';
            }
        }
    }
});