import { updateXPosition, updateTextPosition } from '../gameLogic';
import { TextHolder } from '../textLoader'

describe('When calling updateXPosition', () => {
  it('should return x value', () => {
    var camera = {speed: 15, position: {x: 5, y:20}}
    expect(updateXPosition(camera)).toStrictEqual(5);
  });
  it('should not return y value', () => {
    var camera = {speed: 15, position: {x: 5, y:20}}
    expect(updateXPosition(camera)).not.toStrictEqual(20);
  });
  it('should limit speed', () => {
    var camera = {speed: 15, position: {x: 5, y:20}}
    updateXPosition(camera)
    expect(camera.speed).toStrictEqual(0.5);
  });
});

describe('When calling updateTextPosition', () => {
  it('should return camera.postition and not instance if not moving', () => {
    const scene = {getMeshByID: (s: string) => {
      return null;
    }}
    var camera = {speed: 15, position: {x: 5, y:20}}
    const fontLoader = {
      instanceLetter: () => {expect(true).toStrictEqual(false)}, //force failure
      deinstanceLetter: () => { return null }
    }
    const xPosition = 5;
    var text = new TextHolder;
    text.content = '123';
    expect(updateTextPosition(scene, camera, xPosition, text, fontLoader)).toStrictEqual(5);
  });
  it("should not instance if mesh isn't not null", () => {
    const scene = {getMeshByID: (s: string) => {
      return 'z';
    }}
    var camera = {speed: 15, position: {x: 5, y:20}}
    const fontLoader = {
      instanceLetter: () => {expect(true).toStrictEqual(false)}, //force failure
      deinstanceLetter: () => { return null }
    }
    const xPosition = 4;
    var text = new TextHolder;
    text.content = '123';
    expect(updateTextPosition(scene, camera, xPosition, text, fontLoader)).toStrictEqual(5);
  });
  it("should simulate going right", () => {
    const scene = {getMeshByID: (s: string) => {
      return null;
    }}
    var camera = {speed: 15, position: {x: 5, y:20}}
    const fontLoader = {
      instanceLetter: () => {return null},
      deinstanceLetter: () => { return null }
    }
    const xPosition = 4;
    var text = new TextHolder;
    text.content = '123';
    expect(updateTextPosition(scene, camera, xPosition, text, fontLoader)).toStrictEqual(5);
  });
  it("should simulate going left", () => {
    const scene = {getMeshByID: (s: string) => {
      return null;
    }}
    var camera = {speed: 15, position: {x: 4, y:20}}
    const fontLoader = {
      instanceLetter: () => {return null},
      deinstanceLetter: () => { return null }
    }
    const xPosition = 5;
    var text = new TextHolder;
    text.content = '123';
    expect(updateTextPosition(scene, camera, xPosition, text, fontLoader)).toStrictEqual(4);
  });
});