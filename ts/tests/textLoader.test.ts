import 'mocha';
import { expect } from 'chai';
import { TextHolder, Chapter, parseText, loadText } from '../textLoader'

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
      )).to.equal('CDZCD');
    expect(chapters.length).to.equal(2);
    expect(chapters[0].name).to.equal('AB');
    expect(chapters[1].name).to.equal('ZY');
  });
});

describe('When using loadText', () => {
  it('should parse a fetch response and pass that into parseText', (done) => {
    const testFetch = () => {
      return new Promise((resolve) => {
        resolve({text: () => {return 'ajkshdaskhj'}});
      });
    };

    var config = {
      graphicsPath: 'a',
      graphicsFiles: {font: 'a', protagonist: 'a'},
      textSource: {
        path: 'a',
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
    var t = new TextHolder();
    var c = new Array<Chapter>();
    var p = loadText(testFetch, config, t, c);
    Promise.resolve(p).then(() => {
      expect(t.content).to.equal('ajksh ask');
      done();
    });
  });
});