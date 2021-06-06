import { GameConfig } from "./gameConfig";
import { ResponseFunc, send, ToggleFunc, FlechetteResponse } from "flechette";

const initialRegEx = /\\[r""n]|[\r?\n]|[\t]|\s{2,}/gm

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

export interface ITextLoader {
    text: TextHolder;
    chapters: Array<Chapter>;
    loadText(config: GameConfig): Promise<any>;
}

export const loadText = (loader: TextLoader,config: GameConfig) : Promise<any> => {
    return new Promise((resolve, reject) => {
        send(
            config.textSource.sendArgs,
            (resp: FlechetteResponse) => {
                loader.text.content = parseText(
                    resp.response, 
                    config.textSource.beginPattern, 
                    config.textSource.endPattern, 
                    config.textSource.chapterPattern, 
                    config.textSource.replacements, 
                    loader.chapters
                );
                loader.text
                resolve(null);
            },
            (resp: FlechetteResponse) => {
                console.error(resp.response);
                reject(resp.response);
            },
            (b: Boolean) => {}
        )
    });
}

export class TextLoader implements ITextLoader {
    constructor() {};
    text = new TextHolder;
    chapters = new Array<Chapter>();
    loadText = (config: GameConfig) => { return loadText(this, config) };
}