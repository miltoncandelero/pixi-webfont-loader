import { ILoaderPlugin } from '@pixi/loaders';
import { LoaderResource } from '@pixi/loaders';

export declare class WebfontLoaderPlugin implements ILoaderPlugin {
    private static readonly supportedFontExtensions;
    static add(..._params: any[]): any;
    static use(resource: LoaderResource, next: (...params: any[]) => any): void;
    static waitFont: (fontDescriptor: {
        'font-family': string;
        'font-style'?: string;
        'font-weight'?: string;
        'font-stretch'?: string;
    }, testString: string, timeout: number) => Promise<void>;
    private static loadFromCSS;
    private static loadFromBuffer;
}

export { }
