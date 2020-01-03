import { GameConfig } from "./gameConfig";

const initialRegEx = /\\[r?n]|[\r?\n]|[\t]|\s{2,}/gm

export interface Chapter {
    index: number;
    name: string;
}

export class TextHolder {
    //allows strings to be passed by ref and chars to be evaluated by index
    content: string
}

export const parseText = (
    text :string, 
    beginPattern: string, 
    endPattern: string, 
    chapterPattern: string,
    replacements: Map<string, string>,
    chapters: Array<Chapter>
    ) : string  => {
        //first replace line breaks
        var dc = text.replace(initialRegEx,' ');
        //dc = text.replace(new RegExp(`\t|\s{2,}`,'gm'),' ');
        //then find the beginning and end indexes and substring
        const begin = beginPattern === '' ? 0 : dc.search(beginPattern);
        const end = endPattern === '' ? text.length : dc.search(endPattern);
        var t = dc.substring(begin, end);
        //grab and then remove the chapter titles
        if (chapterPattern != ''){
            var rgx = new RegExp(chapterPattern, "gm");
            var result;
            while (result = rgx.exec(t)) {
                chapters.push({index: result.index, name: result[0]});  
            };
            t = t.replace(rgx,"");
        };
        //then work on replacements
        if (replacements != null) {
            replacements.forEach((value,key) => {
                t = t.replace(key, value);
            });
        }
        //finally return the text
        return t;
}

export interface TextLoader {
    text: TextHolder;
    chapters: Array<Chapter>;
    LoadText(
        fetchFunc: any,
        config: GameConfig, 
        text: TextHolder, 
        chapters: Array<Chapter>) : Promise<any>;
}

export const loadText = (
    fetchFunc: any,
    config: GameConfig, 
    text: TextHolder, 
    chapters: Array<Chapter>) : Promise<any> => {
    //need to redeclare/point to these since the resolution for the 
        //promise will not be aware of 'this'
        //but vars within this func will be in scope
        const b = config.textSource.beginPattern;
        const e = config.textSource.endPattern;
        const r = config.textSource.replacements;
        const cp = config.textSource.chapterPattern;
        var ci = chapters;
        var t = text;

        return fetchFunc(config.proxyPath + config.textSource.path)
        .then((response) => {
            const data = response.text()
            return Promise.resolve(data).then(
                d => data
            );
        })
        .then((d) => {
            t.content = parseText(d, b, e, cp, r, ci);
            return;
        });
}

export const NewTextLoader = () : TextLoader => {
    return{
        text: new TextHolder,
        chapters: new Array<Chapter>(),
        LoadText: loadText
    }
}