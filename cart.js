// Fixed Cart management system
class CartManager {
    constructor() {
        // Try to use sessionStorage if available, fallback to memory
        this.useStorage = this.isStorageAvailable();
        
        if (this.useStorage) {
            // Use sessionStorage for persistence across pages
            const saved = sessionStorage.getItem('cartData');
            this.cart = saved ? JSON.parse(saved) : [];
        } else {
            // Fallback to window-based storage (for Claude.ai environment)
            if (!window.cartData) {
                window.cartData = [];
            }
            this.cart = window.cartData;
        }
        
        console.log('CartManager initialized with cart:', this.cart);
    }

    // Check if storage is available
    isStorageAvailable() {
        try {
            const test = 'test';
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Add item to cart
    addToCart(item) {
        console.log('Adding item to cart:', item);
        
        // Create a unique key for the item based on ID and options
        const itemKey = this.createItemKey(item.id, item.options);
        
        // Find existing item with same ID and options
        const existingItemIndex = this.cart.findIndex(cartItem => {
            const cartItemKey = this.createItemKey(cartItem.id, cartItem.options);
            return cartItemKey === itemKey;
        });

        if (existingItemIndex >= 0) {
            // Item exists, update quantity
            this.cart[existingItemIndex].quantity += item.quantity;
            console.log('Updated existing item quantity:', this.cart[existingItemIndex]);
        } else {
            // New item, add to cart
            this.cart.push({...item}); // Create a copy of the item
            console.log('Added new item to cart');
        }
        
        this.saveCart();
        console.log('Cart after addition:', this.cart);
    }

    // Create a unique key for cart items
    createItemKey(itemId, options) {
        return itemId + '_' + JSON.stringify(options || {});
    }

    // Remove item from cart
    removeFromCart(itemId, options = null) {
        const initialLength = this.cart.length;
        
        if (options) {
            const itemKey = this.createItemKey(itemId, options);
            this.cart = this.cart.filter(item => {
                const cartItemKey = this.createItemKey(item.id, item.options);
                return cartItemKey !== itemKey;
            });
        } else {
            this.cart = this.cart.filter(item => item.id !== itemId);
        }
        
        console.log(`Removed items. Cart length: ${initialLength} -> ${this.cart.length}`);
        this.saveCart();
    }

    // Update quantity
    updateQuantity(itemId, options, newQuantity) {
        const itemKey = this.createItemKey(itemId, options);
        const item = this.cart.find(cartItem => {
            const cartItemKey = this.createItemKey(cartItem.id, cartItem.options);
            return cartItemKey === itemKey;
        });
        
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(itemId, options);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
            }
            console.log('Updated quantity for item:', item);
        }
    }

    // Save cart
    saveCart() {
        if (this.useStorage) {
            sessionStorage.setItem('cartData', JSON.stringify(this.cart));
        } else {
            window.cartData = [...this.cart]; // Create a copy
        }
        console.log('Cart saved:', this.cart);
    }

    // Get cart items
    getCart() {
        if (this.useStorage) {
            const saved = sessionStorage.getItem('cartData');
            this.cart = saved ? JSON.parse(saved) : [];
        } else {
            this.cart = window.cartData || [];
        }
        console.log('Getting cart:', this.cart);
        return this.cart;
    }

    // Get cart total
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Clear cart
    clearCart() {
        this.cart = [];
        if (this.useStorage) {
            sessionStorage.removeItem('cartData');
        } else {
            window.cartData = [];
        }
        console.log('Cart cleared');
    }

    // Get cart count
    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
}

// Create global cart manager instance
if (!window.cartManager) {
    window.cartManager = new CartManager();
    console.log('Global cart manager created');
}