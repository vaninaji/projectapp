// Get id from URL, like ?id=burger
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Get item from data.js
const item = items[id];

// item not found
if (!item) {
    document.getElementById("food-container").innerHTML = "<p class='p-4'>Item not found.</p>";
    throw new Error("Item not found");
}

// Navbar hover 
const topNav = document.querySelector('.top-nav');
let hideTimeout;

// Show navbar when mouse is near the top
document.addEventListener('mousemove', (e) => {
    if (e.clientY <= 100) {
        topNav.classList.add('show');
        clearTimeout(hideTimeout);
    } else if (e.clientY > 150) {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            topNav.classList.remove('show');
        }, 500);
    }
});

// Keep navbar visible when hovering over it
topNav.addEventListener('mouseenter', () => {
    topNav.classList.add('show');
    clearTimeout(hideTimeout);
});

topNav.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        topNav.classList.remove('show');
    }, 500);
});

// Add cart button functionality
document.querySelector('.cart-btn').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

document.getElementById("food-container").innerHTML = `
    <!-- rounded rectangle -->
    <div class="relative flex-grow flex flex-col">
        <div class="hero-section relative overflow-hidden" style="height: 520px;">
            <div class="slide-in-diagonal absolute" style="bottom: 450px; right: -100px;">
                <div class="w-[700px] h-80 rounded-full" 
                     style="background-color: ${item.accentColor}; transform: rotate(-45deg); transform-origin: bottom right;">
                </div>
            </div>

            <!-- Veggie decoration -->
            <div class="slide-in-veggie absolute" 
                 style="left: -550px; top: -750px; width: 1500px; height: 1700px;">
                <img src="src/veggies.png" alt="veggie decoration" class="w-full h-full object-contain" />
            </div>

            <!-- main item -->
            <div class="slide-in-diagonal absolute bottom-6 p-4 w-3/5 h-full flex items-end justify-end" style="right: 60px">
                <img src="${item.image}" alt="${item.name}" 
                     class="object-contain max-h-full max-w-full" />
            </div>
        </div>
        
        <!-- Details panel -->
        <div class="bg-white rounded-t-3xl p-6 shadow-lg relative" style="min-height: 70vh;">
            <div class="slide-up flex justify-between items-start mb-6">
                <h1 class="text-3xl font-bold text-amber-500">${item.name}</h1>
                <div class="text-2xl font-bold">${item.price} ${item.currency}</div>
            </div>
            
            <p class="slide-up delay-1 text-gray-700 mb-6">${item.description}</p>
            
            <hr class="slide-up delay-2 mb-6 border-gray-200" />
            
            <!-- Quantity -->
            <div class="slide-up delay-3 mb-6">
                <label class="block text-gray-700 font-medium mb-2">Quantity</label>
                <div class="inline-flex items-center border rounded-md overflow-hidden">
                    <button onclick="changeQty(-1)" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700">-</button>
                    <span id="qty" class="px-4 py-2">1</span>
                    <button onclick="changeQty(1)" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700">+</button>
                </div>
            </div>
            
             <!-- Menu Checkbox -->
            <div class="slide-up delay-3 mb-6">
                <label class="flex items-center">
                    <input type="checkbox" id="menuCheckbox" onchange="toggleMenuOptions()" class="mr-2">
                    <span class="text-gray-700">Add Menu (includes soda and fries)</span>
                </label>
            </div>
            
            <!-- Menu Options (hidden initially) -->
            <div id="menuOptions" class="hidden transition-all duration-300 ease-in-out">
                <!-- Soda Selection -->
                <div class="mb-6">
                    <label class="block text-gray-700 font-medium mb-2">Soda</label>
                    <select id="soda" class="w-full p-2 border rounded-md bg-white">
                        <option value="coke">Coke</option>
                        <option value="pepsi">Pepsi</option>
                        <option value="sprite">Sprite</option>
                        <option value="fanta">Fanta</option>
                        <option value="water">Water</option>
                    </select>
                </div>
                
                <!-- Fries Selection -->
                <div class="mb-6">
                    <label class="block text-gray-700 font-medium mb-2">Fries</label>
                    <select id="fries" class="w-full p-2 border rounded-md bg-white">
                        <option value="regular">Regular Fries</option>
                        <option value="curly">Curly Fries</option>
                        <option value="sweet-potato">Sweet Potato Fries</option>
                        <option value="wedges">Potato Wedges</option>
                    </select>
                </div>
            </div>
            
            <!-- Promo Code -->
            <div class="slide-up delay-3 mb-6">
                <label class="block text-gray-700 font-medium mb-2">Promo Code</label>
                <div class="flex gap-2">
                    <input type="text" id="promoCode" placeholder="Enter promo code" 
                           class="flex-1 p-2 border rounded-md">
                    <button onclick="applyPromo()" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                        Apply
                    </button>
                </div>
                <div id="promoMessage" class="mt-2 text-sm"></div>
            </div>
            
            <!-- Order Button -->
            <button onclick="addToCart()" class="slide-up delay-4 w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md text-lg">
                Add to Cart
            </button>
        </div>
    </div>
`;

// Quantity button functionality
let quantity = 1;
function changeQty(change) {
    quantity += change;
    if (quantity < 1) quantity = 1;
    document.getElementById("qty").textContent = quantity;
}

// Animation trigger
setTimeout(() => {
    document.querySelectorAll('.slide-in-diagonal').forEach(el => {
        el.classList.add('animate');
    });
    
    document.querySelectorAll('.slide-in-veggie').forEach(el => {
        el.classList.add('animate');
    });
    
    document.querySelectorAll('.slide-up').forEach(el => {
        el.classList.add('animate');
    });
}, 100);

function applyPromo() {
    const promoInput = document.getElementById('promoCode');
    const promoMessage = document.getElementById('promoMessage');
    const promoCode = promoInput.value.toUpperCase();
    
    if (promoCode === 'SUMMER2025') {
        promoMessage.innerHTML = '<span class="text-green-600">✓ Promo code applied! 20% discount added.</span>';
        promoInput.classList.add('border-green-500');
    } else if (promoCode === 'WELCOME10') {
        promoMessage.innerHTML = '<span class="text-green-600">✓ Promo code applied! 10% discount added.</span>';
        promoInput.classList.add('border-green-500');
    } else if (promoCode === '') {
        promoMessage.innerHTML = '<span class="text-gray-500">Please enter a promo code.</span>';
        promoInput.classList.remove('border-green-500', 'border-red-500');
    } else {
        promoMessage.innerHTML = '<span class="text-red-600">✗ Invalid promo code.</span>';
        promoInput.classList.add('border-red-500');
        promoInput.classList.remove('border-green-500');
    }
}

function toggleMenuOptions() {
    const menuCheckbox = document.getElementById('menuCheckbox');
    const menuOptions = document.getElementById('menuOptions');
    
    if (menuCheckbox.checked) {
        menuOptions.classList.remove('hidden');
        menuOptions.classList.add('opacity-100');
        setTimeout(() => {
            menuOptions.style.maxHeight = menuOptions.scrollHeight + 'px';
        }, 10);
    } else {
        menuOptions.classList.add('hidden');
        menuOptions.classList.remove('opacity-100');
        menuOptions.style.maxHeight = '0px';
    }
}

function addToCart() {
    console.log('Adding item to cart...');
    
    const menuCheckbox = document.getElementById('menuCheckbox');
    const sodaSelect = document.getElementById('soda');
    const friesSelect = document.getElementById('fries');
    const promoInput = document.getElementById('promoCode');
    
    // Make sure cart manager is initialized
    if (!window.cartManager) {
        window.cartManager = new CartManager();
    }
    
    // Prepare cart item
    const cartItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: quantity,
        image: item.image,
        options: {
            hasMenu: menuCheckbox ? menuCheckbox.checked : false,
            soda: (menuCheckbox && menuCheckbox.checked && sodaSelect) ? sodaSelect.value : null,
            fries: (menuCheckbox && menuCheckbox.checked && friesSelect) ? friesSelect.value : null,
            promoCode: (promoInput && promoInput.value.trim() !== '') ? promoInput.value.toUpperCase() : null
        }
    };
    
    console.log('Cart item to add:', cartItem);
    
    // Add to cart using cart manager
    window.cartManager.addToCart(cartItem);
    
    // Show success message and redirect to menu
    const button = document.querySelector('button[onclick="addToCart()"]');
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Added to Cart! ✓';
        button.classList.remove('bg-green-800', 'hover:bg-green-700');
        button.classList.add('bg-green-600');
        button.disabled = true;
    }
    
    // Show success notification
    showSuccessNotification();
    
    // Redirect after showing success
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function showSuccessNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Item added to cart successfully!
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    const notificationEl = notification.firstElementChild;
    notificationEl.style.transform = 'translateX(100%)';
    notificationEl.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
        notificationEl.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after showing
    setTimeout(() => {
        notificationEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 1500);
}