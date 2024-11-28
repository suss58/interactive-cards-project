document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".cards-container");
    const totalCards = 100; // Total number of cards
    const cards = [];
    let currentCardIndex = 0; // Index of the currently active card
    let isDragging = false; // Flag to track if the user is dragging
    let hasInteracted = false; // Flag to track if any user interaction has occurred
    let startY = 0; // The initial Y position of the mouse when dragging
    let updated = false; // Flag to track if the card positions have been updated

    // Create a single card element and return it
    const createCard = (index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-header"></div>
            <div class="card-content-row">
                <div class="card-left-column">
                    <div class="card-circle"></div>
                </div>
                <div class="card-right-column">
                    <div class="card-medium-rect"></div>
                    <div class="card-small-rect"></div>
                </div>
            </div>
        `;
        return card;
    };

    // Generate and append all cards to the container
    const generateCards = () => {
        for (let i = 0; i < totalCards; i++) {
            const card = createCard(i);
            container.appendChild(card);
            cards.push(card);
        }
    };

    // Update the position and appearance of each card
    const updateCardPositions = () => {
        cards.forEach((card, index) => {
            resetCardStyles(card); // Reset card styles before applying new ones

            if (index === currentCardIndex) {
                setActiveCardStyles(card); // Set styles for the active card
            } else if (index === (currentCardIndex + 1) % totalCards) {
                setNextCardStyles(card); // Set styles for the next card
            } else if (index === (currentCardIndex - 1 + totalCards) % totalCards) {
                setPrevCardStyles(card); // Set styles for the previous card
            } else {
                hideCard(card); // Hide all other cards
            }
        });

        updated = true; // Mark the layout as updated
    };

    // Reset the styles of the card to its default state
    const resetCardStyles = (card) => {
        card.classList.remove("active", "next", "prev", "hidden");
        card.style.pointerEvents = "none"; // Disable interactions by default
        card.style.opacity = "0"; // Make card invisible
        card.style.transform = "scale(0)"; // Shrink the card to zero size
        card.style.position = "absolute"; // Position it absolutely (offscreen)
    };

    // Set styles for the active card (the center one)
    const setActiveCardStyles = (card) => {
        card.classList.add("active");
        card.style.transform = "scale(1)";
        card.style.opacity = "1";
        card.style.top = "50%";
        card.style.left = "50%";
        card.style.marginTop = "-250px"; // Offset for vertical centering
        card.style.marginLeft = "-300px"; // Offset for horizontal centering
        card.style.position = "absolute";
        card.style.zIndex = "2"; // Ensure it is on top
        card.style.pointerEvents = "auto"; // Enable interactions
    };

    // Set styles for the next card (below the active card)
    const setNextCardStyles = (card) => {
        card.classList.add("next");
        card.style.transform = "scale(0.7)";
        card.style.opacity = "0.7";
        card.style.bottom = 0;
        card.style.left = "50%";
        card.style.marginLeft = "-300px";
        card.style.position = "fixed"; // Fixed at the bottom of the viewport
        card.style.zIndex = "1"; // Below the active card
        card.style.pointerEvents = "none"; // Disable interactions
    };

    // Set styles for the previous card (above the active card)
    const setPrevCardStyles = (card) => {
        card.classList.add("prev");
        card.style.transform = "scale(0.7)";
        card.style.opacity = "0.7";
        card.style.left = "50%";
        card.style.marginLeft = "-300px";
        card.style.position = "fixed"; // Fixed at the top of the viewport
        card.style.zIndex = "1"; // Below the active card
        card.style.pointerEvents = "none"; // Disable interactions

        // Change position after user interaction
        if (hasInteracted) {
            card.style.top = "15%"; // After interaction, position it 15% from the top
        } else {
            card.style.top = "0"; // Initially position it at the top
        }
    };

    // Hide all non-active cards
    const hideCard = (card) => {
        card.style.opacity = "0";
        card.style.transform = "scale(0)";
        card.style.position = "absolute";
        card.style.pointerEvents = "none";
    };

    // Handle mouse down event to start dragging
    const handleMouseDown = (e) => {
        isDragging = true;
        startY = e.clientY;
        updated = false; // Reset updated flag during dragging
    };

    // Handle mouse move event to detect drag and transition cards
    const handleMouseMove = (e) => {
        if (isDragging) {
            const distanceDragged = e.clientY - startY;
            if (distanceDragged < -50) {
                // If dragged upwards, move to the next card
                currentCardIndex = (currentCardIndex + 1) % totalCards;
                hasInteracted = true;
                updateCardPositions(); // Update card layout
                isDragging = false;
            }
        }
    };

    // Handle mouse up event to stop dragging
    const handleMouseUp = () => {
        isDragging = false;
    };

    // Handle wheel scroll event to move to the next card
    const handleScroll = (e) => {
        if (e.deltaY > 0) {
            currentCardIndex = (currentCardIndex + 1) % totalCards;
            hasInteracted = true;
        }
        updateCardPositions();
        e.preventDefault(); // Prevent default scroll behavior
    };

    // Handle keyboard events for navigation (arrow keys)
    const handleKeyboard = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            currentCardIndex = (currentCardIndex + 1) % totalCards;
            hasInteracted = true;
            updateCardPositions();
        }
    };

    // Initialize all interactions and event listeners
    const initializeInteractions = () => {
        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("wheel", handleScroll);
        document.addEventListener("keydown", handleKeyboard);
    };

    // Initialize the card layout and interactions
    generateCards();
    updateCardPositions();
    initializeInteractions();
});
