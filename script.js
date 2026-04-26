/**
 * EQUIP Dashboard Logic
 */

// 1. Live Search Filter
function filterCards() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const grid = document.getElementById('cardGrid');
    const cards = grid.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].getAttribute('data-name');
        if (name.toLowerCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// 2. Click Logging and Animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const cardName = card.getAttribute('data-name');
            
            // Console log for debugging
            console.log(`Navigating to: ${cardName}`);

            // Optional: Simple visual feedback before navigation
            card.style.backgroundColor = "#f0f0f0";
        });
    });
});

// Notify console that app is ready
console.log("EQUIP Dashboard Initialized. Ready for inspection.");
