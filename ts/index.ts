import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
//import { Camera } from "@babylonjs/core/Cameras";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";

import { FontLoader } from "./fontLoader";
import { GameConfig } from "./gameConfig";
import { TextHolder, TextLoader } from "./textLoader";
//import * from "./gameLogic"

class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private camera: UniversalCamera;
    private light: HemisphericLight;
    private fl: FontLoader;
    private tl: TextLoader;
    private config: GameConfig;
    private lastX: number;
    private text: TextHolder;

    constructor(canvasElement: string) {
        //config must load first
        this.config = new GameConfig();

        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        this.engine = new Engine(this.canvas);
        this.engine.loadingScreen = this.config.loadingScreen;
        this.engine.displayLoadingUI();
        this.scene = new Scene(this.engine);
        this.scene.clearColor.set(0, 0, 0, 1);
        this.camera = new UniversalCamera("camera1", new Vector3(0, 0, -10), this.scene);
        //this.camera.gamepadAngularSensibility = 600000;
        this.camera.angularSensibility = 600000;
        //this.camera.touchMoveSensibility = 1;
        //this.camera.gamepadMoveSensibility = 1;
        //this.camera.setTarget(Vector3.Zero());
        //this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        //this.camera.fov = 0.1;
        this.light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.7;
        this.fl = new FontLoader();
        this.tl = new TextLoader(this.config);
        this.scene.activeCamera.inputs.removeByType("");
        this.scene.activeCamera.attachControl(this.canvas, false);
        this.lastX = 0;
        this.text = new TextHolder;
        //Listen for browser/canvas resize events
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    public CreateScene(): void {
        //TODO: Add author, title, and chapter info
        //TODO: have network promise fire at same time as mesh loads

        // const fl = this.fl;
        // const s = this.scene;
        // const e = this.scene;
        // const tl = this.tl;
        // var txt = this.text;
        // const p = this.fl.LoadFonts(this.scene,this.config.graphicsPath, this.config.fontFile);
        // Promise.all(p).then(function() {
        //     const t = tl.LoadText();
        //     //Only after all meshes are loaded, then we can try to instance text.
        //     //Do the full http call here to avoid any race conditions since it's
        //     //also an async promise.
        //     Promise.resolve(t).then(function(v){
        //     //for (let i=0; i<v.sdc.length; i++) {
        //     txt.content = v.sdc;
        //     console.log(txt.content);
        //     for (let i=0; i<40; i++) {
        //         fl.InstanceLetter(s, txt.content[i], i);
        //     }
        //     e.hideLoadingUI();
        //     });
        //   });

        ///////////------------------TESTING ONLY!
        const fl = this.fl;
        const s = this.scene;
        const e = this.engine;
        var t = this.text;
        //const t = `In the morning of his two hundred and fiftieth year Shepperalk the centaur went to the golden coffer, wherein the treasure of the centaurs was, and taking from it the hoarded amulet that his father, Jyshak, in the years of his prime, had hammered from mountain gold and set with opals bartered from the gnomes, he put it upon his wrist, and said no word, but walked from his mother's cavern. And he took with him too that clarion of the centaurs, that famous silver horn, that in its time had summoned to surrender seventeen cities of Man, and for twenty years had brayed at star-girt walls in the Siege of Tholdenblarna, the citadel of the gods, what time the centaurs waged their fabulous war and were not broken by any force of arms, but retreated slowly in a cloud of dust before the final miracle of the gods that They brought in Their desperate need from Their ultimate armoury. He took it and strode away, and his mother only sighed and let him go.  She knew that today he would not drink at the stream coming down from the terraces of Varpa Niger, the inner land of the mountains, that today he would not wonder awhile at the sunset and afterwards trot back to the cavern again to sleep on rushes pulled by rivers that know not Man. She knew that it was with him as it had been of old with his father, and with Goom the father of Jyshak, and long ago with the gods. Therefore she only sighed and let him go.  But he, coming out from the cavern that was his home, went for the first time over the little stream, and going round the corner of the crags saw glittering beneath him the mundane plain. And the wind of the autumn that was gilding the world, rushing up the slopes of the mountain, beat cold on his naked flanks. He raised his head and snorted.  "I am a man-horse now!" he shouted aloud; and leaping from crag to crag he galloped by valley and chasm, by torrent-bed and scar of avalanche, until he came to the wandering leagues of the plain, and left behind him for ever the Athraminaurian mountains.  His goal was Zretazoola, the city of Sombelenë. What legend of Sombelenë's inhuman beauty or of the wonder of her mystery had ever floated over the mundane plain to the fabulous cradle of the centaurs' race, the Athraminaurian mountains, I do not know. Yet in the blood of man there is a tide, an old sea-current rather, that is somehow akin to the twilight, which brings him rumours of beauty from however far away, as driftwood is found at sea from islands not yet discovered: and this spring-tide of current that visits the blood of man comes from the fabulous quarter of his lineage, from the legendary, the old; it takes him out to the woodlands, out to the hills; he listens to ancient song. So it may be that Shepperalk's fabulous blood stirred in those lonely mountains away at the edge of the world to rumours that only the airy twilight knew and only confided secretly to the bat, for Shepperalk was more legendary even than man. Certain it was that he headed from the first for the city of Zretazoola, where Sombelenë in her temple dwelt; though all the mundane plain, its rivers and mountains, lay between Shepperalk's home and the city he sought.  When first the feet of the centaur touched the grass of that soft alluvial earth he blew for joy upon the silver horn, he pranced and caracoled, he gambolled over the leagues; pace came to him like a maiden with a lamp, a new and beautiful wonder; the wind laughed as it passed him. He put his head down low to the scent of the flowers, he lifted it up to be nearer the unseen stars, he revelled through kingdoms, took rivers in his stride; how shall I tell you, ye that dwell in cities, how shall I tell you what he felt as he galloped? He felt for strength like the towers of Bel-Narana; for lightness like those gossamer palaces that the fairy-spider builds 'twixt heaven and sea along the coasts of Zith; for swiftness like some bird racing up from the morning to sing in some city's spires before daylight comes. He was the sworn companion of the wind. For joy he was as a song; the lightnings of his legendary sires, the earlier gods, began to mix with his blood; his hooves thundered. He came to the cities of men, and all men trembled, for they remembered the ancient mythical wars, and now they dreaded new battles and feared for the race of man. Not by Clio are these wars recorded; history does not know them, but what of that? Not all of us have sat at historians' feet, but all have learned fable and myth at their mothers' knees. And there were none that did not fear strange wars when they saw Shepperalk swerve and leap along the public ways. So he passed from city to city.  By night he lay down unpanting in the reeds of some marsh or a forest; before dawn he rose triumphant, and hugely drank of some river in the dark, and splashing out of it would trot to some high place to find the sunrise, and to send echoing eastwards the exultant greetings of his jubilant horn. And lo! the sunrise coming up from the echoes, and the plains new-lit by the day, and the leagues spinning by like water flung from a top, and that gay companion, the loudly laughing wind, and men and the fears of men and their little cities; and, after that, great rivers and waste spaces and huge new hills, and then new lands beyond them, and more cities of men, and always the old companion, the glorious wind. Kingdom by kingdom slipt by, and still his breath was even. "It is a golden thing to gallop on good turf in one's youth," said the young man-horse, the centaur. "Ha, ha," said the wind of the hills, and the winds of the plain answered.  Bells pealed in frantic towers, wise men consulted parchments, astrologers sought of the portent from the stars, the aged made subtle prophecies. "Is he not swift?" said the young. "How glad he is," said children.  Night after night brought him sleep, and day after day lit his gallop, till he came to the lands of the Athalonian men who live by the edges of the mundane plain, and from them he came to the lands of legend again such as those in which he was cradled on the other side of the world, and which fringe the marge of the world and mix with the twilight. And there a mighty thought came into his untired heart, for he knew that he neared Zretazoola now, the city of Sombelenë.  It was late in the day when he neared it, and clouds coloured with evening rolled low on the plain before him; he galloped on into their golden mist, and when it hid from his eyes the sight of things, the dreams in his heart awoke and romantically he pondered all those rumours that used to come to him from Sombelenë, because of the fellowship of fabulous things. She dwelt (said evening secretly to the bat) in a little temple by a lone lakeshore. A grove of cypresses screened her from the city, from Zretazoola of the climbing ways. And opposite her temple stood her tomb, her sad lake-sepulchre with open door, lest her amazing beauty and the centuries of her youth should ever give rise to the heresy among men that lovely Sombelenë was immortal: for only her beauty and her lineage were divine.  Her father had been half centaur and half god; her mother was the child of a desert lion and that sphinx that watches the pyramids;--she was more mystical than Woman.  Her beauty was as a dream, was as a song; the one dream of a lifetime dreamed on enchanted dews, the one song sung to some city by a deathless bird blown far from his native coasts by storm in Paradise. Dawn after dawn on mountains of romance or twilight after twilight could never equal her beauty; all the glow-worms had not the secret among them nor all the stars of night; poets had never sung it nor evening guessed its meaning; the morning envied it, it was hidden from lovers.  She was unwed, unwooed.  The lions came not to woo her because they feared her strength, and the gods dared not love her because they knew she must die.  This was what evening had whispered to the bat, this was the dream in the heart of Shepperalk as he cantered blind through the mist. And suddenly there at his hooves in the dark of the plain appeared the cleft in the legendary lands, and Zretazoola sheltering in the cleft, and sunning herself in the evening.  Swiftly and craftily he bounded down by the upper end of the cleft, and entering Zretazoola by the outer gate which looks out sheer on the stars, he galloped suddenly down the narrow streets. Many that rushed out on to balconies as he went clattering by, many that put their heads from glittering windows, are told of in olden song. Shepperalk did not tarry to give greetings or to answer challenges from martial towers, he was down through the earthward gateway like the thunderbolt of his sires, and, like Leviathan who has leapt at an eagle, he surged into the water between temple and tomb.  He galloped with half-shut eyes up the temple-steps, and, only seeing dimly through his lashes, seized Sombelenë by the hair, undazzled as yet by her beauty, and so haled her away; and, leaping with her over the floorless chasm where the waters of the lake fall unremembered away into a hole in the world, took her we know not where, to be her slave for all centuries that are allowed to his race.  Three blasts he gave as he went upon that silver horn that is the world-old treasure of the centaurs. These were his wedding bells.    When Thangobrind the jeweller heard the ominous cough, he turned at once upon that narrow way. A thief was he, of very high repute, being patronized by the lofty and elect, for he stole nothing smaller than the Moomoo's egg, and in all his life stole only four kinds of stone--the ruby, the diamond, the emerald, and the sapphire; and, as jewellers go, his honesty was great. Now there was a Merchant Prince who had come to Thangobrind and had offered his daughter's soul for the diamond that is larger than the human head and was to be found on the lap of the spider-idol, Hlo-hlo`;
        const p = this.fl.LoadFonts(this.scene, this.config.graphicsPath, this.config.fontFile);
        Promise.all(p).then(function () {
            t.content = `In the morning of his two hundred and fiftieth year Shepperalk the centaur went to the golden coffer, wherein the treasure of the centaurs was, and taking from it the hoarded amulet that his father, Jyshak, in the years of his prime, had hammered from mountain gold and set with opals bartered from the gnomes, he put it upon his wrist, and said no word, but walked from his mother's cavern. And he took with him too that clarion of the centaurs, that famous silver horn, that in its time had summoned to surrender seventeen cities of Man, and for twenty years had brayed at star-girt walls in the Siege of Tholdenblarna, the citadel of the gods, what time the centaurs waged their fabulous war and were not broken by any force of arms, but retreated slowly in a cloud of dust before the final miracle of the gods that They brought in Their desperate need from Their ultimate armoury. He took it and strode away, and his mother only sighed and let him go.  She knew that today he would not drink at the stream coming down from the terraces of Varpa Niger, the inner land of the mountains, that today he would not wonder awhile at the sunset and afterwards trot back to the cavern again to sleep on rushes pulled by rivers that know not Man. She knew that it was with him as it had been of old with his father, and with Goom the father of Jyshak, and long ago with the gods. Therefore she only sighed and let him go.  But he, coming out from the cavern that was his home, went for the first time over the little stream, and going round the corner of the crags saw glittering beneath him the mundane plain. And the wind of the autumn that was gilding the world, rushing up the slopes of the mountain, beat cold on his naked flanks. He raised his head and snorted.  "I am a man-horse now!" he shouted aloud; and leaping from crag to crag he galloped by valley and chasm, by torrent-bed and scar of avalanche, until he came to the wandering leagues of the plain, and left behind him for ever the Athraminaurian mountains.  His goal was Zretazoola, the city of Sombelenë. What legend of Sombelenë's inhuman beauty or of the wonder of her mystery had ever floated over the mundane plain to the fabulous cradle of the centaurs' race, the Athraminaurian mountains, I do not know. Yet in the blood of man there is a tide, an old sea-current rather, that is somehow akin to the twilight, which brings him rumours of beauty from however far away, as driftwood is found at sea from islands not yet discovered: and this spring-tide of current that visits the blood of man comes from the fabulous quarter of his lineage, from the legendary, the old; it takes him out to the woodlands, out to the hills; he listens to ancient song. So it may be that Shepperalk's fabulous blood stirred in those lonely mountains away at the edge of the world to rumours that only the airy twilight knew and only confided secretly to the bat, for Shepperalk was more legendary even than man. Certain it was that he headed from the first for the city of Zretazoola, where Sombelenë in her temple dwelt; though all the mundane plain, its rivers and mountains, lay between Shepperalk's home and the city he sought.  When first the feet of the centaur touched the grass of that soft alluvial earth he blew for joy upon the silver horn, he pranced and caracoled, he gambolled over the leagues; pace came to him like a maiden with a lamp, a new and beautiful wonder; the wind laughed as it passed him. He put his head down low to the scent of the flowers, he lifted it up to be nearer the unseen stars, he revelled through kingdoms, took rivers in his stride; how shall I tell you, ye that dwell in cities, how shall I tell you what he felt as he galloped? He felt for strength like the towers of Bel-Narana; for lightness like those gossamer palaces that the fairy-spider builds 'twixt heaven and sea along the coasts of Zith; for swiftness like some bird racing up from the morning to sing in some city's spires before daylight comes. He was the sworn companion of the wind. For joy he was as a song; the lightnings of his legendary sires, the earlier gods, began to mix with his blood; his hooves thundered. He came to the cities of men, and all men trembled, for they remembered the ancient mythical wars, and now they dreaded new battles and feared for the race of man. Not by Clio are these wars recorded; history does not know them, but what of that? Not all of us have sat at historians' feet, but all have learned fable and myth at their mothers' knees. And there were none that did not fear strange wars when they saw Shepperalk swerve and leap along the public ways. So he passed from city to city.  By night he lay down unpanting in the reeds of some marsh or a forest; before dawn he rose triumphant, and hugely drank of some river in the dark, and splashing out of it would trot to some high place to find the sunrise, and to send echoing eastwards the exultant greetings of his jubilant horn. And lo! the sunrise coming up from the echoes, and the plains new-lit by the day, and the leagues spinning by like water flung from a top, and that gay companion, the loudly laughing wind, and men and the fears of men and their little cities; and, after that, great rivers and waste spaces and huge new hills, and then new lands beyond them, and more cities of men, and always the old companion, the glorious wind. Kingdom by kingdom slipt by, and still his breath was even. "It is a golden thing to gallop on good turf in one's youth," said the young man-horse, the centaur. "Ha, ha," said the wind of the hills, and the winds of the plain answered.  Bells pealed in frantic towers, wise men consulted parchments, astrologers sought of the portent from the stars, the aged made subtle prophecies. "Is he not swift?" said the young. "How glad he is," said children.  Night after night brought him sleep, and day after day lit his gallop, till he came to the lands of the Athalonian men who live by the edges of the mundane plain, and from them he came to the lands of legend again such as those in which he was cradled on the other side of the world, and which fringe the marge of the world and mix with the twilight. And there a mighty thought came into his untired heart, for he knew that he neared Zretazoola now, the city of Sombelenë.  It was late in the day when he neared it, and clouds coloured with evening rolled low on the plain before him; he galloped on into their golden mist, and when it hid from his eyes the sight of things, the dreams in his heart awoke and romantically he pondered all those rumours that used to come to him from Sombelenë, because of the fellowship of fabulous things. She dwelt (said evening secretly to the bat) in a little temple by a lone lakeshore. A grove of cypresses screened her from the city, from Zretazoola of the climbing ways. And opposite her temple stood her tomb, her sad lake-sepulchre with open door, lest her amazing beauty and the centuries of her youth should ever give rise to the heresy among men that lovely Sombelenë was immortal: for only her beauty and her lineage were divine.  Her father had been half centaur and half god; her mother was the child of a desert lion and that sphinx that watches the pyramids;--she was more mystical than Woman.  Her beauty was as a dream, was as a song; the one dream of a lifetime dreamed on enchanted dews, the one song sung to some city by a deathless bird blown far from his native coasts by storm in Paradise. Dawn after dawn on mountains of romance or twilight after twilight could never equal her beauty; all the glow-worms had not the secret among them nor all the stars of night; poets had never sung it nor evening guessed its meaning; the morning envied it, it was hidden from lovers.  She was unwed, unwooed.  The lions came not to woo her because they feared her strength, and the gods dared not love her because they knew she must die.  This was what evening had whispered to the bat, this was the dream in the heart of Shepperalk as he cantered blind through the mist. And suddenly there at his hooves in the dark of the plain appeared the cleft in the legendary lands, and Zretazoola sheltering in the cleft, and sunning herself in the evening.  Swiftly and craftily he bounded down by the upper end of the cleft, and entering Zretazoola by the outer gate which looks out sheer on the stars, he galloped suddenly down the narrow streets. Many that rushed out on to balconies as he went clattering by, many that put their heads from glittering windows, are told of in olden song. Shepperalk did not tarry to give greetings or to answer challenges from martial towers, he was down through the earthward gateway like the thunderbolt of his sires, and, like Leviathan who has leapt at an eagle, he surged into the water between temple and tomb.  He galloped with half-shut eyes up the temple-steps, and, only seeing dimly through his lashes, seized Sombelenë by the hair, undazzled as yet by her beauty, and so haled her away; and, leaping with her over the floorless chasm where the waters of the lake fall unremembered away into a hole in the world, took her we know not where, to be her slave for all centuries that are allowed to his race.  Three blasts he gave as he went upon that silver horn that is the world-old treasure of the centaurs. These were his wedding bells.    When Thangobrind the jeweller heard the ominous cough, he turned at once upon that narrow way. A thief was he, of very high repute, being patronized by the lofty and elect, for he stole nothing smaller than the Moomoo's egg, and in all his life stole only four kinds of stone--the ruby, the diamond, the emerald, and the sapphire; and, as jewellers go, his honesty was great. Now there was a Merchant Prince who had come to Thangobrind and had offered his daughter's soul for the diamond that is larger than the human head and was to be found on the lap of the spider-idol, Hlo-hlo,`;
            var ci = new Map<number, string>();
            ci[57] = 'Story 1';
            ci[1047] = 'Story 2';
            ci[2047] = 'Story 3';
            //for (let i=0; i<rt.length; i++) {
            for (let i = 0; i < 41; i++) {
                fl.InstanceLetter(s, t.content[i], i);
            }
            e.hideLoadingUI();
        });
        //var t = this.tl.LoadText();
        //t is {text, chapterIndicies}
    }

    public Run(): void {
        this.engine.runRenderLoop(() => {
            var x = Math.floor(this.camera.position.x);
            //rounding causes a slight problem when calculating the instances
            //to remove, but we compensate by deinstancing a range.
            var max = x + 40;
            var min = x - 40;
            if (this.camera.speed > 0.5) {
                this.camera.speed = 0.5;
            }
            //Add new letters
            if (this.lastX < x && max > -1) {
                //going right
                if (max <= this.text.content.length) {}
                var i = this.scene.getMeshByID((max).toString());
                if (i == null) {
                    this.fl.InstanceLetter(this.scene, this.text.content[max], max);
                }
            }
            if (this.lastX > x && min <= this.text.content.length) {
                //going left
                if (min > -1) {
                    var i = this.scene.getMeshByID((min).toString());
                    if (i == null) {
                        this.fl.InstanceLetter(this.scene, this.text.content[min], min);
                    }
                }
            }
            //Remove ones out of range
            //removing a small range to compensate for sudden direction shifts
            for (let i = max + 1;max + 3 > i; i++) {
                this.fl.DeinstanceLetter(this.scene, i)
            }
            for (let i = min - 1;min - 3 < i; i--) {
                this.fl.DeinstanceLetter(this.scene, i)
            }

            this.lastX = x;
            this.scene.render();
        });
    }
}

// Create our game class using the render canvas element
let game = new Game("renderCanvas");

// Create the scene
game.CreateScene();

// start animation
game.Run();