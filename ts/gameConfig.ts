import * as data from '../config.json';
import { ILoadingScreen } from '@babylonjs/core/Loading/loadingScreen';

interface GraphicsFiles {
    font: string;
    protagonist: string;
}

export interface TextSource {
    path: string;
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

export interface GameConfig {
    //Base Configs
    graphicsPath: string;
    graphicsFiles: GraphicsFiles;
    textSource: TextSource;
    proxyPath: string;
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

export const LoadGameConfig = (): GameConfig => {
    const ts = randomizeTextSource((<any>data).textSources);
    const p =getProtagonistPath(
        (<any>data).graphicsFiles, 
        ts.protagonist);

    return({graphicsPath: (<any>data).graphicsPath,
        graphicsFiles: {
            font: (<any>data).graphicsFiles.font,
            protagonist: p
        },
        textSource: ts,
        proxyPath: (<any>data).proxyPath,
        loadingScreen: new CustomLoadingScreen((<any>data).loadingInnerHtml, document)})
};

export interface Configurable {
    config: GameConfig;
}