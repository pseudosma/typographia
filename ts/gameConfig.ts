import * as data from '../config.json';
import { ILoadingScreen } from '@babylonjs/core/Loading/loadingScreen';

enum HeroType {
    knight = 0,
    detective = 1,
    soldier = 2,
    pirate = 3,
    ninja = 4,
    cosmonaut = 5
}

interface Protagonist {
    type: HeroType;
}

export interface TextSource {
    path: string;
    title: string;
    author: string;
    beginPattern: string;
    endPattern: string;
    chapterPattern: string;
    replacements: Map<string,string>
    protagonist: Protagonist;
}

class CustomLoadingScreen implements ILoadingScreen {
    public loadingUIBackgroundColor: string
    constructor(public loadingUIText: string) {}
    public displayLoadingUI() {
        var loadingScreenDiv = document.getElementById("loadingScreen") as HTMLDivElement;
        loadingScreenDiv.innerHTML = this.loadingUIText;
    }
  
    public hideLoadingUI() {
        var loadingScreenDiv = document.getElementById("loadingScreen") as HTMLDivElement;
        loadingScreenDiv.style.display = "none";
    }
  }

export interface GameConfig {
    //Base Configs
    graphicsPath: string;
    fontFile: string;
    //Text Source
    textSources: Array<TextSource>;
    proxyPath: string;
    //Loading Screen
    loadingScreen: CustomLoadingScreen;
}

export const LoadGameConfig = () => {
    return({graphicsPath: (<any>data).graphicsPath,
        fontFile: (<any>data).fontFile,
        textSources: (<any>data).textSources,
        proxyPath: (<any>data).proxyPath,
        loadingScreen: new CustomLoadingScreen((<any>data).loadingInnerHtml)})
};

export interface Configurable {
    config: GameConfig;
}