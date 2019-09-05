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

class Protagonist {
    public type: HeroType;
}

export class TextSource {
    public path: string;
    public title: string;
    public author: string;
    public beginPattern: string;
    public endPattern: string;
    public chapterPattern: string;
    public replacements: Map<string,string>
    public protagonist: Protagonist;
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

export class GameConfig {
    //Base Configs
    public graphicsPath: string;
    public fontFile: string;

    //Text Source
    public textSources: Array<TextSource>;
    public proxyPath: string;

    //Loading Screen
    private loadingInnerHtml: string;
    public loadingScreen: CustomLoadingScreen;


    constructor() {
        this.graphicsPath = (<any>data).graphicsPath;
        this.fontFile = (<any>data).fontFile;
        this.textSources = (<any>data).textSources;
        this.proxyPath = (<any>data).proxyPath;
        this.loadingInnerHtml = (<any>data).loadingInnerHtml;
        this.loadingScreen = new CustomLoadingScreen(this.loadingInnerHtml);
    }
}