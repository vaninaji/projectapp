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
    if (e.clientY <= 100) { // Increased from 50 to 100
        topNav.classList.add('show');
        clearTimeout(hideTimeout);
    } else if (e.clientY > 150) { // Only hide when mouse is further away
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            topNav.classList.remove('show');
        }, 500); // Increased delay from 300 to 500
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


document.getElementById("food-container").innerHTML = `
    <div class="relative flex-grow flex flex-col">
        <div class="hero-section relative overflow-hidden" style="height: 500px;"> <!-- Just set height inline -->
            <div class="slide-in-diagonal absolute" style="bottom: 380px; right: -140px;">
    <div class="w-[600px] h-96 rounded-full" 
         style="background-color: ${item.accentColor}; transform: rotate(-45deg); transform-origin: bottom right; width: 700px; height: 500px">
    </div>
</div>
            <div class="slide-in-diagonal absolute bottom-2 right-20 p-4 w-3/5 h-full flex items-end justify-end">
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
            
            <!-- Soda Selection -->
            <div class="slide-up delay-3 mb-6">
                <label class="block text-gray-700 font-medium mb-2">Soda</label>
                <select id="soda" class="w-full p-2 border rounded-md bg-white">
                    <option value="coke">Coke</option>
                    <option value="pepsi">Pepsi</option>
                    <option value="sprite">Sprite</option>
                    <option value="fanta">Fanta</option>
                    <option value="water">Water</option>
                </select>
            </div>
            
            <!-- Promo Code -->
            <div class="slide-up delay-3 mb-6">
                <label class="block text-gray-700 font-medium mb-2">Promo Code</label>
                <div class="flex gap-2">
                    <input type="text" id="promoCode" placeholder="Enter promo code" 
                           class="flex-1 p-2 border rounded-md">
                    <button onclick="applyPromo()" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                        Apply
                    </button>
                </div>
                <div id="promoMessage" class="mt-2 text-sm"></div>
            </div>
            
            <!-- Menu Checkbox -->
            <div class="slide-up delay-3 mb-6">
                <label class="flex items-center">
                    <input type="checkbox" id="menuCheckbox" class="mr-2">
                    <span class="text-gray-700">Menu</span>
                </label>
            </div>
            
            <!-- Order Button -->
            <button class="slide-up delay-4 w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md text-lg">
                Order Now
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

// Trigger animations after a short delay
setTimeout(() => {
  // Animate diagonal elements
  document.querySelectorAll('.slide-in-diagonal').forEach(el => {
      el.classList.add('animate');
  });
  
  // Animate bottom elements
  document.querySelectorAll('.slide-up').forEach(el => {
      el.classList.add('animate');
  });
}, 100); // Small delay to ensure DOM is ready

function applyPromo() {
  const promoInput = document.getElementById('promoCode');
  const promoMessage = document.getElementById('promoMessage');
  const promoCode = promoInput.value.toUpperCase();
  
  if (promoCode === 'SUMMER2025') {
      promoMessage.innerHTML = '<span class="text-green-600">✓ Promo code applied! 20% discount added.</span>';
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