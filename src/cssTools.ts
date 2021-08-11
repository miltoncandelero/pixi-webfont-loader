function parseRule(css: string): any
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

function stringifyRule(style: any): string
{
    let text = '';
    const keys = Object.keys(style).sort();

    for (let i = 0; i < keys.length; i++)
    {
        text += ` ${keys[i]}: ${style[keys[i]] as string};`;
    }

    return text.substring(1);
}

/**	Parse a CSS StyleSheet into an Array of homebrew CSSStyleRule objects,
*	each having normalized `selectorText` and `style` properties.
*	Hardcore regex stolen from: https://jsfiddle.net/developit/vzkckrw4/
*/
export function parseCss(text: string): { selectorText: string; style: any; cssText: string }[]
{
    const tokenizer = /([\s\S]+?)\{([\s\S]*?)\}/gi;
    const rules = [];
    let rule;
    let token;

    text = text.replace(/\/\*[\s\S]*?\*\//g, '');
    while ((token = tokenizer.exec(text)))
    {
        const style = parseRule(token[2].trim());

        style.cssText = stringifyRule(style);
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
