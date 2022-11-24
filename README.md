# pixi-webfont-loader

[![NPM](https://nodei.co/npm/pixi-webfont-loader.png?compact=true)](https://nodei.co/npm/pixi-webfont-loader/)

Add support for [webfonts](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts) to [PixiJS](https://github.com/pixijs/pixijs)'s Loader.  
This leverages plugin relies heavily on [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and the [FontFace API](https://developer.mozilla.org/en-US/docs/Web/API/FontFace)

Supported formats: **css**, **ttf**, **otf**, **woff**, and **woff2**!

Massive thanks to @bigtimebuddy and @ivanpopelyshev for his guidance on writing PixiJS plugins.

### This plugin is made for the `Loader` class found on Pixi v6.x. If you are using `Assets` / Pixi v7.x you won't need this plugin.

## Installation ⚙

### For bundlers 📦

`npm i pixi-webfont-loader`

Then in your code do this **once before using Loader**
```js
	import { WebfontLoaderPlugin } from "pixi-webfont-loader";

	Loader.registerPlugin(WebfontLoaderPlugin);
```

### For browser 🌐

Link the `umd` file in your html and then do this **once before using PIXI.Loader**
```js
	PIXI.Loader.registerPlugin(PIXI.WebfontLoaderPlugin);
```

## Example 🚀

In the example below, we will load a font from a file and then create two texts in different ways. One manually and one using the created objects in the resource.   

```js
	//register the webfont plugin into the Loader
	//DO IT ONLY ONCE AND BEFORE EVERYTHING AND YOU ARE GOOD TO GO.
	Loader.registerPlugin(WebfontLoaderPlugin);

	//add the css file
	Loader.shared.add({ name: "My awesome font", url: "./fonts/eng.css" });
	Loader.shared.add({ name: "Now in any format!", url: "./fonts/cool.ttf" });

	//set the callback
	Loader.shared.onComplete.once(() => {

		// Create it by hand: naming the font by its fontFamily and setting up the right style.
		const text1 = new Text("Lorem ipsum", new TextStyle({ fontFamily: "Thickhead", fill: 0x990000 }));

		// Create it by reading the resources. This will have the fontFamily + fontStyle + fontWeight in a single object.
		const text2 = new Text("dolor sit amet", Loader.shared.resources["My awesome font"].styles[0])
		//(I don't really recommend this but people seem to like the resources magic bag)

		// Load fonts directly from font files and reference them by the name you used in the loader!
		const text3 = new Text("Lorem ipsum", new TextStyle({ fontFamily: "Now in any format!", fill: 0x990000 }));

		text2.y = 50;
		text3.y = 100;
		stage.addChild(text1);
		stage.addChild(text2);
		stage.addChild(text3);
	});

	//load!
	Loader.shared.load();
```

## Build instructions 🔨

```
$ npm install
$ npm build
```

## Usage 📝

### `Loader.registerPlugin(WebfontLoaderPlugin)`

DO THIS ONLY ONCE!  
Do it before using the loader and you will be fine.

#### `Loader.shared.add({ name: "...", url: "...", metadata: { font:{...} } })`
How to add a font:  
* `name : string`: Will identify your resource and become the name of the font when loading directly from a font file (`ttf`, `otf`, `woff`, or `woff2`).
* `url:string`: Should point to your `css` file or your font file (`ttf`, `otf`, `woff`, or `woff2`).
* `metadata.font`: Optional extra settings to describe your fonts
  * `family :string`: Name of the font. Overwrites the `name` field.
  * `display: string`: Settings for the FontFaceDescriptor.
  * `featureSettings: string`: Settings for the FontFaceDescriptor.
  * `stretch: string`: Settings for the FontFaceDescriptor.
  * `style: string`: Settings for the FontFaceDescriptor.
  * `unicodeRange: string`: Settings for the FontFaceDescriptor.
  * `variant: string`: Settings for the FontFaceDescriptor.
  * `weight: string`: Settings for the FontFaceDescriptor.
  * `testString:string`: String to feed `document.fonts.load` as a test string.
  * `timeout:number`: How long before giving up waiting for the font.

#### Can I load directly from google fonts? 🤔
Yes you can! just find the link to your font and ask the loader to load it.  
Even if the url looks ugly because you added a lot of formats, we can load it!  
`Loader.shared.add({ name: "From Google", url: "https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&display=swap" });`


#### I only have a .TTF file, how do I use this? 🤔
Starting from version 1.0.0 you can add them to your `Loader` with a name and they just work!
The old method works too, you can use [Transfonter](https://transfonter.org/), [FontSquirrel](https://www.fontsquirrel.com/tools/webfont-generator) and many other websites can convert a regular font into a fully functional Webfont.

#### But where are my loaded fonts? 🔎
They are there, just trust them! Call upon thee by their family name or font name (check the CSS file you loaded for those) or check the resources object with the name you gave your font in the loader. (When in doubt, `console.log()` stuff. That might give you a hint.)

## Demo ⚡
Link to the pixi demos coming soon...

## License ⚖
MIT, see [LICENSE.md](http://github.com/tleunen/pixi-multistyle-text/blob/master/LICENSE.md) for details.
