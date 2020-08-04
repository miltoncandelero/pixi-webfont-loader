import { LoaderResource, ILoaderPlugin } from 'pixi.js';
import * as FontFaceObserver from 'fontfaceobserver';

export default class WebfontLoaderPlugin implements ILoaderPlugin
{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static add(..._params: any[]): any
    {
        LoaderResource.setExtensionLoadType('css', LoaderResource.LOAD_TYPE.XHR);
        LoaderResource.setExtensionXhrType('css', LoaderResource.XHR_RESPONSE_TYPE.TEXT);
    }
    static use(resource: LoaderResource, next: (...params: any[]) => any): void
    {
        if (resource.extension !== 'css')
        {
            next();

            return;
        }

        // create the CSS link
        const newLink = document.createElement('link');

        newLink.rel = 'stylesheet';
        newLink.type = 'text/css';
        newLink.href = resource.url;

        // append to head
        document.head.appendChild(newLink);

        // parse the css
        const allFonts = WebfontLoaderPlugin.parseCss(resource.data);

        // make the outputs
        const promiseArr = [];
        const fontDefinitionArr = [];

        // my bundler can't do conditional chaining and I don't know why
        const metadata = resource.metadata;
        const testString = metadata === null || metadata === undefined ? undefined : metadata.testString;
        const timeout = metadata === null || metadata === undefined ? undefined : metadata.timeout;

        for (const font of allFonts)
        {
            if (typeof font.style['font-family'] === 'string')
            {
                // add watchface promises
                promiseArr.push(
                    new FontFaceObserver(font.style['font-family'].replace(/['|"]/gi, ''), {
                        style: font.style['font-style'],
                        weight: font.style['font-weight'],
                        stretch: font.style['font-stretch'],
                    }).load(testString, timeout),
                );

                // make the loaded font data for later user reference
                fontDefinitionArr.push({
                    fontFamily: font.style['font-family'].replace(/['|"]/gi, ''),
                    fontStyle: font.style['font-style'],
                    fontWeight: font.style['font-weight'],
                    // fontStretch: font.style["font-stretch"], //pixi doesn't know this
                });
            }
        }

        // store the fonts that we loaded
        resource.data = fontDefinitionArr;

        // wait for all fonts to be ready
        // use finally because loaders in pixi ALWAYS end. Even on catastrophic failures.
        Promise.all(promiseArr).finally(() => next());
    }

    /**	Parse a CSS StyleSheet into an Array of CSSStyleRule objects,
	 *	each having normalized `selectorText` and `style` properties.
	 *	Hardcore regex stolen from: https://jsfiddle.net/developit/vzkckrw4/
	 *	@param {String} stylesheet
	 *	@returns {Array(CSSStyleRule)}
	 */
    private static parseCss(text: string): { selectorText: string; style: any; cssText: string }[]
    {
        const tokenizer = /([\s\S]+?)\{([\s\S]*?)\}/gi;
        const rules = [];
        let rule;
        let token;

        text = text.replace(/\/\*[\s\S]*?\*\//g, '');
        while ((token = tokenizer.exec(text)))
        {
            const style = WebfontLoaderPlugin.parseRule(token[2].trim());

            style.cssText = WebfontLoaderPlugin.stringifyRule(style);
            rule = {
                selectorText: token[1].trim().replace(/\s*\,\s*/, ', '),
                style,
                cssText: '',
            };
            rule.cssText = `${rule.selectorText} { ${rule.style.cssText as string} }`;
            rules.push(rule);
        }

        return rules;
    }

    private static parseRule(css: string): any
    {
        const tokenizer = /\s*([a-z\-]+)\s*:\s*((?:[^;]*url\(.*?\)[^;]*|[^;]*)*)\s*(?:;|$)/gi;
        const obj: any = {};
        let token;

        while ((token = tokenizer.exec(css)))
        {
            obj[token[1].toLowerCase()] = token[2];
        }

        return obj;
    }

    private static stringifyRule(style: any): string
    {
        let text = '';
        const keys = Object.keys(style).sort();

        for (let i = 0; i < keys.length; i++)
        {
            text += ` ${keys[i]}: ${style[keys[i]] as string};`;
        }

        return text.substring(1);
    }
}
