import 'mocha';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { 
  randomizeTextSource, 
  getProtagonistPath,
  CustomLoadingScreen, 
 } from '../gameConfig';

describe('When using randomizeTextSource', () => {
  it('should return random results', () => {
    const a = [{
        path: 'a',
        title: 'a',
        author: 'a',
        beginPattern: 'a',
        endPattern: 'a',
        chapterPattern: 'a',
        replacements: null,
        protagonist: 'a',
      },
      {
        path: 'b',
        title: 'b',
        author: 'b',
        beginPattern: 'b',
        endPattern: 'b',
        chapterPattern: 'b',
        replacements: null,
        protagonist: 'b',
      },
      {
        path: 'c',
        title: 'c',
        author: 'c',
        beginPattern: 'c',
        endPattern: 'c',
        chapterPattern: 'c',
        replacements: null,
        protagonist: 'c',
      },
      {
        path: 'd',
        title: 'd',
        author: 'd',
        beginPattern: 'd',
        endPattern: 'd',
        chapterPattern: 'd',
        replacements: null,
        protagonist: 'd',
      },
      {
        path: 'e',
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
    console.log('The randomized TextSource.paths = ' + first.path + second.path + third.path + fourth.path + fifth.path);
    expect(first.path + second.path + third.path + fourth.path + fifth.path).not.to.equal('aaaaa');
  });
});

describe('When using getProtagonistPath', () => {
  it('should get the protagonist path specified in the params', () => {
    const graphicsFiles = {knight: 'bleh', cat: 'meow'}
    expect(getProtagonistPath(graphicsFiles, 'knight')).to.equal('bleh');
    expect(getProtagonistPath(graphicsFiles, 'cat')).to.equal('meow');
  });
  it('should not return unknown params', () => {
    const graphicsFiles = {knight: 'bleh', cat: 'meow'}
    expect(getProtagonistPath(graphicsFiles, 'dog')).not.to.equal('meow');
  });
});

describe('When using CustomLoadingScreen', () => {
  it('should be able to hide and reveal the loading screen', () => {
    var dom = new JSDOM(`<!DOCTYPE html><div id="loadingScreen">test</div></html>`);

    expect(dom.window.document.getElementById('loadingScreen').textContent).to.equal('test');
    expect(dom.window.document.querySelector("td")).to.equal(null);

    //run constructor and test
    const c = new CustomLoadingScreen('<div><table><tr><td>x</td></tr></table></div>', dom.window.document);
    expect(dom.window.document.querySelector("td")).to.equal(null);

    //show it and test
    c.displayLoadingUI();
    expect(dom.window.document.querySelector("td").textContent).to.equal('x');
    //hide it and test
    c.hideLoadingUI();
    var h = dom.window.document.getElementById('loadingScreen') as HTMLDivElement;
    expect(h.style.display).to.equal('none');
  });
});