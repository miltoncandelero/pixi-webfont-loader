this.PIXI=this.PIXI||{},this.PIXI.WebfontLoaderPlugin=function(e){function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var n,o=(function(e){!function(){function t(e,t){document.addEventListener?e.addEventListener("scroll",t,!1):e.attachEvent("scroll",t)}function n(e){this.a=document.createElement("div"),this.a.setAttribute("aria-hidden","true"),this.a.appendChild(document.createTextNode(e)),this.b=document.createElement("span"),this.c=document.createElement("span"),this.h=document.createElement("span"),this.f=document.createElement("span"),this.g=-1,this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.b.appendChild(this.h),this.c.appendChild(this.f),this.a.appendChild(this.b),this.a.appendChild(this.c)}function o(e,t){e.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+t+";"}function i(e){var t=e.a.offsetWidth,n=t+100;return e.f.style.width=n+"px",e.c.scrollLeft=n,e.b.scrollLeft=e.b.scrollWidth+100,e.g!==t&&(e.g=t,!0)}function r(e,n){function o(){var e=r;i(e)&&e.a.parentNode&&n(e.g)}var r=e;t(e.b,o),t(e.c,o),i(e)}function s(e,t){var n=t||{};this.family=e,this.style=n.style||"normal",this.weight=n.weight||"normal",this.stretch=n.stretch||"normal"}var a=null,l=null,c=null,d=null;function u(){return null===d&&(d=!!document.fonts),d}function f(){if(null===c){var e=document.createElement("div");try{e.style.font="condensed 100px sans-serif"}catch(e){}c=""!==e.style.font}return c}function h(e,t){return[e.style,e.weight,f()?e.stretch:"","100px",t].join(" ")}s.prototype.load=function(e,t){var i=this,s=e||"BESbswy",c=0,d=t||3e3,f=(new Date).getTime();return new Promise(function(e,t){if(u()&&!function(){if(null===l)if(u()&&/Apple/.test(window.navigator.vendor)){var e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);l=!!e&&603>parseInt(e[1],10)}else l=!1;return l}()){var p=new Promise(function(e,t){!function n(){(new Date).getTime()-f>=d?t(Error(d+"ms timeout exceeded")):document.fonts.load(h(i,'"'+i.family+'"'),s).then(function(t){1<=t.length?e():setTimeout(n,25)},t)}()}),m=new Promise(function(e,t){c=setTimeout(function(){t(Error(d+"ms timeout exceeded"))},d)});Promise.race([m,p]).then(function(){clearTimeout(c),e(i)},t)}else!function(e){document.body?e():document.addEventListener?document.addEventListener("DOMContentLoaded",function t(){document.removeEventListener("DOMContentLoaded",t),e()}):document.attachEvent("onreadystatechange",function t(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",t),e())})}(function(){function l(){var t;(t=-1!=y&&-1!=v||-1!=y&&-1!=g||-1!=v&&-1!=g)&&((t=y!=v&&y!=g&&v!=g)||(null===a&&(t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),a=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))),t=a&&(y==w&&v==w&&g==w||y==x&&v==x&&g==x||y==b&&v==b&&g==b)),t=!t),t&&(E.parentNode&&E.parentNode.removeChild(E),clearTimeout(c),e(i))}var u=new n(s),p=new n(s),m=new n(s),y=-1,v=-1,g=-1,w=-1,x=-1,b=-1,E=document.createElement("div");E.dir="ltr",o(u,h(i,"sans-serif")),o(p,h(i,"serif")),o(m,h(i,"monospace")),E.appendChild(u.a),E.appendChild(p.a),E.appendChild(m.a),document.body.appendChild(E),w=u.a.offsetWidth,x=p.a.offsetWidth,b=m.a.offsetWidth,function e(){if((new Date).getTime()-f>=d)E.parentNode&&E.parentNode.removeChild(E),t(Error(d+"ms timeout exceeded"));else{var n=document.hidden;!0!==n&&void 0!==n||(y=u.a.offsetWidth,v=p.a.offsetWidth,g=m.a.offsetWidth,l()),c=setTimeout(e,50)}}(),r(u,function(e){y=e,l()}),o(u,h(i,'"'+i.family+'",sans-serif')),r(p,function(e){v=e,l()}),o(p,h(i,'"'+i.family+'",serif')),r(m,function(e){g=e,l()}),o(m,h(i,'"'+i.family+'",monospace'))})})},e.exports=s}()}(n={path:void 0,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}}),n.exports),i=function(){function n(){}return n.add=function(){e.LoaderResource.setExtensionLoadType("css",e.LoaderResource.LOAD_TYPE.XHR),e.LoaderResource.setExtensionXhrType("css",e.LoaderResource.XHR_RESPONSE_TYPE.TEXT)},n.use=function(e,i){if(e.extension.endsWith("css")){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css",r.href=e.url,document.head.appendChild(r);for(var s,a=n.parseCss(e.data),l=[],c=[],d=e.metadata,u=null==d?void 0:d.testString,f=null==d?void 0:d.timeout,h=function(e,n){var o;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(o=function(e,n){if(e){if("string"==typeof e)return t(e,void 0);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(e,void 0):void 0}}(e))){o&&(e=o);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(o=e[Symbol.iterator]()).next.bind(o)}(a);!(s=h()).done;){var p=s.value;"string"==typeof p.style["font-family"]&&(l.push(new o(p.style["font-family"].replace(/['|"]/gi,""),{style:p.style["font-style"],weight:p.style["font-weight"],stretch:p.style["font-stretch"]}).load(u,f)),c.push({fontFamily:p.style["font-family"].replace(/['|"]/gi,""),fontStyle:p.style["font-style"],fontWeight:p.style["font-weight"]}))}e.data=c,Promise.all(l).finally(function(){return i()})}else i()},n.parseCss=function(e){var t,o,i=/([\s\S]+?)\{([\s\S]*?)\}/gi,r=[];for(e=e.replace(/\/\*[\s\S]*?\*\//g,"");o=i.exec(e);){var s=n.parseRule(o[2].trim());s.cssText=n.stringifyRule(s),(t={selectorText:o[1].trim().replace(/\s*\,\s*/,", "),style:s,cssText:""}).cssText=t.selectorText+" { "+t.style.cssText+" }",r.push(t)}return r},n.parseRule=function(e){for(var t,n=/\s*([a-z\-]+)\s*:\s*((?:[^;]*url\(.*?\)[^;]*|[^;]*)*)\s*(?:;|$)/gi,o={};t=n.exec(e);)o[t[1].toLowerCase()]=t[2];return o},n.stringifyRule=function(e){for(var t="",n=Object.keys(e).sort(),o=0;o<n.length;o++)t+=" "+n[o]+": "+e[n[o]]+";";return t.substring(1)},n}();return i.FontFaceObserver=o,i}(PIXI);
//# sourceMappingURL=pixi-webfont-loader.js.map
