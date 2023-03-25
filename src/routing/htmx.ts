/*
WIP implementation of HTMX requests and SolidJS's routing with Outlets
*/


function getHeaders(element: HTMLElement, target: HTMLElement, prompt: string) : Headers {
    var headers: Headers = new Headers();
    headers.set("HX-Request", "true");
    headers.set("Content-Type", "text/html");
    headers.set("X-Astro-Referrer", "/");//This is just the default referrer or document URL
    //or I could use the new({}) constructor and set the properties inside without having to call set().
    
    //getValuesForElement(element, "hx-headers", false, headers);
    return headers;
}

async function fetchRouterRequest( verb: string, path: string, element: HTMLElement, event: Event, etc: any ) {

    if (element === null) {
        element = getDocument().body;
    }

    var target = etc.targetOverride || getTarget(element);
    var headers = getHeaders(element, target, "prompt");
    const response = await fetch(path, {
        method: verb,
        headers: headers
    })

    if (!response.ok) {
        console.error(`Navigation failed: ${response.status} ${response.statusText}`);
        return false;
      }

      const body = await response.text();
      const splitIndex = body.indexOf("=");
      const meta = body.substring(0, splitIndex);
      const content = body.substring(splitIndex + 1);

      if (meta) {
        const [prev, next] = meta.split(":");
        const outletEl = document.getElementById(prev);
        if (outletEl) {
          outletEl.innerHTML = content;
          outletEl.id = next;
          //window._$HY && window._$HY.hydrateIslands && window._$HY.hydrateIslands();
          return true;
        } else {
          console.warn(`No outlet element with id ${prev}`);
        }
      } else {
        console.warn(`No meta data in response`);
      }

      return false;
}

function getRawAttribute(element: HTMLElement, name: string) {
    return element.getAttribute(name);
}

function getDocument() {
    return document;
}

async function handleAnchorClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey ) return;

    const a = event.composedPath().find(el => el instanceof Node && el.nodeName.toUpperCase() == "A") as | HTMLAnchorElement | undefined;

    //if (!a || !a.hasAttribute("link")) return;
    if (!a) return;

    const href = a.href;
    if (a.target) return;

    const rel = (a.getAttribute("rel") || "").split(/\s+/);
    if (a.hasAttribute("download") || (rel && rel.includes("external"))) return;

    const url = new URL(href);
    const pathname = url.pathname;//urlDecode(url.pathname);
    const to = url.pathname + url.search + url.hash;

    const basePath: string = "";
    if (url.origin !== window.location.origin || (basePath && pathname && !pathname.toLowerCase().startsWith(basePath.toLowerCase()))) return;

    const state = a.getAttribute("state");

    event.preventDefault();
    const options = {
        resolve: false,
        replace: a.hasAttribute("replace"),
        scroll: !a.hasAttribute("noscroll"),
        state: state && JSON.parse(state)
      };

    console.log("hello world from the custom api");

    if (await fetchRouterRequest("GET", pathname, a, event, "")) {
        if (options.replace) {
          history.replaceState(options.state, "", to);
        } else {
          history.pushState(options.state, "", to);
        }
        //(getLocation());
      }
}

function findTitle(content: string) {
    if (content.indexOf('<title') > -1) {
        var contentWithSvgsRemoved = content.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, '');
        var result = contentWithSvgsRemoved.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);

        if (result) {
            return result[2];
        }
    }
}

function getTarget(element: HTMLElement) {
    var targetStr = getRawAttribute(element, "hx-target");
    if (targetStr) {
        return "target" //TODO: Fix this later so that it actually returns out target value
        /* Our target is most likely going to be the outlet that the element is within,
        *   so instead of searching for a target that has a certain property we would instead
        *   be searching for the closest element in the DOM that is an outlet.
        *   Or rather has an outlet property
        */
    }
}

/*
function getClosestAttributeValue(element: HTMLElement, attributeName: string) {
    var closestAttribute : HTMLElement | null = null;
    getClosestMatch(element, (e) => {
        return closestAttribute = getAttributeValueWithDisinheritance();
    })
}

function getAttributeValueWithDisinheritance()


function getClosestMatch(element : HTMLElement, condition: (element: HTMLElement) => boolean) {
    while (element && !condition(element) && element.parentElement) {
        element = element.parentElement;
    }

    return element ? element : null;
}

function getValuesForElement(element: HTMLElement, attribute: string, evaluateFallback: boolean, headers: Headers ){

}
*/
export {
    getHeaders,
    fetchRouterRequest
};