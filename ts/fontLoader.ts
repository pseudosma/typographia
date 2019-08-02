import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/core/Loading/Plugins/babylonFileLoader";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { CellMaterial } from "@babylonjs/materials/cell";

const specials = [`,`,`-`,`.`,`?`,`/`,`\\`,`"`,`"`,`:`,`;`,`!`,`(`,`)`,`+`];
const numbers = ["0","1","2","3","4","5","6","7","8","9"];
const lowers = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const capitals = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const all = specials.concat(numbers,lowers,capitals);
const lettersAndNumbers = numbers.concat(lowers,capitals);

const sPos = -4;

//FontLoader is a class that encapsulates loading fonts into the scene from a file
export class FontLoader {

    //LoadFonts loads all the fonts from file to scene for instancing
    public LoadFonts(thisScene:Scene, filepath:string, filename:string) : void {
        const material = new CellMaterial("cell", thisScene);
        for (let i=0; i<all.length; i++) {
            var letter = this.charFix(all[i]);
            SceneLoader.ImportMesh(letter, filepath, filename, thisScene, function (newMeshes) {
                var char = newMeshes[0];
                char.scaling = new Vector3(2.5,2.5,2.5);
                char.position.x = -6;
                char.position.y = -1;
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
    }

    public InstanceLetter(thisScene:Scene, name:string) : void {

    }

    public DeinstanceLetter(thisScene:Scene, instanceName:string) : void {

    }

    private charFix(char:string) : string {
        var retVal = "special";
        if (lettersAndNumbers.includes(char)) {
            retVal = char;
        }
        //renaming of special chars
        if (char == `,`) {
            retVal = "comma";
        }
        if (char == `-`) {
            retVal = "dash";
        }
        if (char == `.`) {
            retVal = "period";
        }
        if (char == `?`) {
            retVal = "questionmark";
        }
        if (char == `/`) {
            retVal = "forwardslash";
        }
        if (char == `'`) {
            retVal = "singlequote";
        }
        if (char == `"`) {
            retVal = "doublequote";
        }
        if (char == ":") {
            retVal = "colon";
        }
        if (char == `;`) {
            retVal = "semicolon";
        }
        if (char == `\\`) {
            retVal = "backslash";
        }
        if (char == `!`) {
            retVal = `exclamationpoint`;
        }
        if (char == `(`) {
            retVal = "openparen";
        }
        if (char == `)`) {
            retVal = "closeparen";
        }
        return retVal
    }
}