import 'mocha';
import { expect } from 'chai';
import { charNameFix, instanceLetter, deinstanceLetter, loadFonts } from '../fontLoader'

describe('When using charNameFix', () => {
  it('should label characters ourside of list as "special"', () => {
    expect(charNameFix('‡')).to.equal('special');
  });
  it('should return lower case', () => {
    expect(charNameFix('x')).to.equal('x');
  });
  it('should return upper case', () => {
    expect(charNameFix('B')).to.equal('B');
  });
  it('should replace numbers with the word', () => {
    expect(charNameFix('1')).to.equal('one');
  });
  it('should replace zero with the word', () => {
    expect(charNameFix('0')).to.equal('zero');
  });
  it('should replace with comma', () => {
    expect(charNameFix(',')).to.equal('comma');
  });
  it('should replace dash', () => {
    expect(charNameFix('-')).to.equal('dash');
  });
  it('should replace period', () => {
    expect(charNameFix('.')).to.equal('period');
  });
  it('should replace question mark', () => {
    expect(charNameFix('?')).to.equal('questionmark');
  });
  it('should replace forward slash', () => {
    expect(charNameFix('/')).to.equal('forwardslash');
  });
  it('should replace single quote', () => {
    expect(charNameFix("'")).to.equal('singlequote');
  });
  it('should replace double quote', () => {
    expect(charNameFix('"')).to.equal('doublequote');
  });
  it('should replace colon', () => {
    expect(charNameFix(':')).to.equal('colon');
  });
  it('should replace semi colon', () => {
    expect(charNameFix(';')).to.equal('semicolon');
  });
  it('should replace back slash', () => {
    expect(charNameFix('\\')).to.equal('backslash');
  });
  it('should replace exclamation point', () => {
    expect(charNameFix('!')).to.equal('exclamationpoint');
  });
  it('should replace open parentheses', () => {
    expect(charNameFix('(')).to.equal('openparen');
  });
  it('should replace close parentheses', () => {
    expect(charNameFix(')')).to.equal('closeparen');
  });
  it('should return empty string for a space', () => {
    expect(charNameFix(' ')).to.equal('');
  });
});

describe('When using instanceLetter', () => {
  it('should skip instancing if scene has null base mesh', () => {
    const scene = {
      getMeshByName: () => {return null},
      addMesh: () => {expect(true).to.equal(false)},
    };
    instanceLetter(scene, 'bleh', 0);
  });
  it('should instance if scene it finds a base mesh', () => {    
    var i = {
      isVisible: false,
      position: {x: 1, y: 1}
    };
    var am = {createInstance: () => { return i }}
    const scene = {
      getMeshByName: () => {return am},
      addMesh: () => {return null},
    };
    instanceLetter(scene, 'bleh', 0);
    expect(i.isVisible).to.equal(true);
    expect(i.position.y).to.equal(-1);
    expect(i.position.x).to.equal(0);
  });
});

describe('When using deinstanceLetter', () => {
  it('should skip instancing if scene has null base mesh', () => {
    const scene = {
      getMeshByName: () => {return null},
      addMesh: () => {expect(true).to.equal(false)},
    };
    deinstanceLetter(scene, 0);
  });
  it('should call dispose on mesh', () => {
    var i = 0;
    var am = {dispose: () => { i = 1 }}
    const scene = {
      getMeshByName: () => {return am},
      addMesh: () => {expect(true).to.equal(false)},
    };
    deinstanceLetter(scene, 0);
    expect(i).to.equal(1);
  });
});

describe('When using loadFonts', () => {
  it('should ', () => {
    const sceneLoader = {ImportMesh: () => {return null}};
    const scene = {};
    var p = loadFonts(sceneLoader, scene, 'foo', 'bar');
    //should have promises equal to the lenght of "all"
    expect(p.length).to.equal(76);
  });
});