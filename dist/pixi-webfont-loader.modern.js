import{LoaderResource as t}from"@pixi/loaders";import e from"fontfaceobserver";class s{static add(...e){t.setExtensionLoadType("css",t.LOAD_TYPE.XHR),t.setExtensionXhrType("css",t.XHR_RESPONSE_TYPE.TEXT)}static use(t,l){if(!t.extension.endsWith("css"))return void l();const o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.href=t.url,document.head.appendChild(o);const r=s.parseCss(t.data),n=[],i=[],a=t.metadata,c=null==a?void 0:a.testString,f=null==a?void 0:a.timeout;for(const t of r)"string"==typeof t.style["font-family"]&&(n.push(new e(t.style["font-family"].replace(/['|"]/gi,""),{style:t.style["font-style"],weight:t.style["font-weight"],stretch:t.style["font-stretch"]}).load(c,f)),i.push({fontFamily:t.style["font-family"].replace(/['|"]/gi,""),fontStyle:t.style["font-style"],fontWeight:t.style["font-weight"]}));t.data=i,Promise.all(n).finally(()=>l())}static parseCss(t){const e=/([\s\S]+?)\{([\s\S]*?)\}/gi,l=[];let o,r;for(t=t.replace(/\/\*[\s\S]*?\*\//g,"");r=e.exec(t);){const t=s.parseRule(r[2].trim());t.cssText=s.stringifyRule(t),o={selectorText:r[1].trim().replace(/\s*\,\s*/,", "),style:t,cssText:""},o.cssText=`${o.selectorText} { ${o.style.cssText} }`,l.push(o)}return l}static parseRule(t){const e=/\s*([a-z\-]+)\s*:\s*((?:[^;]*url\(.*?\)[^;]*|[^;]*)*)\s*(?:;|$)/gi,s={};let l;for(;l=e.exec(t);)s[l[1].toLowerCase()]=l[2];return s}static stringifyRule(t){let e="";const s=Object.keys(t).sort();for(let l=0;l<s.length;l++)e+=` ${s[l]}: ${t[s[l]]};`;return e.substring(1)}}s.FontFaceObserver=e;export default s;
//# sourceMappingURL=pixi-webfont-loader.modern.js.map
