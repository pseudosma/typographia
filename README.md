# Typographia

*This is for the readers, the writers, the daydreamers, and everyone who has ever found themselves lost amongst the words.*

---

Typographia is a work-in-progress BabylonJS game based around the concept of turning a story, *any story*, into a game level. The core idea is to make a story more engaging to someone who'd otherwise not be willing to read it. It includes a dedicated web reader that parses an http response into 3D rendered text that players interact with. 

Most features have not yet been implemented, so for now use the right and left arrow keys to navigate the text in the scene.

The default configuration points to Lord Dunsany's "Book of Wonder" hosted on [Project Gutenberg](https://www.gutenberg.org/).

:warning: Project Gutenberg is a great source of stories for Typographia, but be aware that the site hosts literature that is in public domain **under the copyright laws of the United States**. If you are hosting Typographia outside of the US, you should get legal guidance before using this as the source material for this app.

## Building

Before attempting any of the following tasks, be sure that nodeJS and npm are installed. Be sure to install all dependencies with `npm install`.

### Dev

Run `npm run dev` to begin a local webpack-dev-server server with a cors-anywhere-cli proxy. Navigate to [localhost:8080](http://localhost:8080/) to see the result 

### Deploy

TBD

### Execute tests

* Run `npm test`

## Customization

Typographia is built around highly customizable paradigms; most parts of the app are easily interchangeable.

### Change the text rendered

Typographia is a web reader, and pointing it to any website can produce a text-based level to play in.

To point it to a given site, change the value in *config.json* under textSources.sendArgs.path. More information on the possible values in sendArgs are described in the [flechette documentation](https://github.com/pseudosma/flechette#basic-example). 

* *beginPattern* can be used to dictate where parsing starts.
* *endPattern* can be used to dictate where parsing ends.
* *chapterPattern* can be used to pull out chapters, if the text contains them.
* *replacements* can be used to replace text.

:note: If you have multiple TextSources in the config, one will be chosen at random for text generation.

### Change the font

The default font used by Typographia is called **Atlanta**. The aesthetic is an uneven, serifed typeface meant to mimic that of old pulp novels. This app currently only supports a shortened latin alphabet.

To create your own font:

* Create a file in Blender and make a mesh for each letter. The names of each mesh must match the letter they represent.
    * A mesh representing the letter C must be named "C". A mesh representing the letter c must be named "c"
* Name numbers with the fully spelled name.
    * A mesh representing the number 1 must be named "one".
* Special characters must be represented with the following mesh names:
    * , is "comma"
    * \- is "dash"
    * . is "period"
    * ? is "questionmark"
    * / is "forwardslash"
    * ' is "singlequote" 
    * " is "doublequote"
    * : is "colon"
    * ; is "semicolon"
    * \ is "backslash"
    * ! is "exclamationpont"
    * ( is "openparen"
    * ) is "closeparen"
* A mesh named "special" should be created to represent any character encountered which cannot be rendered (one which isn't covered by the above scenarios).
* Use the [BabylonJS Blender Plugin](https://doc.babylonjs.com/extensions/Exporters/Blender) to create a new *.babylon* file, then add it to the *graphics* folder.
* Change the graphicsFiles.font value in *config.json* to point to the new file.

### Change the character graphics

TBD

### Change the loading screen

Add inline HTML directly to the **loadingInnerHtml** value in *config.json*.

## Current Status

Unfinished and pre-alpha, with many bugs to work out. Most gameplay mechanics are in a testing phase.
