import { 
  randomizeTextSource, 
  getProtagonistPath,
  CustomLoadingScreen, 
 } from '../gameConfig';

describe('When using randomizeTextSource', () => {
  it('should return random results', () => {
    const a = [{
        sendArgs: {path: 'a'},
        title: 'a',
        author: 'a',
        beginPattern: 'a',
        endPattern: 'a',
        chapterPattern: 'a',
        replacements: null,
        protagonist: 'a',
      },
      {
        sendArgs: {path: 'b'},
        title: 'b',
        author: 'b',
        beginPattern: 'b',
        endPattern: 'b',
        chapterPattern: 'b',
        replacements: null,
        protagonist: 'b',
      },
      {
        sendArgs: {path: 'c'},
        title: 'c',
        author: 'c',
        beginPattern: 'c',
        endPattern: 'c',
        chapterPattern: 'c',
        replacements: null,
        protagonist: 'c',
      },
      {
        sendArgs: {path: 'd'},
        title: 'd',
        author: 'd',
        beginPattern: 'd',
        endPattern: 'd',
        chapterPattern: 'd',
        replacements: null,
        protagonist: 'd',
      },
      {
        sendArgs: {path: 'e'},
        title: 'e',
        author: 'e',
        beginPattern: 'e',
        endPattern: 'e',
        chapterPattern: 'e',
        replacements: null,
        protagonist: 'e',
      },
    ];
    const first = randomizeTextSource(a);
    const second = randomizeTextSource(a);
    const third = randomizeTextSource(a);
    const fourth = randomizeTextSource(a);
    const fifth = randomizeTextSource(a);
    //extremely unlikely it returns all the same one
    console.log('The randomized TextSource.paths = ' + first.sendArgs.path + second.sendArgs.path + third.sendArgs.path + fourth.sendArgs.path + fifth.sendArgs.path);
    expect(first.sendArgs.path + second.sendArgs.path + third.sendArgs.path + fourth.sendArgs.path + fifth.sendArgs.path).not.toStrictEqual('aaaaa');
  });
});

describe('When using getProtagonistPath', () => {
  it('should get the protagonist path specified in the params', () => {
    const graphicsFiles = {knight: 'bleh', cat: 'meow'}
    expect(getProtagonistPath(graphicsFiles, 'knight')).toStrictEqual('bleh');
    expect(getProtagonistPath(graphicsFiles, 'cat')).toStrictEqual('meow');
  });
  it('should not return unknown params', () => {
    const graphicsFiles = {knight: 'bleh', cat: 'meow'}
    expect(getProtagonistPath(graphicsFiles, 'dog')).not.toStrictEqual('meow');
  });
});

describe('When using CustomLoadingScreen', () => {
  beforeAll(() => {
    document.body.innerHTML =`<!DOCTYPE html><div id="loadingScreen">test</div></html>`;
  });
  it('should be able to hide and reveal the loading screen', () => {

    expect(document.getElementById('loadingScreen').textContent).toStrictEqual('test');
    expect(document.querySelector("td")).toStrictEqual(null);

    //run constructor and test
    const c = new CustomLoadingScreen('<div><table><tr><td>x</td></tr></table></div>', document);
    expect(document.querySelector("td")).toStrictEqual(null);

    //show it and test
    c.displayLoadingUI();
    expect(document.querySelector("td").textContent).toStrictEqual('x');
    //hide it and test
    c.hideLoadingUI();
    var h = document.getElementById('loadingScreen') as HTMLDivElement;
    expect(h.style.display).toStrictEqual('none');
  });
  afterAll(() => {
    document.body.innerHTML = "";
  });
});