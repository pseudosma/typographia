import { Engine } from "@babylonjs/core/Engines/engine";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/core/Loading/Plugins/babylonFileLoader";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
//import { Camera } from "@babylonjs/core/Cameras";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";

import { CellMaterial } from "@babylonjs/materials/cell";

const specials = [`,`,`-`,`.`,`?`,`/`,`\\`,`'`,`"`,`:`,`;`,`!`,`(`,`)`,`+`];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const lowers = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const capitals = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const all = specials.concat(numbers,lowers,capitals);
const lettersAndNumbers = numbers.concat(lowers,capitals);

const sPos = -4;

class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private camera: FreeCamera;
    private light: HemisphericLight;

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
  
        //Listen for browser/canvas resize events
        window.addEventListener("resize", ()=> {
            this.engine.resize();
        });
    }

    public createScene() : void {
        const material = new CellMaterial("cell", this.scene);
        for (let i=0; i<all.length; i++) {
            var letter = this.charFix(all[i]);
            SceneLoader.ImportMesh(letter, "./graphics/", "text.babylon", this.scene, function (newMeshes) {
                var char = newMeshes[0];
                char.scaling = new Vector3(2.5,2.5,2.5);
                char.position.x = -6
                char.position.y = -1
                char.name = letter;
                //char.isVisible = false;
                // if (capitals.includes(letter)) {
                //      char.position.x = sPos + (i * 1.4);
                // } else {
                //      char.position.x = sPos + (i * 1.8);
                // }
                char.material = material;
            });
        }
        fetch('https://bypasscors.herokuapp.com/api/?url=http://www.gutenberg.org/cache/epub/7477/pg7477.txt')
        .then(function(response) {
            return response.body;
        })
        .then(function(r) {
            console.log(r);
        });
    }

    public run() : void {
        this.engine.runRenderLoop(()=> {
            this.scene.render();
        });
    }

    private charFix(char:string) : string {
        var retVal = 'special';
        if (lettersAndNumbers.includes(char)) {
            retVal = char;
        }
        //renaming of special chars
        if (char == ',') {
            retVal = 'comma';
        }
        if (char == '-') {
            retVal = 'dash';
        }
        if (char == '.') {
            retVal = 'period';
        }
        if (char == '?') {
            retVal = 'questionmark';
        }
        if (char == '/') {
            retVal = 'forwardslash';
        }
        if (char == "'") {
            retVal = 'singlequote';
        }
        if (char == '"') {
            retVal = 'doublequote';
        }
        if (char == ':') {
            retVal = 'colon';
        }
        if (char == ';') {
            retVal = 'semicolon';
        }
        if (char == '\\') {
            retVal = 'backslash';
        }
        if (char == '!') {
            retVal = 'exclamationpoint';
        }
        if (char == '(') {
            retVal = 'openparen';
        }
        if (char == ')') {
            retVal = 'closeparen';
        }
        return retVal
    }
}

// Create our game class using the render canvas element
let game = new Game('renderCanvas');

// Create the scene
game.createScene();

// start animation
game.run();