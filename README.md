# Seesaw Simulation

I am Ozan Kürkçü. This is my seesaw simulation project made with HTML, CSS and pure Javascript

## Thought Process

While building this seesaw project, my main goal was not only to create a working simulation, but to reflect the software design principles I am following. Even though the scope is relatively small, I tried to approach it as if it could evolve into a larger system.

- The first thing I did was examine and interact with the example website to understand how it works and what it does. I also tried to explore potential edge cases and limitations that might not be immediately visible to users.

- After understanding what is supposed to be done, I created initial file structure (index.html, style.css, script.js) and built the static UI using only HTML and CSS without adding any Javascript logic.

- After setting up the static structure, I gradually tested the Javascript logic like tracking the mouse movements and clicks. Instead of putting everything inside event listeners, I tried to seperate the responsibilities and keep the logic organized.

- I focused on making the data flow clear. User interaction updatess the state, the state affects the calculations, and the results are reflected in the UI. Thinking in this sequence helped me avoid tightly coupled code.

- I tried to seperate state management, calculations, and UI updates conceptually, so that each part of the system has a clear role. This made the implementation easier to reason about and reduced unnecessary complexity.

## Design Decisions

- I used classes to represent key domain concepts such as weights and simulation state. This makes the structure more explicit and keeps related behaviour encapsulated.

- Instead of distributing data across multiple files, I kept the simulation data in a dedicated state layer. This provides a clear data flow and simplifies persistance handling.

- All physics-related calculations are kept independent from DOM manipulation. This keeps the logic predictable and easier to maintain.

- DOM references are collected in one place to avoid repetition and improve readability.

- Static values are centralized to prevent hard-coded numbers and make future adjustmens straightforward.

## Trade-offs & Limitations

I thought few different ways for making the preview of weights and then creating the real weight. I finally decided on one spesific way that suits my architecture.

## AI Usage

Most of the time, I relied on my own implementation. However, in a few specific moments, I used AI to clarify certain technical concepts instead of searching through documentation.

For example, while working on the weight drop interaction, I encountered a visual inconsistency where the element slightly shifted when transitioning from preview mode to its final position on the plank. To better understand what was happening, I used AI to revisit how coordinate systems and element positioning behave in the DOM, especially in relation to getBoundingClientRect() and relative positioning calculations.

This helped me reason about the issue more efficiently, but the actual implementation and architectural decisions were fully handled by me.

Additionally, I used AI in a very limited way in the CSS layer to speed up minor styling adjustments. It was purely for productivity purposes and did not influence the overall structure or logic of the project.
