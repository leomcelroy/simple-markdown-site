// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function X() {
    return {
        async: !1,
        baseUrl: null,
        breaks: !1,
        extensions: null,
        gfm: !0,
        headerIds: !0,
        headerPrefix: "",
        highlight: null,
        langPrefix: "language-",
        mangle: !0,
        pedantic: !1,
        renderer: null,
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartLists: !1,
        smartypants: !1,
        tokenizer: null,
        walkTokens: null,
        xhtml: !1
    };
}
var C = X();
function J(l) {
    C = l;
}
var K = /[&<>"']/, Y = /[&<>"']/g, ee = /[<>"']|&(?!#?\w+;)/, te = /[<>"']|&(?!#?\w+;)/g, ne = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
}, j = (l)=>ne[l];
function x(l, e) {
    if (e) {
        if (K.test(l)) return l.replace(Y, j);
    } else if (ee.test(l)) return l.replace(te, j);
    return l;
}
var ie = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function G(l) {
    return l.replace(ie, (e, t)=>(t = t.toLowerCase(), t === "colon" ? ":" : t.charAt(0) === "#" ? t.charAt(1) === "x" ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""));
}
var se = /(^|[^\[])\^/g;
function d(l, e) {
    l = typeof l == "string" ? l : l.source, e = e || "";
    let t = {
        replace: (n, i)=>(i = i.source || i, i = i.replace(se, "$1"), l = l.replace(n, i), t),
        getRegex: ()=>new RegExp(l, e)
    };
    return t;
}
var re = /[^\w:]/g, le = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function Q(l, e, t) {
    if (l) {
        let n;
        try {
            n = decodeURIComponent(G(t)).replace(re, "").toLowerCase();
        } catch  {
            return null;
        }
        if (n.indexOf("javascript:") === 0 || n.indexOf("vbscript:") === 0 || n.indexOf("data:") === 0) return null;
    }
    e && !le.test(t) && (t = he(e, t));
    try {
        t = encodeURI(t).replace(/%25/g, "%");
    } catch  {
        return null;
    }
    return t;
}
var D = {}, ae = /^[^:]+:\/*[^/]*$/, oe = /^([^:]+:)[\s\S]*$/, ce = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function he(l, e) {
    D[" " + l] || (ae.test(l) ? D[" " + l] = l + "/" : D[" " + l] = O(l, "/", !0)), l = D[" " + l];
    let t = l.indexOf(":") === -1;
    return e.substring(0, 2) === "//" ? t ? e : l.replace(oe, "$1") + e : e.charAt(0) === "/" ? t ? e : l.replace(ce, "$1") + e : l + e;
}
var v = {
    exec: function() {}
};
function z(l) {
    let e = 1, t, n;
    for(; e < arguments.length; e++){
        t = arguments[e];
        for(n in t)Object.prototype.hasOwnProperty.call(t, n) && (l[n] = t[n]);
    }
    return l;
}
function P(l, e) {
    let t = l.replace(/\|/g, (s, r, a)=>{
        let o = !1, g = r;
        for(; --g >= 0 && a[g] === "\\";)o = !o;
        return o ? "|" : " |";
    }), n = t.split(/ \|/), i = 0;
    if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), n.length > e) n.splice(e);
    else for(; n.length < e;)n.push("");
    for(; i < n.length; i++)n[i] = n[i].trim().replace(/\\\|/g, "|");
    return n;
}
function O(l, e, t) {
    let n = l.length;
    if (n === 0) return "";
    let i = 0;
    for(; i < n;){
        let s = l.charAt(n - i - 1);
        if (s === e && !t) i++;
        else if (s !== e && t) i++;
        else break;
    }
    return l.slice(0, n - i);
}
function pe(l, e) {
    if (l.indexOf(e[1]) === -1) return -1;
    let t = l.length, n = 0, i = 0;
    for(; i < t; i++)if (l[i] === "\\") i++;
    else if (l[i] === e[0]) n++;
    else if (l[i] === e[1] && (n--, n < 0)) return i;
    return -1;
}
function V(l) {
    l && l.sanitize && !l.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
}
function N(l, e) {
    if (e < 1) return "";
    let t = "";
    for(; e > 1;)e & 1 && (t += l), e >>= 1, l += l;
    return t + l;
}
function F(l, e, t, n) {
    let i = e.href, s = e.title ? x(e.title) : null, r = l[1].replace(/\\([\[\]])/g, "$1");
    if (l[0].charAt(0) !== "!") {
        n.state.inLink = !0;
        let a = {
            type: "link",
            raw: t,
            href: i,
            title: s,
            text: r,
            tokens: n.inlineTokens(r)
        };
        return n.state.inLink = !1, a;
    }
    return {
        type: "image",
        raw: t,
        href: i,
        title: s,
        text: x(r)
    };
}
function ue(l, e) {
    let t = l.match(/^(\s+)(?:```)/);
    if (t === null) return e;
    let n = t[1];
    return e.split(`
`).map((i)=>{
        let s = i.match(/^\s+/);
        if (s === null) return i;
        let [r] = s;
        return r.length >= n.length ? i.slice(n.length) : i;
    }).join(`
`);
}
var B = class {
    constructor(e){
        this.options = e || C;
    }
    space(e) {
        let t = this.rules.block.newline.exec(e);
        if (t && t[0].length > 0) return {
            type: "space",
            raw: t[0]
        };
    }
    code(e) {
        let t = this.rules.block.code.exec(e);
        if (t) {
            let n = t[0].replace(/^ {1,4}/gm, "");
            return {
                type: "code",
                raw: t[0],
                codeBlockStyle: "indented",
                text: this.options.pedantic ? n : O(n, `
`)
            };
        }
    }
    fences(e) {
        let t = this.rules.block.fences.exec(e);
        if (t) {
            let n = t[0], i = ue(n, t[3] || "");
            return {
                type: "code",
                raw: n,
                lang: t[2] ? t[2].trim() : t[2],
                text: i
            };
        }
    }
    heading(e) {
        let t = this.rules.block.heading.exec(e);
        if (t) {
            let n = t[2].trim();
            if (/#$/.test(n)) {
                let i = O(n, "#");
                (this.options.pedantic || !i || / $/.test(i)) && (n = i.trim());
            }
            return {
                type: "heading",
                raw: t[0],
                depth: t[1].length,
                text: n,
                tokens: this.lexer.inline(n)
            };
        }
    }
    hr(e) {
        let t = this.rules.block.hr.exec(e);
        if (t) return {
            type: "hr",
            raw: t[0]
        };
    }
    blockquote(e) {
        let t = this.rules.block.blockquote.exec(e);
        if (t) {
            let n = t[0].replace(/^ *>[ \t]?/gm, "");
            return {
                type: "blockquote",
                raw: t[0],
                tokens: this.lexer.blockTokens(n, []),
                text: n
            };
        }
    }
    list(e) {
        let t = this.rules.block.list.exec(e);
        if (t) {
            let n, i, s, r, a, o, g, f, b, k, p, A, y = t[1].trim(), R = y.length > 1, m = {
                type: "list",
                raw: "",
                ordered: R,
                start: R ? +y.slice(0, -1) : "",
                loose: !1,
                items: []
            };
            y = R ? `\\d{1,9}\\${y.slice(-1)}` : `\\${y}`, this.options.pedantic && (y = R ? y : "[*+-]");
            let w = new RegExp(`^( {0,3}${y})((?:[   ][^\\n]*)?(?:\\n|$))`);
            for(; e && (A = !1, !(!(t = w.exec(e)) || this.rules.block.hr.test(e)));){
                if (n = t[0], e = e.substring(n.length), f = t[2].split(`
`, 1)[0], b = e.split(`
`, 1)[0], this.options.pedantic ? (r = 2, p = f.trimLeft()) : (r = t[2].search(/[^ ]/), r = r > 4 ? 1 : r, p = f.slice(r), r += t[1].length), o = !1, !f && /^ *$/.test(b) && (n += b + `
`, e = e.substring(b.length + 1), A = !0), !A) {
                    let I = new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`), S = new RegExp(`^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), T = new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`), E = new RegExp(`^ {0,${Math.min(3, r - 1)}}#`);
                    for(; e && (k = e.split(`
`, 1)[0], f = k, this.options.pedantic && (f = f.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), !(T.test(f) || E.test(f) || I.test(f) || S.test(e)));){
                        if (f.search(/[^ ]/) >= r || !f.trim()) p += `
` + f.slice(r);
                        else if (!o) p += `
` + f;
                        else break;
                        !o && !f.trim() && (o = !0), n += k + `
`, e = e.substring(k.length + 1);
                    }
                }
                m.loose || (g ? m.loose = !0 : /\n *\n *$/.test(n) && (g = !0)), this.options.gfm && (i = /^\[[ xX]\] /.exec(p), i && (s = i[0] !== "[ ] ", p = p.replace(/^\[[ xX]\] +/, ""))), m.items.push({
                    type: "list_item",
                    raw: n,
                    task: !!i,
                    checked: s,
                    loose: !1,
                    text: p
                }), m.raw += n;
            }
            m.items[m.items.length - 1].raw = n.trimRight(), m.items[m.items.length - 1].text = p.trimRight(), m.raw = m.raw.trimRight();
            let L = m.items.length;
            for(a = 0; a < L; a++){
                this.lexer.state.top = !1, m.items[a].tokens = this.lexer.blockTokens(m.items[a].text, []);
                let I1 = m.items[a].tokens.filter((T)=>T.type === "space"), S1 = I1.every((T)=>{
                    let E = T.raw.split(""), Z = 0;
                    for (let H of E)if (H === `
` && (Z += 1), Z > 1) return !0;
                    return !1;
                });
                !m.loose && I1.length && S1 && (m.loose = !0, m.items[a].loose = !0);
            }
            return m;
        }
    }
    html(e) {
        let t = this.rules.block.html.exec(e);
        if (t) {
            let n = {
                type: "html",
                raw: t[0],
                pre: !this.options.sanitizer && (t[1] === "pre" || t[1] === "script" || t[1] === "style"),
                text: t[0]
            };
            if (this.options.sanitize) {
                let i = this.options.sanitizer ? this.options.sanitizer(t[0]) : x(t[0]);
                n.type = "paragraph", n.text = i, n.tokens = this.lexer.inline(i);
            }
            return n;
        }
    }
    def(e) {
        let t = this.rules.block.def.exec(e);
        if (t) {
            t[3] && (t[3] = t[3].substring(1, t[3].length - 1));
            let n = t[1].toLowerCase().replace(/\s+/g, " ");
            return {
                type: "def",
                tag: n,
                raw: t[0],
                href: t[2],
                title: t[3]
            };
        }
    }
    table(e) {
        let t = this.rules.block.table.exec(e);
        if (t) {
            let n = {
                type: "table",
                header: P(t[1]).map((i)=>({
                        text: i
                    })),
                align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                rows: t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split(`
`) : []
            };
            if (n.header.length === n.align.length) {
                n.raw = t[0];
                let i = n.align.length, s, r, a, o;
                for(s = 0; s < i; s++)/^ *-+: *$/.test(n.align[s]) ? n.align[s] = "right" : /^ *:-+: *$/.test(n.align[s]) ? n.align[s] = "center" : /^ *:-+ *$/.test(n.align[s]) ? n.align[s] = "left" : n.align[s] = null;
                for(i = n.rows.length, s = 0; s < i; s++)n.rows[s] = P(n.rows[s], n.header.length).map((g)=>({
                        text: g
                    }));
                for(i = n.header.length, r = 0; r < i; r++)n.header[r].tokens = this.lexer.inline(n.header[r].text);
                for(i = n.rows.length, r = 0; r < i; r++)for(o = n.rows[r], a = 0; a < o.length; a++)o[a].tokens = this.lexer.inline(o[a].text);
                return n;
            }
        }
    }
    lheading(e) {
        let t = this.rules.block.lheading.exec(e);
        if (t) return {
            type: "heading",
            raw: t[0],
            depth: t[2].charAt(0) === "=" ? 1 : 2,
            text: t[1],
            tokens: this.lexer.inline(t[1])
        };
    }
    paragraph(e) {
        let t = this.rules.block.paragraph.exec(e);
        if (t) {
            let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
            return {
                type: "paragraph",
                raw: t[0],
                text: n,
                tokens: this.lexer.inline(n)
            };
        }
    }
    text(e) {
        let t = this.rules.block.text.exec(e);
        if (t) return {
            type: "text",
            raw: t[0],
            text: t[0],
            tokens: this.lexer.inline(t[0])
        };
    }
    escape(e) {
        let t = this.rules.inline.escape.exec(e);
        if (t) return {
            type: "escape",
            raw: t[0],
            text: x(t[1])
        };
    }
    tag(e) {
        let t = this.rules.inline.tag.exec(e);
        if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
            type: this.options.sanitize ? "text" : "html",
            raw: t[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(t[0]) : x(t[0]) : t[0]
        };
    }
    link(e) {
        let t = this.rules.inline.link.exec(e);
        if (t) {
            let n = t[2].trim();
            if (!this.options.pedantic && /^</.test(n)) {
                if (!/>$/.test(n)) return;
                let r = O(n.slice(0, -1), "\\");
                if ((n.length - r.length) % 2 === 0) return;
            } else {
                let r1 = pe(t[2], "()");
                if (r1 > -1) {
                    let o = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + r1;
                    t[2] = t[2].substring(0, r1), t[0] = t[0].substring(0, o).trim(), t[3] = "";
                }
            }
            let i = t[2], s = "";
            if (this.options.pedantic) {
                let r2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);
                r2 && (i = r2[1], s = r2[3]);
            } else s = t[3] ? t[3].slice(1, -1) : "";
            return i = i.trim(), /^</.test(i) && (this.options.pedantic && !/>$/.test(n) ? i = i.slice(1) : i = i.slice(1, -1)), F(t, {
                href: i && i.replace(this.rules.inline._escapes, "$1"),
                title: s && s.replace(this.rules.inline._escapes, "$1")
            }, t[0], this.lexer);
        }
    }
    reflink(e, t) {
        let n;
        if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
            let i = (n[2] || n[1]).replace(/\s+/g, " ");
            if (i = t[i.toLowerCase()], !i || !i.href) {
                let s = n[0].charAt(0);
                return {
                    type: "text",
                    raw: s,
                    text: s
                };
            }
            return F(n, i, n[0], this.lexer);
        }
    }
    emStrong(e, t, n = "") {
        let i = this.rules.inline.emStrong.lDelim.exec(e);
        if (!i || i[3] && n.match(/[\p{L}\p{N}]/u)) return;
        let s = i[1] || i[2] || "";
        if (!s || s && (n === "" || this.rules.inline.punctuation.exec(n))) {
            let r = i[0].length - 1, a, o, g = r, f = 0, b = i[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
            for(b.lastIndex = 0, t = t.slice(-1 * e.length + r); (i = b.exec(t)) != null;){
                if (a = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !a) continue;
                if (o = a.length, i[3] || i[4]) {
                    g += o;
                    continue;
                } else if ((i[5] || i[6]) && r % 3 && !((r + o) % 3)) {
                    f += o;
                    continue;
                }
                if (g -= o, g > 0) continue;
                if (o = Math.min(o, o + g + f), Math.min(r, o) % 2) {
                    let p = e.slice(1, r + i.index + o);
                    return {
                        type: "em",
                        raw: e.slice(0, r + i.index + o + 1),
                        text: p,
                        tokens: this.lexer.inlineTokens(p)
                    };
                }
                let k = e.slice(2, r + i.index + o - 1);
                return {
                    type: "strong",
                    raw: e.slice(0, r + i.index + o + 1),
                    text: k,
                    tokens: this.lexer.inlineTokens(k)
                };
            }
        }
    }
    codespan(e) {
        let t = this.rules.inline.code.exec(e);
        if (t) {
            let n = t[2].replace(/\n/g, " "), i = /[^ ]/.test(n), s = /^ /.test(n) && / $/.test(n);
            return i && s && (n = n.substring(1, n.length - 1)), n = x(n, !0), {
                type: "codespan",
                raw: t[0],
                text: n
            };
        }
    }
    br(e) {
        let t = this.rules.inline.br.exec(e);
        if (t) return {
            type: "br",
            raw: t[0]
        };
    }
    del(e) {
        let t = this.rules.inline.del.exec(e);
        if (t) return {
            type: "del",
            raw: t[0],
            text: t[2],
            tokens: this.lexer.inlineTokens(t[2])
        };
    }
    autolink(e, t) {
        let n = this.rules.inline.autolink.exec(e);
        if (n) {
            let i, s;
            return n[2] === "@" ? (i = x(this.options.mangle ? t(n[1]) : n[1]), s = "mailto:" + i) : (i = x(n[1]), s = i), {
                type: "link",
                raw: n[0],
                text: i,
                href: s,
                tokens: [
                    {
                        type: "text",
                        raw: i,
                        text: i
                    }
                ]
            };
        }
    }
    url(e, t) {
        let n;
        if (n = this.rules.inline.url.exec(e)) {
            let i, s;
            if (n[2] === "@") i = x(this.options.mangle ? t(n[0]) : n[0]), s = "mailto:" + i;
            else {
                let r;
                do r = n[0], n[0] = this.rules.inline._backpedal.exec(n[0])[0];
                while (r !== n[0])
                i = x(n[0]), n[1] === "www." ? s = "http://" + i : s = i;
            }
            return {
                type: "link",
                raw: n[0],
                text: i,
                href: s,
                tokens: [
                    {
                        type: "text",
                        raw: i,
                        text: i
                    }
                ]
            };
        }
    }
    inlineText(e, t) {
        let n = this.rules.inline.text.exec(e);
        if (n) {
            let i;
            return this.lexer.state.inRawBlock ? i = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(n[0]) : x(n[0]) : n[0] : i = x(this.options.smartypants ? t(n[0]) : n[0]), {
                type: "text",
                raw: n[0],
                text: i
            };
        }
    }
}, h = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
    html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
    def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
    table: v,
    lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    text: /^[^\n]+/
};
h._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
h._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
h.def = d(h.def).replace("label", h._label).replace("title", h._title).getRegex();
h.bullet = /(?:[*+-]|\d{1,9}[.)])/;
h.listItemStart = d(/^( *)(bull) */).replace("bull", h.bullet).getRegex();
h.list = d(h.list).replace(/bull/g, h.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + h.def.source + ")").getRegex();
h._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
h._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
h.html = d(h.html, "i").replace("comment", h._comment).replace("tag", h._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
h.paragraph = d(h._paragraph).replace("hr", h.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", h._tag).getRegex();
h.blockquote = d(h.blockquote).replace("paragraph", h.paragraph).getRegex();
h.normal = z({}, h);
h.gfm = z({}, h.normal, {
    table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
});
h.gfm.table = d(h.gfm.table).replace("hr", h.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", h._tag).getRegex();
h.gfm.paragraph = d(h._paragraph).replace("hr", h.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", h.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", h._tag).getRegex();
h.pedantic = z({}, h.normal, {
    html: d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", h._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: v,
    paragraph: d(h.normal._paragraph).replace("hr", h.hr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", h.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
});
var c = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: v,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(ref)\]/,
    nolink: /^!?\[(ref)\](?:\[\])?/,
    reflinkSearch: "reflink|nolink(?!\\()",
    emStrong: {
        lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
        rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
        rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: v,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\spunctuation])/
};
c._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
c.punctuation = d(c.punctuation).replace(/punctuation/g, c._punctuation).getRegex();
c.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
c.escapedEmSt = /\\\*|\\_/g;
c._comment = d(h._comment).replace("(?:-->|$)", "-->").getRegex();
c.emStrong.lDelim = d(c.emStrong.lDelim).replace(/punct/g, c._punctuation).getRegex();
c.emStrong.rDelimAst = d(c.emStrong.rDelimAst, "g").replace(/punct/g, c._punctuation).getRegex();
c.emStrong.rDelimUnd = d(c.emStrong.rDelimUnd, "g").replace(/punct/g, c._punctuation).getRegex();
c._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
c._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
c._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
c.autolink = d(c.autolink).replace("scheme", c._scheme).replace("email", c._email).getRegex();
c._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
c.tag = d(c.tag).replace("comment", c._comment).replace("attribute", c._attribute).getRegex();
c._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
c._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
c._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
c.link = d(c.link).replace("label", c._label).replace("href", c._href).replace("title", c._title).getRegex();
c.reflink = d(c.reflink).replace("label", c._label).replace("ref", h._label).getRegex();
c.nolink = d(c.nolink).replace("ref", h._label).getRegex();
c.reflinkSearch = d(c.reflinkSearch, "g").replace("reflink", c.reflink).replace("nolink", c.nolink).getRegex();
c.normal = z({}, c);
c.pedantic = z({}, c.normal, {
    strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
    },
    em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
    },
    link: d(/^!?\[(label)\]\((.*?)\)/).replace("label", c._label).getRegex(),
    reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", c._label).getRegex()
});
c.gfm = z({}, c.normal, {
    escape: d(c.escape).replace("])", "~|])").getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
c.gfm.url = d(c.gfm.url, "i").replace("email", c.gfm._extended_email).getRegex();
c.breaks = z({}, c.gfm, {
    br: d(c.br).replace("{2,}", "*").getRegex(),
    text: d(c.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
});
function fe(l) {
    return l.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function W(l) {
    let e = "", t, n, i = l.length;
    for(t = 0; t < i; t++)n = l.charCodeAt(t), Math.random() > .5 && (n = "x" + n.toString(16)), e += "&#" + n + ";";
    return e;
}
var $ = class {
    constructor(e){
        this.tokens = [], this.tokens.links = Object.create(null), this.options = e || C, this.options.tokenizer = this.options.tokenizer || new B, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
            inLink: !1,
            inRawBlock: !1,
            top: !0
        };
        let t = {
            block: h.normal,
            inline: c.normal
        };
        this.options.pedantic ? (t.block = h.pedantic, t.inline = c.pedantic) : this.options.gfm && (t.block = h.gfm, this.options.breaks ? t.inline = c.breaks : t.inline = c.gfm), this.tokenizer.rules = t;
    }
    static get rules() {
        return {
            block: h,
            inline: c
        };
    }
    static lex(e, t) {
        return new $(t).lex(e);
    }
    static lexInline(e, t) {
        return new $(t).inlineTokens(e);
    }
    lex(e) {
        e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
        let t;
        for(; t = this.inlineQueue.shift();)this.inlineTokens(t.src, t.tokens);
        return this.tokens;
    }
    blockTokens(e, t = []) {
        this.options.pedantic ? e = e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e = e.replace(/^( *)(\t+)/gm, (a, o, g)=>o + "    ".repeat(g.length));
        let n, i, s, r;
        for(; e;)if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((a)=>(n = a.call({
                lexer: this
            }, e, t)) ? (e = e.substring(n.raw.length), t.push(n), !0) : !1))) {
            if (n = this.tokenizer.space(e)) {
                e = e.substring(n.raw.length), n.raw.length === 1 && t.length > 0 ? t[t.length - 1].raw += `
` : t.push(n);
                continue;
            }
            if (n = this.tokenizer.code(e)) {
                e = e.substring(n.raw.length), i = t[t.length - 1], i && (i.type === "paragraph" || i.type === "text") ? (i.raw += `
` + n.raw, i.text += `
` + n.text, this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : t.push(n);
                continue;
            }
            if (n = this.tokenizer.fences(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.heading(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.hr(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.blockquote(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.list(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.html(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.def(e)) {
                e = e.substring(n.raw.length), i = t[t.length - 1], i && (i.type === "paragraph" || i.type === "text") ? (i.raw += `
` + n.raw, i.text += `
` + n.raw, this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
                    href: n.href,
                    title: n.title
                });
                continue;
            }
            if (n = this.tokenizer.table(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.lheading(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (s = e, this.options.extensions && this.options.extensions.startBlock) {
                let a = 1 / 0, o = e.slice(1), g;
                this.options.extensions.startBlock.forEach(function(f) {
                    g = f.call({
                        lexer: this
                    }, o), typeof g == "number" && g >= 0 && (a = Math.min(a, g));
                }), a < 1 / 0 && a >= 0 && (s = e.substring(0, a + 1));
            }
            if (this.state.top && (n = this.tokenizer.paragraph(s))) {
                i = t[t.length - 1], r && i.type === "paragraph" ? (i.raw += `
` + n.raw, i.text += `
` + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : t.push(n), r = s.length !== e.length, e = e.substring(n.raw.length);
                continue;
            }
            if (n = this.tokenizer.text(e)) {
                e = e.substring(n.raw.length), i = t[t.length - 1], i && i.type === "text" ? (i.raw += `
` + n.raw, i.text += `
` + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i.text) : t.push(n);
                continue;
            }
            if (e) {
                let a1 = "Infinite loop on byte: " + e.charCodeAt(0);
                if (this.options.silent) {
                    console.error(a1);
                    break;
                } else throw new Error(a1);
            }
        }
        return this.state.top = !0, t;
    }
    inline(e, t = []) {
        return this.inlineQueue.push({
            src: e,
            tokens: t
        }), t;
    }
    inlineTokens(e, t = []) {
        let n, i, s, r = e, a, o, g;
        if (this.tokens.links) {
            let f = Object.keys(this.tokens.links);
            if (f.length > 0) for(; (a = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null;)f.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, a.index) + "[" + N("a", a[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
        }
        for(; (a = this.tokenizer.rules.inline.blockSkip.exec(r)) != null;)r = r.slice(0, a.index) + "[" + N("a", a[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for(; (a = this.tokenizer.rules.inline.escapedEmSt.exec(r)) != null;)r = r.slice(0, a.index) + "++" + r.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
        for(; e;)if (o || (g = ""), o = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((f)=>(n = f.call({
                lexer: this
            }, e, t)) ? (e = e.substring(n.raw.length), t.push(n), !0) : !1))) {
            if (n = this.tokenizer.escape(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.tag(e)) {
                e = e.substring(n.raw.length), i = t[t.length - 1], i && n.type === "text" && i.type === "text" ? (i.raw += n.raw, i.text += n.text) : t.push(n);
                continue;
            }
            if (n = this.tokenizer.link(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.reflink(e, this.tokens.links)) {
                e = e.substring(n.raw.length), i = t[t.length - 1], i && n.type === "text" && i.type === "text" ? (i.raw += n.raw, i.text += n.text) : t.push(n);
                continue;
            }
            if (n = this.tokenizer.emStrong(e, r, g)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.codespan(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.br(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.del(e)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (n = this.tokenizer.autolink(e, W)) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (!this.state.inLink && (n = this.tokenizer.url(e, W))) {
                e = e.substring(n.raw.length), t.push(n);
                continue;
            }
            if (s = e, this.options.extensions && this.options.extensions.startInline) {
                let f1 = 1 / 0, b = e.slice(1), k;
                this.options.extensions.startInline.forEach(function(p) {
                    k = p.call({
                        lexer: this
                    }, b), typeof k == "number" && k >= 0 && (f1 = Math.min(f1, k));
                }), f1 < 1 / 0 && f1 >= 0 && (s = e.substring(0, f1 + 1));
            }
            if (n = this.tokenizer.inlineText(s, fe)) {
                e = e.substring(n.raw.length), n.raw.slice(-1) !== "_" && (g = n.raw.slice(-1)), o = !0, i = t[t.length - 1], i && i.type === "text" ? (i.raw += n.raw, i.text += n.text) : t.push(n);
                continue;
            }
            if (e) {
                let f2 = "Infinite loop on byte: " + e.charCodeAt(0);
                if (this.options.silent) {
                    console.error(f2);
                    break;
                } else throw new Error(f2);
            }
        }
        return t;
    }
}, q = class {
    constructor(e){
        this.options = e || C;
    }
    code(e, t, n) {
        let i = (t || "").match(/\S*/)[0];
        if (this.options.highlight) {
            let s = this.options.highlight(e, i);
            s != null && s !== e && (n = !0, e = s);
        }
        return e = e.replace(/\n$/, "") + `
`, i ? '<pre><code class="' + this.options.langPrefix + x(i, !0) + '">' + (n ? e : x(e, !0)) + `</code></pre>
` : "<pre><code>" + (n ? e : x(e, !0)) + `</code></pre>
`;
    }
    blockquote(e) {
        return `<blockquote>
${e}</blockquote>
`;
    }
    html(e) {
        return e;
    }
    heading(e, t, n, i) {
        if (this.options.headerIds) {
            let s = this.options.headerPrefix + i.slug(n);
            return `<h${t} id="${s}">${e}</h${t}>
`;
        }
        return `<h${t}>${e}</h${t}>
`;
    }
    hr() {
        return this.options.xhtml ? `<hr/>
` : `<hr>
`;
    }
    list(e, t, n) {
        let i = t ? "ol" : "ul", s = t && n !== 1 ? ' start="' + n + '"' : "";
        return "<" + i + s + `>
` + e + "</" + i + `>
`;
    }
    listitem(e) {
        return `<li>${e}</li>
`;
    }
    checkbox(e) {
        return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
    }
    paragraph(e) {
        return `<p>${e}</p>
`;
    }
    table(e, t) {
        return t && (t = `<tbody>${t}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + t + `</table>
`;
    }
    tablerow(e) {
        return `<tr>
${e}</tr>
`;
    }
    tablecell(e, t) {
        let n = t.header ? "th" : "td";
        return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>
`;
    }
    strong(e) {
        return `<strong>${e}</strong>`;
    }
    em(e) {
        return `<em>${e}</em>`;
    }
    codespan(e) {
        return `<code>${e}</code>`;
    }
    br() {
        return this.options.xhtml ? "<br/>" : "<br>";
    }
    del(e) {
        return `<del>${e}</del>`;
    }
    link(e, t, n) {
        if (e = Q(this.options.sanitize, this.options.baseUrl, e), e === null) return n;
        let i = '<a href="' + x(e) + '"';
        return t && (i += ' title="' + t + '"'), i += ">" + n + "</a>", i;
    }
    image(e, t, n) {
        if (e = Q(this.options.sanitize, this.options.baseUrl, e), e === null) return n;
        let i = `<img src="${e}" alt="${n}"`;
        return t && (i += ` title="${t}"`), i += this.options.xhtml ? "/>" : ">", i;
    }
    text(e) {
        return e;
    }
}, U = class {
    strong(e) {
        return e;
    }
    em(e) {
        return e;
    }
    codespan(e) {
        return e;
    }
    del(e) {
        return e;
    }
    html(e) {
        return e;
    }
    text(e) {
        return e;
    }
    link(e, t, n) {
        return "" + n;
    }
    image(e, t, n) {
        return "" + n;
    }
    br() {
        return "";
    }
}, M = class {
    constructor(){
        this.seen = {};
    }
    serialize(e) {
        return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
    }
    getNextSafeSlug(e, t) {
        let n = e, i = 0;
        if (this.seen.hasOwnProperty(n)) {
            i = this.seen[e];
            do i++, n = e + "-" + i;
            while (this.seen.hasOwnProperty(n))
        }
        return t || (this.seen[e] = i, this.seen[n] = 0), n;
    }
    slug(e, t = {}) {
        let n = this.serialize(e);
        return this.getNextSafeSlug(n, t.dryrun);
    }
}, _ = class {
    constructor(e){
        this.options = e || C, this.options.renderer = this.options.renderer || new q, this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new U, this.slugger = new M;
    }
    static parse(e, t) {
        return new _(t).parse(e);
    }
    static parseInline(e, t) {
        return new _(t).parseInline(e);
    }
    parse(e, t = !0) {
        let n = "", i, s, r, a, o, g, f, b, k, p, A, y, R, m, w, L, I, S, T, E = e.length;
        for(i = 0; i < E; i++){
            if (p = e[i], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[p.type] && (T = this.options.extensions.renderers[p.type].call({
                parser: this
            }, p), T !== !1 || ![
                "space",
                "hr",
                "heading",
                "code",
                "table",
                "blockquote",
                "list",
                "html",
                "paragraph",
                "text"
            ].includes(p.type))) {
                n += T || "";
                continue;
            }
            switch(p.type){
                case "space":
                    continue;
                case "hr":
                    {
                        n += this.renderer.hr();
                        continue;
                    }
                case "heading":
                    {
                        n += this.renderer.heading(this.parseInline(p.tokens), p.depth, G(this.parseInline(p.tokens, this.textRenderer)), this.slugger);
                        continue;
                    }
                case "code":
                    {
                        n += this.renderer.code(p.text, p.lang, p.escaped);
                        continue;
                    }
                case "table":
                    {
                        for(b = "", f = "", a = p.header.length, s = 0; s < a; s++)f += this.renderer.tablecell(this.parseInline(p.header[s].tokens), {
                            header: !0,
                            align: p.align[s]
                        });
                        for(b += this.renderer.tablerow(f), k = "", a = p.rows.length, s = 0; s < a; s++){
                            for(g = p.rows[s], f = "", o = g.length, r = 0; r < o; r++)f += this.renderer.tablecell(this.parseInline(g[r].tokens), {
                                header: !1,
                                align: p.align[r]
                            });
                            k += this.renderer.tablerow(f);
                        }
                        n += this.renderer.table(b, k);
                        continue;
                    }
                case "blockquote":
                    {
                        k = this.parse(p.tokens), n += this.renderer.blockquote(k);
                        continue;
                    }
                case "list":
                    {
                        for(A = p.ordered, y = p.start, R = p.loose, a = p.items.length, k = "", s = 0; s < a; s++)w = p.items[s], L = w.checked, I = w.task, m = "", w.task && (S = this.renderer.checkbox(L), R ? w.tokens.length > 0 && w.tokens[0].type === "paragraph" ? (w.tokens[0].text = S + " " + w.tokens[0].text, w.tokens[0].tokens && w.tokens[0].tokens.length > 0 && w.tokens[0].tokens[0].type === "text" && (w.tokens[0].tokens[0].text = S + " " + w.tokens[0].tokens[0].text)) : w.tokens.unshift({
                            type: "text",
                            text: S
                        }) : m += S), m += this.parse(w.tokens, R), k += this.renderer.listitem(m, I, L);
                        n += this.renderer.list(k, A, y);
                        continue;
                    }
                case "html":
                    {
                        n += this.renderer.html(p.text);
                        continue;
                    }
                case "paragraph":
                    {
                        n += this.renderer.paragraph(this.parseInline(p.tokens));
                        continue;
                    }
                case "text":
                    {
                        for(k = p.tokens ? this.parseInline(p.tokens) : p.text; i + 1 < E && e[i + 1].type === "text";)p = e[++i], k += `
` + (p.tokens ? this.parseInline(p.tokens) : p.text);
                        n += t ? this.renderer.paragraph(k) : k;
                        continue;
                    }
                default:
                    {
                        let Z = 'Token with "' + p.type + '" type was not found.';
                        if (this.options.silent) {
                            console.error(Z);
                            return;
                        } else throw new Error(Z);
                    }
            }
        }
        return n;
    }
    parseInline(e, t) {
        t = t || this.renderer;
        let n = "", i, s, r, a = e.length;
        for(i = 0; i < a; i++){
            if (s = e[i], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type] && (r = this.options.extensions.renderers[s.type].call({
                parser: this
            }, s), r !== !1 || ![
                "escape",
                "html",
                "link",
                "image",
                "strong",
                "em",
                "codespan",
                "br",
                "del",
                "text"
            ].includes(s.type))) {
                n += r || "";
                continue;
            }
            switch(s.type){
                case "escape":
                    {
                        n += t.text(s.text);
                        break;
                    }
                case "html":
                    {
                        n += t.html(s.text);
                        break;
                    }
                case "link":
                    {
                        n += t.link(s.href, s.title, this.parseInline(s.tokens, t));
                        break;
                    }
                case "image":
                    {
                        n += t.image(s.href, s.title, s.text);
                        break;
                    }
                case "strong":
                    {
                        n += t.strong(this.parseInline(s.tokens, t));
                        break;
                    }
                case "em":
                    {
                        n += t.em(this.parseInline(s.tokens, t));
                        break;
                    }
                case "codespan":
                    {
                        n += t.codespan(s.text);
                        break;
                    }
                case "br":
                    {
                        n += t.br();
                        break;
                    }
                case "del":
                    {
                        n += t.del(this.parseInline(s.tokens, t));
                        break;
                    }
                case "text":
                    {
                        n += t.text(s.text);
                        break;
                    }
                default:
                    {
                        let o = 'Token with "' + s.type + '" type was not found.';
                        if (this.options.silent) {
                            console.error(o);
                            return;
                        } else throw new Error(o);
                    }
            }
        }
        return n;
    }
};
function u(l, e, t) {
    if (typeof l > "u" || l === null) throw new Error("marked(): input parameter is undefined or null");
    if (typeof l != "string") throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(l) + ", string expected");
    if (typeof e == "function" && (t = e, e = null), e = z({}, u.defaults, e || {}), V(e), t) {
        let i = e.highlight, s;
        try {
            s = $.lex(l, e);
        } catch (o) {
            return t(o);
        }
        let r = function(o) {
            let g;
            if (!o) try {
                e.walkTokens && u.walkTokens(s, e.walkTokens), g = _.parse(s, e);
            } catch (f) {
                o = f;
            }
            return e.highlight = i, o ? t(o) : t(null, g);
        };
        if (!i || i.length < 3 || (delete e.highlight, !s.length)) return r();
        let a = 0;
        u.walkTokens(s, function(o) {
            o.type === "code" && (a++, setTimeout(()=>{
                i(o.text, o.lang, function(g, f) {
                    if (g) return r(g);
                    f != null && f !== o.text && (o.text = f, o.escaped = !0), a--, a === 0 && r();
                });
            }, 0));
        }), a === 0 && r();
        return;
    }
    function n(i) {
        if (i.message += `
Please report this to https://github.com/markedjs/marked.`, e.silent) return "<p>An error occurred:</p><pre>" + x(i.message + "", !0) + "</pre>";
        throw i;
    }
    try {
        let i1 = $.lex(l, e);
        if (e.walkTokens) {
            if (e.async) return Promise.all(u.walkTokens(i1, e.walkTokens)).then(()=>_.parse(i1, e)).catch(n);
            u.walkTokens(i1, e.walkTokens);
        }
        return _.parse(i1, e);
    } catch (i2) {
        n(i2);
    }
}
u.options = u.setOptions = function(l) {
    return z(u.defaults, l), J(u.defaults), u;
};
u.getDefaults = X;
u.defaults = C;
u.use = function(...l) {
    let e = z({}, ...l), t = u.defaults.extensions || {
        renderers: {},
        childTokens: {}
    }, n;
    l.forEach((i)=>{
        if (i.extensions && (n = !0, i.extensions.forEach((s)=>{
            if (!s.name) throw new Error("extension name required");
            if (s.renderer) {
                let r = t.renderers ? t.renderers[s.name] : null;
                r ? t.renderers[s.name] = function(...a) {
                    let o = s.renderer.apply(this, a);
                    return o === !1 && (o = r.apply(this, a)), o;
                } : t.renderers[s.name] = s.renderer;
            }
            if (s.tokenizer) {
                if (!s.level || s.level !== "block" && s.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
                t[s.level] ? t[s.level].unshift(s.tokenizer) : t[s.level] = [
                    s.tokenizer
                ], s.start && (s.level === "block" ? t.startBlock ? t.startBlock.push(s.start) : t.startBlock = [
                    s.start
                ] : s.level === "inline" && (t.startInline ? t.startInline.push(s.start) : t.startInline = [
                    s.start
                ]));
            }
            s.childTokens && (t.childTokens[s.name] = s.childTokens);
        })), i.renderer) {
            let s = u.defaults.renderer || new q;
            for(let r in i.renderer){
                let a = s[r];
                s[r] = (...o)=>{
                    let g = i.renderer[r].apply(s, o);
                    return g === !1 && (g = a.apply(s, o)), g;
                };
            }
            e.renderer = s;
        }
        if (i.tokenizer) {
            let s1 = u.defaults.tokenizer || new B;
            for(let r1 in i.tokenizer){
                let a1 = s1[r1];
                s1[r1] = (...o)=>{
                    let g = i.tokenizer[r1].apply(s1, o);
                    return g === !1 && (g = a1.apply(s1, o)), g;
                };
            }
            e.tokenizer = s1;
        }
        if (i.walkTokens) {
            let s2 = u.defaults.walkTokens;
            e.walkTokens = function(r) {
                let a = [];
                return a.push(i.walkTokens.call(this, r)), s2 && (a = a.concat(s2.call(this, r))), a;
            };
        }
        n && (e.extensions = t), u.setOptions(e);
    });
};
u.walkTokens = function(l, e) {
    let t = [];
    for (let n of l)switch(t = t.concat(e.call(u, n)), n.type){
        case "table":
            {
                for (let i of n.header)t = t.concat(u.walkTokens(i.tokens, e));
                for (let i1 of n.rows)for (let s of i1)t = t.concat(u.walkTokens(s.tokens, e));
                break;
            }
        case "list":
            {
                t = t.concat(u.walkTokens(n.items, e));
                break;
            }
        default:
            u.defaults.extensions && u.defaults.extensions.childTokens && u.defaults.extensions.childTokens[n.type] ? u.defaults.extensions.childTokens[n.type].forEach(function(i) {
                t = t.concat(u.walkTokens(n[i], e));
            }) : n.tokens && (t = t.concat(u.walkTokens(n.tokens, e)));
    }
    return t;
};
u.parseInline = function(l, e) {
    if (typeof l > "u" || l === null) throw new Error("marked.parseInline(): input parameter is undefined or null");
    if (typeof l != "string") throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(l) + ", string expected");
    e = z({}, u.defaults, e || {}), V(e);
    try {
        let t = $.lexInline(l, e);
        return e.walkTokens && u.walkTokens(t, e.walkTokens), _.parseInline(t, e);
    } catch (t1) {
        if (t1.message += `
Please report this to https://github.com/markedjs/marked.`, e.silent) return "<p>An error occurred:</p><pre>" + x(t1.message + "", !0) + "</pre>";
        throw t1;
    }
};
u.Parser = _;
u.parser = _.parse;
u.Renderer = q;
u.TextRenderer = U;
u.Lexer = $;
u.lexer = $.lex;
u.Tokenizer = B;
u.Slugger = M;
u.parse = u;
var ge = u.options, de = u.setOptions, ke = u.use, me = u.walkTokens, xe = u.parseInline, we = u, be = _.parse, _e = $.lex;
export { $ as Lexer, _ as Parser, q as Renderer, M as Slugger, U as TextRenderer, B as Tokenizer, C as defaults, X as getDefaults, _e as lexer, u as marked, ge as options, we as parse, xe as parseInline, be as parser, de as setOptions, ke as use, me as walkTokens };