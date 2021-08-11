import '../global.d.ts';
import { Loader } from '@pixi/loaders';

import  WebfontLoaderPlugin  from './WebfontLoaderPlugin';

Loader.registerPlugin(WebfontLoaderPlugin);

export { WebfontLoaderPlugin };
