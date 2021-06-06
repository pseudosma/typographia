import { charNameFix, instanceLetter, deinstanceLetter, loadFonts } from '../fontLoader'

describe('When using charNameFix', () => {
  it('should label characters ourside of list as "special"', () => {
    expect(charNameFix('‡')).toStrictEqual('special');
  });
  it('should return lower case', () => {
    expect(charNameFix('x')).toStrictEqual('x');
  });
  it('should return upper case', () => {
    expect(charNameFix('B')).toStrictEqual('B');
  });
  it('should replace numbers with the word', () => {
    expect(charNameFix('1')).toStrictEqual('one');
  });
  it('should replace zero with the word', () => {
    expect(charNameFix('0')).toStrictEqual('zero');
  });
  it('should replace with comma', () => {
    expect(charNameFix(',')).toStrictEqual('comma');
  });
  it('should replace dash', () => {
    expect(charNameFix('-')).toStrictEqual('dash');
  });
  it('should replace period', () => {
    expect(charNameFix('.')).toStrictEqual('period');
  });
  it('should replace question mark', () => {
    expect(charNameFix('?')).toStrictEqual('questionmark');
  });
  it('should replace forward slash', () => {
    expect(charNameFix('/')).toStrictEqual('forwardslash');
  });
  it('should replace single quote', () => {
    expect(charNameFix("'")).toStrictEqual('singlequote');
  });
  it('should replace double quote', () => {
    expect(charNameFix('"')).toStrictEqual('doublequote');
  });
  it('should replace colon', () => {
    expect(charNameFix(':')).toStrictEqual('colon');
  });
  it('should replace semi colon', () => {
    expect(charNameFix(';')).toStrictEqual('semicolon');
  });
  it('should replace back slash', () => {
    expect(charNameFix('\\')).toStrictEqual('backslash');
  });
  it('should replace exclamation point', () => {
    expect(charNameFix('!')).toStrictEqual('exclamationpoint');
  });
  it('should replace open parentheses', () => {
    expect(charNameFix('(')).toStrictEqual('openparen');
  });
  it('should replace close parentheses', () => {
    expect(charNameFix(')')).toStrictEqual('closeparen');
  });
  it('should return empty string for a space', () => {
    expect(charNameFix(' ')).toStrictEqual('');
  });
});

describe('When using instanceLetter', () => {
  it('should skip instancing if scene has null base mesh', () => {
    const scene = {
      getMeshByName: () => {return null},
      addMesh: () => {expect(true).toStrictEqual(false)},
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
    expect(i.isVisible).toStrictEqual(true);
    expect(i.position.y).toStrictEqual(-1);
    expect(i.position.x).toStrictEqual(0);
  });
});

describe('When using deinstanceLetter', () => {
  it('should skip instancing if scene has null base mesh', () => {
    const scene = {
      getMeshByName: () => {return null},
      addMesh: () => {expect(true).toStrictEqual(false)},
    };
    deinstanceLetter(scene, 0);
  });
  it('should call dispose on mesh', () => {
    var i = 0;
    var am = {dispose: () => { i = 1 }}
    const scene = {
      getMeshByName: () => {return am},
      addMesh: () => {expect(true).toStrictEqual(false)},
    };
    deinstanceLetter(scene, 0);
    expect(i).toStrictEqual(1);
  });
});

describe('When using loadFonts', () => {
  it('should ', () => {
    const sceneLoader = {ImportMesh: () => {return null}};
    const scene = {};
    var p = loadFonts(sceneLoader, scene, 'foo', 'bar');
    //should have promises equal to the lenght of "all"
    expect(p.length).toStrictEqual(76);
  });
});