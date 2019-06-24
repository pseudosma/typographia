/// <reference path="../node_modules/babylonjs/babylon.d.ts" />
var Game = (function () {
    function Game(canvasElement) {
        var _this = this;
        this.canvas = document.getElementById(canvasElement);
        this.engine = new BABYLON.Engine(this.canvas, true);
        // Listen for browser/canvas resize events
        window.addEventListener("resize", function () {
            _this.engine.resize();
        });
    }
    Game.prototype.createScene = function () {
        // We need a scene to create all our geometry and babylonjs items in
        this.scene = new BABYLON.Scene(this.engine);
        // Create a camera, and set its position to slightly behind our meshes
        this.camera = new BABYLON.FreeCamera('freeCamera', new BABYLON.Vector3(0, 5, -10), this.scene);
        // Make our camera look at the middle of the scene, where we have placed our items
        this.camera.setTarget(BABYLON.Vector3.Zero());
        // Attach the camera to the canvas, this allows us to give input to the camera
        this.camera.attachControl(this.canvas, false);
        // Create lightning in our scene
        this.light = new BABYLON.HemisphericLight('skyLight', new BABYLON.Vector3(0, 1, 0), this.scene);
        // Finally time to add some meshes
        // Create sphere shape and place it above ground
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, this.scene);
        sphere.position.y = 1; //not a magic number, but half or our diameter and height
        // Make a plane on the ground
        var ground = BABYLON.MeshBuilder.CreateGround('groundPlane', { width: 6, height: 6, subdivisions: 2 }, this.scene);
    };
    Game.prototype.run = function () {
        var _this = this;
        this.engine.runRenderLoop(function () {
            _this.scene.render();
        });
    };
    return Game;
}());
// Create our game class using the render canvas element
var game = new Game('renderCanvas');
// Create the scene
game.createScene();
// start animation
game.run();
