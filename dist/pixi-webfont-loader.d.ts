import { LoaderResource, ILoaderPlugin } from 'pixi.js';
export default class WebfontLoaderPlugin implements ILoaderPlugin {
    static add(..._params: any[]): any;
    static use(resource: LoaderResource, next: (...params: any[]) => any): void;
    private static parseCss;
    private static parseRule;
    private static stringifyRule;
}
