import * as data from '../config.json';

enum TextLoadingStyle {
    FromFiles = 0,
    FromWeb = 1,
}

export class TextSource {
    public path: string;
    public beginPattern: string;
    public endPattern: string;
    public replacements: Map<string,string>
}

export class GameConfig {

    public graphicsPath: string;
    public fontFile: string;
    public textSources: Array<TextSource>;
    public proxyPath: string;
    public style: TextLoadingStyle;

    constructor() {
        this.graphicsPath = (<any>data).graphicsPath;
        this.fontFile = (<any>data).fontFile;
        this.textSources = (<any>data).textSources;
        this.proxyPath = (<any>data).proxyPath;
        this.style = (<any>data).style;
    }
}