import { TextSource, GameConfig } from "./gameConfig";

export class TextLoader {
    private source: TextSource;
    private proxyPath: string;
    private style: number;

    constructor(config: GameConfig) {
        this.source = this.randomizeTextSource(config.textSources);
        this.proxyPath = config.proxyPath;
        this.style = config.style;
    }

    public LoadText() : string {
        if (this.style == 0) {
            return this.LoadTextFromFile();
        }
        if (this.style == 0) {
            return this.LoadTextFromWeb();
        }
    }

    private LoadTextFromWeb() : string {
        fetch(this.proxyPath + this.source.path)
        .then(function(response) {
            return response.body;
        })
        .then(function(r) {
            console.log(r);
        });
        return "";
    }

    private LoadTextFromFile() : string {
        return "";
    }

    private randomizeTextSource(texts : Array<TextSource>) : TextSource {
        let x = Math.floor((Math.random() * texts.length) + 1);
        return texts[x];
    }
}