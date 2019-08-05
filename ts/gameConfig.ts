import * as data from '../config.json';

enum HeroType {
    knight = 0,
    detective = 1,
    soldier = 2
}

enum HeroGender {
    male = 0,
    female = 1
}

class Protagonist {
    public type: HeroType;
    public gender: HeroGender;
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

export class GameConfig {

    public graphicsPath: string;
    public fontFile: string;
    public textSources: Array<TextSource>;
    public proxyPath: string;

    constructor() {
        this.graphicsPath = (<any>data).graphicsPath;
        this.fontFile = (<any>data).fontFile;
        this.textSources = (<any>data).textSources;
        this.proxyPath = (<any>data).proxyPath;
    }
}