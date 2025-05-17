document.addEventListener('DOMContentLoaded', function() {
    // Get all food cards
    const foodCards = document.querySelectorAll('.food-card');
    
    // Add event listeners to each card
    foodCards.forEach(card => {
      // Add click event listener
      card.addEventListener('click', function() {
        // Add clicked class to trigger animation
        this.classList.add('clicked');
        
        // Remove the class after animation completes
        setTimeout(() => {
          this.classList.remove('clicked');
        }, 300);
      });
    });
  });