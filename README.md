
# Interactive Cards Project

Welcome to the **Interactive Cards Project**! This project creates a dynamic, interactive card system that allows users to engage with the cards in a fluid, intuitive way. By leveraging animations and transitions, users can interact with the cards using mouse dragging, scrolling, and even keyboard navigation. The goal is to offer an engaging and fun user experience that feels natural and responsive.

## Setup Instructions

To run this project locally, follow these simple steps:

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/suss58/interactive-cards-project.git
   ```

2. **Navigate into the project folder**:
   ```bash
   cd interactive-cards-project
   ```

3. **Open the `index.html` file** in your web browser to view the project. You can also edit the project using a code editor like **VSCode** or **Sublime Text** to further customize or develop the application.

## Technology Choices and Rationale

- **HTML**: Provides the foundational structure and layout for the interactive cards.
- **CSS**: Used for styling the cards, including custom animations and transitions that give the cards a dynamic feel. It also ensures a basic level of responsiveness, allowing the cards to adjust on different screen sizes.
- **JavaScript**: Powers the interactivity—such as dragging, scrolling, and keyboard navigation—creating a fluid, interactive experience.
- **No external libraries** were used, in order to keep the project lightweight and focus on pure web development skills.

## Known Limitations/Trade-offs

While the project is functional, there are some important limitations to consider:

- **Performance Issues**: The card system performs well for a small to moderate number of cards. However, the performance could degrade if many cards are present, especially on older or less powerful devices.
- **Mobile Compatibility**: The drag-to-swipe feature may not work consistently on all touch-enabled devices. This could be an issue for users on tablets or phones, especially with swipe gestures.
- **No Persistent State**: The app does not store the user’s progress. If the page is refreshed or closed, the current card index resets, and you lose the previous state.
- **Limited Error Handling**: The system lacks advanced error handling—interruptions during dragging, inconsistent scroll behaviors, or other edge cases are not properly managed.

### **Important**: This project is not fully responsive. While it adjusts the card layout for various screen sizes (like tablets and phones), the drag-to-scroll functionality is not fully optimized for mobile devices. This means the mobile experience might not be as fluid or reliable as the desktop version.

## Future Improvements

The following enhancements are on the radar for future development:

- **Mobile Touch Support**: Implement better support for touch events, improving the drag functionality for mobile users.
- **Card Persistence**: Add functionality to persist the user’s progress, such as saving the current card’s index in **localStorage** or **sessionStorage**.
- **Performance Optimizations**: Explore strategies like **lazy loading** or virtual DOM techniques to improve the performance when handling large sets of cards.
- **Advanced Animations**: Enhance the visual experience by improving card transitions and animations, making them smoother and more polished.
- **Expanded Interactivity**: Introduce new interactions like **swipe gestures**, **hover effects**, or buttons to navigate between cards for a more robust experience.

## Live Demo

You can try out the live demo of this project on GitHub Pages here:

- [Live Demo]()

## Time Spent

Here’s a breakdown of the time I spent working on the project:

- **Initial setup and planning**: 1 hour
- **HTML and CSS layout**: 2.5  hours
- **JavaScript functionality (dragging, scrolling, etc.)**: 1 hours
- **Documentation and deployment**: 0.5 hour

**Total time spent**: 5 hours

