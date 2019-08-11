import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/core/Loading/Plugins/babylonFileLoader";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { CellMaterial } from "@babylonjs/materials/cell";
import { Mesh } from "@babylonjs/core/Meshes"

const specials = [`,`,`-`,`.`,`?`,`/`,`\\`,`"`,`'`,`:`,`;`,`!`,`(`,`)`,`+`];
const numbers = ["0","1","2","3","4","5","6","7","8","9"];
const lowers = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const capitals = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const all = specials.concat(numbers,lowers,capitals);
const letters = lowers.concat(capitals);

const sPos = -4;

//FontLoader is a class that encapsulates loading fonts into the scene from a file
export class FontLoader {

    //LoadFonts loads all the fonts from file to scene for instancing
    public LoadFonts(thisScene:Scene, filepath:string, filename:string) : Promise<any>[] {
        var retVal: Promise<any>[] = [];
        var f = this.charNameFix;
            const material = new CellMaterial("cell", thisScene);
            for (let i=0; i<all.length; i++) {
                retVal.push(new Promise(function(resolve) {
                        SceneLoader.ImportMesh(f(all[i]), filepath, filename, thisScene, function (newMeshes) {
                            var char = newMeshes[0];
                            //use Utf16 charCode to id character to avoid th ngiteed for conversions
                            //char.name = all[i].charCodeAt(0).toString();
                            //char.scaling = new Vector3(2.5,2.5,2.5);
                            char.position.x = -6;
                            char.position.y = -1;
                            char.isVisible = false;
                            char.material = material;
                            resolve();
                        });
                    })
                );
            }
        return retVal
    }

    public InstanceLetter(thisScene:Scene, name:string, index: number) : void {
        const n = this.charNameFix(name);
        const am = thisScene.getMeshByName(n);
        if (am != null) {
            const m = am as Mesh;
            //all instances will have the index as the name
            var i = m.createInstance(index.toString());
            i.isVisible = true;
            i.position.y = -1;
            i.position.x = index;
            thisScene.addMesh(i);
        }
    }

    public DeinstanceLetter(thisScene:Scene, index:number) : void {
        const am = thisScene.getMeshByName(index.toString());
        if (am != null) {
            am.dispose();
        }
    }

    private charNameFix(char:string) : string {
        var retVal = "special";
        if (letters.includes(char)) {
            retVal = char;
        }
        //renaming of special chars that mess up the blender export
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
        //space
        if (char == ` `) {
            retVal = "";
        }
        //replace the numbers too cause later on the index will be used to id instances
        if (char == "0") {
            retVal = "zero";
        }
        if (char == "1") {
            retVal = "one";
        }
        if (char == "2") {
            retVal = "two";
        }
        if (char == "3") {
            retVal = "three";
        }
        if (char == "4") {
            retVal = "four";
        }
        if (char == "5") {
            retVal = "five";
        }
        if (char == "6") {
            retVal = "six";
        }
        if (char == "7") {
            retVal = "seven";
        }
        if (char == "8") {
            retVal = "eight";
        }
        if (char == "9") {
            retVal = "nine";
        }
        return retVal
    }
}