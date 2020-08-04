import { LoaderResource, ILoaderPlugin } from '@pixi/loaders';
import FontFaceObserver from 'fontfaceobserver';
export default class WebfontLoaderPlugin implements ILoaderPlugin {
    static readonly FontFaceObserver: typeof FontFaceObserver;
    static add(..._params: any[]): any;
    static use(resource: LoaderResource, next: (...params: any[]) => any): void;
    private static parseCss;
    private static parseRule;
    private static stringifyRule;
}
