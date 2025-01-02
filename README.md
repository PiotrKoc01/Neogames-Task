# Neogrames recruitment task

## Repository contains a game where players choose boxes, and the program randomly decides between a bonus, a regular win, or a loss. The bonus is displayed on a separate screen and also includes a random element.


## How to Run?

Clone the repository:

< git clone https://github.com/PiotrKoc01/Neogames-Task >

In the terminal, type:

npm install

Then, ensuring that localhost port 8000 is free:

npm start



## About the Project

The program is written in JavaScript, Node.js, and Express. The hosting is managed by the file server.js. There is one template: index.html. 
The main frontend logic is handled in game.js. Additionally, the file Engine.js manages all random draws in a way that prevents users from tampering with variables through browser inspection.

All animations are canvas-based, with a single function named show_animation() in game.js responsible for handling them.
The animations are short, and I created them for the project. There aren't many frames, but it wouldn't be techicaly difficult to add more.
Also I decided that a large canvas displayed upon clicking provides better visualization and optimization than having multiple canvases within a div.


## Win Frequencies

For example, to speed up functionality testing, you can increase the probability of each outcome in Engine.js. The function gambling_result_func selects a number between 1 and (almost) 3.

As for the bonus, chances are generated using a number between 0 and 15 inclusive, where:

    Numbers 0–1 yield nothing,
    Numbers 2–5 give 500,
    Numbers 6–9 give 1000,
    Numbers 10–14 give 1500,
    Number 15 gives 2000.

