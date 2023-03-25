import {
    c as E,
    s as A,
    i as C,
    j as L,
    m as O,
    k as N,
    r as y,
    t as T,
    l as $
} from "./web.54861c38.js";

function k() {
    return {
        get pathname() {
            return window.LOCATION().pathname
        },
        get hash() {
            return window.LOCATION().hash
        },
        get search() {
            return window.LOCATION().search
        }
    }
}

function U() {
    {
        let t = function() {
            const {
                pathname: e,
                search: n,
                hash: a
            } = window.location;
            return {
                path: e + n + a,
                state: history.state,
                pathname: e,
                search: n,
                hash: a,
                query: {},
                key: ""
            }
        };
        const i = "/";
        let [s, c] = E(t());
        window.LOCATION = s, window.ROUTER = new EventTarget;
        async function l(e) {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
            const n = e.composedPath().find(g => g instanceof Node && g.nodeName.toUpperCase() === "A");
            if (!n || !n.hasAttribute("link")) return;
            const a = n.href;
            if (n.target || !a && !n.hasAttribute("state")) return;
            const h = (n.getAttribute("rel") || "").split(/\s+/);
            if (n.hasAttribute("download") || h && h.includes("external")) return;
            const r = new URL(a);
            if (r.origin !== window.location.origin || r.pathname && !r.pathname.toLowerCase().startsWith(i.toLowerCase())) return;
            const w = t(),
                f = r.pathname + r.search + r.hash,
                p = n.getAttribute("state");
            r.pathname === w.pathname && r.search === w.search && r.hash !== w.hash && (window.location.hash = r.hash, c(t())), e.preventDefault();
            const m = {
                resolve: !1,
                replace: n.hasAttribute("replace"),
                scroll: !n.hasAttribute("noscroll"),
                state: p && JSON.parse(p)
            };
            await d(f, m), window.PUSH(f, m)
        }
        async function u(e) {
            const {
                pathname: n,
                search: a,
                hash: o,
                state: h
            } = t(), r = n + a + o;
            await d(r) && c(t())
        }
        async function d(e, n = {}) {
            window.ROUTER.dispatchEvent(new CustomEvent("navigation-start", {
                detail: e
            }));
            const a = await fetch(e, {
                headers: {
                    "x-solid-referrer": s().pathname
                }
            });
            if (!a.ok) return console.error(`Navigation failed: ${a.status} ${a.statusText}`), window.ROUTER.dispatchEvent(new CustomEvent("navigation-error", {
                detail: e
            })), !1;
            let o = await a.text();
            return v(o) ? (window.ROUTER.dispatchEvent(new CustomEvent("navigation-end", {
                detail: e
            })), !0) : (window.ROUTER.dispatchEvent(new CustomEvent("navigation-error", {
                detail: e
            })), !1)
        }
        window.PUSH = (e, n) => {
            let a = new URL(e, window.location.origin);
            n.replace ? history.replaceState(n.state, "", a) : history.pushState(n.state, "", a), c(t())
        }, window.NAVIGATE = async (e, n = {}) => {
            await d(e) && window.PUSH(e, n)
        }, window._$HY.update = v, document.addEventListener("click", l), window.addEventListener("popstate", u)
    }
}

function v(t) {
    let i = [];
    if (t.charAt(0) === "a") {
        const s = t.indexOf(";");
        i = JSON.parse(t.substring(7, s)), t = t.substring(s + 1)
    }
    if (t.charAt(0) === "o") {
        const s = t.indexOf("="),
            c = t.substring(0, s),
            l = t.substring(s + 1);
        if (c) {
            i.length && (i[0].forEach(([n, a]) => {
                if (!document.querySelector(`link[href="${a}"]`)) {
                    let o = document.createElement("link");
                    o.rel = n === "style" ? "stylesheet" : "modulepreload", o.href = a, document.head.appendChild(o)
                }
            }), i[1].forEach(([n, a]) => {
                let o = document.querySelector(`link[href="${a}"]`);
                o && document.head.removeChild(o)
            }));
            const [u, d] = c.split(":"), e = document.getElementById(u);
            if (e) {
                let n = e.firstChild,
                    a = document.implementation.createHTMLDocument();
                return a.write(`<outlet-wrapper id="${d}">`), a.write(l), a.write("</outlet-wrapper>"), window._$HY && window._$HY.replaceIslands && window._$HY.replaceIslands({
                    outlet: e,
                    old: n,
                    new: a.body.firstChild,
                    content: l,
                    next: d
                }), !0
            } else console.warn(`No outlet element with id ${u}`)
        } else console.warn("No meta data in response")
    }
    return !1
}
const I = T("<a link></a>");

function R(t) {
    const [, i] = A(t, ["state", "activeClass", "inactiveClass", "end"]), s = x(), c = () => t.href.startsWith("#") ? s.hash === t.href : s.pathname === t.href;
    return (() => {
        const l = C(I);
        return L(l, O(i, {
            get state() {
                return JSON.stringify(t.state)
            },
            get classList() {
                return {
                    [t.inactiveClass || "inactive"]: !c(),
                    [t.activeClass || "active"]: c(),
                    ...i.classList
                }
            },
            get ["aria-current"]() {
                return c() ? "page" : void 0
            }
        }), !1, !0), N(l, () => i.children), y(), l
    })()
}
window._$HY.island("../../packages/start/islands/A.tsx?island", R);
const x = k,
    H = function() {
        return (i, s) => window.NAVIGATE(i, s)
    };
$(["click"]);
export {
    x as a, U as m, H as u
};

window.ROUTER.addEventListener("navigation-start", e => {
    U.start()
});
window.ROUTER.addEventListener("navigation-end", e => {
    U.done()
});
window.ROUTER.addEventListener("navigation-error", e => {
    U.done()
});