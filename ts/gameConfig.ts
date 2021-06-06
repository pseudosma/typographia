import * as data from '../config.json';
import { ILoadingScreen } from '@babylonjs/core/Loading/loadingScreen';
import { SendArgs } from "flechette"

interface GraphicsFiles {
    font: string;
    protagonist: string;
}

export interface TextSource {
    sendArgs: SendArgs;
    title: string;
    author: string;
    beginPattern: string;
    endPattern: string;
    chapterPattern: string;
    replacements: Map<string,string>;
    protagonist: string;
}

export class CustomLoadingScreen implements ILoadingScreen {
    public loadingUIText: string
    public loadingUIBackgroundColor: string
    private doc: Document
    constructor(loadingUIText: string, doc: Document) {
        this.loadingUIText = loadingUIText;
        this.doc = doc;
    }
    public displayLoadingUI() {
        var loadingScreenDiv = this.doc.getElementById("loadingScreen") as HTMLDivElement;
        loadingScreenDiv.innerHTML = this.loadingUIText;
    }
  
    public hideLoadingUI() {
        var loadingScreenDiv = this.doc.getElementById("loadingScreen") as HTMLDivElement;
        loadingScreenDiv.style.display = "none";
    }
  }

export interface IGameConfig {
    //Base Configs
    graphicsPath: string;
    graphicsFiles: GraphicsFiles;
    textSource: TextSource;
    //Loading Screen
    loadingScreen: CustomLoadingScreen;
}

export const randomizeTextSource = (texts : Array<TextSource>) : TextSource  => {
    let x = Math.floor((Math.random() * texts.length));
    return texts[x];
}

export const getProtagonistPath = (
    graphicsFiles: Object, 
    protagonist: string) : string => {
        for (let [key, value] of Object.entries(graphicsFiles)) {
            if (key === protagonist ) {
                return value;
            }
        }
}

export class GameConfig implements IGameConfig {
    graphicsPath = (<any>data).graphicsPath;
    graphicsFiles = {font: "", protagonist: ""};
    textSource = {sendArgs: {path: ""},
        title: "",
        author: "",
        beginPattern: "",
        endPattern: "",
        chapterPattern: "",
        replacements: new Map(),
        protagonist: ""
    };
    loadingScreen = new CustomLoadingScreen((<any>data).loadingInnerHtml, document);

    constructor() {
        const ts = randomizeTextSource((<any>data).textSources);
        const p = getProtagonistPath(
            (<any>data).graphicsFiles, 
            ts.protagonist);

        this.graphicsFiles = {
            font: (<any>data).graphicsFiles.font,
            protagonist: p
        };
        this.textSource = ts;
    };
};

export interface Configurable {
    config: GameConfig;
}