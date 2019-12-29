import { TextSource, GameConfig } from "./gameConfig";

interface Chapter {
    index: number;
    name: string;
}

class TextHolder {
    //allows strings to be passed by ref
    content: string
}

const randomizeTextSource = (texts : Array<TextSource>) : TextSource  => {
    let x = Math.floor((Math.random() * texts.length));
    return texts[x];
}

const parseText = (
    text :string, 
    beginPattern: string, 
    endPattern: string, 
    chapterPattern: string,
    replacements: Map<string, string>,
    chapters: Array<Chapter>
    ) : string  => {
        //first replace line breaks
        var dc = text.replace(new RegExp(`\r\n`,"gm")," ");
        //then find the beginning and end indexes and substring
        const begin = dc.indexOf(beginPattern);
        const end = dc.indexOf(endPattern);
        var sdc = dc.substring(begin, end);
        //grab and then remove the titles
        var chaps = sdc.match(chapterPattern);
        for (var c in chaps) {
            const i = sdc.indexOf(c);
            chapters.push({index: i, name: c});  
        }
        var t = sdc.replace(new RegExp(chapterPattern,"gm"),"");
        //then work on replacements
        for (var m in replacements){
            for (var i=0;i<replacements[m].length;i++){
                    t = t.replace(m , replacements.get(m));
                }
        }
        //finally return the text
        return t;
}

export class TextLoader {
    public readonly source: TextSource;
    private proxyPath: string;
    public text: TextHolder;
    public chapters: Array<Chapter>;

    constructor(config: GameConfig) {
        this.source = randomizeTextSource(config.textSources);
        this.proxyPath = config.proxyPath;
        this.text = new TextHolder;
        this.chapters = new Array<Chapter>();
    }


    public LoadText() : Promise<any> {
        //need to redeclare/point to these since the resolution for the 
        //promise will not be aware of 'this'
        const b = this.source.beginPattern;
        const e = this.source.endPattern;
        const r = this.source.replacements;
        const cp = this.source.chapterPattern;
        var ci = this.chapters;
        var t = this.text;

        return fetch(this.proxyPath + this.source.path)
        .then(function(response) {
            const data = response.text()
            return Promise.resolve(data).then(
                d => data
            );
        })
        .then(function(d) {
            t.content = parseText(d, b, e, cp, r, ci);
            return;
        });
    }
}