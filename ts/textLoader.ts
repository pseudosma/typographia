import { TextSource, GameConfig } from "./gameConfig";


export class TextLoader {
    public readonly source: TextSource;
    private proxyPath: string;

    constructor(config: GameConfig) {
        this.source = this.randomizeTextSource(config.textSources);
        this.proxyPath = config.proxyPath;
    }


    public LoadText() : Promise<any> {
        const b = this.source.beginPattern;
        const e = this.source.endPattern;
        const r = this.source.replacements;
        const cp = this.source.chapterPattern;
        var ci = new Map<number,string>();

        return fetch(this.proxyPath + this.source.path)
        .then(function(response) {
            const data = response.text()
            return Promise.resolve(data).then(
                d => data
            );
        })
        .then(function(d) {
            //first replace line breaks
            var dc = d.replace(new RegExp(`\r\n`,"gm")," ");
            //then find the beginning and end indexes and substring
            const begin = dc.indexOf(b);
            const end = dc.indexOf(e);
            var sdc = dc.substring(begin, end);
            //grab and then remove the titles
            var chapters = sdc.match(cp);
            for (var c in chapters) {
                const i = sdc.indexOf(c);
                ci[i] = c;  
            }
            var sdc = sdc.replace(new RegExp(cp,"gm"),"");
            //then work on replacements
            for (var m in r){
                for (var i=0;i<r[m].length;i++){
                    sdc = sdc.replace(m , r.get(m));
                }
            }
            //finally return a promise containing the text and chapterIndicies
            //console.log(sdc);
            return({sdc, ci});
        });
    }

    private randomizeTextSource(texts : Array<TextSource>) : TextSource {
        let x = Math.floor((Math.random() * texts.length));
        return texts[x];
    }
}