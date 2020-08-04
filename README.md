# pixi-webfont-loader

[![NPM](https://nodei.co/npm/pixi-webfont-loader.png?compact=true)](https://nodei.co/npm/pixi-webfont-loader/)

Add support for webfonts to [PixiJS](https://github.com/GoodBoyDigital/pixi.js)'s Loader.  
This leverages [FontFaceObserver](https://fontfaceobserver.com/) to make sure the fonts are ready to go when you need it, avoiding ugly unformatted text. (it's exposed in `WebfontLoaderPlugin.FontFaceObserver` if you want to use it)

Massive thanks to @bigtimebuddy for his guidance and patience.

## Example 🚀

In the example below, we will load a font from a file and then create two texts in different ways. One manually and one using the created objects in the resource.   

```js
	//register the webfont plugin into the Loader
	//DO IT ONLY ONCE AND BEFORE EVERYTHING AND YOU ARE GOOD TO GO.
	Loader.registerPlugin(WebfontLoaderPlugin);

	//add the css file
	Loader.shared.add({ name: "My awesome font", url: "./fonts/eng.css" });

	//set the callback
	Loader.shared.onComplete.once(() => {

		// Create it by hand: naming the font by its fontFamily and setting up the right style.
		const text1 = new Text("Lorem ipsum", new TextStyle({ fontFamily: "Thickhead", fill: 0x990000 }));

		// Create it by reading the resources. This will have the fontFamily + fontStyle + fontWeight in a single object.
		const text2 = new Text("dolor sit amet", Loader.shared.resources["My awesome font"].data[0])
		//(I don't really recommend this but people seem to like the resources magic bag)

		text2.y = 50;
		stage.addChild(text1);
		stage.addChild(text2);
	});

	//load!
	Loader.load();
```
## Build instructions 🔨

```
$ yarn install
$ yarn build
```

## Usage 📝

### `Loader.registerPlugin(WebfontLoaderPlugin)`

DO THIS ONLY ONCE!  
Do it before using the loader and you will be fine.

#### `Loader.shared.add({ name: "Japanese Font", url: "./fonts/kana.css", metadata: { testString: "カタカナ", timeout: 10000 } })`
How to add a font:  
* A `name` that can be whatever you want, doesn't need to be related to the font.  
* A `url` pointing to the .css file. (The css file will point to the fonts, think of it as a spritesheet atlas for fonts.)  
* On the metadata everything is optional:
  * `testString`: FontFaceObserver will use this string to check if your font was loaded. If your font doesn't have Latin characters you will need it, otherwise you will be fine.
  * `timeout`: FontFaceObserver will give up waiting after this many milliseconds to not hang your game. If you ABSOLUTELY. NEED. THEM. FONTS. set it to infinity.

#### Can I load directly from google fonts? 🤔
Yes you can! just find the link to your font and ask the loader to load it.  
Even if the url looks ugly because you added a lot of formats, we can load it!  
`Loader.shared.add({ name: "From Google", url: "https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&display=swap" });`


#### I only have a .TTF file, how do I use this? 😖
[Transfonter](https://transfonter.org/), [FontSquirrel](https://www.fontsquirrel.com/tools/webfont-generator) and many other websites can convert a regular font into a fully functional Webfont.

#### But where are my loaded fonts? 🔎
They are there, just trust them! Call upon thee by their family name or font name (check the CSS file you loaded for those) or check the resources object with the name you gave your font in the loader. (When in doubt, `console.log()` stuff. That might give you a hint.)

## Demo ⚡
Find a way to host the `demo` folder in here, you are a smart person, you can do it!


## License ⚖
MIT, see [LICENSE.md](http://github.com/tleunen/pixi-multistyle-text/blob/master/LICENSE.md) for details.
