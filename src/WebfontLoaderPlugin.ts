import { LoaderResource, ILoaderPlugin } from '@pixi/loaders';
import { parseCss } from './cssTools';

export default class WebfontLoaderPlugin implements ILoaderPlugin
{
    /**
     * Unsuported formats:
     * EOT => Internet explorer only. Deprecated. We use promises, we don't support IE anyway.
     * SVG => Safari only. Deprecated. Spec removed from SVG 2.0. Support being removed from browsers.
     */
    private static readonly supportedFontExtensions = ['ttf', 'otf', 'woff', 'woff2'];

    static add(..._params: any[]): any
    {
        if (!document.fonts || !FontFace || !Promise)
        {
            throw new Error(
                'WebfontLoaderPlugin relies heavily on Promises and the FontFace API and your browser doesn\'t support them.'
            );
        }

        LoaderResource.setExtensionLoadType('css', LoaderResource.LOAD_TYPE.XHR);
        LoaderResource.setExtensionXhrType('css', LoaderResource.XHR_RESPONSE_TYPE.TEXT);

        LoaderResource.setExtensionLoadType('ttf', LoaderResource.LOAD_TYPE.XHR);
        LoaderResource.setExtensionXhrType('ttf', LoaderResource.XHR_RESPONSE_TYPE.BUFFER);

        for (const ext of WebfontLoaderPlugin.supportedFontExtensions)
        {
            LoaderResource.setExtensionLoadType(ext, LoaderResource.LOAD_TYPE.XHR);
            LoaderResource.setExtensionXhrType(ext, LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
        }
    }

    static use(resource: LoaderResource, next: (...params: any[]) => any): void
    {
        if (resource.extension.endsWith('css'))
        {
            // this promise _shouldnt_ reject but just to be sure, finally;
            WebfontLoaderPlugin.loadFromCSS(resource).finally(() => next());

            return;
        }

        if (WebfontLoaderPlugin.supportedFontExtensions.some((ext) => resource.extension.endsWith(ext)))
        {
            // this promise _shouldnt_ reject but just to be sure, finally;
            WebfontLoaderPlugin.loadFromBuffer(resource).finally(() => next());

            return;
        }

        // fallback, it wasn't for us
        next();
    }

    /**
     * Overwriteable function in case you want to implement your own waiter
     * (e.g: FontFaceObserver)
     */
    public static waitFont = async (
        fontDescriptor:{'font-family':string, 'font-style'?:string, 'font-weight'?:string, 'font-stretch'?:string},
        testString:string,
        timeout:number): Promise<void> =>
    {
        const fontStyle = fontDescriptor['font-style'] ?? '';
        const fontWeight = fontDescriptor['font-weight'] ?? '';
        const fontStretch = fontDescriptor['font-stretch'] ?? '';
        const fontFamily = fontDescriptor['font-family'];

        timeout = timeout || Infinity; // timeout=0 -> wait forever
        let now = new Date().getTime();
        const backThen = now;
        const mergedFontStyle:string = [fontStyle, fontWeight, fontStretch, '100px', fontFamily].join(' ');
        let loadedFonts = 0;

        do
        {
            loadedFonts = (await document.fonts.load(mergedFontStyle, testString)).length;
            if (loadedFonts > 0)
            {
                // Font loaded!
                return;
            }

            // sleep for a while or the browser can't load the fonts!
            await new Promise((resolve) => setTimeout(resolve, 16));

            now = new Date().getTime();
        } while (now - backThen < timeout);

        // We timed out! :(
        console.warn(`Error loading font! Your font ${fontDescriptor['font-family']} timed out after ${timeout}ms`);
    };

    private static loadFromCSS(resource: LoaderResource) : Promise<any>
    {
        const newLink = document.createElement('link');

        newLink.rel = 'stylesheet';
        newLink.type = 'text/css';
        newLink.href = resource.url;

        // append to head
        document.head.appendChild(newLink);

        // parse the css
        const allFonts = parseCss(resource.data);

        // make the outputs
        const promiseArr = [];
        const fontDefinitionArr = [];

        const testString = resource.metadata?.font?.testString;
        const timeout = resource.metadata?.font?.timeout ?? resource.timeout;

        for (const font of allFonts)
        {
            if (typeof font.style['font-family'] === 'string')
            {
                // add watchface promises
                promiseArr.push(
                    WebfontLoaderPlugin.waitFont(font.style, testString, timeout)
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
        resource.styles = fontDefinitionArr;

        // wait for all fonts to be ready
        // use finally because loaders in pixi ALWAYS end. Even on catastrophic failures.
        return Promise.all(promiseArr);
    }

    private static loadFromBuffer(resource:LoaderResource) : Promise<void>
    {
        // If you don't specify a family name the resource name is used
        const fontFamily = resource.metadata?.font?.family ?? resource.name;

        // Add it to the document
        document.fonts.add(new FontFace(fontFamily, resource.data, resource.metadata?.font));

        // Add the style descriptor (I don't think nobody ever used this...)
        resource.styles = [{
            fontFamily: fontFamily.replace(/['|"]/gi, ''),
            fontStyle: resource.metadata?.font?.style,
            fontWeight: resource.metadata?.font?.weight,
            // fontStretch: font.style["font-stretch"], //pixi doesn't know this
        }];

        // Usually this resolves instantly because we had the buffer in resource.data
        return WebfontLoaderPlugin.waitFont(
            {
                'font-family': fontFamily,
                'font-stretch': resource.metadata?.font?.stretch,
                'font-style': resource.metadata?.font?.style,
                'font-weight': resource.metadata?.font?.weight
            },
            resource.metadata?.font?.testString, resource.metadata?.font?.timeout ?? resource.timeout);
    }
}
