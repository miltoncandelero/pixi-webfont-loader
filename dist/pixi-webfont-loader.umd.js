!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@pixi/loaders"),require("fontfaceobserver")):"function"==typeof define&&define.amd?define(["@pixi/loaders","fontfaceobserver"],t):(e=e||self).WebfontLoaderPlugin=t(e.PIXI,e.FontFaceObserver)}(this,function(e,t){function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var n=function(){function n(){}return n.add=function(){e.LoaderResource.setExtensionLoadType("css",e.LoaderResource.LOAD_TYPE.XHR),e.LoaderResource.setExtensionXhrType("css",e.LoaderResource.XHR_RESPONSE_TYPE.TEXT)},n.use=function(e,o){if(e.extension.endsWith("css")){var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.href=e.url,document.head.appendChild(s);for(var i,a=n.parseCss(e.data),l=[],u=[],f=e.metadata,c=null==f?void 0:f.testString,y=null==f?void 0:f.timeout,d=function(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return r(e,void 0);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,void 0):void 0}}(e))){n&&(e=n);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}(a);!(i=d()).done;){var p=i.value;"string"==typeof p.style["font-family"]&&(l.push(new t(p.style["font-family"].replace(/['|"]/gi,""),{style:p.style["font-style"],weight:p.style["font-weight"],stretch:p.style["font-stretch"]}).load(c,y)),u.push({fontFamily:p.style["font-family"].replace(/['|"]/gi,""),fontStyle:p.style["font-style"],fontWeight:p.style["font-weight"]}))}e.data=u,Promise.all(l).finally(function(){return o()})}else o()},n.parseCss=function(e){var t,r,o=/([\s\S]+?)\{([\s\S]*?)\}/gi,s=[];for(e=e.replace(/\/\*[\s\S]*?\*\//g,"");r=o.exec(e);){var i=n.parseRule(r[2].trim());i.cssText=n.stringifyRule(i),(t={selectorText:r[1].trim().replace(/\s*\,\s*/,", "),style:i,cssText:""}).cssText=t.selectorText+" { "+t.style.cssText+" }",s.push(t)}return s},n.parseRule=function(e){for(var t,r=/\s*([a-z\-]+)\s*:\s*((?:[^;]*url\(.*?\)[^;]*|[^;]*)*)\s*(?:;|$)/gi,n={};t=r.exec(e);)n[t[1].toLowerCase()]=t[2];return n},n.stringifyRule=function(e){for(var t="",r=Object.keys(e).sort(),n=0;n<r.length;n++)t+=" "+r[n]+": "+e[r[n]]+";";return t.substring(1)},n}();return n.FontFaceObserver=t,n});
//# sourceMappingURL=pixi-webfont-loader.umd.js.map
