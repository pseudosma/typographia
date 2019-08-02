import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
//import { Camera } from "@babylonjs/core/Cameras";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";

import { FontLoader } from "../ts/fontLoader";
import { GameConfig } from "../ts/gameConfig";

class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private camera: FreeCamera;
    private light: HemisphericLight;
    private fl: FontLoader;
    private config: GameConfig;

    constructor(canvasElement: string) {
        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        this.engine = new Engine(this.canvas);
        this.scene = new Scene(this.engine);  
        this.camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this.scene);
        this.camera.setTarget(Vector3.Zero());
        //this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        //this.camera.fov = 0.1;
        this.light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.7;
        this.fl = new FontLoader();
        this.config = new GameConfig();
        console.log(this.config.textSources);
        //Listen for browser/canvas resize events
        window.addEventListener("resize", ()=> {
            this.engine.resize();
        });
    }

    public CreateScene() : void {
        this.fl.LoadFonts(this.scene,this.config.graphicsPath, this.config.fontFile);
    }

    public Run() : void {
        this.engine.runRenderLoop(()=> {
            this.scene.render();
        });
    }
}

// Create our game class using the render canvas element
let game = new Game("renderCanvas");

// Create the scene
game.CreateScene();

// start animation
game.Run();