import * as f from "flechette";
import { Chapter, parseText, loadText, TextLoader } from '../textLoader'

describe('When using parseText', () => {
  it('should parse strings, find chapters, and remove replacements', () => {
    const text = 'kjljkl&ABCD ZY}CD#dkjhgkdhj'; 
    const beginPattern = 'ABCD';
    const endPattern = '#';
    const chapterPattern = '([AB]|[ZY]){2}';
    const replacements = new Map<string, string>([[' ',''],['}','Z']]);
    var chapters = new Array<Chapter>();
    expect(parseText(
      text, 
      beginPattern, 
      endPattern, 
      chapterPattern,
      replacements,
      chapters
      )).toStrictEqual('CDZCD');
    expect(chapters.length).toStrictEqual(2);
    expect(chapters[0].name).toStrictEqual('AB');
    expect(chapters[1].name).toStrictEqual('ZY');
  });
  it('should return the raw string if no patterns are specified', () => {
    const text = 'alkjkshsj kjshjksdgs skhdjgjdsgkh'; 
    const beginPattern = '';
    const endPattern = '';
    const chapterPattern = '';
    const replacements = null;
    var chapters = new Array<Chapter>();
    expect(parseText(
      text, 
      beginPattern, 
      endPattern, 
      chapterPattern,
      replacements,
      chapters
      )).toStrictEqual('alkjkshsj kjshjksdgs skhdjgjdsgkh');
    expect(chapters.length).toStrictEqual(0);
  });
  it('should replace line breaks and tabs with spaces', () => {
    const text = `alkjkshsj   
       kjshjksdgs
skhdjgjdsgkh`; 
    const beginPattern = '';
    const endPattern = '';
    const chapterPattern = '';
    const replacements = null;
    var chapters = new Array<Chapter>();
    expect(parseText(
      text, 
      beginPattern, 
      endPattern, 
      chapterPattern,
      replacements,
      chapters
      )).toStrictEqual('alkjkshsj kjshjksdgs skhdjgjdsgkh');
    expect(chapters.length).toStrictEqual(0);
  });
});

describe('When using loadText', () => {    
  it('should parse a fetch response and pass that into parseText', (done) => {
    const t = new TextLoader();

    const m = jest.spyOn(f, "send");
    m.mockImplementation((sendArgs: f.SendArgs, successFunc: f.ResponseFunc) => {
        successFunc({ 
        success: true,
        statusCode: 200,
        response: "ajkshdaskhj", 
        sent: { path: "" }});
    });

    var config = {
      graphicsPath: 'a',
      graphicsFiles: {font: 'a', protagonist: 'a'},
      textSource: {
        sendArgs: { path: 'a' },
        title: 'a',
        author: 'a',
        beginPattern: 'a',
        endPattern: 'hj',
        chapterPattern: '0',
        replacements: new Map<string, string>([['d',' '],['}','Z']]),
        protagonist: 'a',
      },
      proxyPath: 'a',
      loadingScreen: null
    }; 
    var p = loadText(t, config);
    Promise.resolve(p).then(() => {
      expect(t.text.content).toStrictEqual('ajksh ask');
      m.mockRestore();
      done();
    });
  });
});