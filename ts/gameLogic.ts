import { TextHolder } from  './textLoader'

export const updateXPosition = (camera) => {
    //limit camera movement
    if (camera.speed > 0.5) {
        camera.speed = 0.5;
    }
    return Math.floor(camera.position.x);
}

export const updateTextPosition = (scene, camera, xPosition: number, text: TextHolder, fontLoader) => {
    var x = updateXPosition(camera);
    //rounding causes a slight problem when calculating the instances to remove
    //but we compensate by de-instancing a range.
    var max = x + 40;
    var min = x - 40;
    //Add new letters
    if (xPosition < x && max > -1) {
        //going right
        var i = scene.getMeshByID((max).toString());
        if (i == null) {
            fontLoader.instanceLetter(scene, text.content[max], max);
        }
    }
    if (xPosition > x && min <= text.content.length) {
        //going left
        if (min > -1) {
            var i = scene.getMeshByID((min).toString());
            if (i == null) {
                fontLoader.instanceLetter(scene, text.content[min], min);
            }
        }
    }
    //Remove ones out of range
    //removing a small range to compensate for sudden direction shifts
    for (let i = max + 1;max + 3 > i; i++) {
        fontLoader.deinstanceLetter(scene, i)
    }
    for (let i = min - 1;min - 3 < i; i--) {
        fontLoader.deinstanceLetter(scene, i)
    }
    return x;
}