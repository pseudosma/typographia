import { Game } from "./game";

// Create our game class using the render canvas element
let game = new Game();

// Create the scene
game.CreateScene();

// start animation
game.Run();