// Get id from URL, like ?id=burger
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Get item from data.js
const item = items[id];

// If it doesn't exist, show error
if (!item) {
  document.getElementById("food-container").innerHTML = "<p class='p-4'>Item not found.</p>";
  throw new Error("Item not found");
}

// Put Claude's layout in here, replacing props with item.*
document.getElementById("food-container").innerHTML = `
  <div class="relative flex-grow flex flex-col">
    <div class="relative h-96 overflow-hidden">
      <div 
        class="absolute bottom-0 right-0 w-1/2 h-full rounded-tl-full" 
        style="background-color: ${item.accentColor}"
      ></div>

      <div 
        class="absolute top-8 right-8 w-20 h-20 rounded-full opacity-70 shadow-md scale-100 transition-all duration-1000 ease-out" 
        style="background-color: ${item.accentColor}"
      ></div>

      <div class="absolute bottom-0 right-0 p-4 w-3/5 h-full flex items-end justify-end">
        <img 
          src="${item.image}"
          alt="${item.name}" 
          class="object-contain max-h-full max-w-full transition-all duration-1000 ease-out opacity-100 scale-100"
        />
      </div>

      <!-- ❌ Removed multiple veggie images — just one background circle now -->
    </div>

    <!-- Details panel -->
    <div class="bg-white rounded-t-3xl p-6 shadow-lg transition-all duration-700 ease-out relative" style="min-height: 50vh;">
      <div class="flex justify-between items-start mb-6">
        <h1 class="text-3xl font-bold text-amber-500">${item.name}</h1>
        <div class="text-2xl font-bold">${item.price} ${item.currency}</div>
      </div>
      
      <p class="text-gray-700 mb-6">${item.description}</p>
      <hr class="mb-6 border-gray-200" />
      
      <!-- Quantity -->
      <div class="mb-6">
        <label class="block text-gray-700 font-medium mb-2">Quantity</label>
        <div class="inline-flex items-center border rounded-md overflow-hidden">
          <button onclick="changeQty(-1)" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700">-</button>
          <span id="qty" class="px-4 py-2">1</span>
          <button onclick="changeQty(1)" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700">+</button>
        </div>
      </div>

      <!-- Order Button -->
      <button class="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md text-lg">
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